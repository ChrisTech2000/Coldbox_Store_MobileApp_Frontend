import { type ReactElement, useEffect } from 'react';
import { ToastOptions } from 'react-native-toast-notifications';
import { create } from 'zustand';

import { CustomToastOptions } from '#common/InAppNotifications';
import DataloaderService from '#services/DataloaderService';
import MarketplaceService from '#services/MarketplaceService';
import { GetCartResponse } from '#types/api.responses';
import { CoolingUnit } from '#types/global';
import { Translator } from '#i18n/utils';
import reportCrash from '#ui/lib/reportCrash';

export const CART_MISMATCH_ERROR = 'Cart mismatch error';

type Toast = {
  show: (message: string | ReactElement, opts?: CustomToastOptions) => string;
  update: (
    id: string,
    message: string | ReactElement,
    toastOptions?: ToastOptions | undefined
  ) => void;
  hide: (id: string) => void;
  hideAll: () => void;
  isOpen: (id: string) => boolean;
};

interface CartStoreState {
  cartData: GetCartResponse['cart'] | undefined;
  allCoolingUnits: CoolingUnit[] | undefined;
  isLoading: boolean;
  isCoolingUnitsLoading: boolean;
  error: Error | null;
  coolingUnitsError: Error | null;

  fetchCart: () => Promise<void>;
  recomputeCart: (toast: Toast, t: Translator) => Promise<void>;
  fetchCoolingUnits: () => Promise<void>;
  setCart: (cart: GetCartResponse['cart'] | undefined) => void;
  reset: () => void;
}

const useCartStore = create<CartStoreState>((set, get) => ({
  cartData: undefined,
  allCoolingUnits: undefined,
  isLoading: false,
  isCoolingUnitsLoading: false,
  error: null,
  coolingUnitsError: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await MarketplaceService.getCart();
      set({ cartData: data.cart, isLoading: false });
    } catch (err) {
      set({ error: err as Error, isLoading: false });
      reportCrash(err as Error);
    }
  },

  recomputeCart: async (toast: Toast, t: Translator) => {
    set({ isLoading: true, error: null });
    const data = await MarketplaceService.recomputeCart();
    const previousCart = get().cartData;
    set({ cartData: data.cart, isLoading: false });

    if (
      previousCart?.items &&
      data.cart?.items &&
      previousCart.items.length > data.cart.items.length
    ) {
      toast.show(t('Dashboard.ShoppingCart.cartUpdatedMessage'), {
        type: 'md_danger',
      });
    }
  },

  fetchCoolingUnits: async () => {
    set({ isCoolingUnitsLoading: true, coolingUnitsError: null });
    try {
      const coolingUnits = await DataloaderService.coolingUnits.getAll();
      set({ allCoolingUnits: coolingUnits ?? [], isCoolingUnitsLoading: false });
    } catch (err) {
      set({ coolingUnitsError: err as Error, isCoolingUnitsLoading: false });
      reportCrash(err as Error);
    }
  },

  setCart: (cartData: GetCartResponse['cart'] | undefined) => set({ cartData }),
  reset: () =>
    set({
      cartData: undefined,
      allCoolingUnits: undefined,
      isLoading: false,
      isCoolingUnitsLoading: false,
      error: null,
      coolingUnitsError: null,
    }),
}));

export const useCartInformation = (isAuthenticated: boolean) => {
  const { isLoading, isCoolingUnitsLoading, fetchCart, fetchCoolingUnits, cartData } = useCartStore(
    (state) => ({
      isLoading: state.isLoading,
      isCoolingUnitsLoading: state.isCoolingUnitsLoading,
      fetchCart: state.fetchCart,
      fetchCoolingUnits: state.fetchCoolingUnits,
      cartData: state.cartData,
    })
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCart();
    fetchCoolingUnits();
  }, [isAuthenticated]);

  return { isLoading: isLoading || isCoolingUnitsLoading, cartData };
};

export default useCartStore;
