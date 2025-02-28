import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import * as BottomSheet from '#ui/components/BottomSheet';

import { useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { GetAllOrdersResponse } from '#types/api.responses';
import { DEFAULT_CROP_VALUES } from '../../Marketplace/utils';

export default function CropsBottomSheet() {
  const { t } = useTranslationUtils();
  const [crops] = useDashboardStore((store) => [store.allCrops ?? []]);

  const [data, setData] = useState<GetAllOrdersResponse | undefined>(undefined);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  useAppEventListener(APP_EVENTS.DISPATCH_CROPS_BOTTOM_SHEET, (data: GetAllOrdersResponse) => {
    modalActions.open();
    setData(data);
  });

  const cropMap = useMemo(() => new Map(crops.map((crop) => [crop.id, crop])), [crops]);

  return (
    <BottomSheet.Root ref={modalRef} onClose={() => setData(undefined)}>
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-xl">{t('Dashboard.MyOrders.cropType')}</Text>
        <FlatList
          data={data?.items ?? []}
          keyExtractor={(item) => `crop-${item.relCrateId ?? ''}-${item.relCropId ?? ''}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View tw="py-2">
              <View tw="flex flex-row justify-between w-full">
                <Text tw="text-base">
                  {cropMap.get(item.relCropId)?.name ?? DEFAULT_CROP_VALUES.name}
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
