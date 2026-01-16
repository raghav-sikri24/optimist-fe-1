"use client";

import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CTASection } from "@/components/landing/CTASection";
import { EngineeredSection } from "@/components/landing/EngineeredSection";
import { FeaturesShowcaseSection } from "@/components/landing/FeaturesShowcaseSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { IndiaFirstSection } from "@/components/landing/IndiaFirstSection";
import { MadeSimpleSection } from "@/components/landing/MadeSimpleSection";
import { OptimistAppSection } from "@/components/landing/OptimistAppSection";
import { ProductPickerSection } from "@/components/landing/ProductPickerSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturesShowcaseSection />
      <EngineeredSection />
      <MadeSimpleSection />
      <OptimistAppSection />
      <TestimonialsSection />
      <ProductPickerSection />
      <CTASection />
      <IndiaFirstSection />
    </>
  );
}
