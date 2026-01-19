"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Video time intervals for each feature
const VIDEO_INTERVALS = [
  { start: 0, end: 1 },      // Feature 1: 0-1s
  { start: 1, end: 3 },      // Feature 2: 1-3s
  { start: 3, end: Infinity }, // Feature 3: 3s-end (Infinity will be replaced with actual duration)
];

const features = [
  {
    id: 1,
    badge: "First in Class",
    badgeIcon: "/image 24225.png",
    headline: "In-Built Gas Indicator.",
    description: "Stop paying for refills you don't need.",
  },
  {
    id: 2,
    badge: "5-Year Warranty",
    badgeIcon: "/41d29b9eba9f0cca3fb251cb6ffabdda00b8a903.png",
    headline: "5 Years",
    description: "Because quality shouldn't need an asterisk.",
  },
  {
    id: 3,
    badgeTitle: "Highest ISEER",
    badgeSubtitle: "In India",
    badgeIcon: "/41d29b9eba9f0cca3fb251cb6ffabdda00b8a903.png",
    headline: "Lower bills. Higher comfort.",
    description: "Live Energy Meter, Track consumption as it happens.",
  },
];

export function FeaturesShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect mobile/desktop
  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient]);

  // Track section visibility for mobile video
  useEffect(() => {
    if (!sectionRef.current || !isClient || !isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isClient, isMobile]);

  // Get actual video intervals with real duration
  const getIntervals = useCallback(() => {
    return VIDEO_INTERVALS.map((interval, index) => ({
      start: interval.start,
      end: index === VIDEO_INTERVALS.length - 1 ? videoDuration : interval.end,
    }));
  }, [videoDuration]);

  // Desktop: Scroll-based video scrubbing
  useGSAP(
    () => {
      if (isMobile || !isClient) return;
      
      const video = videoRef.current;
      if (!video || !sectionRef.current || videoDuration === 0) return;

      video.pause();
      video.currentTime = 0;

      const intervals = getIntervals();
      const totalDuration = videoDuration;

      // Create ScrollTrigger for the entire section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          if (video.readyState >= 2) {
            const progress = self.progress;
            
            // Determine which feature we're on based on progress
            const featureIndex = Math.min(
              Math.floor(progress * features.length),
              features.length - 1
            );
            
            // Calculate time within the current feature's interval
            const featureProgress = (progress * features.length) - featureIndex;
            const interval = intervals[featureIndex];
            const targetTime = interval.start + (featureProgress * (interval.end - interval.start));
            
            // Clamp to valid range
            const clampedTime = Math.max(0, Math.min(targetTime, totalDuration));
            
            if (Math.abs(video.currentTime - clampedTime) > 0.02) {
              video.currentTime = clampedTime;
            }
            
            setActiveFeature(featureIndex);
          }
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [videoDuration, isMobile, isClient, getIntervals],
    }
  );

  // Mobile: Video fixed at bottom, content scrolls, video scrubs on scroll
  useGSAP(
    () => {
      if (!isMobile || !isClient) return;
      
      const video = mobileVideoRef.current;
      if (!video || !sectionRef.current || videoDuration === 0) return;

      video.pause();
      video.currentTime = 0;

      const intervals = getIntervals();
      const totalDuration = videoDuration;

      // ScrollTrigger for the section - controls video playback and feature switching
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom", // Start when section enters viewport
        end: "bottom top",   // End when section leaves viewport
        scrub: 0.3,
        onUpdate: (self) => {
          if (video.readyState >= 2) {
            const progress = self.progress;
            
            // Determine which feature we're on based on progress
            const featureIndex = Math.min(
              Math.floor(progress * features.length),
              features.length - 1
            );
            
            // Calculate time within the current feature's interval
            const featureProgress = (progress * features.length) - featureIndex;
            const interval = intervals[featureIndex];
            const targetTime = interval.start + (featureProgress * (interval.end - interval.start));
            
            // Clamp to valid range
            const clampedTime = Math.max(0, Math.min(targetTime, totalDuration));
            
            if (Math.abs(video.currentTime - clampedTime) > 0.02) {
              video.currentTime = clampedTime;
            }
            
            setActiveFeature(featureIndex);
          }
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [videoDuration, isMobile, isClient, getIntervals],
    }
  );

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = e.currentTarget.duration;
    if (Number.isFinite(duration) && duration > 0) {
      setVideoDuration(duration);
      e.currentTarget.currentTime = 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
    >
      {/* Background Leaf Pattern */}
      <div className="absolute top-0 left-0 w-full max-w-[800px] opacity-10 pointer-events-none z-0">
        <Image
          src="/Leaf Swaying.gif"
          alt=""
          width={800}
          height={1600}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Desktop Layout - Sticky Video */}
      {isClient && !isMobile && (
        <div className="relative z-10">
          <div className="flex flex-row">
            {/* Left Side - Scrollable Feature Content */}
            <div className="w-1/2">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[index] = el; }}
                  className="h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24"
                >
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#FFF9E6] rounded-2xl mb-6 w-fit transition-all duration-500"
                    style={{
                      opacity: activeFeature === index ? 1 : 0.4,
                      transform: activeFeature === index ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0">
                      <Image
                        src={feature.badgeIcon}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    {"badgeTitle" in feature ? (
                      <div className="flex flex-col">
                        <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                          {feature.badgeTitle}
                        </span>
                        <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[400] text-[#212121]">
                          {feature.badgeSubtitle}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Headline with gradient and arrow */}
                  <div
                    className="flex flex-row items-center gap-6 mb-4 transition-all duration-500"
                    style={{
                      opacity: activeFeature === index ? 1 : 0.4,
                      transform: activeFeature === index ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    <h2
                      className="font-display text-[44px] xl:text-[52px] font-bold leading-[1.1]"
                      style={{
                        background: "linear-gradient(151.7deg, #1265FF 25.27%, #69CDEB 87.59%, #46F5A0 120.92%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {feature.headline}
                    </h2>
                    <div className="flex items-center flex-shrink-0">
                      <div className="w-20 xl:w-28 h-[1px] bg-[#C4C4C4]" />
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-[#C4C4C4]" />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg lg:text-xl text-[#6B7280] font-normal italic leading-relaxed max-w-[400px] transition-all duration-500"
                    style={{
                      opacity: activeFeature === index ? 1 : 0.4,
                      transform: activeFeature === index ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Side - Sticky Video (constrained to half width) */}
            <div className="w-1/2 relative">
              <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-[90%] h-[450px] lg:h-[500px] xl:h-[550px] flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src="/PointersAnimation.mp4"
                    className="max-h-full max-w-full object-contain"
                    muted
                    playsInline
                    preload="auto"
                    // @ts-ignore
                    webkit-playsinline="true"
                    disablePictureInPicture
                    onLoadedMetadata={handleVideoLoaded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout - Content scrolls, Video fixed at bottom */}
      {isClient && isMobile && (
        <div className="relative z-10 pb-[320px]">
          {/* Feature sections that scroll normally */}
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 py-8 bg-white"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#FFF9E6] rounded-2xl mb-4 w-fit transition-all duration-300"
                style={{
                  opacity: activeFeature === index ? 1 : 0.4,
                }}
              >
                <div className="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0">
                  <Image
                    src={feature.badgeIcon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                {"badgeTitle" in feature ? (
                  <div className="flex flex-col">
                    <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                      {feature.badgeTitle}
                    </span>
                    <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[400] text-[#212121]">
                      {feature.badgeSubtitle}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                    {feature.badge}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h2
                className="font-display text-[28px] md:text-[36px] font-bold leading-[1.1] mb-3 transition-all duration-300"
                style={{
                  background: "linear-gradient(151.7deg, #1265FF 25.27%, #69CDEB 87.59%, #46F5A0 120.92%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: activeFeature === index ? 1 : 0.4,
                }}
              >
                {feature.headline}
              </h2>

              {/* Description */}
              <p
                className="text-base md:text-lg text-[#6B7280] font-normal italic leading-relaxed max-w-[400px] transition-all duration-300"
                style={{
                  opacity: activeFeature === index ? 1 : 0.4,
                }}
              >
                {feature.description}
              </p>

              {/* Arrow pointing down */}
              <div className="flex flex-col items-start mt-4">
                <div className="w-[1px] h-8 bg-[#C4C4C4]" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-[#C4C4C4]" />
              </div>
            </div>
          ))}

          {/* Video fixed at bottom - only when section is in view */}
          {isInView && (
            <div className="fixed bottom-0 left-0 right-0 h-[280px] sm:h-[320px] flex items-center justify-center bg-white z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <video
                ref={mobileVideoRef}
                src="/PointersAnimation.mp4"
                className="max-h-[90%] max-w-[90%] object-contain"
                muted
                playsInline
                preload="auto"
                // @ts-ignore
                webkit-playsinline="true"
                disablePictureInPicture
                onLoadedMetadata={handleVideoLoaded}
              />
            </div>
          )}
        </div>
      )}

      {/* SSR Fallback */}
      {!isClient && (
        <div className="relative z-10 flex flex-col gap-4 md:gap-[40px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col lg:flex-row"
            >
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-12 lg:py-20">
                <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#FFF9E6] rounded-2xl mb-6 w-fit">
                  <div className="w-6 h-6 md:w-8 md:h-8 relative flex-shrink-0">
                    <Image
                      src={feature.badgeIcon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  {"badgeTitle" in feature ? (
                    <div className="flex flex-col">
                      <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                        {feature.badgeTitle}
                      </span>
                      <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[400] text-[#212121]">
                        {feature.badgeSubtitle}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] md:text-[14px] leading-[14px] md:leading-[18px] font-[700] text-[#212121]">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h2
                  className="font-display text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px] font-bold leading-[1.1] mb-4"
                  style={{
                    background: "linear-gradient(151.7deg, #1265FF 25.27%, #69CDEB 87.59%, #46F5A0 120.92%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {feature.headline}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-[#6B7280] font-normal italic leading-relaxed max-w-[400px]">
                  {feature.description}
                </p>
              </div>
              <div className="w-full lg:w-1/2 relative flex justify-center">
                <div className="relative w-full max-w-[90%] h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
                  <video
                    src="/PointersAnimation.mp4"
                    className="w-full h-full object-contain"
                    muted
                    playsInline
                    preload="auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
