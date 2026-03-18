import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Aurexis Solution",
  description: "Learn how Aurexis Solution collects, uses, and protects your personal data across our digital platforms.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-[#05060c] py-16 text-neutral-300">
      <div className="mx-auto max-w-4xl px-6 space-y-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">Policy</p>
          <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="text-sm text-neutral-400">Effective Date: March 2026</p>
        </header>

        <article className="space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p>
              Aurexis Solution ("we," "our," or "us") is committed to protecting your privacy and ensuring your
              personal data is handled securely. This Privacy Policy outlines how we collect, use, and safeguard
              your information when you visit our website, utilize our Client Portal, or engage our digital architecture
              and AI automation services. We comply with the Personal Data Protection Act (PDPA) of Malaysia and adhere
              to global best practices for data security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
            <p>We only collect information necessary to deliver high-performance digital solutions and manage our relationship with you:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-200">
              <li>
                <strong>Identity &amp; Contact Data:</strong> Name, email address, phone number, company name, and job title
                (e.g., when booking a Strategy Session via Cal.com).
              </li>
              <li>
                <strong>Account Data:</strong> Secure authentication credentials for accessing the Aurexis Client, Admin, or Sales portals.
              </li>
              <li>
                <strong>Technical &amp; Usage Data:</strong> IP addresses, browser types, operating systems, and telemetry data regarding how you interact with our website.
              </li>
              <li>
                <strong>Financial Data:</strong> Billing information necessary for processing payments. We never store full credit card numbers; transactions are processed via third-party gateways such as Stripe.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">3. How We Use Your Data</h2>
            <p>We utilize your information to engineer your solutions and run our operations smoothly:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-200">
              <li>To execute Master Service Agreements (MSAs) and deliver custom AI, web, and app ecosystems.</li>
              <li>To manage Client Portal access, project roadmaps, and support ticketing.</li>
              <li>To send administrative information, invoices, and critical system updates.</li>
              <li>To deliver targeted digital growth campaigns and marketing communications (with opt-out options).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">4. Data Sharing &amp; Third-Party Infrastructure</h2>
            <p>
              We will never sell, rent, or trade your personal or company data. Data is shared only with trusted enterprise partners
              providing our infrastructure, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-200">
              <li>Cloud hosting and databases (e.g., Vercel, Supabase, AWS).</li>
              <li>Artificial Intelligence API providers (e.g., OpenAI, Anthropic) using enterprise endpoints that prohibit public model training on your data.</li>
              <li>Payment processors and scheduling tools (e.g., Stripe, Cal.com).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
            <p>
              We implement enterprise-grade safeguards such as Row-Level Security (RLS), encryption, and continuous monitoring to protect your data against
              unauthorized access, alteration, or destruction. While we strive for absolute security, no internet transmission can be guaranteed 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">6. Your Rights</h2>
            <p>
              You have the right to access, correct, update, or request deletion of your personal data stored in our systems. To exercise these rights or ask questions
              about this policy, contact us at <a href="mailto:aurexissolution@gmail.com" className="text-cyan-400 underline">aurexissolution@gmail.com</a>.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
