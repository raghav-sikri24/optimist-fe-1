"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// =============================================================================
// Breathwork Section - "The art and science of breathwork"
// Kore.ai-inspired ripple effect with concentric circles
// =============================================================================

export function BreathworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Content fade-in animation
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

  // Ripple configuration - each ring has its own timing and style
  const rippleConfig = [
    { size: 100, delay: 0, duration: 4, opacity: 0.4, strokeWidth: 2 },
    { size: 200, delay: 0.5, duration: 4, opacity: 0.35, strokeWidth: 1.5 },
    { size: 320, delay: 1, duration: 4, opacity: 0.3, strokeWidth: 1.5 },
    { size: 460, delay: 1.5, duration: 4, opacity: 0.25, strokeWidth: 1 },
    { size: 620, delay: 2, duration: 4, opacity: 0.2, strokeWidth: 1 },
    { size: 800, delay: 2.5, duration: 4, opacity: 0.15, strokeWidth: 0.75 },
    { size: 1000, delay: 3, duration: 4, opacity: 0.1, strokeWidth: 0.5 },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-32 overflow-hidden relative min-h-[400px] md:min-h-[500px]"
    >
      {/* Ripple Effect Container */}
      <div
        ref={ripplesRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Ripple circles */}
        {rippleConfig.map((ripple, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              animation: `ripplePulse ${ripple.duration}s ease-out infinite`,
              animationDelay: `${ripple.delay}s`,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${ripple.size} ${ripple.size}`}
              className="absolute inset-0"
            >
              <circle
                cx={ripple.size / 2}
                cy={ripple.size / 2}
                r={ripple.size / 2 - ripple.strokeWidth}
                fill="none"
                stroke="#3478F6"
                strokeWidth={ripple.strokeWidth}
                opacity={ripple.opacity}
              />
            </svg>
          </div>
        ))}

        {/* Additional expanding ripples for continuous effect */}
        {[0, 1, 2].map((waveIndex) => (
          <div
            key={`wave-${waveIndex}`}
            className="absolute rounded-full border border-[#3478F6]"
            style={{
              width: "80px",
              height: "80px",
              animation: `rippleExpand 6s ease-out infinite`,
              animationDelay: `${waveIndex * 2}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes ripplePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.85;
          }
        }

        @keyframes rippleExpand {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(15);
            opacity: 0;
          }
        }
      `}</style>

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
