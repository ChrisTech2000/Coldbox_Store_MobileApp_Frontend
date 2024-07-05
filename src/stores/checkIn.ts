import { create } from 'zustand';

import type { CheckInParams } from '#types/api.params';

type State = {
  produces: Array<CheckInParams>;
};

type Actions = {
  addProduce: (produce: CheckInParams) => void;
  removeProduce: (produceId: CheckInParams['id']) => void;
  resetCheckInStore: () => void;
};

export const useCheckInStore = create<State & Actions>((set, get) => ({
  produces: [
    {
      crop: { id: 2 },
      additionalInfo: '',
      crates: [
        {
          checkOut: null,
          weight: 40,
          tag: '',
          coolingUnitId: 143,
        },
      ],
      harvestDate: 100,
      initialGrade: null,
      hasPicture: false,
    },
  ],

  removeProduce: (produceId: CheckInParams['id']) => {
    const currentProduces = get().produces;
    const updatedProduces = currentProduces.filter((produce) => produce.id !== produceId);
    set({ produces: updatedProduces });
  },
  addProduce: (produce: CheckInParams) => {
    const currentProduces = get().produces;
    currentProduces.push(produce);
    set({ produces: currentProduces });
  },
  resetCheckInStore: () => set({ produces: [] }),
}));
