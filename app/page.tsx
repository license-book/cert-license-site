import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TopCertificates from "@/components/TopCertificates";
import CompareSection from "@/components/CompareSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />
      <Hero />
      <TopCertificates />
      <CompareSection />
    </main>
  );
}