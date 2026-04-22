import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const SITE_URL = "https://everydayaiwithgraham.com";

export type FaqItem = { question: string; answer: string };

export type PostFrontMatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
  faq?: FaqItem[];
};

export type Post = {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
};

function isPublishable(filename: string): boolean {
  if (!filename.endsWith(".mdx") && !filename.endsWith(".md")) return false;
  if (filename.startsWith("_")) return false;
  if (filename.startsWith(".")) return false;
  return true;
}

function toSlug(filename: string): string {
  return filename.replace(/\.(mdx|md)$/i, "");
}

function readPostFile(filepath: string, slug: string): Post | null {
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontMatter>;

  if (!fm.title || !fm.description || !fm.date) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[blog] Skipping ${slug}: missing required front-matter (title, description, date)`
      );
    }
    return null;
  }
  if (fm.draft) return null;

  return {
    slug,
    frontMatter: {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      updated: fm.updated,
      author: fm.author ?? "Graham Blackwell",
      tags: fm.tags ?? [],
      image: fm.image,
      draft: false,
      faq: fm.faq,
    },
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(isPublishable);
  const posts: Post[] = [];

  for (const file of files) {
    const slug = toSlug(file);
    const post = readPostFile(path.join(BLOG_DIR, file), slug);
    if (post) posts.push(post);
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of ["mdx", "md"] as const) {
    const file = path.join(BLOG_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) {
      return readPostFile(file, slug);
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
