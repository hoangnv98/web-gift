"use client";

import { useSyncExternalStore } from "react";

/**
 * Giỏ hàng + yêu thích + cờ (age gate) lưu trong localStorage.
 * Khi có backend, thay module này bằng API + session.
 */
export interface StoreState {
  cart: Record<string, number>; // slug -> qty
  wishlist: string[];
  flags: Record<string, boolean>;
}

const KEY = "tqgift-store-v1";
const EMPTY: StoreState = { cart: {}, wishlist: [], flags: {} };

let state: StoreState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...(JSON.parse(raw) as Partial<StoreState>) };
  } catch {
    /* ignore */
  }
}

function commit(next: StoreState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getSnapshot() {
  load();
  return state;
}

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export const store = {
  addToCart(slug: string, qty = 1) {
    load();
    commit({ ...state, cart: { ...state.cart, [slug]: (state.cart[slug] ?? 0) + qty } });
  },
  setQty(slug: string, qty: number) {
    load();
    const cart = { ...state.cart };
    if (qty <= 0) delete cart[slug];
    else cart[slug] = qty;
    commit({ ...state, cart });
  },
  removeFromCart(slug: string) {
    store.setQty(slug, 0);
  },
  clearCart() {
    load();
    commit({ ...state, cart: {} });
  },
  toggleWishlist(slug: string) {
    load();
    const has = state.wishlist.includes(slug);
    commit({ ...state, wishlist: has ? state.wishlist.filter((s) => s !== slug) : [...state.wishlist, slug] });
  },
  setFlag(key: string, value: boolean) {
    load();
    commit({ ...state, flags: { ...state.flags, [key]: value } });
  },
};
