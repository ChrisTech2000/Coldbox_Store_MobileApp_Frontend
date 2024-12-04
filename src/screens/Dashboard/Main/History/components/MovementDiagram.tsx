import startCase from 'lodash/startCase';
import React from 'react';
import { FlatList, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Divider } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EMovementType } from '#types/global';
import { Text } from '#ui/components/Text';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import ColdRoom from '#assets/icons/coldroom.svg';

type MovementDiagramProps = {
  coolingUnit: CoolingUnit;
  movement: GetMovementsHistoryResponse[number];
};

export function MovementDiagram({ coolingUnit, movement }: MovementDiagramProps) {
  const { t } = useTranslationUtils();

  const movementType = movement.movementType;

  if (movementType === EMovementType.IN) {
    return <View></View>;
  }

  if (movementType === EMovementType.OUT) {
    return (
      <View tw="px-4 pb-4 pt-2.5 space-y-1">
        <View tw="flex flex-row justify-between items-center mb-3">
          <View tw="flex flex-row items-center space-x-3">
            <Text tw="text-base">{t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit')}</Text>
            <ColdRoom width={20} height={20} tw="text-black" />
          </View>

          <View tw="flex flex-row items-center space-x-1">
            <Text tw="text-base">
              {t('Dashboard.History.stringTemplates.movementType.checkOut')}
            </Text>
            <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />
          </View>
        </View>

        <View tw="w-full flex flex-row items-center justify-between space-x-6">
          <Text tw="text-base">{coolingUnit.name}</Text>
          <Divider tw="w-12 h-0.5 bg-gray-700" />
          <FlatList
            data={movement.cratesCheckin}
            keyExtractor={(item, index) => `crate-${item.name}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View tw="flex flex-row justify-between self-end">
                <View tw="items-end">
                  <Text tw="text-base">
                    {startCase(
                      t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                    )}{' '}
                    {item.tag || index + 1}
                  </Text>
                  <View tw="flex flex-row space-x-2 items-center">
                    <Text tw="text-base">{movement.code}</Text>
                    <Text tw="text-base text-red-700">
                      -{item.weight}
                      {t('Dashboard.ProduceDetails.kilogram')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  if (movementType === EMovementType.MARKETPLACE) {
    console.log(movement.cratesCheckin[0].amount);
    return (
      <View tw="px-4 pb-4 pt-2.5 space-y-1">
        <View tw="flex flex-row justify-between items-center mb-3">
          <View tw="flex flex-row items-center space-x-1">
            <Text tw="text-base">
              {t('Dashboard.History.stringTemplates.movementType.checkOut')}
            </Text>
            <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />
          </View>

          <View tw="flex flex-row items-center space-x-3">
            <Text tw="text-base">
              {t('Dashboard.History.stringTemplates.movementType.checkIn')}
            </Text>
            <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
          </View>
        </View>

        <View tw="w-full flex flex-row items-center justify-between space-x-6">
          <FlatList
            data={movement.cratesCheckin}
            keyExtractor={(item, index) => `crate-${item.name}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View tw="flex flex-row justify-between self-end">
                <View tw="items-end">
                  <Text tw="text-base">
                    {startCase(
                      t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                    )}{' '}
                    {item.tag || index + 1}
                  </Text>
                  <View tw="flex flex-row space-x-2 items-center">
                    <Text tw="text-base">{movement.code}</Text>
                    <Text tw="text-base text-red-700">
                      -{item.weight}
                      {t('Dashboard.ProduceDetails.kilogram')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  } else {
    return null;
  }
}
