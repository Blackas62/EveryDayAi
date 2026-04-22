import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllSlugs, getPostBySlug, formatDate, postUrl } from "@/lib/blog";
import { articleJsonLd, faqJsonLd } from "@/lib/blog-jsonld";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = postUrl(post.slug);
  const { title, description, date, updated, image, tags } = post.frontMatter;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      publishedTime: new Date(date).toISOString(),
      modifiedTime: new Date(updated ?? date).toISOString(),
      authors: [post.frontMatter.author ?? "Graham Blackwell"],
      tags,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 scroll-mt-24 text-4xl font-bold tracking-tight first:mt-0 sm:text-5xl"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-mt-24 text-3xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-mt-24 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-6 scroll-mt-24 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 leading-relaxed text-foreground/90" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary underline underline-offset-4 hover:no-underline"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 ml-6 list-disc space-y-2 text-foreground/90" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-5 ml-6 list-decimal space-y-2 text-foreground/90"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-primary/40 pl-5 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border/40" />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-5 overflow-x-auto rounded-xl bg-dark p-5 text-sm text-dark-foreground"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-border/60 px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-border/30 px-3 py-2 align-top" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="mt-6 rounded-xl" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = articleJsonLd(post);
  const faqLd = faqJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      {/* Header */}
      <section className="relative overflow-hidden bg-dark py-20 text-dark-foreground sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="text-sm font-medium tracking-wide text-accent hover:underline"
          >
            ← Blog
          </Link>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            {post.frontMatter.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-dark-muted">
            {post.frontMatter.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-dark-muted">
            <span>{post.frontMatter.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.frontMatter.date}>
              {formatDate(post.frontMatter.date)}
            </time>
            {post.frontMatter.updated ? (
              <>
                <span aria-hidden>·</span>
                <span>Updated {formatDate(post.frontMatter.updated)}</span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
              parseFrontmatter: false,
            }}
          />

          {post.frontMatter.tags && post.frontMatter.tags.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-2 text-xs">
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
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/85 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Working out where AI fits in your business?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            An AI Readiness Review is a one-week, fixed-fee way to find out.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-white px-7 text-sm font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
          >
            See the offers
          </Link>
        </div>
      </section>
    </>
  );
}
