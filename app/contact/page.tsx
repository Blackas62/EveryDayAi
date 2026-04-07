import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss how AI can help your business. No jargon, no hype — just practical solutions.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you&apos;ve got a specific project in mind or just want to
            explore how AI could help your business — I&apos;m happy to chat.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h3 className="text-sm font-semibold">Email</h3>
                <a
                  href="mailto:Graham@EveryDayAiWithGraham.com"
                  className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                >
                  Graham@EveryDayAiWithGraham.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Perth, Western Australia
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Availability</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open to consulting engagements, project work, and part-time
                  roles. I typically respond within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">YouTube</h3>
                <a
                  href="https://www.youtube.com/@EveryDayAiWithGraham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                >
                  @EveryDayAiWithGraham
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
