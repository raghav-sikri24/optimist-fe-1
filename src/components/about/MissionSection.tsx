"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ASSETS } from "@/lib/assets";

// =============================================================================
// Mission Section - "Our Mission" with image and efficiency stats
// =============================================================================

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Text animation
      tl.from(
        textRef.current,
        {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        tl.from(
          cards,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          0.2,
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Main Container - Responsive flexbox */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
          {/* Left - Text Content */}
          <div
            ref={textRef}
            className="flex flex-col gap-8 w-full lg:w-[575px] shrink-0 will-change-[transform,opacity]"
          >
            {/* Label */}
            <p className="font-normal text-[16px] lg:text-[24px] text-[#3478F6] leading-normal">
              Our Mission
            </p>

            {/* Title and Description */}
            <div className="flex flex-col gap-6 text-black">
              <h2 className="font-display font-semibold text-[24px] lg:text-[48px] leading-normal lg:w-[545px]">
                A Breakthrough in Smart, Reliable Cooling.
              </h2>
              <p className="font-light text-[16px] lg:text-[24px] leading-[1.4]">
                You probably already know about the effects animal agriculture
                has had on the environment for decades. Back in 2011, those
                effects were the urgent call to action that led us to start
                Impossible Foods.
              </p>
            </div>
          </div>

          {/* Right - Cards */}
          <div
            ref={cardsRef}
            className="flex flex-col lg:flex-row gap-6 items-center w-full lg:w-auto"
          >
            {/* Image Card */}
            <div className="relative w-full lg:w-[396px] h-[356px] lg:h-[480px] rounded-[24px] overflow-hidden will-change-[transform,opacity]">
              <Image
                src={ASSETS.missionImage}
                alt="Woman enjoying a peaceful moment with a warm drink"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 396px"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(268deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 98%)",
                }}
              />
            </div>

            {/* Stats Card */}
            <div className="bg-[#AEFFD8] w-full lg:w-[301px] h-[265px] lg:h-[480px] rounded-[20px] overflow-hidden p-6 will-change-[transform,opacity]">
              <div className="flex flex-col justify-between h-full text-black">
                <p className="font-medium text-[36px] leading-none">
                  efficiency
                </p>
                <p className="font-bold text-[96px] lg:text-[80px] leading-none">
                  99.9%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
