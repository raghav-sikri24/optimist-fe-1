"use client";

import { type ReactNode } from "react";
import { ShopifyProvider } from "@shopify/hydrogen-react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/components/ui/Toast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ShopifyProvider
      storeDomain={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`}
      storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!}
      storefrontApiVersion="2025-07"
      countryIsoCode="IN"
      languageIsoCode="EN"
    >
      <ToastProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ShopifyProvider>
  );
}
