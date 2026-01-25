"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ASSETS } from "@/lib/assets";

// =============================================================================
// Core Team Section - Team members carousel with founder highlighted
// =============================================================================

// Team member data
const teamData = [
  {
    id: 1,
    title: "Our Founder",
    role: "Ceo & Director",
    name: "Ashish Gupta",
    description:
      "For years, finance teams have been promised automation, yet left doing the software's job themselves. For years, finance teams have been promised automation, yet left doing the software's job themselves.",
    image: ASSETS.teamFounder,
    bgColor: "#E2ECFF",
    textColor: "white",
    isFounder: true,
    previousCompanies: [
      ASSETS.urbanLadderLogo,
      ASSETS.urbanLadderLogo,
      ASSETS.urbanLadderLogo,
    ],
  },
  {
    id: 2,
    title: "Tech Head",
    role: "CTO",
    name: "Steve Matt",
    description:
      "For years, finance teams have been promised automation, yet left doing the software's job themselves.",
    image: ASSETS.teamMember,
    bgColor: "#D2FFE9",
    textColor: "black",
    isFounder: false,
    previousCompanies: [ASSETS.urbanLadderLogo],
  },
  {
    id: 3,
    title: "Tech Head",
    role: "CTO",
    name: "Steve Matt",
    description:
      "For years, finance teams have been promised automation, yet left doing the software's job themselves.",
    image: ASSETS.teamMember,
    bgColor: "#D2FFE9",
    textColor: "black",
    isFounder: false,
    previousCompanies: [ASSETS.urbanLadderLogo],
  },
  {
    id: 4,
    title: "Tech Head",
    role: "CTO",
    name: "Steve Matt",
    description:
      "For years, finance teams have been promised automation, yet left doing the software's job themselves.",
    image: ASSETS.teamMember,
    bgColor: "#D2FFE9",
    textColor: "black",
    isFounder: false,
    previousCompanies: [ASSETS.urbanLadderLogo],
  },
];

// Arrow Icon Component
function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Team Card Component
function TeamCard({
  title,
  role,
  name,
  description,
  image,
  bgColor,
  textColor,
  isFounder,
  previousCompanies,
}: {
  title: string;
  role: string;
  name: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  isFounder: boolean;
  previousCompanies: string[];
}) {
  return (
    <div
      className={`flex flex-col gap-3 flex-shrink-0 ${
        isFounder
          ? "w-[320px] md:w-[480px] lg:w-[576px]"
          : "w-[280px] md:w-[300px] lg:w-[340px]"
      }`}
    >
      {/* Image Card */}
      <div
        className={`relative overflow-hidden rounded-[16px] lg:rounded-[20px] ${
          isFounder
            ? "h-[300px] md:h-[360px] lg:h-[406px]"
            : "h-[300px] md:h-[360px] lg:h-[406px]"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {/* Background gradient for founder */}
        {isFounder && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={ASSETS.teamFounderBg}
              alt=""
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 480px, 576px"
            />
          </div>
        )}

        {/* Person Image */}
        <div
          className={`absolute ${
            isFounder
              ? "right-0 bottom-0 w-[200px] md:w-[260px] lg:w-[292px] h-[280px] md:h-[350px] lg:h-[399px]"
              : "left-1/2 -translate-x-1/2 bottom-0 w-[200px] md:w-[250px] lg:w-[298px] h-[280px] md:h-[380px] lg:h-[380px]"
          }`}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-bottom"
            sizes={
              isFounder
                ? "(max-width: 768px) 200px, (max-width: 1024px) 260px, 292px"
                : "(max-width: 768px) 200px, (max-width: 1024px) 250px, 298px"
            }
          />
        </div>

        {/* Title and Role Overlay */}
        <div
          className={`absolute left-5 lg:left-6 top-5 lg:top-6 flex flex-col gap-1 z-10 ${
            textColor === "white" ? "text-white" : "text-black"
          }`}
        >
          <p
            className="font-display font-semibold text-[24px] md:text-[30px] lg:text-[36px] tracking-[0.04em] leading-normal"
            style={{
              textShadow:
                textColor === "black"
                  ? "0 1px 2px rgba(255,255,255,0.8)"
                  : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </p>
          <p
            className="font-display font-medium text-[14px] md:text-[18px] lg:text-[20px] tracking-[0.04em] leading-normal"
            style={{
              textShadow:
                textColor === "black"
                  ? "0 1px 2px rgba(255,255,255,0.8)"
                  : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {role}
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div
        className={`bg-[#F5F5F5] rounded-[16px] lg:rounded-[20px] p-5 lg:p-6 ${
          isFounder
            ? "min-h-[240px] md:min-h-[240px] lg:min-h-[262px]"
            : "min-h-[240px] md:min-h-[240px] lg:min-h-[262px]"
        }`}
      >
        <div className="flex flex-col gap-4 h-full">
          {/* Name */}
          <p className="font-display font-semibold text-[16px] md:text-[18px] lg:text-[20px] text-black tracking-[0.04em] leading-normal">
            {name}
          </p>

          {/* Description */}
          <p className="font-display font-light text-[14px] lg:text-[16px] text-black/60 tracking-[0.04em] leading-[1.4]">
            {description}
          </p>

          {/* Previously at */}
          <div className="mt-auto">
            <p className="font-display font-medium text-[14px] lg:text-[16px] text-black tracking-[0.04em] leading-normal mb-2">
              Previously at
            </p>
            <div className="flex gap-2">
              {previousCompanies.map((logo, index) => (
                <div
                  key={index}
                  className="w-[100px] lg:w-[126px] h-[44px] lg:h-[56px] rounded-lg border border-black/8 bg-white flex items-center justify-center p-2"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt="Company logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100px, 126px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoreTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        tl.from(
          cards,
          {
            opacity: 0,
            x: 60,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          0.2,
        );
      }

      // Navigation animation
      tl.from(
        navRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        0.4,
      );
    },
    { scope: sectionRef },
  );

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateScrollState, 300);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-12 md:pb-16 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Title - Core Team */}
        <h2
          ref={titleRef}
          className="font-display font-semibold text-[28px] md:text-[36px] lg:text-[40px] text-black text-center tracking-[0.04em] mb-8 md:mb-12 lg:mb-16 px-4 will-change-[transform,opacity]"
        >
          Core Team
        </h2>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          className="overflow-x-auto scrollbar-hide pb-4"
        >
          <div
            ref={cardsRef}
            className="flex gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-10 w-max"
          >
            {teamData.map((member) => (
              <TeamCard
                key={member.id}
                title={member.title}
                role={member.role}
                name={member.name}
                description={member.description}
                image={member.image}
                bgColor={member.bgColor}
                textColor={member.textColor}
                isFounder={member.isFounder}
                previousCompanies={member.previousCompanies}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div
          ref={navRef}
          className="flex justify-end gap-4 mt-6 md:mt-8 lg:mt-10 px-4 md:px-6 lg:px-10 will-change-[transform,opacity]"
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-[48px] h-[48px] lg:w-[54px] lg:h-[54px] rounded-full border border-black/12 flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? "text-black hover:bg-black/5 cursor-pointer"
                : "text-black/30 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-[48px] h-[48px] lg:w-[54px] lg:h-[54px] rounded-full border border-black/12 flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? "text-black hover:bg-black/5 cursor-pointer"
                : "text-black/30 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CoreTeamSection;
