import { create } from 'zustand';

type Coupon = {
  code: string;
  percentage: number;
  isActive: boolean;
};

export const useCouponStore = create<{
  coupons: Array<Coupon>;
  append: (datum: Coupon) => void;
  toggle: (code: string) => void;
}>((set, get) => ({
  coupons: [],
  append: (datum) =>
    set((state) => ({
      ...state,
      coupons: [...state.coupons, datum],
    })),
  toggle: (code) => {
    const shallowCopy = [...get().coupons];
    for (const item of shallowCopy) {
      if (item.code !== code) continue;
      item.isActive = !item.isActive;
    }
    set({ coupons: shallowCopy });
  },
}));
