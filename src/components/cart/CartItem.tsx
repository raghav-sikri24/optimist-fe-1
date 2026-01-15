"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, type CartLine } from "@/lib/shopify";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartLine;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();
  const { merchandise, quantity } = item;
  const product = merchandise.product;
  const image = product.featuredImage;
  const variantTitle =
    merchandise.title !== "Default Title" ? merchandise.title : null;

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = (
    parseFloat(merchandise.price.amount) * quantity
  ).toString();

  return (
    <div className="flex gap-4 py-4 border-b border-optimist-border last:border-b-0">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-optimist-dark">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-optimist-cream-muted text-xs">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${product.handle}`}
          className="text-sm font-medium text-optimist-cream hover:text-optimist-blue-light transition-colors line-clamp-2"
        >
          {product.title}
        </Link>
        {variantTitle && (
          <p className="text-xs text-optimist-cream-muted mt-1">
            {variantTitle}
          </p>
        )}
        <p className="text-sm font-semibold text-optimist-cream mt-2">
          {formatPrice(totalPrice, merchandise.price.currencyCode)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-optimist-border rounded-lg">
          <button
            onClick={handleDecrement}
            disabled={isLoading}
            className="p-2 text-optimist-cream-muted hover:text-optimist-cream transition-colors disabled:opacity-50"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm text-optimist-cream">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            disabled={isLoading}
            className="p-2 text-optimist-cream-muted hover:text-optimist-cream transition-colors disabled:opacity-50"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={handleRemove}
          disabled={isLoading}
          className="p-1 text-optimist-cream-muted hover:text-optimist-red transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
