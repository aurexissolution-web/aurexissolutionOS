import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | AUREXIS SOLUTION",
  description: "Understand how AUREXIS SOLUTION uses cookies and how you can manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <section className="bg-[#05060c] py-16 text-neutral-300">
      <div className="mx-auto max-w-4xl px-6 space-y-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">Policy</p>
          <h1 className="text-4xl font-semibold text-white">Cookie Policy</h1>
          <p className="text-sm text-neutral-400">Effective Date: March 2026</p>
        </header>

        <article className="space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the site remember your actions
              and preferences over time, enabling a faster, more personalized experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">2. How We Use Cookies</h2>
            <p>
              We categorize cookies to ensure our infrastructure runs smoothly and to optimize our Digital Growth services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-200">
              <li>
                <strong>Strictly Necessary:</strong> Authentication and session cookies that keep you securely logged into the Client Portal
                and allow you to navigate protected areas.
              </li>
              <li>
                <strong>Performance &amp; Analytics:</strong> Tools such as Vercel Analytics or Google Analytics that monitor traffic,
                page performance, and user behavior to continuously improve our experience.
              </li>
              <li>
                <strong>Targeting &amp; Advertising:</strong> Tracking pixels (Meta, LinkedIn, TikTok) that power retargeted campaigns as part of our Digital Marketing services.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">3. Managing Your Preferences</h2>
            <p>
              You have full control over your cookie settings. Most browsers allow you to refuse all cookies or receive alerts when cookies are being sent.
              Disabling Strictly Necessary cookies may prevent you from logging into the Aurexis Client Portal or accessing secure sections of the site.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
