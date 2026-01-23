"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { type Product } from "@/lib/shopify";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/Toast";
import { ASSETS } from "@/lib/assets";
import { ImageGallery } from "@/components/products/ImageGallery";
import { PackageIcon, ShoppingBagIcon, CartIcon } from "@/components/icons/ProductIcons";
import { QuantityDropdown } from "@/components/products/QuantityDropdown";
import { ProductDetailRow } from "@/components/products/ProductDetailRow";
import { ComparisonSection } from "@/components/products/ComparisonSection";
import { ResultSection } from "@/components/products/ResultSection";
import { VariantCard } from "@/components/products/VariantCard";
import { UserExperienceSection } from "@/components/products/UserExperienceSection";
import { IndiaStorySection } from "@/components/products/IndiaStorySection";
import { AfterBuySection } from "@/components/products/AfterBuySection";
import { WarrantySection } from "@/components/products/WarrantySection";
import { RecognitionSection } from "@/components/products/RecognitionSection";
import { BuiltForSection } from "@/components/products/BuiltForSection";

// =============================================================================
// Types
// =============================================================================

export interface DisplayVariant {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  available: boolean;
}

export interface ProductDetail {
  icon: "trophy" | "warranty" | "installation";
  label: string;
}

// =============================================================================
// Constants
// =============================================================================

const MAX_DISPLAY_IMAGES = 6;
const QUANTITY_OPTIONS = [1, 2, 3, 4, 5] as const;

const MOCK_VARIANTS: DisplayVariant[] = [
  { id: "1ton", name: "1 TON", subtitle: "For compact rooms", price: 40000, available: true },
  { id: "1.5ton", name: "1.5 TON", subtitle: "For compact rooms", price: 45000, available: true },
  { id: "2ton", name: "2 TON", subtitle: "For compact rooms", price: 52000, available: true },
];

const PRODUCT_DETAILS: ProductDetail[][] = [
  [
    { icon: "trophy", label: "Top Rated" },
    { icon: "warranty", label: "1-Year Warranty" },
    { icon: "installation", label: "Paid Installation" },
  ],
  [
    { icon: "trophy", label: "Top Rated" },
    { icon: "warranty", label: "1-Year Warranty" },
    { icon: "installation", label: "Paid Installation" },
  ],
  [
    { icon: "trophy", label: "Top Rated" },
    { icon: "warranty", label: "1-Year Warranty" },
    { icon: "installation", label: "Paid Installation" },
  ],
];

const MOCK_IMAGES = [
  ASSETS.ac1,
  ASSETS.ac2,
  ASSETS.ac3,
  ASSETS.ac1,
  ASSETS.ac2,
  ASSETS.ac3,
];

// =============================================================================
// Utils - Moved outside component to avoid recreation
// =============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN").format(price);
}

// =============================================================================
// Props
// =============================================================================

interface ProductsPageClientProps {
  product: Product | null;
}

// =============================================================================
// Main Component
// =============================================================================

export default function ProductsPageClient({ product }: ProductsPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<DisplayVariant>(MOCK_VARIANTS[1]);
  const [quantity, setQuantity] = useState(1);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { showToast } = useToast();

  // Image navigation - memoized
  const images = product?.images.edges.map((e) => e.node.url) || MOCK_IMAGES;
  const displayImages = images.length >= MAX_DISPLAY_IMAGES 
    ? images.slice(0, MAX_DISPLAY_IMAGES) 
    : [...images, ...MOCK_IMAGES].slice(0, MAX_DISPLAY_IMAGES);

  // Set initial states to prevent flash
  useLayoutEffect(() => {
    if (galleryRef.current) {
      gsap.set(galleryRef.current, { opacity: 0, x: -40 });
    }
    if (productInfoRef.current) {
      const elements = productInfoRef.current.querySelectorAll(".animate-in");
      gsap.set(elements, { opacity: 0, y: 30 });
    }
  }, []);

  // Landing animation - enhanced staggered reveal
  useGSAP(
    () => {
      if (!containerRef.current || hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
      });

      // Gallery slides in from left
      tl.to(
        galleryRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
        0
      );

      // Product info elements stagger in
      const infoElements = productInfoRef.current?.querySelectorAll(".animate-in");
      if (infoElements) {
        tl.to(
          infoElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          0.2
        );
      }
    },
    { scope: containerRef }
  );

  // Memoized handlers
  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  const handleSelectImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleSelectVariant = useCallback((variant: DisplayVariant) => {
    setSelectedVariant(variant);
  }, []);

  const handleQuantityChange = useCallback((qty: number) => {
    setQuantity(qty);
  }, []);

  const handleQuantityToggle = useCallback(() => {
    setIsQuantityOpen((prev) => !prev);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    try {
      await addToCart(variant.id, quantity);
      showToast("Added to cart", "success");
    } catch {
      showToast("Failed to add to cart", "error");
    }
  }, [product, quantity, addToCart, showToast]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white pb-24 md:pb-0">
      {/* Product Detail Section */}
      <div ref={heroRef} className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Left Column - Image Gallery */}
            <div ref={galleryRef} className="w-full will-change-[transform,opacity]">
              <ImageGallery
                images={displayImages}
                selectedIndex={selectedImageIndex}
                onSelectImage={handleSelectImage}
                onPrev={handlePrevImage}
                onNext={handleNextImage}
              />
            </div>

            {/* Right Column - Product Info */}
            <div ref={productInfoRef} className="w-full space-y-3 md:space-y-6">
              {/* Badge */}
              <div className="animate-in">
                <span className="relative inline-flex items-center justify-center px-2 py-2 md:px-4 md:py-2 bg-[rgba(52,120,246,0.12)] text-[#3478F6] text-xs md:text-sm font-normal rounded-[45px] w-[112px]">
                  #BESTSELLER
                  <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-2px_4px_0px_#ccdeff] pointer-events-none" />
                </span>
              </div>

              {/* Title & Delivery */}
              <div className="animate-in">
                <h1 className="text-[28px] md:text-[40px] font-semibold text-black mb-2 leading-tight">
                  Optimist AC 1.5 Ton
                </h1>
                <div className="flex items-center gap-2 text-[#6c6a6a]">
                  <PackageIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">Delivery in 3 weeks</span>
                </div>
              </div>

              {/* Description */}
              <div className="animate-in flex flex-col gap-3">
                <h3 className="text-xs md:text-base font-medium text-black">
                  DESCRIPTION
                </h3>
                <p className="text-[#6c6a6a] text-sm md:text-base font-light leading-relaxed">
                  Njut av den behagliga värmen från en komplett och lyxig badtunna från Nordiska Tunnan. Här kan du se allt som ingår i ditt köp. Njut av den behagliga värmen från en komplett och lyxig badtunna från Nordiska Tunnan. Här kan du se allt som ingår i ditt köp.
                </p>
              </div>

              {/* Divider */}
              <div className="animate-in h-px bg-gray-200 w-full" />

              {/* Variants */}
              <div className="animate-in flex flex-col gap-6">
                <h3 className="text-base font-medium text-black">
                  VARIANTS
                </h3>
                <div className="w-full overflow-hidden" role="radiogroup" aria-label="Product variants">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {MOCK_VARIANTS.map((variant) => (
                      <VariantCard
                        key={variant.id}
                        variant={variant}
                        isSelected={selectedVariant.id === variant.id}
                        onSelect={handleSelectVariant}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="animate-in flex flex-col gap-3 md:gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium text-black">
                    TOTAL
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl md:text-2xl font-medium text-black">
                      Rs {formatPrice(selectedVariant.price)}.00
                    </span>
                    <span className="text-[#6c6a6a] text-sm md:text-base font-light">(inclusive of all the taxes)</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="animate-in">
                <QuantityDropdown
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                  isOpen={isQuantityOpen}
                  onToggle={handleQuantityToggle}
                  options={QUANTITY_OPTIONS}
                />
              </div>

              {/* Action Buttons */}
              <div className="animate-in flex gap-5">
                <button
                  onClick={handleAddToCart}
                  disabled={isCartLoading}
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 border border-[rgba(0,0,0,0.12)] rounded-[40px] text-black font-medium text-base hover:border-[rgba(0,0,0,0.24)] transition-all disabled:opacity-50"
                >
                  <ShoppingBagIcon className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
                <button
                  className="flex-1 px-6 py-4 rounded-[36px] text-[#FFFCDC] font-medium text-base text-center transition-all btn-buy-now"
                >
                  Buy Now
                </button>
              </div>

              {/* Divider */}
              <div className="animate-in h-px bg-gray-200 w-full" />

              {/* Details */}
              <div className="animate-in flex flex-col gap-5">
                <h3 className="text-base font-medium text-black">
                  DETAILS
                </h3>
                <div className="flex flex-col gap-4 md:gap-6 md:w-[495px]">
                  {PRODUCT_DETAILS.map((row, index) => (
                    <ProductDetailRow key={index} details={row} />
                  ))}
                </div>
              </div>

              {/* Final Divider */}
              <div className="animate-in h-px bg-gray-200 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Result Section */}
      <ResultSection />

 

      {/* User Experience Section */}
      <UserExperienceSection />

      {/* India Story Section */}
      <IndiaStorySection />

      {/* After Buy Section */}
      <AfterBuySection />

      {/* Warranty Section */}
      <WarrantySection />

      {/* Recognition Section */}
      <RecognitionSection />

      {/* Built For Section */}
      <BuiltForSection />

      {/* Mobile Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/50 backdrop-blur-3xl backdrop-saturate-200 border-t border-white/[0.15] shadow-[0_-4px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(255,255,255,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-[50%] before:bg-gradient-to-b before:from-white/[0.12] before:to-transparent before:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[50%] after:bg-gradient-to-t after:from-white/[0.06] after:to-transparent after:pointer-events-none">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isCartLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white rounded-full text-black font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-50"
          >
            <CartIcon className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <button
            className="flex-1 px-4 py-3.5 rounded-full text-[#FFFCDC] font-medium text-sm text-center transition-all btn-buy-now"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
