import { getAllPosts, SITE_URL, postUrl } from "@/lib/blog";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const lastBuildDate =
    posts[0]?.frontMatter.updated ?? posts[0]?.frontMatter.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = postUrl(post.slug);
      return `    <item>
      <title>${xmlEscape(post.frontMatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xmlEscape(post.frontMatter.description)}</description>
      <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
      <author>graham@everydayaiwithgraham.com (${xmlEscape(
        post.frontMatter.author ?? "Graham Blackwell"
      )})</author>${
        post.frontMatter.tags
          ?.map((tag) => `\n      <category>${xmlEscape(tag)}</category>`)
          .join("") ?? ""
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EveryDay AI with Graham</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical AI writing for Australian small-to-mid businesses — from Graham Blackwell in Perth.</description>
    <language>en-au</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
