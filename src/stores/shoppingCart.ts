import { useEffect } from 'react';
import { create } from 'zustand';

import ColdtivateService from '#services/ColdtivateService';
import MarketplaceService from '#services/MarketplaceService';
import { GetCartResponse } from '#types/api.responses';
import { CoolingUnit } from '#types/global';

interface CartStoreState {
  cartData: GetCartResponse | undefined;
  allCoolingUnits: CoolingUnit[] | undefined;
  isLoading: boolean;
  error: Error | null;
  fetchCart: () => Promise<void>;
  fetchCoolingUnits: () => Promise<void>;
}

const useCartStore = create<CartStoreState>((set) => ({
  cartData: undefined,
  allCoolingUnits: undefined,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await MarketplaceService.getCart();
      set({ cartData: data, isLoading: false });
    } catch (err) {
      set({ error: err as Error, isLoading: false });
    }
  },

  fetchCoolingUnits: async () => {
    set({ isLoading: true, error: null });
    try {
      const coolingUnits = await ColdtivateService.getCoolingUnits({});
      set({ allCoolingUnits: coolingUnits, isLoading: false });
    } catch (err) {
      set({ error: err as Error, isLoading: false });
    }
  },
}));

export const useCartInformation = (isAuthenticated: boolean) => {
  const { isLoading, fetchCart, fetchCoolingUnits, cartData } = useCartStore((state) => ({
    isLoading: state.isLoading,
    fetchCart: state.fetchCart,
    fetchCoolingUnits: state.fetchCoolingUnits,
    cartData: state.cartData,
  }));

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCart();
    fetchCoolingUnits();
  }, [isAuthenticated]);

  return { isLoading, cartData };
};

export default useCartStore;
