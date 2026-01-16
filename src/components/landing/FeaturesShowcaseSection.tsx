"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const features = [
  {
    id: 1,
    badge: "First in Class",
    badgeIcon: "/image 24225.png",
    headline: "In-Built Gas Indicator.",
    description: "Stop paying for refills you don't need.",
    image: "/image 1.png",
  },
  {
    id: 2,
    badge: "5-Year Warranty",
    badgeIcon: "/41d29b9eba9f0cca3fb251cb6ffabdda00b8a903.png",
    headline: "5 Years",
    description: "Because quality shouldn't need an asterisk.",
    image: "/image 2.png",
  },
];

// Arrow component pointing right
function ArrowLine({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden lg:flex items-center ${className}`}>
      <div className="w-24 xl:w-32 h-[1px] bg-[#C4C4C4]" />
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-[#C4C4C4]" />
    </div>
  );
}

export function FeaturesShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate first feature
      gsap.fromTo(
        feature1Ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature1Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Animate arrow 1
      gsap.fromTo(
        arrow1Ref.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature1Ref.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Animate second feature
      gsap.fromTo(
        feature2Ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature2Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Animate arrow 2
      gsap.fromTo(
        arrow2Ref.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature2Ref.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #F8F8FA 0%, #FFFFFF 50%, #F8F8FA 100%)",
      }}
    >
      {/* Decorative palm leaf shadow - top left */}
      <div className="absolute top-0 left-0 w-[400px] md:w-[600px] lg:w-[800px] opacity-20 pointer-events-none">
        <Image
          src="/Leaf Swaying.gif"
          alt=""
          width={800}
          height={600}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Feature 1 - In-Built Gas Indicator */}
      <div
        ref={feature1Ref}
        className="relative mb-16 md:mb-24 lg:mb-32"
      >
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left - Content with padding */}
          <div className="w-full lg:w-[45%] px-4 md:px-6 lg:pl-8 xl:pl-16 2xl:pl-24 lg:pr-0 order-2 lg:order-1">
            <div className="max-w-[500px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF9E6] rounded-full mb-6">
                <div className="w-5 h-5 relative">
                  <Image
                    src={features[0].badgeIcon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-[#8B7355]">
                  {features[0].badge}
                </span>
              </div>

              {/* Headline with arrow */}
              <div className="flex items-center gap-4">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#074FD5] leading-tight">
                  {features[0].headline}
                </h2>
                <div ref={arrow1Ref} className="origin-left">
                  <ArrowLine />
                </div>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-[#6B7280] font-medium mt-4">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* Right - AC Image extending to edge */}
          <div className="w-full lg:w-[55%] order-1 lg:order-2">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full">
              <Image
                src={features[0].image}
                alt="Optimist AC with In-Built Gas Indicator"
                fill
                className="object-contain object-right"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2 - 5 Years Warranty */}
      <div
        ref={feature2Ref}
        className="relative"
      >
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left - Content with padding */}
          <div className="w-full lg:w-[45%] px-4 md:px-6 lg:pl-8 xl:pl-16 2xl:pl-24 lg:pr-0 order-2 lg:order-1">
            <div className="max-w-[500px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF5F5] rounded-full mb-6">
                <div className="w-6 h-6 relative">
                  <Image
                    src={features[1].badgeIcon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-[#8B5555]">
                  {features[1].badge}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#074FD5] leading-tight mb-4">
                {features[1].headline}
              </h2>

              {/* Description with arrow */}
              <div className="flex items-center gap-4">
                <p className="text-base md:text-lg lg:text-xl text-[#6B7280] font-medium">
                  {features[1].description}
                </p>
                <div ref={arrow2Ref} className="origin-left flex-shrink-0">
                  <ArrowLine />
                </div>
              </div>
            </div>
          </div>

          {/* Right - AC Image extending to edge */}
          <div className="w-full lg:w-[55%] order-1 lg:order-2">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full">
              <Image
                src={features[1].image}
                alt="Optimist AC with 5-Year Warranty"
                fill
                className="object-contain object-right"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
