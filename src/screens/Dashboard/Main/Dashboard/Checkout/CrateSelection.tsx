import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { CoolingUnit } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';

import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';
import { CheckoutCrate } from '../components/CheckOutCrate';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();

function CheckOut({ route, navigation }: CheckOutStackRouteProps<'CrateSelection'>) {
  const { user } = route.params;
  const { t } = useTranslationUtils();
  const { coolingUnits } = useDashboardStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const colors = useTailwindColors();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [selectedCrates, setSelectedCrates] = useState<number[]>([]);

  const { data } = useApiCall(
    'getFarmerCrates',
    ColdtivateService.getFarmerCrates,
    {
      coolingUnit: coolingUnit?.id as number,
      farmer: user?.id as number,
    },
    {
      skip: !user?.id || !coolingUnit?.id,
    }
  );

  const onPress = useCallback(
    (crateId: number) => {
      const copySelectedCrates = [...selectedCrates];
      const index = copySelectedCrates.indexOf(crateId);

      if (index !== -1) copySelectedCrates.splice(index, 1);
      else copySelectedCrates.push(crateId);

      setSelectedCrates(copySelectedCrates);
    },
    [selectedCrates]
  );

  const onSelectAll = useCallback(() => {
    if (selectedCrates.length === data?.length) {
      setSelectedCrates([]);
      return;
    }

    const ids = data?.map((crate) => crate.id);
    if (ids && ids.length > 0) setSelectedCrates(ids);
  }, [data, selectedCrates]);

  return (
    <View tw="flex-1 p-4">
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg">
          {user?.user.firstName}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUnitLabel')}
        </Text>
        <SelectWithStore<CoolingUnit>
          datums={coolingUnits ?? []}
          isModalVisible={isUnitsModalOpen}
          setIsModalVisible={setIsUnitsModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useCoolingUnitStore}
          label={
            coolingUnit
              ? t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
                  name: coolingUnit.name,
                })
              : `${t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}...`
          }
          modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
        />
      </View>
      <Divider tw="bg-gray-400 my-2" />
      {!coolingUnit && (
        <Text variant="TextBold" tw="text-lg mt-2 ml-4">
          {t('Dashboard.CrateManagement.noUnitWarning')}
        </Text>
      )}

      {coolingUnit && data?.length === 0 && (
        <Text variant="TextBold" tw="text-lg mt-2 ml-4">
          {t('Dashboard.CrateManagement.noCratesWarning')}
        </Text>
      )}

      {coolingUnit && data && data.length > 0 && (
        <>
          <Text variant="TextBold" tw="text-lg mt-2 mb-1 ml-4">
            {t('Dashboard.CrateManagement.CheckOut.selectCrateMessage')}
          </Text>
          <View tw="flex flex-row justify-between items-center">
            <Text variant="TextBold" tw="text-lg mt-2 ml-4">
              {t('Dashboard.CrateManagement.CheckOut.selectAll')}
            </Text>
            <TouchableOpacity tw="mr-2" onPress={onSelectAll}>
              {selectedCrates.length < data.length ? (
                <Icon
                  source="checkbox-blank-circle-outline"
                  color={colors.green.primary}
                  size={30}
                />
              ) : (
                <Icon source="check-circle-outline" color={colors.green.primary} size={30} />
              )}
            </TouchableOpacity>
          </View>

          <FlatList
            data={data ?? []}
            extraData={selectedCrates.length}
            renderItem={({ item: crate, index }) => (
              <View tw="flex flex-row items-center" key={`${crate.id}-${index}`}>
                <CheckoutCrate crate={crate} />
                <TouchableOpacity tw="absolute right-2 bottom-8" onPress={() => onPress(crate.id)}>
                  {selectedCrates.includes(crate.id) ? (
                    <Icon source="check-circle-outline" color={colors.green.primary} size={30} />
                  ) : (
                    <Icon
                      source="checkbox-blank-circle-outline"
                      color={colors.green.primary}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
      <View tw="flex flex-row space-x-2 w-full mt-4 justify-center">
        <Button
          tw="border-green-primary"
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.goBack();
          }}
          icon="arrow-left"
        >
          {t('actions.back')}
        </Button>
        <Button
          mode="contained"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.goBack();
          }}
          icon="arrow-right"
          disabled={selectedCrates.length === 0}
        >
          {t('actions.next')}
        </Button>
      </View>
    </View>
  );
}

export default withSafeArea(CheckOut);
