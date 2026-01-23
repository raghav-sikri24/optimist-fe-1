"use client";

import { memo, useCallback, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons/ProductIcons";

// =============================================================================
// Types
// =============================================================================

interface ImageGalleryProps {
  images: string[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

// =============================================================================
// Component
// =============================================================================

export const ImageGallery = memo(function ImageGallery({ 
  images, 
  selectedIndex, 
  onSelectImage, 
  onPrev, 
  onNext 
}: ImageGalleryProps) {
  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    }
  }, [onPrev, onNext]);

  return (
    <div 
      className="w-full" 
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Product image gallery"
      aria-roledescription="carousel"
    >
      {/* Main Image */}
      <div className="relative aspect-square rounded-[24px] md:rounded-[24px] rounded-[16px] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={images[selectedIndex]}
          alt={`Product image ${selectedIndex + 1} of ${images.length}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows - Glassmorphism style matching Figma */}
        <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex items-center">
          <button
            onClick={onPrev}
            className="backdrop-blur-[12px] bg-[rgba(0,0,0,0.24)] border border-[rgba(255,255,255,0.24)] md:border-[rgba(255,255,255,0.24)] border-[rgba(255,255,255,0.12)] rounded-[12px] md:rounded-[12px] rounded-[8px] p-3 md:p-3 p-2 opacity-60 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
            type="button"
          >
            <ArrowRightIcon className="w-3 h-3 md:w-6 md:h-6 text-white rotate-180" />
          </button>
        </div>
        <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex items-center">
          <button
            onClick={onNext}
            className="backdrop-blur-[12px] bg-[rgba(0,0,0,0.24)] border border-[rgba(255,255,255,0.24)] md:border-[rgba(255,255,255,0.24)] border-[rgba(255,255,255,0.12)] rounded-[12px] md:rounded-[12px] rounded-[8px] p-3 md:p-3 p-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
            type="button"
          >
            <ArrowRightIcon className="w-3 h-3 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* Image counter for screen readers */}
        <div className="sr-only" aria-live="polite">
          Image {selectedIndex + 1} of {images.length}
        </div>
      </div>

      {/* Thumbnails - horizontal scroll container */}
      <div className="w-full overflow-hidden">
        <div 
          className="flex gap-1 md:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={index}
                onClick={() => onSelectImage(index)}
                role="tab"
                aria-selected={isSelected}
                aria-label={`View image ${index + 1}`}
                className={`relative w-11 h-[43px] md:w-[84px] md:h-[84px] flex-shrink-0 rounded-[12px] overflow-hidden transition-all ${
                  isSelected
                    ? "border-2 border-white"
                    : "border border-[rgba(255,255,255,0.12)]"
                }`}
                type="button"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="84px"
                  className="object-cover rounded-[12px]"
                  loading="lazy"
                />
                {/* Faded overlay for non-selected thumbnails */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-[rgba(255,255,255,0.32)] rounded-[12px]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
