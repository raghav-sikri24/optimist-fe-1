"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";
import {
  customerAddressCreate,
  customerAddressUpdate,
  customerAddressDelete,
  customerDefaultAddressUpdate,
  type Address,
} from "@/lib/shopify";

export default function AddressesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { customer, accessToken, isAuthenticated, isLoading: isAuthLoading, refreshCustomer } =
    useAuth();
  const { showToast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Address>>({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  useGSAP(
    () => {
      if (isAuthLoading) return;

      const elements = containerRef.current?.querySelectorAll(".animate-in");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    },
    { scope: containerRef, dependencies: [isAuthLoading] }
  );

  const addresses = customer?.addresses.edges.map((e) => e.node) || [];
  const defaultAddressId = customer?.defaultAddress?.id;

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setFormData({
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      zip: "",
      country: "India",
      phone: customer?.phone || "",
    });
    setIsCreating(true);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!accessToken) return;

    setIsSaving(true);
    try {
      if (isCreating) {
        await customerAddressCreate(accessToken, formData as Omit<Address, "id">);
        showToast("Address added successfully", "success");
      } else if (editingId) {
        await customerAddressUpdate(accessToken, editingId, formData);
        showToast("Address updated successfully", "success");
      }
      await refreshCustomer();
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save address";
      showToast(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!accessToken) return;

    setIsDeleting(addressId);
    try {
      await customerAddressDelete(accessToken, addressId);
      showToast("Address deleted", "success");
      await refreshCustomer();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete address";
      showToast(message, "error");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!accessToken || addressId === defaultAddressId) return;

    try {
      await customerDefaultAddressUpdate(accessToken, addressId);
      showToast("Default address updated", "success");
      await refreshCustomer();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update default address";
      showToast(message, "error");
    }
  };

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
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-optimist-cream">
              Addresses
            </h1>
            {!isCreating && !editingId && (
              <button
                onClick={handleCreate}
                className="btn-primary px-4 py-2 rounded-full text-white font-medium inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Address
              </button>
            )}
          </div>
        </div>

        {/* Address Form */}
        {(isCreating || editingId) && (
          <div className="animate-in bg-optimist-dark rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-optimist-cream mb-6">
              {isCreating ? "Add New Address" : "Edit Address"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={formData.address1 || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address1: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={formData.address2 || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address2: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  value={formData.province || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.zip || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-optimist-cream mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-optimist-black border border-optimist-border text-optimist-cream placeholder-optimist-cream-muted/50 focus:outline-none focus:ring-2 focus:ring-optimist-blue-light/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary px-6 py-2 rounded-full text-white font-medium inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="btn-secondary px-6 py-2 rounded-full text-optimist-cream font-medium inline-flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 && !isCreating ? (
          <div className="animate-in text-center py-16 bg-optimist-dark rounded-2xl">
            <MapPin className="w-16 h-16 text-optimist-cream-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-optimist-cream mb-2">
              No addresses saved
            </h2>
            <p className="text-optimist-cream-muted mb-6">
              Add a shipping address to speed up checkout
            </p>
            <button
              onClick={handleCreate}
              className="btn-primary px-6 py-3 rounded-full text-white font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((address, index) => {
              const isDefault = address.id === defaultAddressId;
              const isEditing = editingId === address.id;

              if (isEditing) return null;

              return (
                <div
                  key={address.id}
                  className="animate-in bg-optimist-dark rounded-2xl p-6 relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {isDefault && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-optimist-gold/20 text-optimist-gold rounded-full text-xs font-medium">
                      <Star className="w-3 h-3" />
                      Default
                    </div>
                  )}
                  <address className="not-italic text-sm text-optimist-cream-muted space-y-1 mb-4">
                    <p className="text-optimist-cream font-medium text-base">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.address1 && <p>{address.address1}</p>}
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {[address.city, address.province, address.zip]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {address.country && <p>{address.country}</p>}
                    {address.phone && <p className="pt-2">{address.phone}</p>}
                  </address>
                  <div className="flex items-center gap-2 pt-4 border-t border-optimist-border">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-sm text-optimist-cream-muted hover:text-optimist-cream transition-colors inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    {!isDefault && (
                      <>
                        <span className="text-optimist-border">•</span>
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-sm text-optimist-cream-muted hover:text-optimist-cream transition-colors"
                        >
                          Set as default
                        </button>
                      </>
                    )}
                    <span className="text-optimist-border">•</span>
                    <button
                      onClick={() => handleDelete(address.id)}
                      disabled={isDeleting === address.id}
                      className="text-sm text-optimist-red hover:text-red-400 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                    >
                      {isDeleting === address.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
