import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { Text } from '#ui/components/Text';
import { API_BASE_URL } from '#constants/environment';
import { Divider, Icon } from 'react-native-paper';

function CropList({ route }: CheckInStackRouteProps<'CropList'>) {
  const { type, coolingUnit } = route.params;

  const { data } = useApiCall(
    'getCoolingUnitCrops',
    ColdtivateService.getCoolingUnitCrops,
    {
      crop: type,
      coolingUnitId: coolingUnit.id,
    },
    {
      skip: !coolingUnit.id || !type,
    }
  );

  return (
    <View>
      <ScrollView>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <View key={`${item}-${index}`} tw="w-full">
              <View tw="flex flex-row w-full items-center justify-between">
                <Image
                  resizeMode="contain"
                  tw="w-20 h-20"
                  source={{ uri: `${API_BASE_URL}media/${item.fullCrop.image}` }}
                />
                <Text variant="TitleMedium">{item.fullCrop.name}</Text>
                <Icon source="plus-circle-outline" size={20} />
              </View>
              <Divider tw="bg-grey-400" />
            </View>
          )}
          estimatedItemSize={40}
          // estimatedListSize={{
          //   height: deviceHeight,
          //   width: deviceWidth / 2,
          // }}
        />
      </ScrollView>
    </View>
  );
}

export default withSafeArea(CropList);
