import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import ColdRoom from '#assets/icons/coldroom.svg';
import MineCart from '#assets/icons/mine-cart.svg';
import { API_BASE_URL } from '#constants/environment';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { cn } from '#ui/lib/cn';
import { type DashboardProduce, EPricingType } from '#types/global';

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { farmerId } = useDashboardStore();

  const { data } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: 143, // TODO: fetch user's cooling units (when creating the filters)
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId,
      defaultData: [],
    }
  );

  const generateDaysString = useCallback((days: number) => {
    return `${days} Day${days > 1 ? 's' : ''}`;
  }, []);

  const getPricing = useCallback((produce: DashboardProduce) => {
    return `${produce.cratesCombinedCost}${produce.crates[0]?.pricing[0]?.pricingType === EPricingType.PERIODICITY ? ' / Day' : ''}`; // TODO: get currency
  }, []);

  return (
    <View tw="flex-1 items-center justify-center space-y-6">
      {data?.map((produce, index) => (
        <View key={`${produce.id}-${index}`} tw="w-[90%] h-24 flex flex-row">
          <View
            tw={cn(
              'bg-green-400 w-2 rounded-l-sm border-y-4 border-green-400',
              !produce.minimumRemainingShelfLife && 'bg-gray-300 border-gray-300'
            )}
          />
          <View tw="flex flex-row h-full w-full space-x-2 p-1 bg-white rounded-sm border border-l-0 border-gray-300">
            <View tw="justify-between items-center">
              <Image
                resizeMode="contain"
                tw="w-14 h-10"
                source={{ uri: `${API_BASE_URL}media/${produce.cropImage}` }}
              />
              <View tw="flex flex-row items-center space-x-1">
                <MineCart width={12} height={12} />
                <Text tw="text-base">{produce.cratesAmount}</Text>
              </View>
            </View>
            <View tw="w-full justify-between">
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <Text tw="text-base" variant="TextBold">
                  {produce.movementCode}
                </Text>
                <View tw="items-end">
                  {produce.minimumRemainingShelfLife && (
                    <Text tw="text-green-400 text-base font-bold">
                      {generateDaysString(produce.minimumRemainingShelfLife)}
                    </Text>
                  )}
                  <Text
                    tw="underline text-green-primary"
                    onPress={() => navigation.navigate('ProduceDetails')}
                  >
                    See Details
                  </Text>
                </View>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <View>
                  {produce.cropName.split(' ').map((name, index) => (
                    <Text key={`${name}-${index}`} tw="text-gray-400">
                      {name}
                    </Text>
                  ))}
                </View>
                <Text tw="text-gray-400">{produce.farmer}</Text>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <Text tw="text-gray-400">{getPricing(produce)}</Text>
                <View tw="flex flex-row items-center space-x-1">
                  <ColdRoom width={14} height={14} tw="text-black" />
                  <Text tw="text-base" variant="TextBold">
                    {generateDaysString(produce.currentStorageDays)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default withSafeArea(DashboardMain);
