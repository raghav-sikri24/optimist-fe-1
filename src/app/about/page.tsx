"use client";

import { AboutHeroSection, BreathworkSection, MissionSection, ProofOfWorkSection, TimelineSection, CoreTeamSection, FutureSection, CTASection } from "@/components/about";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHeroSection />
      <BreathworkSection />
      <MissionSection />
      <ProofOfWorkSection />
      <TimelineSection />
      <CoreTeamSection />
      <FutureSection />
      <CTASection />
    </main>
  );
}
