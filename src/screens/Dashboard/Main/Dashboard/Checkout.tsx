import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { CoolingUnit } from '#types/global';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import SelectWithStore, { createSelectStore } from '../components/SelectWithStore';
import { CheckoutCrate } from './components/CheckOutCrate';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();

function CheckOut({ route }: MainTabStackRouteProps<'CheckOut'>) {
  const { user } = route.params;
  const { t } = useTranslationUtils();
  const { coolingUnits } = useDashboardStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();

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
      console.log(crateId, '#', selectedCrates);
      const copySelectedCrates = [...selectedCrates];
      const index = copySelectedCrates.indexOf(crateId);

      if (index !== -1) copySelectedCrates.splice(index, 1);
      else copySelectedCrates.push(crateId);

      setSelectedCrates(copySelectedCrates);
    },
    [selectedCrates]
  );

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
        <Text variant="TextBold" tw="text-lg mt-2 ml-4">
          {t('Dashboard.CrateManagement.CheckOut.selectCrateMessage')}
        </Text>
      )}

      <FlatList
        data={data ?? []}
        extraData={selectedCrates.length}
        renderItem={({ item: crate, index }) => (
          <TouchableOpacity
            key={`${crate.id}-${index}`}
            tw="flex flex-row items-center"
            onPress={() => onPress(crate.id)}
          >
            <CheckoutCrate crate={crate} />
            <View tw="absolute right-[-2]">
              <RadioButtonItem
                rippleColor="white"
                onPress={() => onPress(crate.id)}
                label=""
                value={crate.id.toString()}
                status={selectedCrates.includes(crate.id) ? 'checked' : 'unchecked'}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default withSafeArea(CheckOut);
