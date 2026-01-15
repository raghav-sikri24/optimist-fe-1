"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  BlueGradientFull,
  BlueGradientMiddle,
  BlueGradientShrink,
} from "@/assets/icons";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type AnimationSetters = {
  full: (value: number) => void;
  middle: (value: number) => void;
  shrink: (value: number) => void;
  scaleX: (value: number) => void;
  scaleY: (value: number) => void;
  borderRadius: (value: number) => void;
  y: (value: number) => void;
};

export function HeroBlueGradient({ progress }: { progress: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const shrinkRef = useRef<HTMLDivElement>(null);

  const settersRef = useRef<AnimationSetters | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const full = fullRef.current;
    const middle = middleRef.current;
    const shrink = shrinkRef.current;
    if (!frame || !full || !middle || !shrink) return;

    // Fast, smooth setters (avoid creating a tween per scroll tick).
    settersRef.current = {
      full: gsap.quickTo(full, "opacity", { duration: 0.15, ease: "power2.out" }),
      middle: gsap.quickTo(middle, "opacity", {
        duration: 0.15,
        ease: "power2.out",
      }),
      shrink: gsap.quickTo(shrink, "opacity", {
        duration: 0.15,
        ease: "power2.out",
      }),
      scaleX: gsap.quickTo(frame, "scaleX", {
        duration: 0.2,
        ease: "power2.out",
      }),
      scaleY: gsap.quickTo(frame, "scaleY", {
        duration: 0.2,
        ease: "power2.out",
      }),
      borderRadius: gsap.quickTo(frame, "borderRadius", {
        duration: 0.2,
        ease: "power2.out",
      }),
      y: gsap.quickTo(frame, "y", {
        duration: 0.2,
        ease: "power2.out",
      }),
    };

    // Initial state
    gsap.set([full, middle, shrink], { opacity: 0 });
    gsap.set(full, { opacity: 1 });
    // Transform from center so it shrinks evenly
    gsap.set(frame, { transformOrigin: "50% 50%" });
  }, []);

  useEffect(() => {
    const setters = settersRef.current;
    if (!setters) return;

    const p = clamp01(progress);

    // Segment weights: Full -> Middle -> Shrink (crossfade between gradient states)
    // Phase 1 (0-0.4): Full fades out, Middle fades in
    // Phase 2 (0.4-1): Middle fades out, Shrink fades in
    let fullOpacity = 1;
    let middleOpacity = 0;
    let shrinkOpacity = 0;

    if (p < 0.4) {
      // Phase 1: Full -> Middle
      const phase = p / 0.4;
      fullOpacity = 1 - phase;
      middleOpacity = phase;
      shrinkOpacity = 0;
    } else {
      // Phase 2: Middle -> Shrink
      const phase = (p - 0.4) / 0.6;
      fullOpacity = 0;
      middleOpacity = 1 - phase;
      shrinkOpacity = phase;
    }

    setters.full(clamp01(fullOpacity));
    setters.middle(clamp01(middleOpacity));
    setters.shrink(clamp01(shrinkOpacity));

    // Shrink animation values:
    // Start: full size (scale 1, border-radius 0)
    // End: 92% width, 85% height, 48px border-radius
    const scaleX = 1 - 0.08 * p; // 1 -> 0.92
    const scaleY = 1 - 0.15 * p; // 1 -> 0.85
    const borderRadius = 48 * p; // 0 -> 48px
    const yOffset = 20 * p; // Slight upward offset as it shrinks

    setters.scaleX(scaleX);
    setters.scaleY(scaleY);
    setters.borderRadius(borderRadius);
    setters.y(yOffset);
  }, [progress]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div ref={frameRef} className="absolute inset-0">
        <div
          ref={fullRef}
          className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
          style={{ opacity: 1 }}
        >
          <BlueGradientFull />
        </div>
        <div
          ref={middleRef}
          className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
          style={{ opacity: 0 }}
        >
          <BlueGradientMiddle />
        </div>
        <div
          ref={shrinkRef}
          className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
          style={{ opacity: 0 }}
        >
          <BlueGradientShrink />
        </div>
      </div>
    </div>
  );
}
