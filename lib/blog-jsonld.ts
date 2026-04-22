import type { Post } from "./blog";
import { SITE_URL, postUrl } from "./blog";

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl(post.slug)}#article`,
    headline: post.frontMatter.title,
    description: post.frontMatter.description,
    datePublished: new Date(post.frontMatter.date).toISOString(),
    dateModified: new Date(
      post.frontMatter.updated ?? post.frontMatter.date
    ).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#graham`,
      name: post.frontMatter.author ?? "Graham Blackwell",
      url: `${SITE_URL}/about`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl(post.slug) },
    url: postUrl(post.slug),
    ...(post.frontMatter.image
      ? { image: `${SITE_URL}${post.frontMatter.image}` }
      : {}),
    ...(post.frontMatter.tags && post.frontMatter.tags.length > 0
      ? { keywords: post.frontMatter.tags.join(", ") }
      : {}),
    inLanguage: "en-AU",
    isPartOf: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd(post: Post) {
  if (!post.frontMatter.faq || post.frontMatter.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${postUrl(post.slug)}#faq`,
    mainEntity: post.frontMatter.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogListingJsonLd(slugs: { slug: string; title: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "EveryDay AI with Graham — Blog",
    description:
      "Plain-English writing on how Australian small-to-mid businesses can use AI well — from Graham Blackwell in Perth.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-AU",
    blogPost: slugs.map(({ slug, title }) => ({
      "@type": "BlogPosting",
      "@id": `${postUrl(slug)}#article`,
      url: postUrl(slug),
      headline: title,
    })),
  };
}
