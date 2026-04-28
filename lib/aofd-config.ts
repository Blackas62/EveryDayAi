export type TradeSlug = "plumber" | "electrician" | "builder" | "real-estate";

export type AofdTrade = {
  slug: TradeSlug;
  agentId: string;
  personaName: string;
  pageTitle: string;
  scenarioPrompt: string;
};

export const AOFD_TRADES: Record<TradeSlug, AofdTrade> = {
  plumber: {
    slug: "plumber",
    agentId: "agent_6901kq9dcazafakvty97gmtqhkfj",
    personaName: "Sample Plumbing Co",
    pageTitle: "Always On Front Desk — Plumber demo",
    scenarioPrompt:
      "Imagine you're a homeowner. It's 9pm and you've just spotted water bubbling up through the kitchen tiles — looks like a burst pipe under the slab. You ring your local plumber. Press start and have a chat as if you were the customer.",
  },
  electrician: {
    slug: "electrician",
    agentId: "agent_4801kq9dcx7nff8r06xn2ezdmdwa",
    personaName: "Sample Electrical Co",
    pageTitle: "Always On Front Desk — Electrician demo",
    scenarioPrompt:
      "Imagine you're a homeowner. Half the house has lost power and the kettle's smoking. You ring your local sparky. Press start and have a chat as if you were the customer.",
  },
  builder: {
    slug: "builder",
    agentId: "agent_8201kq9dcz6bfswak6pw9a25evgk",
    personaName: "Sample Builders Co",
    pageTitle: "Always On Front Desk — Builder demo",
    scenarioPrompt:
      "Imagine you're a homeowner thinking about a single-storey extension at the back of your house — extra bedroom and a second bathroom. You're after a builder to walk through it with you. Press start and have a chat as if you were the customer.",
  },
  "real-estate": {
    slug: "real-estate",
    agentId: "agent_7801kq9dd16yf9hbjdx82yjzjyyd",
    personaName: "Sample Property Co",
    pageTitle: "Always On Front Desk — Real estate demo",
    scenarioPrompt:
      "Imagine you've just driven past a `For Sale` sign on a property you like the look of. You ring the agency to ask about it. Press start and have a chat as if you were the buyer.",
  },
};

export function getTrade(slug: string): AofdTrade | null {
  if (slug in AOFD_TRADES) return AOFD_TRADES[slug as TradeSlug];
  return null;
}
