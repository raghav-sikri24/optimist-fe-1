"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// =============================================================================
// Proof of Work Section - Lab testing stats with world map and rating
// =============================================================================

// World Map SVG Component - Dotted map visualization
function WorldMapDots() {
  return (
    <svg
      viewBox="0 0 396 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* North America dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 */}
        <circle cx="60" cy="40" r="2.5" />
        <circle cx="70" cy="40" r="2.5" />
        <circle cx="80" cy="40" r="2.5" />
        <circle cx="90" cy="40" r="2.5" />
        <circle cx="100" cy="40" r="2.5" />
        {/* Row 2 */}
        <circle cx="55" cy="50" r="2.5" />
        <circle cx="65" cy="50" r="2.5" />
        <circle cx="75" cy="50" r="2.5" />
        <circle cx="85" cy="50" r="2.5" />
        <circle cx="95" cy="50" r="2.5" />
        <circle cx="105" cy="50" r="2.5" />
        {/* Row 3 */}
        <circle cx="50" cy="60" r="2.5" />
        <circle cx="60" cy="60" r="2.5" />
        <circle cx="70" cy="60" r="2.5" />
        <circle cx="80" cy="60" r="2.5" />
        <circle cx="90" cy="60" r="2.5" />
        <circle cx="100" cy="60" r="2.5" />
        <circle cx="110" cy="60" r="2.5" />
        {/* Row 4 */}
        <circle cx="45" cy="70" r="2.5" />
        <circle cx="55" cy="70" r="2.5" />
        <circle cx="65" cy="70" r="2.5" />
        <circle cx="75" cy="70" r="2.5" />
        <circle cx="85" cy="70" r="2.5" />
        <circle cx="95" cy="70" r="2.5" />
        <circle cx="105" cy="70" r="2.5" />
        <circle cx="115" cy="70" r="2.5" />
        {/* Row 5 */}
        <circle cx="50" cy="80" r="2.5" />
        <circle cx="60" cy="80" r="2.5" />
        <circle cx="70" cy="80" r="2.5" />
        <circle cx="80" cy="80" r="2.5" />
        <circle cx="90" cy="80" r="2.5" />
        <circle cx="100" cy="80" r="2.5" />
        <circle cx="110" cy="80" r="2.5" />
        {/* Row 6 */}
        <circle cx="55" cy="90" r="2.5" />
        <circle cx="65" cy="90" r="2.5" />
        <circle cx="75" cy="90" r="2.5" />
        <circle cx="85" cy="90" r="2.5" />
        <circle cx="95" cy="90" r="2.5" />
        <circle cx="105" cy="90" r="2.5" />
        {/* Row 7 */}
        <circle cx="60" cy="100" r="2.5" />
        <circle cx="70" cy="100" r="2.5" />
        <circle cx="80" cy="100" r="2.5" />
        <circle cx="90" cy="100" r="2.5" />
        <circle cx="100" cy="100" r="2.5" />
        {/* Row 8 - Mexico */}
        <circle cx="55" cy="110" r="2.5" />
        <circle cx="65" cy="110" r="2.5" />
        <circle cx="75" cy="110" r="2.5" />
        <circle cx="85" cy="110" r="2.5" />
        {/* Row 9 */}
        <circle cx="60" cy="120" r="2.5" />
        <circle cx="70" cy="120" r="2.5" />
        <circle cx="80" cy="120" r="2.5" />
      </g>

      {/* South America dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 */}
        <circle cx="100" cy="140" r="2.5" />
        <circle cx="110" cy="140" r="2.5" />
        <circle cx="120" cy="140" r="2.5" />
        {/* Row 2 */}
        <circle cx="95" cy="150" r="2.5" />
        <circle cx="105" cy="150" r="2.5" />
        <circle cx="115" cy="150" r="2.5" />
        <circle cx="125" cy="150" r="2.5" />
        {/* Row 3 */}
        <circle cx="100" cy="160" r="2.5" />
        <circle cx="110" cy="160" r="2.5" />
        <circle cx="120" cy="160" r="2.5" />
        <circle cx="130" cy="160" r="2.5" />
        {/* Row 4 */}
        <circle cx="105" cy="170" r="2.5" />
        <circle cx="115" cy="170" r="2.5" />
        <circle cx="125" cy="170" r="2.5" />
        <circle cx="135" cy="170" r="2.5" />
        {/* Row 5 */}
        <circle cx="100" cy="180" r="2.5" />
        <circle cx="110" cy="180" r="2.5" />
        <circle cx="120" cy="180" r="2.5" />
        <circle cx="130" cy="180" r="2.5" />
        {/* Row 6 */}
        <circle cx="105" cy="190" r="2.5" />
        <circle cx="115" cy="190" r="2.5" />
        <circle cx="125" cy="190" r="2.5" />
        {/* Row 7 */}
        <circle cx="110" cy="200" r="2.5" />
        <circle cx="120" cy="200" r="2.5" />
        {/* Row 8 */}
        <circle cx="105" cy="210" r="2.5" />
        <circle cx="115" cy="210" r="2.5" />
        {/* Row 9 */}
        <circle cx="100" cy="220" r="2.5" />
        <circle cx="110" cy="220" r="2.5" />
        {/* Row 10 */}
        <circle cx="95" cy="230" r="2.5" />
        <circle cx="105" cy="230" r="2.5" />
      </g>

      {/* Europe dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 */}
        <circle cx="200" cy="45" r="2.5" />
        <circle cx="210" cy="45" r="2.5" />
        <circle cx="220" cy="45" r="2.5" />
        <circle cx="230" cy="45" r="2.5" />
        {/* Row 2 */}
        <circle cx="195" cy="55" r="2.5" />
        <circle cx="205" cy="55" r="2.5" />
        <circle cx="215" cy="55" r="2.5" />
        <circle cx="225" cy="55" r="2.5" />
        <circle cx="235" cy="55" r="2.5" />
        {/* Row 3 */}
        <circle cx="190" cy="65" r="2.5" />
        <circle cx="200" cy="65" r="2.5" />
        <circle cx="210" cy="65" r="2.5" />
        <circle cx="220" cy="65" r="2.5" />
        <circle cx="230" cy="65" r="2.5" />
        <circle cx="240" cy="65" r="2.5" />
        {/* Row 4 */}
        <circle cx="195" cy="75" r="2.5" />
        <circle cx="205" cy="75" r="2.5" />
        <circle cx="215" cy="75" r="2.5" />
        <circle cx="225" cy="75" r="2.5" />
        <circle cx="235" cy="75" r="2.5" />
        {/* Row 5 */}
        <circle cx="200" cy="85" r="2.5" />
        <circle cx="210" cy="85" r="2.5" />
        <circle cx="220" cy="85" r="2.5" />
        <circle cx="230" cy="85" r="2.5" />
      </g>

      {/* Africa dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 */}
        <circle cx="195" cy="100" r="2.5" />
        <circle cx="205" cy="100" r="2.5" />
        <circle cx="215" cy="100" r="2.5" />
        <circle cx="225" cy="100" r="2.5" />
        <circle cx="235" cy="100" r="2.5" />
        {/* Row 2 */}
        <circle cx="190" cy="110" r="2.5" />
        <circle cx="200" cy="110" r="2.5" />
        <circle cx="210" cy="110" r="2.5" />
        <circle cx="220" cy="110" r="2.5" />
        <circle cx="230" cy="110" r="2.5" />
        <circle cx="240" cy="110" r="2.5" />
        {/* Row 3 */}
        <circle cx="195" cy="120" r="2.5" />
        <circle cx="205" cy="120" r="2.5" />
        <circle cx="215" cy="120" r="2.5" />
        <circle cx="225" cy="120" r="2.5" />
        <circle cx="235" cy="120" r="2.5" />
        <circle cx="245" cy="120" r="2.5" />
        {/* Row 4 */}
        <circle cx="200" cy="130" r="2.5" />
        <circle cx="210" cy="130" r="2.5" />
        <circle cx="220" cy="130" r="2.5" />
        <circle cx="230" cy="130" r="2.5" />
        <circle cx="240" cy="130" r="2.5" />
        {/* Row 5 */}
        <circle cx="205" cy="140" r="2.5" />
        <circle cx="215" cy="140" r="2.5" />
        <circle cx="225" cy="140" r="2.5" />
        <circle cx="235" cy="140" r="2.5" />
        {/* Row 6 */}
        <circle cx="210" cy="150" r="2.5" />
        <circle cx="220" cy="150" r="2.5" />
        <circle cx="230" cy="150" r="2.5" />
        {/* Row 7 */}
        <circle cx="215" cy="160" r="2.5" />
        <circle cx="225" cy="160" r="2.5" />
        {/* Row 8 */}
        <circle cx="220" cy="170" r="2.5" />
      </g>

      {/* Asia dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 - Russia */}
        <circle cx="250" cy="40" r="2.5" />
        <circle cx="260" cy="40" r="2.5" />
        <circle cx="270" cy="40" r="2.5" />
        <circle cx="280" cy="40" r="2.5" />
        <circle cx="290" cy="40" r="2.5" />
        <circle cx="300" cy="40" r="2.5" />
        <circle cx="310" cy="40" r="2.5" />
        <circle cx="320" cy="40" r="2.5" />
        <circle cx="330" cy="40" r="2.5" />
        <circle cx="340" cy="40" r="2.5" />
        <circle cx="350" cy="40" r="2.5" />
        {/* Row 2 */}
        <circle cx="245" cy="50" r="2.5" />
        <circle cx="255" cy="50" r="2.5" />
        <circle cx="265" cy="50" r="2.5" />
        <circle cx="275" cy="50" r="2.5" />
        <circle cx="285" cy="50" r="2.5" />
        <circle cx="295" cy="50" r="2.5" />
        <circle cx="305" cy="50" r="2.5" />
        <circle cx="315" cy="50" r="2.5" />
        <circle cx="325" cy="50" r="2.5" />
        <circle cx="335" cy="50" r="2.5" />
        <circle cx="345" cy="50" r="2.5" />
        <circle cx="355" cy="50" r="2.5" />
        <circle cx="365" cy="50" r="2.5" />
        {/* Row 3 */}
        <circle cx="250" cy="60" r="2.5" />
        <circle cx="260" cy="60" r="2.5" />
        <circle cx="270" cy="60" r="2.5" />
        <circle cx="280" cy="60" r="2.5" />
        <circle cx="290" cy="60" r="2.5" />
        <circle cx="300" cy="60" r="2.5" />
        <circle cx="310" cy="60" r="2.5" />
        <circle cx="320" cy="60" r="2.5" />
        <circle cx="330" cy="60" r="2.5" />
        <circle cx="340" cy="60" r="2.5" />
        <circle cx="350" cy="60" r="2.5" />
        <circle cx="360" cy="60" r="2.5" />
        <circle cx="370" cy="60" r="2.5" />
        {/* Row 4 - China, Middle East */}
        <circle cx="245" cy="70" r="2.5" />
        <circle cx="255" cy="70" r="2.5" />
        <circle cx="265" cy="70" r="2.5" />
        <circle cx="275" cy="70" r="2.5" />
        <circle cx="285" cy="70" r="2.5" />
        <circle cx="295" cy="70" r="2.5" />
        <circle cx="305" cy="70" r="2.5" />
        <circle cx="315" cy="70" r="2.5" />
        <circle cx="325" cy="70" r="2.5" />
        <circle cx="335" cy="70" r="2.5" />
        <circle cx="345" cy="70" r="2.5" />
        <circle cx="355" cy="70" r="2.5" />
        <circle cx="365" cy="70" r="2.5" />
        <circle cx="375" cy="70" r="2.5" />
        {/* Row 5 */}
        <circle cx="250" cy="80" r="2.5" />
        <circle cx="260" cy="80" r="2.5" />
        <circle cx="270" cy="80" r="2.5" />
        <circle cx="280" cy="80" r="2.5" />
        <circle cx="290" cy="80" r="2.5" />
        <circle cx="300" cy="80" r="2.5" />
        <circle cx="310" cy="80" r="2.5" />
        <circle cx="320" cy="80" r="2.5" />
        <circle cx="330" cy="80" r="2.5" />
        <circle cx="340" cy="80" r="2.5" />
        <circle cx="350" cy="80" r="2.5" />
        <circle cx="360" cy="80" r="2.5" />
        <circle cx="370" cy="80" r="2.5" />
        {/* Row 6 - India */}
        <circle cx="255" cy="90" r="2.5" />
        <circle cx="265" cy="90" r="2.5" />
        <circle cx="275" cy="90" r="2.5" />
        <circle cx="285" cy="90" r="2.5" />
        <circle cx="295" cy="90" r="2.5" />
        <circle cx="305" cy="90" r="2.5" />
        <circle cx="315" cy="90" r="2.5" />
        <circle cx="325" cy="90" r="2.5" />
        <circle cx="335" cy="90" r="2.5" />
        <circle cx="345" cy="90" r="2.5" />
        <circle cx="355" cy="90" r="2.5" />
        <circle cx="365" cy="90" r="2.5" />
        {/* Row 7 */}
        <circle cx="260" cy="100" r="2.5" />
        <circle cx="270" cy="100" r="2.5" />
        <circle cx="280" cy="100" r="2.5" />
        <circle cx="290" cy="100" r="2.5" />
        <circle cx="300" cy="100" r="2.5" />
        <circle cx="310" cy="100" r="2.5" />
        <circle cx="320" cy="100" r="2.5" />
        <circle cx="330" cy="100" r="2.5" />
        <circle cx="340" cy="100" r="2.5" />
        <circle cx="350" cy="100" r="2.5" />
        <circle cx="360" cy="100" r="2.5" />
        {/* Row 8 - Southeast Asia */}
        <circle cx="275" cy="110" r="2.5" />
        <circle cx="285" cy="110" r="2.5" />
        <circle cx="295" cy="110" r="2.5" />
        <circle cx="305" cy="110" r="2.5" />
        <circle cx="315" cy="110" r="2.5" />
        <circle cx="325" cy="110" r="2.5" />
        <circle cx="335" cy="110" r="2.5" />
        <circle cx="345" cy="110" r="2.5" />
        <circle cx="355" cy="110" r="2.5" />
        {/* Row 9 */}
        <circle cx="290" cy="120" r="2.5" />
        <circle cx="300" cy="120" r="2.5" />
        <circle cx="310" cy="120" r="2.5" />
        <circle cx="320" cy="120" r="2.5" />
        <circle cx="330" cy="120" r="2.5" />
        <circle cx="340" cy="120" r="2.5" />
        <circle cx="350" cy="120" r="2.5" />
        {/* Row 10 */}
        <circle cx="305" cy="130" r="2.5" />
        <circle cx="315" cy="130" r="2.5" />
        <circle cx="325" cy="130" r="2.5" />
        <circle cx="335" cy="130" r="2.5" />
        <circle cx="345" cy="130" r="2.5" />
      </g>

      {/* Australia dots */}
      <g fill="#3478F6" opacity="0.6">
        {/* Row 1 */}
        <circle cx="320" cy="170" r="2.5" />
        <circle cx="330" cy="170" r="2.5" />
        <circle cx="340" cy="170" r="2.5" />
        <circle cx="350" cy="170" r="2.5" />
        <circle cx="360" cy="170" r="2.5" />
        {/* Row 2 */}
        <circle cx="315" cy="180" r="2.5" />
        <circle cx="325" cy="180" r="2.5" />
        <circle cx="335" cy="180" r="2.5" />
        <circle cx="345" cy="180" r="2.5" />
        <circle cx="355" cy="180" r="2.5" />
        <circle cx="365" cy="180" r="2.5" />
        {/* Row 3 */}
        <circle cx="320" cy="190" r="2.5" />
        <circle cx="330" cy="190" r="2.5" />
        <circle cx="340" cy="190" r="2.5" />
        <circle cx="350" cy="190" r="2.5" />
        <circle cx="360" cy="190" r="2.5" />
        <circle cx="370" cy="190" r="2.5" />
        {/* Row 4 */}
        <circle cx="325" cy="200" r="2.5" />
        <circle cx="335" cy="200" r="2.5" />
        <circle cx="345" cy="200" r="2.5" />
        <circle cx="355" cy="200" r="2.5" />
        <circle cx="365" cy="200" r="2.5" />
        {/* Row 5 */}
        <circle cx="330" cy="210" r="2.5" />
        <circle cx="340" cy="210" r="2.5" />
        <circle cx="350" cy="210" r="2.5" />
        <circle cx="360" cy="210" r="2.5" />
        {/* Row 6 */}
        <circle cx="335" cy="220" r="2.5" />
        <circle cx="345" cy="220" r="2.5" />
        <circle cx="355" cy="220" r="2.5" />
      </g>
    </svg>
  );
}

// Bar Chart Component - Rating visualization
function RatingBarChart() {
  const bars = [
    { height: 55, filled: 40 },
    { height: 92, filled: 20 },
    { height: 38, filled: 38 },
    { height: 55, filled: 40 },
    { height: 48, filled: 22 },
    { height: 92, filled: 22 },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Y-axis labels and chart */}
      <div className="flex gap-2">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-[10px] lg:text-[11px] text-black/60 h-[80px] lg:h-[100px] pr-1">
          <span>$1000</span>
          <span>$500</span>
          <span>$200</span>
          <span>$0</span>
        </div>

        {/* Bars */}
        <div className="flex-1 relative">
          {/* Background grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="h-px bg-black/10" />
            <div className="h-px bg-black/10" />
            <div className="h-px bg-black/10" />
            <div className="h-px bg-black/10" />
          </div>

          {/* Bar group */}
          <div className="flex items-end justify-between h-[80px] lg:h-[100px] gap-2 lg:gap-3">
            {bars.map((bar, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col justify-end relative"
                style={{ height: `${bar.height}%` }}
              >
                {/* Background bar (striped) */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-[4px]"
                  style={{
                    height: "100%",
                    background: `repeating-linear-gradient(
                      to bottom,
                      rgba(0,0,0,0.08) 0px,
                      rgba(0,0,0,0.08) 2px,
                      transparent 2px,
                      transparent 5px
                    )`,
                  }}
                />
                {/* Filled portion (gradient) */}
                <div
                  className="relative rounded-t-[4px]"
                  style={{
                    height: `${(bar.filled / bar.height) * 100}%`,
                    background:
                      "linear-gradient(180deg, #3478F6 0%, #1E3A8A 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-[11px] lg:text-[12px] text-black/60 mt-1">
        Current margin: April Spendings
      </p>
    </div>
  );
}

export function ProofOfWorkSection() {
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
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Main Container - Responsive grid */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          {/* Left - Text Content */}
          <div
            ref={textRef}
            className="flex flex-col gap-6 lg:gap-8 w-full lg:w-[545px] shrink-0 will-change-[transform,opacity]"
          >
            {/* Label */}
            <p className="font-normal text-[16px] lg:text-[24px] text-[#3478F6] leading-normal">
              Proof of work
            </p>

            {/* Title and Description */}
            <div className="flex flex-col gap-4 lg:gap-6 text-black">
              <h2 className="font-display font-semibold text-[24px] lg:text-[48px] leading-[1.2] lg:leading-normal lg:w-[545px]">
                Tested across standard labs globally
              </h2>
              <p className="font-light text-[16px] lg:text-[24px] leading-[1.4]">
                You probably already know about the effects animal agriculture
                has had on the environment for decades. Back in 2011, those
                effects were the urgent call to action that led us to start
                Impossible Foods.
              </p>
            </div>
          </div>

          {/* Right - Stats Cards */}
          <div
            ref={cardsRef}
            className="flex flex-col lg:flex-row gap-6 w-full lg:w-auto"
          >
            {/* World Map Card */}
            <div className="relative w-full lg:w-[396px] h-[480px] rounded-[24px] overflow-hidden bg-[#F1F5FE] will-change-[transform,opacity]">
              {/* Header Text */}
              <div className="absolute top-5 lg:top-6 left-5 lg:left-6 right-5 lg:right-6 z-10">
                <p className="text-[20px] lg:text-[24px] text-black font-normal leading-[1.3]">
                  1000+ Lab tests done across
                </p>
                <p className="text-[20px] lg:text-[24px] text-[#3478F6] font-normal leading-[1.3]">
                  20+ locations
                </p>
              </div>

              {/* World Map */}
              <div className="absolute inset-0 top-[80px] flex items-center justify-center px-4">
                <WorldMapDots />
              </div>
            </div>

            {/* Rating Card */}
            <div className="w-full lg:w-[301px] h-[320px] lg:h-[480px] rounded-[20px] overflow-hidden bg-[#E5EDFF] p-5 lg:p-6 will-change-[transform,opacity]">
              <div className="flex flex-col justify-between h-full">
                {/* Rating Header */}
                <div className="flex flex-col">
                  <p className="font-bold text-[64px] lg:text-[80px] text-black leading-none">
                    4.7+
                  </p>
                  <p className="font-normal text-[24px] lg:text-[36px] text-[#3478F6] leading-none mt-2">
                    Rating
                  </p>
                </div>

                {/* Bar Chart */}
                <div className="mt-auto">
                  <RatingBarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProofOfWorkSection;
