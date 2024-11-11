import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Divider, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import { useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { GetAllOrdersResponse } from '#types/api.responses';

export default function CropsBottomSheet() {
  const { t } = useTranslationUtils();
  const [crops] = useDashboardStore((store) => [store.allCrops ?? []]);

  const modalRef = useRef<Modalize>(null);
  const [data, setData] = useState<GetAllOrdersResponse | undefined>(undefined);

  useAppEventListener(APP_EVENTS.DISPATCH_CROPS_BOTTOM_SHEET, (data: GetAllOrdersResponse) => {
    modalRef.current?.open();
    setData(data);
  });

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
        onClose={() => setData(undefined)}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="px-4 pb-4 pt-2.5 space-y-3.5">
          <Text tw="text-xl">{t('Dashboard.MyOrders.cropType')}</Text>
          <FlatList
            data={data?.items ?? []}
            keyExtractor={(item) => `crop-${item.relCrateId ?? ''}-${item.relCropId ?? ''}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const crop = crops.find((c) => c.id === item.relCropId)?.name ?? '';
              return (
                <View tw=" py-2">
                  <View tw="flex flex-row justify-between w-full">
                    <Text tw="text-base">{crop}</Text>
                    <Text tw="text-base uppercase">
                      {item.orderedProduceWeight}
                      {t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.kg')}
                    </Text>
                  </View>
                  {data?.items.length && data.items.length > 1 ? (
                    <Divider tw="w-full bg-zinc-500 my-2" />
                  ) : null}
                </View>
              );
            }}
          />
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300 mb-4">
          <Button mode="contained" tw="w-5/6" uppercase onPress={() => modalRef.current?.close()}>
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
