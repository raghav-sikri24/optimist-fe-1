"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";

interface RegisterFormProps {
  redirectTo?: string;
}

export function RegisterForm({ redirectTo = "/account" }: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const { register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await register(email, password, firstName.trim(), lastName.trim());
      showToast("Account created successfully!", "success");
      router.push(redirectTo);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      setErrors({ general: message });
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-400 text-sm">
          {errors.general}
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-optimist-cream mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className={`w-full px-4 py-3 rounded-lg bg-optimist-dark border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 transition-colors ${
              errors.firstName ? "border-red-500" : "border-optimist-border hover:border-optimist-border-light"
            }`}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-optimist-cream mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className={`w-full px-4 py-3 rounded-lg bg-optimist-dark border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 transition-colors ${
              errors.lastName ? "border-red-500" : "border-optimist-border hover:border-optimist-border-light"
            }`}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-optimist-cream mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-lg bg-optimist-dark border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 transition-colors ${
            errors.email ? "border-red-500" : "border-optimist-border hover:border-optimist-border-light"
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-optimist-cream mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className={`w-full px-4 py-3 pr-12 rounded-lg bg-optimist-dark border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 transition-colors ${
              errors.password ? "border-red-500" : "border-optimist-border hover:border-optimist-border-light"
            }`}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-optimist-cream-muted hover:text-optimist-cream transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-optimist-cream mb-2">
          Confirm Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className={`w-full px-4 py-3 rounded-lg bg-optimist-dark border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50 transition-colors ${
            errors.confirmPassword ? "border-red-500" : "border-optimist-border hover:border-optimist-border-light"
          }`}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
        )}
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
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-optimist-cream-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-optimist-blue-light hover:text-optimist-blue-glow transition-colors font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
