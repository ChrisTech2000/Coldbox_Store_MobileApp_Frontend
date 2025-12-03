import startCase from 'lodash/startCase';
import React, { useMemo } from 'react';
import { Dimensions, FlatList, Platform, View } from 'react-native';
import { Divider } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EInitiatedFor, MovementCrate } from '#types/global';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import ColdRoom from '#assets/icons/coldroom.svg';
import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';

type MovementDiagramProps = {
  coolingUnit: CoolingUnit;
  movement: GetMovementsHistoryResponse[number];
};

const windowHeight = Dimensions.get('window').height;

export function MovementDiagram(props: MovementDiagramProps) {
  switch (props.movement.initiatedFor) {
    case EInitiatedFor.CHECK_IN:
      return <MovementDiagramCheckIn {...props} />;
    case EInitiatedFor.CHECK_OUT:
      return <MovementDiagramCheckOut {...props} />;
    case EInitiatedFor.MARKETPLACE_ORDER:
      return <MovementDiagramMarketplaceOrder {...props} />;
    default:
      return null;
  }
}

function MovementDiagramCheckIn(props: MovementDiagramProps) {
  const { movement, coolingUnit } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="px-4 pb-4 pt-2.5 space-y-1">
      <View tw="flex flex-row justify-between items-center mb-3">
        <View tw="flex flex-row items-center space-x-3">
          <Text tw="text-base">{t('Dashboard.History.stringTemplates.movementType.checkIn')}</Text>
          <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
        </View>

        <View tw="flex flex-row items-center space-x-3">
          <Text tw="text-base">{t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit')}</Text>
          <ColdRoom width={20} height={20} tw="text-black" />
        </View>
      </View>

      <View tw="w-full flex flex-row items-center justify-between space-x-6">
        <FlatList
          data={movement?.checkin?.crates}
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
                  {item?.tag || index + 1}
                </Text>
                <View tw="flex flex-row space-x-2 items-center flex-wrap">
                  <Text tw="text-base">{movement?.code}</Text>
                  <Text tw="text-base text-green-500">
                    +{item?.initialWeight}
                    {t('Dashboard.ProduceDetails.kilogram')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <Divider tw="w-[10%] h-0.5 bg-gray-700" />
        <Text tw="text-base w-[40%] flex-wrap">{coolingUnit?.name}</Text>
      </View>
    </View>
  );
}

function MovementDiagramCheckOut(props: MovementDiagramProps) {
  const { movement, coolingUnit } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="px-4 pb-4 pt-2.5 space-y-1">
      <View tw="flex flex-row justify-between items-center mb-3">
        <View tw="flex flex-row items-center space-x-3">
          <Text tw="text-base">{t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit')}</Text>
          <ColdRoom width={20} height={20} tw="text-black" />
        </View>

        <View tw="flex flex-row items-center space-x-1">
          <Text tw="text-base">{t('Dashboard.History.stringTemplates.movementType.checkOut')}</Text>
          <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />
        </View>
      </View>

      <View tw="w-full flex flex-row items-center justify-between space-x-6">
        <Text tw="text-base w-[40%] flex-wrap">{coolingUnit?.name}</Text>
        <Divider tw="w-[10%] h-0.5 bg-gray-700" />
        <FlatList
          data={movement?.checkout?.crates}
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
                  {item?.tag || index + 1}
                </Text>
                <View tw="flex flex-row space-x-2 items-center flex-wrap justify-end">
                  <Text tw="text-base">{movement?.code}</Text>
                  <Text tw="text-base text-red-700">
                    -{item?.initialWeight}
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

function MovementDiagramMarketplaceOrder(props: MovementDiagramProps) {
  const { movement } = props;

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const locale = LanguageManager.read();

  const { t } = useTranslationUtils();

  const datums = useMemo(() => {
    const cropCratesMap: Record<number, Array<MovementCrate>> = {};

    for (const crate of movement?.checkout?.crates ?? []) {
      const cropId = crate.cropId;
      if (!cropCratesMap[cropId]) {
        cropCratesMap[cropId] = [];
      }
      cropCratesMap[cropId].push(crate);
    }

    const uniqueCropsMap = new Map<number, string>();

    const extractCrops = (crates: Array<MovementCrate>) => {
      for (const crate of crates) {
        if (!uniqueCropsMap.has(crate.cropId)) {
          uniqueCropsMap.set(crate.cropId, crate.crop?.name || getDefaultCropValues(t).name);
        }
      }
    };

    extractCrops(movement?.checkin?.crates ?? []);
    extractCrops(movement?.checkout?.crates ?? []);

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();
    const country = companyCountry || farmerCountry || undefined;

    return Array.from(uniqueCropsMap.entries()).map(([cropId, cropName]) => {
      const crates = cropCratesMap[cropId] ?? [];
      const translatedName = find(translationMap, {
        name: cropName,
        country,
        locale,
      });
      return [
        translatedName,
        {
          crates,
          totalWeight: crates.reduce((sum, crate) => sum + (crate.affectedWeight ?? 0), 0),
        },
      ] as const;
    });
  }, [movement, companyCountry, farmerCountry, locale]);

  return (
    <View tw="px-4 pb-4 pt-2.5 space-y-1">
      <View tw="flex flex-row justify-between items-center mb-3">
        <View tw="flex flex-row items-center space-x-3">
          <Text tw="text-base">{t('Dashboard.History.stringTemplates.movementType.checkOut')}</Text>
          <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />
        </View>

        <View tw="flex flex-row items-center space-x-3">
          <Text tw="text-base">{t('Dashboard.History.stringTemplates.movementType.checkIn')}</Text>
          <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
        </View>
      </View>

      <FlatList
        data={datums}
        keyExtractor={(item, index) => `crop-section-${item}-${index}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: [cropName, { crates, totalWeight }] }) => {
          return (
            <View tw="mb-4">
              <Text variant="TextBold" tw="text-base font-bold">
                {cropName}
              </Text>

              <View tw="flex flex-row items-center justify-between space-x-6">
                <View tw="flex-1">
                  {crates.map((crate, index) => (
                    <View
                      key={`${crate.crop?.name}—${index}-crate`}
                      tw="flex flex-row space-x-4 mb-2"
                    >
                      <View
                        tw={
                          windowHeight <= SMALL_SCREEN_THRESHOLD && Platform.OS === 'ios'
                            ? 'w-24'
                            : 'w-32'
                        }
                      >
                        <Text tw="text-base">
                          {crate?.tag
                            ? `${startCase(
                                t(
                                  'Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates'
                                )
                              )} ${crate?.tag}`
                            : ' '}
                        </Text>

                        <Text tw="text-base w-40" numberOfLines={2}>
                          {crate?.ownerName}
                        </Text>

                        <Text tw="text-base text-red-700">
                          -{crate?.affectedWeight ?? 0}
                          {t('Dashboard.ProduceDetails.kilogram')}
                        </Text>
                      </View>
                      <View tw="flex flex-row mt-9">
                        <Divider
                          tw={cn(
                            'absolute h-0.5 bg-gray-700',
                            windowHeight <= SMALL_SCREEN_THRESHOLD && Platform.OS === 'ios'
                              ? 'w-4'
                              : 'w-8'
                          )}
                        />
                        {crates.length > 1 ? (
                          <Divider
                            tw={cn(
                              'absolute w-0.5 h-20 bg-gray-700',
                              windowHeight <= SMALL_SCREEN_THRESHOLD && Platform.OS === 'ios'
                                ? 'left-4'
                                : 'left-8',
                              index > 0 && 'bottom-[94%]'
                            )}
                          />
                        ) : null}
                      </View>
                    </View>
                  ))}
                  {crates.length > 1 ? (
                    <Divider
                      tw={cn(
                        'absolute h-0.5 bg-gray-700 bottom-[50.5%]',
                        windowHeight <= SMALL_SCREEN_THRESHOLD && Platform.OS === 'ios'
                          ? 'w-4 left-32'
                          : 'w-8 left-44'
                      )}
                    />
                  ) : null}
                </View>

                <View tw="self-center justify-center w-[40%] pl-4">
                  <Text tw="text-base" numberOfLines={2}>
                    {movement?.checkin?.ownerName}
                  </Text>
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
}
