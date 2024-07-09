import { create } from 'zustand';

import type { CheckInParams } from '#types/api.params';
import type { CoolingUnit, Farmer } from '#types/global';

type Produce = CheckInParams['produces'][number];
interface ProduceCrate extends Produce {
  crop: {
    id: number;
    name: string;
    image: string;
  };
}

type State = {
  produces: ProduceCrate[];
  coolingUnit: CoolingUnit | null;
  user: Farmer | null;
};

type Actions = {
  addProduce: (produce: ProduceCrate) => void;
  removeProduce: (produce: ProduceCrate) => void;
  resetCheckInStore: () => void;
  setCoolingUnit: (coolingUnit: CoolingUnit | null) => void;
  setUser: (user: Farmer | null) => void;
};

export const useCheckInStore = create<State & Actions>((set, get) => ({
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

  resetCheckInStore: () => set({ produces: [], coolingUnit: null, user: null }),
  setCoolingUnit: (coolingUnit: CoolingUnit | null) => set({ coolingUnit }),
  setUser: (user: Farmer | null) => set({ user }),
}));
