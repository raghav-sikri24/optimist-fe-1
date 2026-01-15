"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  ProductGrid,
  ProductGridSkeleton,
} from "@/components/products/ProductGrid";
import { getProducts, type Product } from "@/lib/shopify";

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(20);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12"
      >
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-optimist-cream mb-4">
          Our Products
        </h1>
        <p className="text-lg text-optimist-cream-muted max-w-2xl">
          Discover our collection of premium air conditioners engineered for
          modern living. Cools more. Uses less. Experience the highest ISEER
          rated ACs in India.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-900/30 text-red-400 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Error
            </div>
            <p className="text-optimist-cream-muted">{error}</p>
          </div>
        ) : isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
