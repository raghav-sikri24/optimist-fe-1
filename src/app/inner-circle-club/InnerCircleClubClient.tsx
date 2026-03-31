"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useCart, getCartLines } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductsContext";
import { removeFromCart as removeFromCartAPI } from "@/lib/shopify";

// =============================================================================
// Constants
// =============================================================================

const PACKAGE_ITEMS = [
  "Optimist AC unit, fully installed",
  "All maintenance and servicing",
  "Real-time monitoring and diagnostics",
  "Priority support for the duration of the programme",
  "Up to 5 years of programme coverage",
  "First consideration for upgrade, buyout, or ownership when the product launches commercially",
] as const;

const TC_ITEMS = [
  {
    title: "Unit Ownership",
    content:
      "The unit remains Optimist\u2019s property throughout. You hold a limited, non-exclusive, non-transferable right to use it \u2014 no title passes to you. It may not be pledged, mortgaged, or represented as a personal asset to any bank or third party.",
  },
  {
    title: "Service Fee",
    content:
      "The \u20B928,000 fee pays for installation, maintenance, diagnostics, logistics, and support \u2014 not for the unit. It is a service fee, not a purchase price.",
  },
  {
    title: "Regulatory Status",
    content:
      "Certifications such as BEE energy efficiency ratings may be pending at the time of deployment. This is a pre-commercial rollout, distinct from any future certified product offering. Occasional updates or refinements should be expected.",
  },
  {
    title: "Participation & Data",
    content:
      "We will periodically request feedback and may need servicing access. Usage and diagnostic data will be collected to improve the product, subject to applicable law and our privacy policy. Personal information will not be shared without your consent. Inactive participation may result in the arrangement being paused or closed.",
  },
  {
    title: "Permitted Use",
    content:
      "The unit is installed for your home and must stay there. Moving, reselling, sub-licensing, commercially exploiting, tampering with, reverse-engineering, or modifying it requires prior written consent. Use is limited to your household.",
  },
  {
    title: "Our Right to Access",
    content:
      "We may need to visit, update, or retrieve the unit for regulatory, safety, upgrade, or critical testing reasons. Routine use is unaffected. We reserve the right to modify, suspend, or terminate the programme for compliance or operational reasons.",
  },
  {
    title: "Duration & Ownership at Close",
    content:
      "The programme runs for up to 5 years, with full service for the duration, provided both parties remain in compliance. No automatic right of ownership arises \u2014 but Inner Circle members will receive first consideration for upgrade, buyout, or ownership at commercial launch, under a separate agreement.",
  },
  {
    title: "Disclaimer",
    content:
      "The unit is a pre-launch testing product provided on an as-is and as-available basis. Performance may vary, and the unit may be subject to interruptions, modifications, or upgrades as part of the testing process.",
  },
  {
    title: "Termination",
    content:
      "We may suspend or terminate participation for a material breach of these terms, or where required for safety, regulatory, or operational reasons. Upon termination, you must cease use of the unit and provide reasonable cooperation to enable its retrieval or removal.",
  },
  {
    title: "Liability",
    content:
      "We are not liable for indirect, incidental, or consequential losses. Total liability is capped at the \u20B928,000 service fee.",
  },
  {
    title: "Force Majeure",
    content:
      "We are not liable for any delay or failure in performance due to events beyond our reasonable control.",
  },
  {
    title: "Governing Law",
    content:
      "Governed by Indian law. Jurisdiction: courts at Gurgaon.",
  },
] as const;

// =============================================================================
// Sub-components
// =============================================================================

function TopBar() {
  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between px-4 sm:px-5 md:px-10 py-3 sm:py-4 bg-white/92 backdrop-blur-xl border-b border-[rgba(26,79,219,0.12)]">
      <div className="text-[13px] sm:text-[15px] font-bold text-[#0d0f1a] tracking-[0.01em]">
        Optimist <span className="text-optimist-blue-primary">·</span> Inner
        Circle
      </div>
      <div className="flex items-center gap-[7px] text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-[#8890a8]">
        <span className="w-1.5 h-1.5 rounded-full bg-optimist-blue-primary flex-shrink-0" />
        <span className="hidden xs:inline">Review & Accept</span>
      </div>
    </div>
  );
}

function InfoSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-7 sm:py-9 md:py-11 border-b border-[rgba(26,79,219,0.12)] last:border-b-0">
      <div className="mb-4 sm:mb-5">
        <div className="text-[10px] font-semibold text-optimist-blue-primary tracking-[0.2em] uppercase mb-2">
          {eyebrow}
        </div>
        <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#0d0f1a] tracking-[-0.02em] leading-[1.2]">
          {title}
        </div>
      </div>
      <div className="text-[13.5px] sm:text-[14.5px] text-[#3d4259] leading-[1.7]">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function InnerCircleClubClient() {
  const [tcAccepted, setTcAccepted] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const { cart, addToCart } = useCart();
  const { combinedProduct } = useProducts();

  const innerCircleVariant = useMemo(() => {
    if (!combinedProduct) return null;
    return (
      combinedProduct.allVariants.find(
        (v) =>
          v.productTitle.toLowerCase().includes("inner circle") && v.available,
      ) ?? null
    );
  }, [combinedProduct]);

  const handleJoin = useCallback(async () => {
    if (!tcAccepted || !innerCircleVariant?.variantId) return;
    setIsPaymentLoading(true);
    try {
      const existingLines = getCartLines(cart);
      if (existingLines.length > 0 && cart) {
        const lineIds = existingLines.map((line) => line.id);
        await removeFromCartAPI(cart.id, lineIds);
      }

      const updatedCart = await addToCart(innerCircleVariant.variantId, 1);
      if (updatedCart?.checkoutUrl) {
        window.location.href = updatedCart.checkoutUrl;
      }
    } catch {
      setIsPaymentLoading(false);
    }
  }, [tcAccepted, innerCircleVariant, addToCart, cart]);

  const scrollToSections = useCallback(() => {
    sectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      {/* Hero Banner */}
      <button
        type="button"
        onClick={scrollToSections}
        className="w-full cursor-pointer border-none p-0 bg-transparent block"
      >
        <img
          src="/images/inner-circle-banner.jpg"
          alt="The Optimist Inner Circle — A first-of-its-kind testing programme for Optimist air-conditioning systems, built for early believers. Learn more."
          className="w-full h-auto block"
        />
      </button>

      {/* Content Sections */}
      <div
        ref={sectionsRef}
        className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-14 md:pb-20"
      >
        {/* <div className="mb-8 sm:mb-10 md:mb-14">
          <div className="text-[10px] tracking-[0.26em] uppercase text-optimist-blue-primary font-semibold mb-3">
            Before you join
          </div>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0d0f1a] mb-2.5">
            Everything you need to{" "}
            <span className="text-optimist-blue-primary">know</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#3d4259] max-w-[480px]">
            Read through the sections below, then tick the box to accept and
            proceed to payment.
          </p>
        </div> */}

        {/* Section 1 */}
        <InfoSection
          eyebrow="01 / About the Programme"
          title="What is the Inner Circle?"
        >
          <p className="mb-3">
            The Optimist Inner Circle is an invite-only programme that puts
            Optimist's air-conditioning system into a select group of homes
            before commercial launch. You get a fully installed, working unit.
            We get honest, real-world feedback that shapes the product.
          </p>
        </InfoSection>

        {/* Section 2 */}
        {/* <InfoSection eyebrow="02 / Our Intent" title="Why are we doing this?">
          <p className="mb-3">
            Great products are not built in a lab — they are built with real
            people, in real homes, over real time. Before we launch to the
            world, we want to know that our AC performs exactly as we intend it
            to.
          </p>
          <p className="mb-3">The Inner Circle gives us the opportunity to:</p>
          <ul className="list-none p-0 my-2 mb-3 space-y-[5px]">
            {[
              "Evaluate performance across diverse real-world conditions",
              "Collect usage data and diagnostics to sharpen the product",
              "Understand what our users genuinely experience day-to-day",
              "Identify and fix issues before a full commercial rollout",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-[#3d4259] leading-[1.6]"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-optimist-blue-primary flex-shrink-0 mt-[9px]" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            As an OIC member, you will be a co-creator — you are a co-creator.
            Your feedback will directly shape the product that millions of
            people eventually use.
          </p>
        </InfoSection> */}

        {/* Section 3 */}
        <InfoSection eyebrow="03 / Your Package" title="What do you get?">
          <p className="mb-3">
            Here is everything included in your Inner Circle membership:
          </p>
          <ul className="list-none p-0 mt-3 flex flex-col gap-[5px]">
            {PACKAGE_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 sm:gap-3.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#f8f9fd] border border-[rgba(26,79,219,0.12)] rounded-md text-[12.5px] sm:text-[13.5px] text-[#3d4259] leading-[1.55] hover:border-[rgba(26,79,219,0.3)] hover:bg-[#eef1fb] transition-colors"
              >
                <Check className="w-3 h-3 text-optimist-blue-primary flex-shrink-0 mt-[3px] stroke-[3]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoSection>

        {/* Section 4 — T&C */}
        <InfoSection
          eyebrow="04 / Terms & Conditions"
          title="The key rules of the programme"
        >
          <p className="mb-4">
            Run by{" "}
            <strong className="text-[#0d0f1a] font-semibold">
              Octolife Climate Solutions Pvt. Ltd.
            </strong>{" "}
            This is a controlled testing deployment — not a product sale.
          </p>
          <div className="mt-2 space-y-5">
            {TC_ITEMS.map((item, i) => (
              <div key={i}>
                <div className="text-[13px] sm:text-[14px] font-semibold text-[#0d0f1a] mb-1">
                  {item.title}
                </div>
                <p className="text-sm text-[#3d4259] leading-[1.7]">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 sm:mt-7 p-3 sm:p-4 bg-[rgba(37,99,235,0.05)] border border-[rgba(37,99,235,0.15)] rounded-md text-[11.5px] sm:text-[12.5px] text-[#8890a8] leading-[1.55]">
            By accepting, you confirm you have read and agree to these Terms
            &amp; Conditions, and acknowledge that this is a testing deployment
            — not a product purchase — and that the fee is for services and
            programme participation only. The complete Terms &amp; Conditions
            document is available on request.
          </div>
        </InfoSection>
      </div>

      {/* Spacer for fixed bar */}
      <div className="h-32 sm:h-20" />

      {/* Fixed Accept Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[200] bg-white/97 backdrop-blur-2xl border-t border-[rgba(26,79,219,0.12)] px-4 sm:px-5 md:px-10 py-3 sm:py-[1.1rem] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 shadow-[0_-4px_24px_rgba(37,99,235,0.07)]">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              checked={tcAccepted}
              onChange={(e) => setTcAccepted(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border-[1.5px] border-[rgba(37,99,235,0.3)] peer-checked:bg-optimist-blue-primary peer-checked:border-optimist-blue-primary transition-colors flex items-center justify-center">
              {tcAccepted && (
                <Check className="w-3 h-3 text-white stroke-[3]" />
              )}
            </div>
          </div>
          <span className="text-[12px] sm:text-[13px] text-[#8890a8] leading-[1.35]">
            I have read and agree to the{" "}
            <strong className="text-[#0d0f1a] font-medium">
              Optimist Inner Circle Terms & Conditions
            </strong>
          </span>
        </label>
        <button
          onClick={handleJoin}
          disabled={
            !tcAccepted || isPaymentLoading || !innerCircleVariant?.variantId
          }
          className="w-full sm:w-auto inline-flex items-center justify-center gap-[9px] bg-optimist-blue-primary text-white text-[12px] font-bold tracking-[0.06em] uppercase px-7 py-3 sm:py-[11px] rounded-md border-none cursor-pointer whitespace-nowrap transition-all duration-200 disabled:opacity-25 disabled:pointer-events-none hover:enabled:bg-optimist-blue-deep hover:enabled:-translate-y-px"
        >
          {isPaymentLoading ? "Opening checkout…" : "Join the Membership →"}
        </button>
      </div>
    </div>
  );
}
