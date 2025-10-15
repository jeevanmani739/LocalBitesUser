import { create } from 'zustand';
import { CartItem, Restaurant } from '@/types/database';

interface CartState {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: CartItem, restaurant: Restaurant) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateSpecialRequests: (menuItemId: string, specialRequests: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurant: null,

  addItem: (item, restaurant) => set((state) => {
    if (state.restaurant && state.restaurant.id !== restaurant.id) {
      return {
        items: [item],
        restaurant,
      };
    }

    const existingItemIndex = state.items.findIndex(
      (i) => i.menu_item.id === item.menu_item.id
    );

    if (existingItemIndex > -1) {
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += item.quantity;
      return { items: newItems, restaurant };
    }

    return {
      items: [...state.items, item],
      restaurant,
    };
  }),

  removeItem: (menuItemId) => set((state) => {
    const newItems = state.items.filter((item) => item.menu_item.id !== menuItemId);
    return {
      items: newItems,
      restaurant: newItems.length === 0 ? null : state.restaurant,
    };
  }),

  updateQuantity: (menuItemId, quantity) => set((state) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter((item) => item.menu_item.id !== menuItemId),
      };
    }

    return {
      items: state.items.map((item) =>
        item.menu_item.id === menuItemId
          ? { ...item, quantity }
          : item
      ),
    };
  }),

  updateSpecialRequests: (menuItemId, specialRequests) => set((state) => ({
    items: state.items.map((item) =>
      item.menu_item.id === menuItemId
        ? { ...item, special_requests: specialRequests }
        : item
    ),
  })),

  clearCart: () => set({ items: [], restaurant: null }),

  getTotal: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.menu_item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.quantity, 0);
  },
}));
