"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react";
import { OptimistLogo } from "@/components/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const { recoverPassword } = useAuth();
  const { showToast } = useToast();

  useGSAP(
    () => {
      const elements = containerRef.current?.querySelectorAll(".animate-in");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await recoverPassword(email);
      setIsSuccess(true);
      showToast("Recovery email sent!", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send recovery email";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Reset Password
          </h1>
          <p className="text-optimist-cream-muted">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form Container */}
        <div className="animate-in bg-optimist-dark/50 border border-optimist-border rounded-2xl p-6 md:p-8">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-optimist-cream mb-2">
                Check your email
              </h2>
              <p className="text-optimist-cream-muted mb-6">
                We've sent a password reset link to{" "}
                <span className="text-optimist-cream font-medium">{email}</span>
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail("");
                  }}
                  className="w-full btn-secondary px-6 py-3 rounded-full text-optimist-cream font-medium"
                >
                  Try another email
                </button>
                <Link
                  href="/login"
                  className="w-full btn-primary px-6 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-optimist-cream mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 pl-11 rounded-lg bg-optimist-dark border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 hover:border-optimist-border-light transition-colors"
                    disabled={isSubmitting}
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-optimist-cream-muted" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary px-6 py-3 rounded-full text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              {/* Back to Login */}
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-optimist-cream-muted hover:text-optimist-cream transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
