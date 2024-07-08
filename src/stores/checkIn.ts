import { create } from 'zustand';

import type { CheckInParams } from '#types/api.params';

type State = {
  produces: CheckInParams['produces'];
};

type Actions = {
  addProduce: (produce: CheckInParams['produces'][number]) => void;
  removeProduce: (produce: CheckInParams['produces'][number]) => void;
  resetCheckInStore: () => void;
};

export const useCheckInStore = create<State & Actions>((set, get) => ({
  produces: [],

  removeProduce: (produce: CheckInParams['produces'][number]) => {
    const currentProduces = get().produces;
    const updatedProduces = currentProduces.filter((_produce) => produce !== _produce);
    set({ produces: updatedProduces });
  },

  addProduce: (produce: CheckInParams['produces'][number]) => {
    const currentProduces = get().produces;
    currentProduces.push(produce);
    set({ produces: currentProduces });
  },

  resetCheckInStore: () => set({ produces: [] }),
}));
