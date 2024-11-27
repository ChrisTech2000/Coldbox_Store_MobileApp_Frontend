import { CurrencyStandardization } from 'currency-format-utils';
import moize from 'moize';
import ms from 'ms';

import type { ProduceCrate } from '#stores/checkIn';
import type { CheckInResponse } from '#types/api.responses';

type ICropId = number;
type IPricePerKg = number;
type DatumKey = `${ICropId}::${IPricePerKg}`;

export function processMarketplaceCrateListing(
  localProduces: Array<ProduceCrate>,
  backendProduces: CheckInResponse['produces']
) {
  const listing = new Map<DatumKey, { crateIds: Array<number>; pricePerKg: IPricePerKg }>();

  for (let produceIdx = 0; produceIdx < localProduces.length; produceIdx++) {
    const produce = localProduces[produceIdx];
    const insertedProduce = backendProduces[produceIdx];

    if (!insertedProduce || insertedProduce.cropId !== produce.crop.id) continue;

    const priceSafeValue = produce?.price ?? 0;
    if (priceSafeValue === 0) continue;

    let accumulatedWeight = 0;
    const crateIds = new Set<number>();

    for (let crateIdx = 0; crateIdx < produce.crates.length; crateIdx++) {
      const crate = produce.crates[crateIdx];
      const insertedCrateId = insertedProduce.cratesIds?.[crateIdx];
      if (!crate?.isSellable || !insertedCrateId) continue;
      accumulatedWeight += crate.weight;
      crateIds.add(insertedCrateId);
    }

    if (accumulatedWeight > 0) {
      const pricePerKg: IPricePerKg = priceSafeValue / accumulatedWeight;

      const key: DatumKey = `${produce.crop.id}::${pricePerKg}`;
      const item = listing.get(key);

      if (typeof item === 'undefined') {
        listing.set(key, { crateIds: Array.from(crateIds), pricePerKg });
        continue;
      }

      const ids = new Set<number>([...item.crateIds, ...Array.from(crateIds)]);
      listing.set(key, { crateIds: Array.from(ids), pricePerKg });
    }
  }

  return Array.from(listing.values());
}

export const formatCurrencyWithSymbol = moize(
  (currencyCode: string, amountValue: string | number): string =>
    CurrencyStandardization.currencyCode({
      code: currencyCode,
      value: amountValue,
    }).getValueFormated(),
  { maxAge: ms('4 seconds') }
);
