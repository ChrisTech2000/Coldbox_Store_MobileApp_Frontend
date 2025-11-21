import cloneDeep from 'lodash/cloneDeep';

import type { AddCoolingUnitParams } from '#types/api.params';
import type { GetCoolingUnitResponse } from 'types/api.responses';

import type { FormValues } from './contexts/FormManager';
import { PRICING_TYPE } from './constants';

type CropSpecificPricing = AddCoolingUnitParams['cropUpdates'];
type PricingEntry = CropSpecificPricing[0];

export class CropPricingManager {
  static patch(args: {
    formCrops: FormValues['crops'];
    priceType: FormValues['priceType'];
    commonPrice: FormValues['price'];
    previous?: CropSpecificPricing;
    previousCommonPrice?: FormValues['price'];
  }): CropSpecificPricing {
    const { formCrops, priceType, commonPrice, previous = [], previousCommonPrice } = args;

    const defaultPrice = Number(commonPrice);
    const oldDefaultPrice = previousCommonPrice ? Number(previousCommonPrice) : defaultPrice;
    const datums: CropSpecificPricing = [];

    for (const cropId of formCrops) {
      const datum = { id: cropId, pricingType: priceType } as PricingEntry;
      let price: number = defaultPrice;

      const previousPricing = previous.find((pricing) => pricing.id === cropId);
      if (typeof previousPricing !== 'undefined') {
        const oldPrice = previousPricing.dailyRate || previousPricing.fixedRate || oldDefaultPrice;
        // If the old price matched the old default, update to new default
        // Otherwise, preserve the custom price
        price = oldPrice === oldDefaultPrice ? defaultPrice : oldPrice;
      }

      if (priceType === PRICING_TYPE.PER_DAY) {
        datum.dailyRate = price;
        datum.fixedRate = 0;
        datums.push(datum);
        continue;
      }

      datum.fixedRate = price;
      datum.dailyRate = 0;
      datums.push(datum);
    }

    return datums;
  }

  static init(args: {
    unitCrops: GetCoolingUnitResponse['crops'];
    commonPrice: FormValues['price'];
  }): CropSpecificPricing {
    const { unitCrops, commonPrice } = args;

    const defaultPrice = Number(commonPrice);
    const list: CropSpecificPricing = [];

    for (const unitCrop of cloneDeep(unitCrops)) {
      const pricing = unitCrop?.pricing;
      if (typeof pricing === 'undefined') continue; // safe guard

      if (pricing.pricingType === PRICING_TYPE.PER_DAY) {
        const safeValue: number =
          !pricing.dailyRate || isNaN(pricing.dailyRate) ? defaultPrice : pricing.dailyRate;
        list.push({
          ...pricing,
          id: unitCrop.cropId,
          dailyRate: safeValue,
          fixedRate: 0,
        });
        continue;
      }

      const safeValue: number =
        !pricing.fixedRate || isNaN(pricing.fixedRate) ? defaultPrice : pricing.fixedRate;
      list.push({
        ...pricing,
        id: unitCrop.cropId,
        dailyRate: 0,
        fixedRate: safeValue,
      });
    }

    return list;
  }
}
