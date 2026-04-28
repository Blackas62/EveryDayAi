import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SHOW_YOUTUBE } from "@/lib/feature-flags";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://everydayaiwithgraham.com";
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...(SHOW_YOUTUBE
      ? ([{ url: `${base}/youtube`, lastModified: now, changeFrequency: "daily", priority: 0.8 }] as MetadataRoute.Sitemap)
      : []),
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.frontMatter.updated ?? post.frontMatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
