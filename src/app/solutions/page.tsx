import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionsPage } from "@/components/solutions/SolutionsPage";

export const metadata: Metadata = {
  title: "Aurexis Solutions — Business Systems & Technology Partner",
  description:
    "Business Systems Assessment™, Focused Improvement Project, Business Control System™ and Managed Operations™ — Aurexis engagements designed around your operational problem.",
};

export default function SolutionsRoutePage() {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        backgroundColor: "#02040A",
        backgroundImage:
          "radial-gradient(ellipse 1000px 450px at 50% -8%, rgba(0,240,255,0.08), transparent 60%), radial-gradient(ellipse 800px 500px at 50% 110%, rgba(139,92,246,0.06), transparent 65%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <SolutionsPage />
      <Footer />
    </div>
  );
}
