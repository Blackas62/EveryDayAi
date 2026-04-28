import Link from "next/link";
import { SHOW_YOUTUBE, YOUTUBE_CHANNEL_URL } from "@/lib/feature-flags";

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-lg font-bold text-dark-foreground">EveryDay<span className="text-accent">Ai</span><span className="font-normal text-dark-muted">WithGraham</span></span>
            <p className="mt-2 text-sm text-dark-muted">
              Practical AI solutions for Australian businesses. No jargon, no
              hype — just tools that work.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-dark-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              {SHOW_YOUTUBE && (
                <li>
                  <Link
                    href="/youtube"
                    className="hover:text-accent transition-colors"
                  >
                    YouTube
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-dark-foreground">Connect</h3>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              {SHOW_YOUTUBE && (
                <li>
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    YouTube Channel
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-dark-foreground">Location</h3>
            <p className="text-sm text-dark-muted">
              Perth, Western Australia
            </p>
            <a
              href="https://share.google/D7CV14jahwS69enTm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-dark-muted hover:text-accent transition-colors"
            >
              Google Business Profile
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-border pt-6 text-center text-sm text-dark-muted">
          &copy; {new Date().getFullYear()} EveryDay AI with Graham. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
