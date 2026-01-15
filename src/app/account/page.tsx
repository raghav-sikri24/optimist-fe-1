"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { User, Package, MapPin, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, type Order } from "@/lib/shopify";

export default function AccountPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { customer, isAuthenticated, isLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useGSAP(
    () => {
      if (isLoading) return;
      
      const elements = containerRef.current?.querySelectorAll(".animate-in");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-optimist-cream/30 border-t-optimist-cream rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !customer) {
    return null;
  }

  const recentOrders = customer.orders.edges.slice(0, 3).map((e) => e.node);
  const defaultAddress = customer.defaultAddress;

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="animate-in mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-optimist-cream mb-2">
            My Account
          </h1>
          <p className="text-lg text-optimist-cream-muted">
            Welcome back, {customer.firstName || "there"}!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="animate-in lg:col-span-1">
            <div className="bg-optimist-dark rounded-2xl p-6 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-optimist-blue-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-optimist-blue-light" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-optimist-cream">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <p className="text-sm text-optimist-cream-muted">Customer</p>
                </div>
              </div>

              <div className="space-y-4">
                {customer.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-optimist-cream-muted" />
                    <span className="text-optimist-cream">{customer.email}</span>
                  </div>
                )}
                {customer.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-optimist-cream-muted" />
                    <span className="text-optimist-cream">{customer.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-in lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/account/orders"
                className="group bg-optimist-dark rounded-2xl p-6 hover:bg-optimist-dark/80 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-optimist-blue-primary/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-optimist-blue-light" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-optimist-cream-muted group-hover:text-optimist-cream group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-optimist-cream mb-1">
                  Order History
                </h3>
                <p className="text-sm text-optimist-cream-muted">
                  View and track your orders
                </p>
              </Link>

              <Link
                href="/account/addresses"
                className="group bg-optimist-dark rounded-2xl p-6 hover:bg-optimist-dark/80 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-optimist-gold/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-optimist-gold" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-optimist-cream-muted group-hover:text-optimist-cream group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-optimist-cream mb-1">
                  Addresses
                </h3>
                <p className="text-sm text-optimist-cream-muted">
                  Manage shipping addresses
                </p>
              </Link>
            </div>
          </div>

          {/* Default Address */}
          {defaultAddress && (
            <div className="animate-in lg:col-span-1">
              <div className="bg-optimist-dark rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-optimist-cream">
                    Default Address
                  </h3>
                  <Link
                    href="/account/addresses"
                    className="text-sm text-optimist-blue-light hover:text-optimist-blue-glow transition-colors"
                  >
                    Edit
                  </Link>
                </div>
                <address className="not-italic text-sm text-optimist-cream-muted space-y-1">
                  <p className="text-optimist-cream font-medium">
                    {defaultAddress.firstName} {defaultAddress.lastName}
                  </p>
                  {defaultAddress.address1 && <p>{defaultAddress.address1}</p>}
                  {defaultAddress.address2 && <p>{defaultAddress.address2}</p>}
                  <p>
                    {[defaultAddress.city, defaultAddress.province, defaultAddress.zip]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {defaultAddress.country && <p>{defaultAddress.country}</p>}
                  {defaultAddress.phone && (
                    <p className="pt-2">{defaultAddress.phone}</p>
                  )}
                </address>
              </div>
            </div>
          )}

          {/* Recent Orders */}
          <div className="animate-in lg:col-span-2">
            <div className="bg-optimist-dark rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-optimist-cream">
                  Recent Orders
                </h3>
                <Link
                  href="/account/orders"
                  className="text-sm text-optimist-blue-light hover:text-optimist-blue-glow transition-colors"
                >
                  View all
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-optimist-cream-muted mx-auto mb-3" />
                  <p className="text-optimist-cream-muted">No orders yet</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 mt-4 text-optimist-blue-light hover:text-optimist-blue-glow transition-colors"
                  >
                    Start shopping
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const statusColors: Record<string, string> = {
    PAID: "bg-emerald-900/30 text-emerald-400",
    PENDING: "bg-amber-900/30 text-amber-400",
    REFUNDED: "bg-red-900/30 text-red-400",
    FULFILLED: "bg-optimist-blue-primary/30 text-optimist-blue-light",
    UNFULFILLED: "bg-optimist-cream-muted/20 text-optimist-cream-muted",
  };

  const date = new Date(order.processedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-3 border-b border-optimist-border last:border-b-0">
      <div>
        <p className="font-medium text-optimist-cream">{order.name}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-optimist-cream-muted">
          <Calendar className="w-3 h-3" />
          {date}
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-optimist-cream">
          {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
        </p>
        <span
          className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
            statusColors[order.fulfillmentStatus] || statusColors.UNFULFILLED
          }`}
        >
          {order.fulfillmentStatus.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}
