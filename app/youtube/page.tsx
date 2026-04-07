import type { Metadata } from "next";
import Image from "next/image";
import { getLatestVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "EveryDay AI with Graham — making AI accessible for everyday Australians. Watch the latest videos.",
};

export default async function YouTubePage() {
  const videos = await getLatestVideos(9);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            YouTube
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Making AI accessible for everyday Australians. New videos weekly on
            practical AI, automation, and what it all means for real people.
          </p>
          <a
            href="https://www.youtube.com/@EveryDayAiWithGraham?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
            Subscribe
          </a>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {videos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                      <svg
                        className="h-12 w-12 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-primary">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(video.publishedAt).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">
                Videos are loading — check back shortly, or visit the channel
                directly.
              </p>
              <a
                href="https://www.youtube.com/@EveryDayAiWithGraham"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Visit YouTube Channel
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
