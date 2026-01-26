"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ASSETS } from "@/lib/assets";

// =============================================================================
// Mission Section - "To redefine what comfort means for India."
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
            className="flex flex-col gap-8 w-full lg:w-[620px] shrink-0 will-change-[transform,opacity]"
          >
            {/* Label */}
            <p className="font-normal text-[16px] lg:text-[24px] text-[#3478F6] leading-normal">
              Our Mission
            </p>

            {/* Title and Description */}
            <div className="flex flex-col gap-6 text-black">
              <h2 className="font-display font-semibold text-[24px] lg:text-[48px] leading-[1.2] lg:leading-normal">
                To redefine what comfort means for India.
              </h2>
              <p className="font-light text-[16px] lg:text-[20px] leading-[1.6]">
                Reliable performance at extreme temperatures. Honest efficiency over years of use. Transparent operations you can verify. We&apos;re building air conditioning that respects both the climate we face and the intelligence of those who use it. No compromises. No shortcuts. Just engineering that works.
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
                alt="Comfort redefined for India"
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

            {/* ISEER Rating Card */}
            <div className="bg-gradient-to-br from-[#3478F6] to-[#1E4690] w-full lg:w-[301px] h-[265px] lg:h-[480px] rounded-[20px] overflow-hidden p-6 will-change-[transform,opacity]">
              <div className="flex flex-col justify-between h-full text-white">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-[18px] lg:text-[20px] leading-none opacity-90">
                    India&apos;s Highest
                  </p>
                  <p className="font-bold text-[32px] lg:text-[40px] leading-none">
                    ISEER Rating
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Star rating visual */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-8 h-8 lg:w-10 lg:h-10 text-[#FFD700]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-bold text-[72px] lg:text-[80px] leading-none">
                    5.35
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
