import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesMasthead } from "@/components/sections/services/ServicesMasthead";
import { ServicesRoster } from "@/components/sections/services/ServicesRoster";
import { ServicesColophon } from "@/components/sections/services/ServicesColophon";

export default function ServicesHubPage() {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        backgroundColor: "#02030A",
        backgroundImage:
          "radial-gradient(ellipse 1100px 500px at 50% -5%, rgba(0,240,255,0.10), transparent 60%), radial-gradient(ellipse 900px 600px at 50% 105%, rgba(139,92,246,0.08), transparent 65%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* fine grain — premium photographic feel */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <main className="flex-1 relative z-[2] w-full max-w-[1760px] mx-auto px-[6vw] md:px-[4vw]">
        <ServicesMasthead />
        <ServicesRoster />
        <ServicesColophon />
      </main>

      <Footer />
    </div>
  );
}
