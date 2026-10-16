"use client";

import { useState } from "react";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { store, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ slug, size = "md", className, label = "Thêm vào giỏ" }: { slug: string; size?: "sm" | "md" | "lg"; className?: string; label?: string }) {
  const [added, setAdded] = useState(false);
  return (
    <Button
      variant={added ? "primary" : "ruby"}
      size={size}
      className={className}
      onClick={() => { store.addToCart(slug); setAdded(true); window.setTimeout(() => setAdded(false), 1600); }}
    >
      {added ? <><Check className="size-4" /> Đã thêm</> : <><ShoppingBag className="size-4" /> {label}</>}
    </Button>
  );
}

export function WishlistButton({ slug, className, iconOnly = false }: { slug: string; className?: string; iconOnly?: boolean }) {
  const { wishlist } = useStore();
  const on = wishlist.includes(slug);
  return (
    <button
      type="button"
      onClick={() => store.toggleWishlist(slug)}
      aria-pressed={on}
      aria-label={on ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300",
        iconOnly ? "size-10 bg-white/90 text-ruby-700 shadow-md ring-1 ring-navy-900/10 hover:bg-white" : "h-11 border border-navy-200 px-5 text-sm font-semibold text-navy-900 hover:border-ruby-700 hover:text-ruby-700",
        on && !iconOnly && "border-ruby-700 text-ruby-700",
        className,
      )}
    >
      <Heart className={cn("size-4", on && "fill-ruby-700 text-ruby-700")} />
      {!iconOnly && (on ? "Đã yêu thích" : "Yêu thích")}
    </button>
  );
}
