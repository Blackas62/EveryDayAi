import { Redis } from "@upstash/redis";
import { SignJWT, jwtVerify } from "jose";

const TTL_SECONDS = 60 * 60 * 48;
const MAX_CALLS = 2;

export type TicketPayload = {
  bookingId: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  preCallNotes?: string;
  scheduledAt: string;
  expiresAt: string;
};

export type Answer = {
  category: string;
  summary: string;
  confidence: "high" | "medium" | "low";
  quotes: string[];
  recordedAt: string;
};

export type Flag = {
  topic: string;
  detail: string;
  recordedAt: string;
};

export type TicketState = {
  answers: Answer[];
  flags: Flag[];
  callCount: number;
};

function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Upstash Redis env vars missing");
  return new Redis({ url, token });
}

function secret() {
  const s = process.env.INTERVIEW_JWT_SECRET;
  if (!s) throw new Error("INTERVIEW_JWT_SECRET missing");
  return new TextEncoder().encode(s);
}

const answersKey = (bookingId: string) => `ticket:${bookingId}:answers`;
const flagsKey = (bookingId: string) => `ticket:${bookingId}:flags`;
const callsKey = (bookingId: string) => `ticket:${bookingId}:calls`;

export async function createTicket(
  input: Omit<TicketPayload, "expiresAt"> & { expiresAt?: string }
): Promise<{ token: string; payload: TicketPayload }> {
  const scheduled = new Date(input.scheduledAt);
  const expiresAt = input.expiresAt ?? new Date(scheduled.getTime() + 24 * 60 * 60 * 1000).toISOString();
  const payload: TicketPayload = { ...input, expiresAt };

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(new Date(expiresAt).getTime() / 1000))
    .sign(secret());

  return { token, payload };
}

export async function verifyTicket(token: string): Promise<TicketPayload> {
  const { payload } = await jwtVerify(token, secret());
  if (!payload.bookingId || !payload.email) throw new Error("Ticket payload malformed");
  return payload as unknown as TicketPayload;
}

export async function recordAnswer(bookingId: string, answer: Omit<Answer, "recordedAt">) {
  const r = redis();
  const entry: Answer = { ...answer, recordedAt: new Date().toISOString() };
  await r.rpush(answersKey(bookingId), JSON.stringify(entry));
  await r.expire(answersKey(bookingId), TTL_SECONDS);
  return entry;
}

export async function recordFlag(bookingId: string, flag: Omit<Flag, "recordedAt">) {
  const r = redis();
  const entry: Flag = { ...flag, recordedAt: new Date().toISOString() };
  await r.rpush(flagsKey(bookingId), JSON.stringify(entry));
  await r.expire(flagsKey(bookingId), TTL_SECONDS);
  return entry;
}

export async function incrementCallCount(bookingId: string): Promise<{ count: number; exceeded: boolean }> {
  const r = redis();
  const count = await r.incr(callsKey(bookingId));
  await r.expire(callsKey(bookingId), TTL_SECONDS);
  return { count, exceeded: count > MAX_CALLS };
}

export async function getTicketState(bookingId: string): Promise<TicketState> {
  const r = redis();
  const [rawAnswers, rawFlags, rawCalls] = await Promise.all([
    r.lrange(answersKey(bookingId), 0, -1),
    r.lrange(flagsKey(bookingId), 0, -1),
    r.get<number>(callsKey(bookingId)),
  ]);
  return {
    answers: rawAnswers.map(parseJson<Answer>),
    flags: rawFlags.map(parseJson<Flag>),
    callCount: rawCalls ?? 0,
  };
}

export async function completeCall(bookingId: string): Promise<TicketState> {
  const state = await getTicketState(bookingId);
  const r = redis();
  await Promise.all([
    r.del(answersKey(bookingId)),
    r.del(flagsKey(bookingId)),
    r.del(callsKey(bookingId)),
  ]);
  return state;
}

function parseJson<T>(raw: unknown): T {
  if (typeof raw === "string") return JSON.parse(raw) as T;
  return raw as T;
}

export const MAX_CALLS_PER_TICKET = MAX_CALLS;
