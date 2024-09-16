import { useMemo } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type CartItem<T> = T & {
  id: number;
  quantity: number;
};

type CartStore<T> = {
  items: Map<number, CartItem<T>>;
  addItem: (item: CartItem<T>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

function createCartStore<T>() {
  return create<CartStore<T>>((set) => ({
    items: new Map<number, CartItem<T>>(),
    addItem: (item) =>
      set((state) => {
        const deepCopy = new Map(state.items);
        const existingItem = deepCopy.get(item.id);
        if (!existingItem) deepCopy.set(item.id, item);
        else existingItem.quantity += item.quantity;
        return { items: deepCopy };
      }),
    removeItem: (id) =>
      set((state) => {
        const deepCopy = new Map(state.items);
        deepCopy.delete(id);
        return { items: deepCopy };
      }),
    updateQuantity: (id, quantity) =>
      set((state) => {
        const deepCopy = new Map(state.items);
        const item = deepCopy.get(id);
        if (item) item.quantity = quantity;
        return { items: deepCopy };
      }),
    clearCart: () => set({ items: new Map() }),
  }));
}

export const useMarketplaceCartStore = createCartStore<{
  cropName: string;
  movementCode: string;
  sellerName: string;
  cropImage: string;
  crateTag: string;
  weight: number;
  price: number;
  coolingUnitId: number;
  coolingUnitName: string;
  pickupDistance: number;
}>();

export function useCartItems() {
  const items = useMarketplaceCartStore(useShallow((store) => store.items));
  return useMemo(() => Array.from(items.values()), [items]);
}
