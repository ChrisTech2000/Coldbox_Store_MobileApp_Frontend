import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon, IconButton } from 'react-native-paper';

import ColdRoom from '#assets/icons/coldroom.svg';

import { Text } from '#ui/components/Text';

import { API_BASE_URL } from '#constants/environment';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { ProduceCrate } from '#stores/checkIn';
import { CoolingUnit, ECoolingUnitMetric, EPricingType } from '#types/global';
import { cn } from '#ui/lib/cn';

import { CrateSetupModal } from './CrateSetupModal';
import { SetupSchema } from '../CrateSetup';
import { formatCurrencyWithSymbol } from '../utils';

type CheckedInCardProps = {
  item: ProduceCrate;
  index: number;
  currencyCode: string;
  coolingUnit: CoolingUnit;
  checkOutCode: string | null;
  totalCrates: number;
  setCrateIDs: (modalCrates: SetupSchema['crates'], item: ProduceCrate) => void;
  openOptionsModal: () => void;
  disabled?: boolean;
  cropName: string;
};

export function CheckedInCard({
  item,
  index,
  currencyCode,
  coolingUnit,
  checkOutCode,
  totalCrates,
  setCrateIDs,
  openOptionsModal,
  disabled,
  cropName,
}: CheckedInCardProps) {
  const { t } = useTranslationUtils();

  const isRTL = LanguageManager.isRTL;

  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [isIdsModalOpen, setIsIdsModalOpen] = useState<number | undefined>(undefined);

  const getCratePrice = useCallback(
    (crates: ProduceCrate['crates']) => {
      const cropPricing = coolingUnit.crops.find((c) => c.cropId === item.crop.id);

      let price = 0;
      let type: EPricingType | undefined;

      if (cropPricing?.pricing) {
        type = cropPricing.pricing.pricingType;
        price =
          type === EPricingType.PERIODICITY
            ? cropPricing.pricing.dailyRate
            : cropPricing.pricing.fixedRate;
      } else {
        price = coolingUnit.commonPricingType?.value || 0;
        type = coolingUnit.commonPricingType?.type;
      }

      const metric = coolingUnit.commonPricingType?.metric;

      let totalPrice = 0;

      for (const crate of crates) {
        const metricMultiplier = metric === ECoolingUnitMetric.KILOGRAMS ? crate.weight : 1;

        if (type === EPricingType.FIXED) {
          totalPrice += metricMultiplier * price;
        } else {
          // For periodicity pricing, show daily rate
          totalPrice += metricMultiplier * price;
        }
      }

      return totalPrice.toFixed(2);
    },
    [coolingUnit, item.crop.id]
  );

  const pricePerKilo = useMemo(() => {
    if (!item.price) return 0;
    return (
      item.price / item.crates.reduce((acc, cur) => (acc += cur.isSellable ? cur.weight : 0), 0)
    );
  }, [item]);

  return (
    <View tw="rounded-md border border-gray-300 mb-2">
      <View tw="flex flex-row-reverse justify-between">
        {!checkOutCode ? (
          <TouchableOpacity tw="w-5 mr-2.5 mt-2.5" onPress={openOptionsModal} disabled={disabled}>
            <Icon source="dots-vertical" size={20} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <View tw="flex flex-row space-x-1 items-center px-1">
          <FastImage
            tw="w-20 h-20 my-1"
            source={{
              uri: `${API_BASE_URL}media/${item.crop.image}`,
              priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View tw="my-1 space-y-1">
            <Text tw="text-base text-green-primary">
              {cropName} ({item.crates.length})
            </Text>
            {item.additionalInfo ? <Text tw="text-sm">{item.additionalInfo}</Text> : null}

            {item.price ? (
              <View tw="flex flex-row space-x-1 items-center">
                <Icon source="cart" size={15} />
                <Text>
                  {formatCurrencyWithSymbol(currencyCode, pricePerKilo.toFixed(2))}&nbsp;/&nbsp;
                  {t('Dashboard.ProduceDetails.kilogram')}
                </Text>
              </View>
            ) : null}

            <View tw="flex flex-row items-center space-x-1">
              <ColdRoom width={14} height={14} tw="text-black" />
              <Text variant="TextMedium" tw="text-base">
                {formatCurrencyWithSymbol(currencyCode, getCratePrice(item.crates))}
                {coolingUnit.commonPricingType?.type === EPricingType.PERIODICITY
                  ? ` / ${t('Dashboard.CrateManagement.CheckIn.day')}`
                  : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {isExtended
        ? item.crates.map((crate, index) => (
            <View key={`crate-card-${index}`} tw="px-4 space-y-2 my-2 w-full">
              <Divider tw="bg-gray-500 w-full" />
              <View tw="w-full space-y-1 my-1 flex flex-row">
                <View tw="w-[70%] justify-start items-start space-y-2">
                  <View tw="flex flex-row justify-between w-full">
                    <Text>{t('Dashboard.History.pdfModal.checkOut.idLabel')}</Text>
                    <Text tw="text-gray-400">{crate.tag || ''}</Text>
                  </View>
                  <View tw="flex flex-row justify-between w-full">
                    <Text>{t('Dashboard.CoolingUnitsCratesInfo.weight')}</Text>
                    <Text tw="text-gray-400">
                      {crate.weight ?? ''}
                      {t('Dashboard.ProduceDetails.kilogram').toUpperCase()}
                    </Text>
                  </View>
                  <View tw="flex flex-row justify-between w-full">
                    <Text>
                      {t(
                        'Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.potentialSellingPrice'
                      )}
                    </Text>
                    <Text tw="text-gray-400">
                      {crate.isSellable
                        ? formatCurrencyWithSymbol(
                            currencyCode,
                            (pricePerKilo * crate.weight).toFixed(2)
                          )
                        : t('actions.not-available')}
                    </Text>
                  </View>
                </View>
                {crate.isSellable ? (
                  <View tw="w-[30%] items-end justify-center">
                    <View tw="items-center">
                      <Icon source="cart-outline" size={20} />
                      <Text tw="text-xs text-gray-500">
                        {t('Dashboard.CrateManagement.CheckIn.listed')}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          ))
        : null}

      <TouchableOpacity onPress={() => setIsExtended(!isExtended)}>
        <Text
          tw={cn(
            'self-center text-base text-green-primary mt-2 mb-2',
            isRTL && 'self-start ml-4',
            isExtended && 'mt-3 mb-2'
          )}
        >
          {isExtended
            ? t('Dashboard.CrateManagement.CheckIn.seeLess')
            : t('Dashboard.CrateManagement.CheckIn.seeMore')}
        </Text>
      </TouchableOpacity>

      {checkOutCode ? (
        <View tw="mx-4 mb-2">
          <IconButton
            tw="bg-gray-300 w-full px-1 self-center"
            icon={() => (
              <Text tw="w-full text-center font-bold text-wrap">
                {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateIdButton')}
              </Text>
            )}
            onPress={() => setIsIdsModalOpen(index)}
          />
          <CrateSetupModal
            setValue={(modalCrates) => setCrateIDs(modalCrates, item)}
            crates={item.crates.map((crate) => ({
              tag: crate.tag,
              weight: crate.weight,
              isSellable: crate.isSellable,
            }))}
            isOpen={isIdsModalOpen === index}
            numberOfCrates={totalCrates}
            closeModal={() => setIsIdsModalOpen(undefined)}
            title={t('Dashboard.CrateManagement.CheckIn.Setup.modals.id')}
          />
        </View>
      ) : null}
    </View>
  );
}
