import startCase from 'lodash/startCase';
import React from 'react';
import { Dimensions, FlatList, Platform, View } from 'react-native';
import { Divider } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EInitiatedFor } from '#types/global';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import ColdRoom from '#assets/icons/coldroom.svg';
import { sortMovementCrops } from '../utils/sortMovements';

type MovementDiagramProps = {
  coolingUnit: CoolingUnit;
  movement: GetMovementsHistoryResponse[number];
};

const windowHeight = Dimensions.get('window').height;

export function MovementDiagram({ coolingUnit, movement }: MovementDiagramProps) {
  const { t } = useTranslationUtils();

  const movementType = movement.initiatedFor;

  if (movementType === EInitiatedFor.CHECK_IN) {
    return (
      <View tw="px-4 pb-4 pt-2.5 space-y-1">
        <View tw="flex flex-row justify-between items-center mb-3">
          <View tw="flex flex-row items-center space-x-3">
            <Text tw="text-base">
              {t('Dashboard.History.stringTemplates.movementType.checkIn')}
            </Text>
            <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
          </View>

          <View tw="flex flex-row items-center space-x-3">
            <Text tw="text-base">{t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit')}</Text>
            <ColdRoom width={20} height={20} tw="text-black" />
          </View>
        </View>

        <View tw="w-full flex flex-row items-center justify-between space-x-6">
          <FlatList
            data={movement.checkin.crates}
            keyExtractor={(item, index) => `crate-${item.id}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View tw="flex flex-row justify-between mb-4 w-full">
                <View>
                  <Text tw="text-base">
                    {startCase(
                      t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                    )}{' '}
                    {item.tag || index + 1}
                  </Text>
                  <View tw="flex flex-row space-x-2 items-center flex-wrap">
                    <Text tw="text-base">{movement.code}</Text>
                    <Text tw="text-base text-green-500">
                      +{item.initialWeight}
                      {t('Dashboard.ProduceDetails.kilogram')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          <Divider tw="w-[10%] h-0.5 bg-gray-700" />
          <Text tw="text-base w-[40%] flex-wrap">{coolingUnit.name}</Text>
        </View>
      </View>
    );
  }

  if (movementType === EInitiatedFor.CHECK_OUT) {
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
          <Text tw="text-base w-[40%] flex-wrap">{coolingUnit.name}</Text>
          <Divider tw="w-[10%] h-0.5 bg-gray-700" />
          <FlatList
            data={movement.checkout.crates}
            keyExtractor={(item, index) => `crate-${item.id}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View tw="flex flex-row justify-between self-end mb-2">
                <View tw="items-end">
                  <Text tw="text-base">
                    {startCase(
                      t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates')
                    )}{' '}
                    {item.tag || index + 1}
                  </Text>
                  <View tw="flex flex-row space-x-2 items-center flex-wrap justify-end">
                    <Text tw="text-base">{movement.code}</Text>
                    <Text tw="text-base text-red-700">
                      -{item.initialWeight}
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

  if (movementType === EInitiatedFor.MARKETPLACE_ORDER) {
    const crops = sortMovementCrops(movement);

    return (
      <View tw="px-4 pb-4 pt-2.5 space-y-1">
        <View tw="flex flex-row justify-between items-center mb-3">
          <View tw="flex flex-row items-center space-x-3">
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
            const crates = movement.checkout.crates.filter(
              (crate) => crate.crop?.name.toLowerCase() === item.toLowerCase()
            );
            const totalWeight = crates.reduce((acc, curr) => (acc += curr.affectedWeight ?? 0), 0);

            return (
              <View tw="mb-4">
                <Text variant="TextBold" tw="text-base font-bold">
                  {item}
                </Text>

                <View tw="flex flex-row items-center justify-between">
                  <View>
                    {crates.map((crate, index) => (
                      <View
                        key={`${crate.crop?.name}—${index}-crate`}
                        tw="flex flex-row space-x-4 mb-2"
                      >
                        <View tw={windowHeight <= SMALL_SCREEN_THRESHOLD ? 'w-24' : 'w-32'}>
                          <Text tw="text-base">
                            {crate.tag
                              ? `${startCase(
                                  t(
                                    'Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates'
                                  )
                                )} ${crate.tag}`
                              : ' '}
                          </Text>

                          <Text tw="text-base">{crate.ownerName}</Text>

                          <Text tw="text-base text-red-700">
                            -{crate.affectedWeight ?? 0}
                            {t('Dashboard.ProduceDetails.kilogram')}
                          </Text>
                        </View>
                        <View tw="flex flex-row mt-9">
                          <Divider
                            tw={cn(
                              'absolute h-0.5 bg-gray-700',
                              windowHeight <= SMALL_SCREEN_THRESHOLD ? 'w-4' : 'w-8'
                            )}
                          />
                          {crates.length > 1 ? (
                            <Divider
                              tw={cn(
                                'absolute w-0.5 h-20 bg-gray-700',
                                windowHeight > SMALL_SCREEN_THRESHOLD ? 'left-8' : 'left-4',
                                index > 0 &&
                                  (Platform.OS === 'ios' || windowHeight > SMALL_SCREEN_THRESHOLD
                                    ? 'bottom-[94%]'
                                    : 'bottom-[95%]')
                              )}
                            />
                          ) : null}
                        </View>
                      </View>
                    ))}
                    {crates.length > 1 ? (
                      <Divider
                        tw={cn(
                          'absolute h-0.5 bg-gray-700 bottom-[50%]',
                          windowHeight > SMALL_SCREEN_THRESHOLD ? 'w-8 left-44' : 'w-4 left-32'
                        )}
                      />
                    ) : null}
                  </View>

                  <View tw="self-center justify-center">
                    <Text tw="text-base">{movement.checkin.ownerName}</Text>
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
