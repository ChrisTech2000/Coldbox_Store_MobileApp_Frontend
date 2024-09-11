import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { CoolingUnit, Crate } from '#types/global';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { CheckoutCrate } from '../components/CheckOutCrate';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();

function CrateSelection({ route, navigation }: CheckOutStackRouteProps<'CrateSelection'>) {
  const { user, coolingUnit: _coolingUnit, crates: _crates } = route.params;
  const { t } = useTranslationUtils();
  const { coolingUnits } = useDashboardStore();
  const { selectedItem: coolingUnit, onSelect: onSelectCoolingUnit } = useCoolingUnitStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [selectedCrates, setSelectedCrates] = useState<Crate[]>([]);

  const { data } = useApiCall(
    'getFarmerCrates',
    ColdtivateService.getFarmerCrates,
    {
      coolingUnit: coolingUnit?.id as number,
      farmer: user?.id as number,
    },
    {
      skip: !user?.id || !coolingUnit?.id || !!_crates?.length,
    }
  );

  const crates = useMemo(() => _crates ?? data, [_crates, data]);

  const onPress = useCallback(
    (crate: Crate) => {
      const copySelectedCrates = [...selectedCrates];
      const index = copySelectedCrates.indexOf(crate);

      if (index !== -1) copySelectedCrates.splice(index, 1);
      else copySelectedCrates.push(crate);

      setSelectedCrates(copySelectedCrates);
    },
    [selectedCrates]
  );

  const onSelectAll = useCallback(() => {
    if (selectedCrates.length === crates?.length) {
      setSelectedCrates([]);
      return;
    }

    setSelectedCrates(crates ?? []);
  }, [crates, selectedCrates]);

  const onNext = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      navigation.navigate('BillingInfo', {
        user,
        crates: selectedCrates,
        coolingUnit: coolingUnit ?? undefined,
      });
    },
    [selectedCrates, coolingUnit, user]
  );

  useEffect(() => {
    if (_crates) setSelectedCrates(_crates);
    if (_coolingUnit) onSelectCoolingUnit(_coolingUnit);
  }, [_crates, _coolingUnit]);

  return (
    <View tw="flex-1 p-4">
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg max-w-[70%]" numberOfLines={1}>
          {t('Dashboard.CrateManagement.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg max-w-[30%]" numberOfLines={1}>
          {user?.user.firstName}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />
      <View tw="flex flex-row w-full justify-between items-center">
        <Text
          variant="TextMedium"
          tw="text-lg max-w-[70%]"
          numberOfLines={1}
        >
          {t('Dashboard.CrateManagement.selectCoolingUnitLabel')}
        </Text>
        <View tw="max-w-[30%]">
          <SelectWithStore<CoolingUnit>
            datums={coolingUnits ?? []}
            isModalVisible={isUnitsModalOpen}
            setIsModalVisible={setIsUnitsModalOpen}
            itemName={(item) => item?.name}
            disabled={!!_crates?.length}
            useSelectStore={useCoolingUnitStore}
            label={
              coolingUnit
                ? coolingUnit.name
                : `${t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}...`
            }
            modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
          />
        </View>
      </View>
      <Divider tw="bg-gray-400 my-2" />
      {!coolingUnit && (
        <Text variant="TextBold" tw="text-lg mt-2 ml-4">
          {t('Dashboard.CrateManagement.noUnitWarning')}
        </Text>
      )}

      {coolingUnit && crates?.length === 0 && (
        <Text variant="TextBold" tw="text-lg mt-2 ml-4">
          {t('Dashboard.CrateManagement.noCratesWarning')}
        </Text>
      )}

      {coolingUnit && crates && crates.length > 0 && (
        <>
          <Text variant="TextBold" tw="text-lg mt-2 mb-1 ml-4">
            {t('Dashboard.CrateManagement.CheckOut.selectCrateMessage')}
          </Text>
          <TouchableOpacity tw="flex flex-row justify-between items-center" onPress={onSelectAll}>
            <Text variant="TextBold" tw="text-lg mt-2 ml-4">
              {t('Dashboard.CrateManagement.CheckOut.selectAll')}
            </Text>
            <RadioButtonItem
              rippleColor="white"
              onPress={onSelectAll}
              label=""
              value=""
              status={selectedCrates.length === crates.length ? 'checked' : 'unchecked'}
            />
          </TouchableOpacity>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={crates ?? []}
            extraData={selectedCrates.length}
            renderItem={({ item: crate, index }) => (
              <TouchableOpacity
                key={`${crate.id}-${index}`}
                tw="flex flex-row items-center"
                onPress={() => onPress(crate)}
              >
                <CheckoutCrate crate={crate} />
                <View tw="absolute right-[-2]">
                  <RadioButtonItem
                    rippleColor="white"
                    onPress={() => onPress(crate)}
                    label=""
                    value={crate.id.toString()}
                    status={selectedCrates.includes(crate) ? 'checked' : 'unchecked'}
                  />
                </View>
              </TouchableOpacity>
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
          onPress={onNext}
          contentStyle="flex flex-row-reverse items-center"
          icon="arrow-right"
          disabled={selectedCrates.length === 0}
        >
          {t('actions.next')}
        </Button>
      </View>
    </View>
  );
}

export default withSafeArea(CrateSelection);
