"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// =============================================================================
// Breathwork Section - "The art and science of breathwork"
// =============================================================================

export function BreathworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

      tl.from(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
        },
        0
      );
    },
    { scope: sectionRef }
  );

  // Arc configurations - outer arcs are more filled, inner are outlines
  const arcConfig = [
    { offset: 0, opacity: 0.15, strokeWidth: 8 },      // Outermost - thicker/filled look
    { offset: 25, opacity: 0.10, strokeWidth: 5 },
    { offset: 48, opacity: 0.25, strokeWidth: 1.5 },   // Outline
    { offset: 68, opacity: 0.18, strokeWidth: 1 },     // Innermost - thin outline
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-32 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop Arcs - positioned at viewport edges */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side arcs - curves facing inward toward center */}
        {arcConfig.map((arc, i) => (
          <div
            key={`left-${i}`}
            className="absolute transition-all duration-700 ease-out"
            style={{
              width: "1000px",
              height: "1200px",
              top: "50%",
              left: `${-500 + arc.offset}px`,
              transform: `translateY(-50%) ${isHovered ? `translateX(${(4 - i) * 5}px)` : ""}`,
              transitionDelay: `${i * 40}ms`,
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 1000 1200">
              <ellipse
                cx="980"
                cy="600"
                rx="480"
                ry="580"
                fill="none"
                stroke="#3478F6"
                strokeWidth={arc.strokeWidth}
                opacity={arc.opacity}
              />
            </svg>
          </div>
        ))}

        {/* Right side arcs - curves facing inward toward center */}
        {arcConfig.map((arc, i) => (
          <div
            key={`right-${i}`}
            className="absolute transition-all duration-700 ease-out"
            style={{
              width: "1000px",
              height: "1200px",
              top: "50%",
              right: `${-500 + arc.offset}px`,
              transform: `translateY(-50%) ${isHovered ? `translateX(-${(4 - i) * 5}px)` : ""}`,
              transitionDelay: `${i * 40}ms`,
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 1000 1200">
              <ellipse
                cx="20"
                cy="600"
                rx="480"
                ry="580"
                fill="none"
                stroke="#3478F6"
                strokeWidth={arc.strokeWidth}
                opacity={arc.opacity}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Mobile Arcs */}
      <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side arcs */}
        {arcConfig.map((arc, i) => (
          <div
            key={`left-mobile-${i}`}
            className="absolute"
            style={{
              width: "400px",
              height: "500px",
              top: "50%",
              left: `${-200 + arc.offset * 0.5}px`,
              transform: "translateY(-50%)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 400 500">
              <ellipse
                cx="390"
                cy="250"
                rx="190"
                ry="240"
                fill="none"
                stroke="#3478F6"
                strokeWidth={arc.strokeWidth * 0.6}
                opacity={arc.opacity}
              />
            </svg>
          </div>
        ))}

        {/* Right side arcs */}
        {arcConfig.map((arc, i) => (
          <div
            key={`right-mobile-${i}`}
            className="absolute"
            style={{
              width: "400px",
              height: "500px",
              top: "50%",
              right: `${-200 + arc.offset * 0.5}px`,
              transform: "translateY(-50%)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 400 500">
              <ellipse
                cx="10"
                cy="250"
                rx="190"
                ry="240"
                fill="none"
                stroke="#3478F6"
                strokeWidth={arc.strokeWidth * 0.6}
                opacity={arc.opacity}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1440px] mx-auto px-4 will-change-[transform,opacity]"
      >
        {/* Desktop text */}
        <div className="hidden md:flex items-center justify-center h-[360px] lg:h-[400px]">
          <p className="font-light text-[32px] lg:text-[40px] text-center leading-[1.4]">
            <span className="text-black">The art and science</span>
            <br />
            <span className="text-black">of </span>
            <span className="text-[#3478F6]">breathwork</span>
          </p>
        </div>

        {/* Mobile text */}
        <div className="md:hidden flex items-center justify-center h-[240px]">
          <p className="font-light text-[24px] text-center leading-[1.4] px-4">
            <span className="text-black">The art and science of</span>
            <br />
            <span className="text-[#3478F6]">breathwork</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default BreathworkSection;
