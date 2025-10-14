import { create } from 'zustand';

import type { CheckInParams } from '#types/api.params';
import type { CoolingUnit, Crop, EDateCropped, Farmer } from '#types/global';

type Produce = CheckInParams['produces'][number];
export interface ProduceCrate extends Omit<Produce, 'crop' | 'harvestDate'> {
  crop: Crop;
  harvestDate: EDateCropped | undefined;
  price: number | undefined;
}

type State = {
  produces: ProduceCrate[];
  coolingUnit: CoolingUnit | null;
  user: Farmer | null;
  checkOutCode: string | null;
};

type Actions = {
  addProduce: (produce: ProduceCrate) => void;
  removeProduce: (produce: ProduceCrate) => void;
  resetCheckInStore: () => void;
  setCoolingUnit: (coolingUnit: CoolingUnit | null) => void;
  setUser: (user: Farmer | null) => void;
  setCheckOutCode: (value: string | null) => void;
  setProduces: (produces: Array<ProduceCrate>) => void;
};

export const useCheckInStore = create<State & Actions>((set, get) => ({
  checkOutCode: null,
  produces: [],
  coolingUnit: null,
  user: null,

  removeProduce: (produce: ProduceCrate) => {
    const currentProduces = get().produces;
    const updatedProduces = currentProduces.filter((_produce) => produce !== _produce);
    set({ produces: updatedProduces });
  },

  addProduce: (produce: ProduceCrate) => {
    const currentProduces = get().produces;
    set({ produces: [...currentProduces, produce] });
  },

  resetCheckInStore: () =>
    set({
      checkOutCode: null,
      produces: [],
      coolingUnit: null,
      user: null,
    }),
  setCoolingUnit: (coolingUnit: CoolingUnit | null) => set({ coolingUnit }),
  setUser: (user: Farmer | null) => set({ user }),
  setCheckOutCode: (value: string | null) => set({ checkOutCode: value }),
  setProduces: (produces: Array<ProduceCrate>) => set({ produces }),
}));
