import Hero from "@/components/Hero";
import TopCertificates from "@/components/TopCertificates";
import CompareSection from "@/components/CompareSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Hero />
      <TopCertificates />
      <CompareSection />
    </main>
  );
}