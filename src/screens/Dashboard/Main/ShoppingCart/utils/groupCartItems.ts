import { CartItem, CoolingUnit } from '#types/global';

export type GroupedCartItem = {
  coolingUnit: CoolingUnit;
  crops: {
    cropId: number;
    items: CartItem[];
    totalWeight: number;
    totalAmount: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
};

export function groupCartItemsByCoolingUnitAndCrop(
  items: CartItem[] | undefined,
  coolingUnits: CoolingUnit[] | undefined
): GroupedCartItem[] {
  if (!items?.length || !coolingUnits?.length) return [];

  const groupedByCoolingUnit = items.reduce(
    (acc, item) => {
      const coolingUnitId = item.relCoolingUnitId;

      if (!acc[coolingUnitId]) {
        acc[coolingUnitId] = [];
      }

      acc[coolingUnitId].push(item);
      return acc;
    },
    {} as Record<number, CartItem[]>
  );

  return Object.entries(groupedByCoolingUnit)
    .map(([coolingUnitIdStr, coolingUnitItems]) => {
      const coolingUnitId = Number(coolingUnitIdStr);
      const coolingUnit = coolingUnits.find((c) => c.id === coolingUnitId);

      if (!coolingUnit) {
        return null;
      }

      const groupedByCrop = coolingUnitItems.reduce(
        (acc, item) => {
          const cropId = item.relCropId;

          if (!acc[cropId]) {
            acc[cropId] = [];
          }

          acc[cropId].push(item);
          return acc;
        },
        {} as Record<number, CartItem[]>
      );

      const crops = Object.entries(groupedByCrop).map(([cropIdStr, cropItems]) => {
        const cropId = Number(cropIdStr);

        const totalWeight = cropItems.reduce((sum, item) => sum + item.orderedProduceWeight, 0);

        const totalAmount = cropItems.reduce((sum, item) => sum + item.totalAmount, 0);

        return {
          cropId,
          items: cropItems,
          totalWeight,
          totalAmount,
        };
      });

      const subtotal = coolingUnitItems.reduce((sum, item) => sum + item.produceAmount, 0);
      const discount = coolingUnitItems.reduce((sum, item) => sum + item.discountAmount, 0);
      const total = crops.reduce((sum, crop) => sum + crop.totalAmount, 0);

      return {
        coolingUnit,
        crops,
        subtotal,
        discount,
        total,
      };
    })
    .filter((group): group is GroupedCartItem => group !== null);
}
