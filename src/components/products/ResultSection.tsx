"use client";

import { memo, useRef, useLayoutEffect, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  SnowflakeIcon,
  PiggyBankIcon,
  PersonWalkIcon,
} from "@/components/icons/ProductIcons";

// =============================================================================
// Types
// =============================================================================

interface ResultFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

// =============================================================================
// Constants
// =============================================================================

const RESULT_FEATURES: ResultFeature[] = [
  {
    icon: <SnowflakeIcon className="w-6 h-6 text-[#3478F6]" />,
    title: "Consistent cooling",
    description: "No peaks. No drops.",
  },
  {
    icon: <PiggyBankIcon className="w-6 h-6 text-[#3478F6]" />,
    title: "Lower running cost",
    description: "Efficiency that holds.",
  },
  {
    icon: <PersonWalkIcon className="w-6 h-6 text-[#3478F6]" />,
    title: "Less to manage",
    description: "It just works.",
  },
];

// =============================================================================
// Feature Card Component
// =============================================================================

interface FeatureCardProps {
  feature: ResultFeature;
}

const FeatureCard = memo(function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-black/[0.04] flex flex-col gap-2 md:gap-3 items-center p-4 md:p-6 rounded-xl w-full md:w-[436px] flex-shrink-0">
      {/* Icon Container */}
      <div className="bg-[rgba(52,120,246,0.12)] flex items-center justify-center rounded-full w-11 h-11 md:w-12 md:h-12">
        {feature.icon}
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col gap-1 md:gap-2 items-center text-center">
        <h3 className="font-display text-base md:text-2xl font-semibold text-black">
          {feature.title}
        </h3>
        <p className="text-sm md:text-base text-[#6c6a6a] font-light">
          {feature.description}
        </p>
      </div>
    </div>
  );
});

// =============================================================================
// Main Component
// =============================================================================

export const ResultSection = memo(function ResultSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Set initial states to prevent flash
  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".result-card");
      gsap.set(cards, { opacity: 0, y: 40 });
    }
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 25%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Title animation
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        },
        0
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll(".result-card");
      if (cards) {
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
          },
          0.2
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section 
      ref={sectionRef}
      className="w-full py-12 md:py-16 lg:py-20 bg-white"
      aria-labelledby="result-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          id="result-heading"
          className="font-display text-[32px] md:text-[40px] font-semibold text-black text-center mb-7 md:mb-10 will-change-[transform,opacity]"
        >
          The Result.
        </h2>
        
        {/* Feature Cards Container */}
        {/* Mobile: Vertical stack, Desktop: Horizontal row */}
        <div ref={cardsRef} className="flex flex-col md:flex-row gap-4 md:gap-[26px] items-center justify-center">
          {RESULT_FEATURES.map((feature, index) => (
            <div key={index} className="result-card will-change-[transform,opacity]">
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
