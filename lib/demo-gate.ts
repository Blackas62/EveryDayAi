import { SignJWT, jwtVerify } from "jose";

export type DemoGatePayload = {
  email: string;
  trade: string;
  iat?: number;
};

const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function secret() {
  const s = process.env.INTERVIEW_JWT_SECRET;
  if (!s) throw new Error("INTERVIEW_JWT_SECRET missing");
  return new TextEncoder().encode(s);
}

export async function signDemoGate(payload: Omit<DemoGatePayload, "iat">): Promise<string> {
  return new SignJWT({ ...payload, purpose: "demo-gate" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TTL_SECONDS}s`)
    .sign(secret());
}

export async function verifyDemoGate(token: string): Promise<DemoGatePayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.purpose !== "demo-gate") return null;
    if (typeof payload.email !== "string" || typeof payload.trade !== "string") return null;
    return { email: payload.email, trade: payload.trade, iat: payload.iat };
  } catch {
    return null;
  }
}

export const DEMO_GATE_COOKIE = "aofd_gate";
export const DEMO_GATE_TTL_SECONDS = TTL_SECONDS;
