"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Optimist Tree icon component
function OptimistTreeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 176 244"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M106.917 94.1467C121.004 113.404 129.387 134.891 133.968 163.138L112.711 166.573C108.674 141.723 101.431 122.97 89.1551 106.302C88.4852 105.385 87.0548 105.708 86.8375 106.805C78.6897 151.451 80.7357 198.992 93.7541 243.656H71.411C59.5876 199.765 57.5235 153.483 64.585 109.484C64.766 108.279 63.3175 107.506 62.4303 108.369C52.9245 117.396 42.8213 130.054 35.0899 144.654L16.024 134.711C26.0187 115.813 40.4312 98.1024 54.7895 86.4869C55.731 85.7137 55.1697 84.1854 53.9566 84.2214C36.2849 84.6889 21.8904 89.7774 8.87206 95.6391L0 76.148C16.1327 68.9738 35.3072 62.3029 59.5876 62.8603C60.7464 62.8963 61.362 61.4579 60.4929 60.6667C53.5039 54.1937 44.994 49.267 34.8183 45.7248L41.9159 25.5325C56.6906 30.657 69.0753 38.4426 78.8889 48.7276C79.5407 49.4108 80.6633 49.1951 81.0073 48.314C87.598 31.2863 95.7458 15.0678 105.396 0L123.575 11.4896C116.477 22.6197 110.231 34.415 104.908 46.7137C104.419 47.8285 105.65 48.9253 106.718 48.332C121.475 40.1328 141.374 32.2753 169.239 26.1978L173.856 47.0554C145.719 53.2227 126.852 61.1342 113.454 69.2075C112.494 69.7829 112.711 71.2213 113.798 71.527C135.598 77.6944 156.547 88.8244 175.468 104.521L161.653 120.902C149.395 110.743 131.252 98.7317 108.312 92.1688C107.135 91.8451 106.193 93.1757 106.917 94.1467Z"
        fill="#FFFCDC"
      />
    </svg>
  );
}

const navLinksCol1 = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
];

const navLinksCol2 = [
  { href: "/contact-us", label: "Contact us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/faq", label: "FAQ's" },
];

const socialLinks = [
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: XIcon, label: "X" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useGSAP(
    () => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: footerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Blue Cool Background */}
      <div className="absolute inset-0">
        <Image
          src="/BlueCoolBackground.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16 pb-8 md:pb-12">
        {/* Top Section - Links & Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Column 1 - Nav Links */}
          <nav className="flex flex-col gap-4">
            {navLinksCol1.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-optimist-cream hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 2 - Nav Links */}
          <nav className="flex flex-col gap-4">
            {navLinksCol2.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-optimist-cream hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 3 - Social Links */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-base text-optimist-cream mb-4">Social links</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-optimist-dark border border-optimist-border flex items-center justify-center text-optimist-cream hover:bg-optimist-blue-primary hover:border-optimist-blue-primary transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="col-span-2 md:col-span-2">
            <p className="text-xs uppercase tracking-wider text-optimist-cream-muted mb-4">
              GET UPDATES
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                className="w-full md:flex-1 px-4 py-3 bg-optimist-dark border border-optimist-border rounded-full text-optimist-cream placeholder:text-optimist-cream-muted focus:outline-none focus:border-optimist-blue-primary transition-colors"
              />
              <button
                type="submit"
                className="btn-buy-now w-full md:w-auto md:px-6 py-3 rounded-full text-white font-semibold text-sm whitespace-nowrap"
              >
                Get Updates
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Family Image with Logo */}
        <div ref={imageRef} className="relative">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden">
            {/* Family Image */}
            <Image
              src="/Family.png"
              alt="Happy family enjoying comfort"
              fill
              className="object-cover z-0"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />

            {/* Blue Gradient Overlay - higher z-index than family image */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/BlueCoolBackground.png"
                alt=""
                fill
                className="object-cover opacity-60"
              />
            </div>

            {/* Logo Overlay */}
            <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 md:pb-10 px-4 md:px-8">
              <div className="flex items-center justify-center gap-3 md:gap-6 lg:gap-8 w-full max-w-[95%]">
                <OptimistTreeIcon className="w-14 h-20 md:w-24 md:h-32 lg:w-32 lg:h-44 flex-shrink-0" />
                <span className="text-5xl md:text-7xl lg:text-[10rem] xl:text-[12rem] font-bold text-optimist-cream tracking-[0.08em] leading-none">
                  optimist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
