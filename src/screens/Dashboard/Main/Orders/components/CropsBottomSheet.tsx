import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import * as BottomSheet from '#ui/components/BottomSheet';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { GetAllOrdersResponse } from '#types/api.responses';

export default function CropsBottomSheet() {
  const { t } = useTranslationUtils();

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const [crops, farmerCountry] = useDashboardStore((store) => [
    store.allCrops,
    store.farmerCountry,
  ]);

  const [data, setData] = useState<GetAllOrdersResponse | undefined>(undefined);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const locale = LanguageManager.read();

  useAppEventListener(APP_EVENTS.DISPATCH_CROPS_BOTTOM_SHEET, (data: GetAllOrdersResponse) => {
    modalActions.open();
    setData(data);
  });

  const cropDatums = useMemo(() => {
    const record: Record<number, string> = {};
    if (!crops?.length) return record;

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const crop of crops) {
      if (typeof record?.[crop.id] === 'string') continue;
      record[crop.id] = find(translationMap, {
        name: crop.name,
        country: companyCountry || farmerCountry || undefined,
        locale,
      });
    }

    return record;
  }, [crops, companyCountry, farmerCountry, locale]);

  const sortedItems = useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) => {
      const nameA = cropDatums[a.relCropId] || '';
      const nameB = cropDatums[b.relCropId] || '';
      return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
    });
  }, [data?.items, cropDatums]);

  return (
    <BottomSheet.Root ref={modalRef} onClose={() => setData(undefined)}>
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-xl">{t('Dashboard.MyOrders.cropType')}</Text>
        <FlatList
          data={sortedItems}
          keyExtractor={(item) => `crop-${item.relCrateId ?? ''}-${item.relCropId ?? ''}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View tw="py-2">
              <View tw="flex flex-row justify-between w-full">
                <Text tw="text-base">
                  {cropDatums?.[item.relCropId] ?? getDefaultCropValues(t).name}
                </Text>
                <Text tw="text-base uppercase">
                  {item.orderedProduceWeight}
                  {t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.kg')}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <Divider tw="w-full bg-zinc-500 my-2" />}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          mode="contained"
          tw="w-5/6"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            modalActions.close();
          }}
        >
          {t('Dashboard.ShoppingCart.gotItButton')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet.Root>
  );
}
