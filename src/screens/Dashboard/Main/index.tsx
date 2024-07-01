import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import ColdRoom from '#assets/icons/coldroom.svg';
import MineCart from '#assets/icons/mine-cart.svg';
import { API_BASE_URL } from '#constants/environment';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { TextBold, TextRegular } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { cn } from '#ui/lib/cn';
import { type DashboardProduce, type Company, type CoolingUnit, EPricingType } from '#types/global';

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { farmerId, farmerCompanies } = useDashboardStore();

  const [selectedCompany] = useState<Company | null>(farmerCompanies?.[0] ?? null);
  const [selectedUnit, setSelectedUnit] = useState<CoolingUnit | null>(null);

  const { data: coolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      company: selectedCompany?.id as number,
    },
    {
      skip: !selectedCompany,
      defaultData: [],
    }
  );

  const { data: dashboardProduces } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: selectedUnit?.id as number,
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId || !selectedUnit,
      defaultData: [],
    }
  );

  const generateDaysString = useCallback((days: number) => {
    return `${days} Day${days > 1 ? 's' : ''}`;
  }, []);

  const getPricing = useCallback((produce: DashboardProduce) => {
    return `${produce.cratesCombinedCost}${produce.crates[0]?.pricing[0]?.pricingType === EPricingType.PERIODICITY ? ' / Day' : ''}`; // TODO: get currency
  }, []);

  useEffect(() => {
    if (coolingUnits) {
      setSelectedUnit(coolingUnits[0]);
    }
  }, [coolingUnits]);

  return (
    <View tw="flex-1 items-center justify-center space-y-6">
      {dashboardProduces?.map((produce, index) => (
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
                <TextRegular tw="text-base">{produce.cratesAmount}</TextRegular>
              </View>
            </View>
            <View tw="w-full justify-between">
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <TextBold tw="font-bold text-base">{produce.movementCode}</TextBold>
                <View tw="items-end">
                  {produce.minimumRemainingShelfLife && (
                    <TextRegular tw="text-green-400 text-base font-bold">
                      {generateDaysString(produce.minimumRemainingShelfLife)}
                    </TextRegular>
                  )}
                  <TextRegular
                    tw="underline text-green-primary"
                    onPress={() => navigation.navigate('ProduceDetails')}
                  >
                    See Details
                  </TextRegular>
                </View>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <View>
                  {produce.cropName.split(' ').map((name, index) => (
                    <TextRegular key={`${name}-${index}`} tw="text-gray-400">
                      {name}
                    </TextRegular>
                  ))}
                </View>
                <TextRegular tw="text-gray-400">{produce.farmer}</TextRegular>
              </View>
              <View tw="flex flex-row items-center w-[80%] justify-between">
                <TextRegular tw="text-gray-400">{getPricing(produce)}</TextRegular>
                <View tw="flex flex-row items-center space-x-1">
                  <ColdRoom width={14} height={14} tw="text-black" />
                  <TextBold tw="text-base">
                    {generateDaysString(produce.currentStorageDays)}
                  </TextBold>
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
