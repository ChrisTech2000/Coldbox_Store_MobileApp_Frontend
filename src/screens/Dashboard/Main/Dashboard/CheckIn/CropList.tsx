import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon } from 'react-native-paper';

import { API_BASE_URL } from '#constants/environment';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
                <FastImage
                  tw="w-20 h-20 m-1"
                  source={{
                    uri: `${API_BASE_URL}media/${item.fullCrop.image}`,
                    priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text variant="TitleMedium">{item.fullCrop.name}</Text>
                <Icon source="plus-circle-outline" size={20} />
              </View>
              <Divider tw="bg-grey-400" />
            </View>
          )}
          estimatedItemSize={40}
          estimatedListSize={{
            height: deviceHeight,
            width: deviceWidth / 2,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default withSafeArea(CropList);
