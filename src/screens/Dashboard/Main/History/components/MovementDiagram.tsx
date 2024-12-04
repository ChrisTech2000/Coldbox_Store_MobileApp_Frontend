import startCase from 'lodash/startCase';
import React from 'react';
import { FlatList, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Divider } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EMovementType } from '#types/global';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

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
                    {index + 1}
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
    const crops = movement.movementCrops.map((crop) => crop.name);

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

        <FlatList
          data={crops}
          keyExtractor={(item, index) => `crop-section-${item}-${index}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const crates = movement.cratesCheckin.filter(
              (crate) => crate.name.toLowerCase() === item.toLowerCase()
            );
            const totalWeight = crates.reduce((acc, curr) => (acc += curr.weight), 0);

            return (
              <View tw="mb-4">
                {crops.length > 1 ? (
                  <Text variant="TextBold" tw="text-base mb-1">
                    {item}
                  </Text>
                ) : null}
                <View tw="flex flex-row items-center justify-between">
                  <View>
                    {crates.map((crate, index) => (
                      <View key={`${crate.name}—${index}-crate`} tw="flex flex-row space-x-4 mb-2">
                        <View>
                          <Text tw="text-base">
                            {startCase(
                              t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                            )}{' '}
                            {index + 1}
                          </Text>
                          <View tw="flex flex-row space-x-1">
                            <Text tw="text-base">{movement.code}</Text>
                            <Text tw="text-base text-red-700">
                              -{crate.weight}
                              {t('Dashboard.ProduceDetails.kilogram')}
                            </Text>
                          </View>
                        </View>
                        <View tw="flex flex-row mt-9">
                          <Divider tw="absolute w-4 h-0.5 bg-gray-700" />
                          {crates.length > 1 ? (
                            <Divider
                              tw={cn(
                                'absolute left-4 w-0.5 h-14 bg-gray-700',
                                index > 0 && 'bottom-[90%]'
                              )}
                            />
                          ) : null}
                        </View>
                      </View>
                    ))}
                  </View>

                  <View tw="self-center justify-center">
                    <Text tw="text-base">
                      {startCase(
                        t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                      )}{' '}
                      {crates.length + 1}
                    </Text>
                    <Text tw="text-base">{movement.code}</Text>
                    <Text tw="text-base text-green-500">
                      +{totalWeight}
                      {t('Dashboard.ProduceDetails.kilogram')}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  } else {
    return null;
  }
}
