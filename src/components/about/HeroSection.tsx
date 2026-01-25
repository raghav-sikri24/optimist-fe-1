"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ASSETS } from "@/lib/assets";

// =============================================================================
// About Hero Section - "Brand You Can Trust"
// =============================================================================

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );

      // Card animation
      tl.from(
        cardRef.current,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
        },
        0.2,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-16 md:pt-16 lg:pt-16 pb-12 md:pb-16 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Title - Brand You Can Trust */}
        <h1
          ref={titleRef}
          className="font-display text-[32px] md:text-[48px] lg:text-[64px] font-bold text-center mb-6 md:mb-8 lg:mb-10 will-change-[transform,opacity]"
        >
          <span className="text-black">Brand You Can </span>
          <span className="text-[#3478F6]">Trust.</span>
        </h1>

        {/* Hero Card with Background Image */}
        <div
          ref={cardRef}
          className="relative w-full max-w-[1344px] mx-auto rounded-[32px] overflow-hidden will-change-[transform,opacity]"
        >
          {/* Desktop Layout - 556px height */}
          <div className="hidden md:block relative w-full h-[450px] lg:h-[556px]">
            <Image
              src={ASSETS.aboutHero}
              alt="Woman enjoying fresh air with arms raised"
              fill
              className="object-cover object-[center_bottom]"
              sizes="(max-width: 768px) 100vw, 1344px"
              priority
            />
            {/* Text overlay */}
            <div className="absolute left-[48px] bottom-[48px] lg:bottom-[64px] w-[638px]">
              <p className="font-light text-[20px] lg:text-[24px] leading-[1.4] text-white">
                You probably already know about the effects animal agriculture
                has had on the environment for decades. Back in 2011, those
                effects were the urgent call to action that led us to start
                Impossible Foods.
              </p>
            </div>
          </div>

          {/* Mobile Layout - 402px height */}
          <div className="md:hidden relative w-full h-[402px]">
            <Image
              src={ASSETS.aboutHero}
              alt="Woman enjoying fresh air with arms raised"
              fill
              className="object-cover object-[70%_bottom]"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            {/* Text overlay */}
            <div className="absolute left-[16px] right-[16px] bottom-[24px]">
              <p className="font-light text-[16px] leading-[1.5] text-white">
                You probably already know about the effects animal agriculture
                has had on the environment for decades. Back in 2011, those
                effects were the urgent call to action that led us to start
                Impossible Foods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;
