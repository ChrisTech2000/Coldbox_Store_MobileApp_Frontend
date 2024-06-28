import React from 'react';
import { Image, View } from 'react-native';

import MineCart from '#assets/icons/mine-cart.svg';
import { API_BASE_URL } from '#constants/environment';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { TextBold, TextRegular } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { farmerId } = useDashboardStore();

  const { data } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: 143, // TODO: fetch user's cooling units
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId,
      defaultData: [],
    }
  );

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      {data?.map((produce, index) => (
        <View key={`${produce.id}-${index}`} tw="w-[90%] h-24 flex flex-row">
          <View tw="bg-green-300 w-2 rounded-l-sm border-y-4 border-green-300" />
          <View tw="flex flex-row h-full w-full space-x-2 p-1 bg-white rounded-sm border border-l-0 border-gray-300">
            <View tw="justify-between items-center">
              <Image
                resizeMode="contain"
                tw="w-14 h-10"
                source={{ uri: `${API_BASE_URL}media/${produce.cropImage}` }}
              />
              <View tw="flex flex-row items-center space-x-1">
                <MineCart width={12} height={12} />
                <TextRegular tw="text-base">{produce.cratesAmount}</TextRegular>
              </View>
            </View>
            <View tw="w-full justify-between">
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <TextBold tw="font-bold text-base">{produce.movementCode}</TextBold>
                <TextRegular
                  tw="underline text-green-primary"
                  onPress={() => navigation.navigate('ProduceDetails')}
                >
                  See Details
                </TextRegular>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <TextRegular tw="text-gray-400">{produce.cropName}</TextRegular>
                <TextRegular tw="text-gray-400">{produce.farmer}</TextRegular>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <TextRegular tw="text-gray-400">{produce.cropName}</TextRegular>
                <TextBold tw="text-base">{produce.currentStorageDays}</TextBold>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default withSafeArea(DashboardMain);
