import { create } from 'zustand';

import type { CheckInParams } from '#types/api.params';
import type { CoolingUnit, Farmer } from '#types/global';

type Produce = CheckInParams['produces'][number];
interface ProduceCrate extends Omit<Produce, 'crop' | 'harvestDate'> {
  crop: {
    id: number | undefined;
    name: string;
    image: string;
  };
  harvestDate: number | undefined;
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
    currentProduces.push(produce);
    set({ produces: currentProduces });
  },

  resetCheckInStore: () => set({ produces: [], coolingUnit: null, user: null, checkOutCode: null }),
  setCoolingUnit: (coolingUnit: CoolingUnit | null) => set({ coolingUnit }),
  setUser: (user: Farmer | null) => set({ user }),
  setCheckOutCode: (value: string | null) => set({ checkOutCode: value }),
}));
