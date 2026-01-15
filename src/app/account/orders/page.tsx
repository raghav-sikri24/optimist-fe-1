"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerOrders, formatPrice, type Order } from "@/lib/shopify";

export default function OrdersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { accessToken, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      if (!accessToken) return;

      try {
        const data = await getCustomerOrders(accessToken, 50);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (accessToken) {
      fetchOrders();
    }
  }, [accessToken]);

  useGSAP(
    () => {
      if (isLoading || isAuthLoading) return;

      const elements = containerRef.current?.querySelectorAll(".animate-in");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    },
    { scope: containerRef, dependencies: [isLoading, isAuthLoading] }
  );

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-optimist-cream/30 border-t-optimist-cream rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="animate-in mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-optimist-cream-muted hover:text-optimist-cream transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-optimist-cream">
            Order History
          </h1>
        </div>

        {/* Orders */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-optimist-dark rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 w-32 bg-optimist-black rounded mb-4" />
                <div className="h-4 w-48 bg-optimist-black rounded" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="animate-in text-center py-16 bg-optimist-dark rounded-2xl">
            <Package className="w-16 h-16 text-optimist-cream-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-optimist-cream mb-2">
              No orders yet
            </h2>
            <p className="text-optimist-cream-muted mb-6">
              When you place orders, they will appear here
            </p>
            <Link
              href="/products"
              className="btn-primary px-6 py-3 rounded-full text-white font-medium inline-flex items-center gap-2"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                index={index}
                isExpanded={expandedOrder === order.id}
                onToggle={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  index,
  isExpanded,
  onToggle,
}: {
  order: Order;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const statusColors: Record<string, string> = {
    PAID: "bg-emerald-900/30 text-emerald-400 border-emerald-700",
    PENDING: "bg-amber-900/30 text-amber-400 border-amber-700",
    REFUNDED: "bg-red-900/30 text-red-400 border-red-700",
    FULFILLED:
      "bg-optimist-blue-primary/30 text-optimist-blue-light border-optimist-blue-primary",
    UNFULFILLED:
      "bg-optimist-cream-muted/10 text-optimist-cream-muted border-optimist-border",
  };

  const date = new Date(order.processedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const lineItems = order.lineItems.edges.map((e) => e.node);

  return (
    <div
      className="animate-in bg-optimist-dark rounded-2xl overflow-hidden"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Order Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-optimist-black/20 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-optimist-black flex items-center justify-center">
            <Package className="w-6 h-6 text-optimist-cream-muted" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-optimist-cream">{order.name}</p>
            <div className="flex items-center gap-3 mt-1 text-sm text-optimist-cream-muted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              <span>•</span>
              <span>
                {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-optimist-cream">
              {formatPrice(
                order.totalPrice.amount,
                order.totalPrice.currencyCode
              )}
            </p>
            <span
              className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full border ${
                statusColors[order.fulfillmentStatus] ||
                statusColors.UNFULFILLED
              }`}
            >
              {order.fulfillmentStatus.replace("_", " ")}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-optimist-cream-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-optimist-cream-muted" />
          )}
        </div>
      </button>

      {/* Order Details */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-optimist-border">
          {/* Line Items */}
          <div className="py-4 space-y-4">
            {lineItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-optimist-black flex-shrink-0">
                  {item.variant?.image ? (
                    <Image
                      src={item.variant.image.url}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-optimist-cream-muted">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-optimist-cream truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-optimist-cream-muted">
                    Qty: {item.quantity}
                  </p>
                </div>
                {item.variant?.price && (
                  <p className="font-medium text-optimist-cream">
                    {formatPrice(
                      item.variant.price.amount,
                      item.variant.price.currencyCode
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="pt-4 border-t border-optimist-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-optimist-cream-muted mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-optimist-cream mb-1">
                    Shipping Address
                  </p>
                  <address className="not-italic text-sm text-optimist-cream-muted">
                    <p>
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    {order.shippingAddress.address1 && (
                      <p>{order.shippingAddress.address1}</p>
                    )}
                    {order.shippingAddress.address2 && (
                      <p>{order.shippingAddress.address2}</p>
                    )}
                    <p>
                      {[
                        order.shippingAddress.city,
                        order.shippingAddress.province,
                        order.shippingAddress.zip,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {order.shippingAddress.country && (
                      <p>{order.shippingAddress.country}</p>
                    )}
                  </address>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
