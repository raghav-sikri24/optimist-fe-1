"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { OptimistLogo } from "@/components/icons";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/account");
    }
  }, [isAuthenticated, isLoading, router]);

  useGSAP(
    () => {
      const elements = containerRef.current?.querySelectorAll(".animate-in");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      );
    },
    { scope: containerRef },
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-optimist-cream/30 border-t-optimist-cream rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="animate-in text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <OptimistLogo className="text-optimist-cream" />
            <span className="text-2xl font-semibold text-optimist-cream">
              optimist
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-optimist-cream mb-2">
            Welcome Back
          </h1>
          <p className="text-optimist-cream-muted">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Container */}
        <div className="animate-in bg-optimist-dark/50 border border-optimist-border rounded-2xl p-6 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
