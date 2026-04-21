import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "MistralAI-User",
          "Manus-User",
          "xAI-Bot",
          "cohere-ai",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://everydayaiwithgraham.com/sitemap.xml",
  };
}
