"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion-variants";

interface SectionHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Constrains the whole header block (centered) or just the title (left). */
  className?: string;
  /** Extra classes for the description paragraph (e.g. its max-width). */
  descriptionClassName?: string;
}

// Shared header for the /home sections: a blue eyebrow, a display title, and an
// optional description. Type is fluid (clamp) so the 48px desktop title scales
// down to a readable size on phones without per-section breakpoints.
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerParent(0.1)}
      className={`${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      <m.p
        variants={fadeUp}
        className="text-[16px] font-medium leading-[1.5] text-optimist-blue-hero sm:text-[18px] md:text-[20px] md:leading-[30px]"
      >
        {eyebrow}
      </m.p>
      <m.h2
        variants={fadeUp}
        className="mt-3 font-display text-[clamp(28px,5vw,48px)] font-medium leading-[1.15] text-[#212121]"
      >
        {title}
      </m.h2>
      {description ? (
        <m.p
          variants={fadeUp}
          className={`mt-4 text-[15px] leading-[1.55] text-black/55 sm:text-[16px] md:text-[18px] ${
            isCenter ? "mx-auto" : ""
          } ${descriptionClassName}`}
        >
          {description}
        </m.p>
      ) : null}
    </m.div>
  );
}
