import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { blogListingJsonLd } from "@/lib/blog-jsonld";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English writing on how Australian small-to-mid businesses can use AI well — from Graham Blackwell in Perth.",
  alternates: { canonical: "https://everydayaiwithgraham.com/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const listingLd = blogListingJsonLd(
    posts.map((p) => ({ slug: p.slug, title: p.frontMatter.title }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-dark py-20 text-dark-foreground sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">
            Writing
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-muted">
            Notes on practical AI for Australian small-to-mid businesses — from
            readiness reviews to implementation sprints, written for owners and
            operators.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              No posts yet — first one lands soon.
            </p>
          ) : (
            <ul className="space-y-10">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-border/40 pb-10 last:border-b-0">
                  <article>
                    <time
                      dateTime={post.frontMatter.date}
                      className="text-sm font-medium tracking-wide text-muted-foreground uppercase"
                    >
                      {formatDate(post.frontMatter.date)}
                    </time>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.frontMatter.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {post.frontMatter.description}
                    </p>
                    {post.frontMatter.tags && post.frontMatter.tags.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                        {post.frontMatter.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-muted px-3 py-1 text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read more →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
