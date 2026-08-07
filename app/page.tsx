import Hero from "@/components/Hero";
import TopCertificates from "@/components/TopCertificates";
import HomeSections from "@/components/HomeSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Hero />
      <TopCertificates />
      <HomeSections />
    </main>
  );
}
