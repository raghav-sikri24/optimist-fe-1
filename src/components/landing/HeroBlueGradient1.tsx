import BlueGradientBox from "@/assets/icons/blueGradientBox";
import { motion } from "framer-motion";

export default function HeroBlueGradient1({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  // On mobile, use static scale centered in middle; on desktop, animate based on scroll
  const currentScale = isMobile ? 1 : 1.2 - (progress * 0.45); // Static scale on mobile, shrinks from 1.2 to 0.75 on desktop

  if (isMobile) {
    // Mobile: Blue gradient is 70vh tall, vertically centered (15vh from top)
    return (
      <div
        className="w-full overflow-hidden absolute left-0"
        style={{
          height: '60vh',
          top: '8vh', // (100vh - 70vh) / 2 = 15vh to center vertically
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
        }}
      >
        <div
          className="w-[1360px] h-full absolute left-1/2 top-0"
          style={{
            transform: 'translateX(-50%)',
          }}
        >
          <BlueGradientBox progress={0} />
        </div>
      </div>
    );
  }

  // Desktop: Animated version with scroll-based scaling
  return (
    <motion.div
      initial={{ scale: 1.2, x: "-50%" }}
      animate={{ scale: currentScale, x: "-50%" }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="w-[1360px] h-[622px] overflow-hidden absolute left-1/2 top-[10%]"
      style={{
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        // Safari-compatible mask with proper vendor prefixing
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
        // Ensure proper transform origin for Safari
        transformOrigin: 'top center',
        WebkitTransformOrigin: 'top center',
        // Force GPU acceleration for smoother Safari animation
        willChange: 'transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      <BlueGradientBox progress={progress} />
    </motion.div>
  );
}