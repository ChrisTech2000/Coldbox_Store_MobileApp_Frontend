import React, { type SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { TextInput } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { StoreApi, UseBoundStore } from 'zustand';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { Company, CoolingUnit, ERoles } from '#types/global';

import { CoolingUnitOverlay } from '#screens/Dashboard/Tutorial/CoolingUnitOverlay';
import { Dashboard5Overlay } from '#screens/Dashboard/Tutorial/FarmerDashboardOverlay';
import {
  ECommonTutorialSteps,
  EFarmerTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import SelectWithStore, { SelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

export type Search = 'id' | 'details';

type FilterProps = {
  search: string;
  searchType?: Search;
  sortingMenu?: React.ReactNode;
  useCompanyStore: UseBoundStore<StoreApi<SelectStore<Company>>>;
  useCoolingUnitStore: UseBoundStore<StoreApi<SelectStore<CoolingUnit>>>;
  onSearch: (value: SetStateAction<string>) => void;
  onSearchTypeChange?: (value: SetStateAction<Search>) => void;
  setAreCoolingUnitsLoading: (value: SetStateAction<boolean>) => void;
};

export function Filters(props: FilterProps) {
  const {
    search,
    searchType,
    sortingMenu,
    useCompanyStore,
    useCoolingUnitStore,
    onSearch,
    onSearchTypeChange,
    setAreCoolingUnitsLoading,
  } = props;

  const { user } = useAuthStore();
  const { t } = useTranslationUtils();

  const { company: _company } = useManagementStore();
  const { farmerCompanies, farmerUnitsIds, setCoolingUnits, addRefreshDataFn } =
    useDashboardStore();

  const { selectedItem: coolingUnit, onSelect: onSelectCoolingUnit } = useCoolingUnitStore();
  const { selectedItem: company } = useCompanyStore();

  const { onLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.COOLING_UNIT_STEP,
    OverlayComponent: CoolingUnitOverlay,
  });

  const { onLayout: onDashboard5Layout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_5,
    OverlayComponent: Dashboard5Overlay,
    fullScreen: true,
  });

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState<boolean>(false);

  const [internalSearch, setInternalSearch] = useState<string>(search);
  const debouncedOnSearch = useDebouncedCallback((v: string) => onSearch(v), 280);
  const onSearchChange = useCallback((value: string) => {
    setInternalSearch(value);
    debouncedOnSearch(value);
  }, []);

  const {
    data: coolingUnits,
    isLoading,
    refetch,
  } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      ...(user?.role === ERoles.COOLING_USER || user?.role === ERoles.EMPLOYEE
        ? { company: (company?.id || _company?.id) as number }
        : { operator: user?.id as number }),
    },
    {
      skip:
        ((user?.role === ERoles.COOLING_USER || user?.role === ERoles.EMPLOYEE) &&
          !company?.id &&
          !_company?.id) ||
        !user?.id,
      defaultData: [],
    }
  );

  const units = useMemo(() => {
    return (
      (user?.role === ERoles.COOLING_USER
        ? coolingUnits?.filter((unit) => farmerUnitsIds?.includes(unit.id))
        : coolingUnits) ?? []
    );
  }, [coolingUnits, user, farmerUnitsIds]);

  useEffect(() => {
    setAreCoolingUnitsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (coolingUnits) setCoolingUnits(coolingUnits);
    if (!coolingUnit || !coolingUnits || coolingUnits.length === 0) return;
    const selectedUnit = coolingUnits.find((unit) => unit.id === coolingUnit.id);
    if (!selectedUnit) return onSelectCoolingUnit(coolingUnits.at(0)!);
    if (JSON.stringify(selectedUnit) !== JSON.stringify(coolingUnit)) {
      return onSelectCoolingUnit(selectedUnit);
    }
  }, [coolingUnits, coolingUnit]);

  useEffect(() => addRefreshDataFn(refetch), [refetch]);

  return (
    <View tw="mt-2 px-4">
      <View onLayout={onDashboard5Layout}>
        {user?.role === ERoles.COOLING_USER ? (
          <SelectWithStore<Company>
            emptyMessage={t('Dashboard.noCompanyAvailable')}
            datums={farmerCompanies ?? []}
            isModalVisible={isCompaniesModalOpen}
            setIsModalVisible={setIsCompaniesModalOpen}
            itemName={(item) => item?.name}
            useSelectStore={useCompanyStore}
            label={t('Dashboard.Company.SelectCompany.label', {
              name: company ? company.name : '',
            })}
            modalHeader={t('Dashboard.Company.SelectCompany.header')}
            divider
            autoSelect
            occupyFullWidth
          />
        ) : null}
        <View onLayout={onLayout}>
          <SelectWithStore<CoolingUnit>
            emptyMessage={t('Dashboard.noCoolingUnitAvailable')}
            datums={units}
            isModalVisible={isUnitsModalOpen}
            setIsModalVisible={setIsUnitsModalOpen}
            itemName={(item) => item?.name}
            useSelectStore={useCoolingUnitStore}
            label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
              name: coolingUnit ? coolingUnit.name : '',
            })}
            modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
            divider
            autoSelect
            occupyFullWidth
          />
        </View>
      </View>
      {searchType ? (
        <View tw="flex flex-row items-center justify-center space-x-2 mt-4">
          <Button
            tw={cn('w-[50%]', searchType === 'details' ? 'bg-gray-700' : 'bg-gray-400')}
            mode="contained"
            onPress={(evt) => {
              evt.stopPropagation();
              onSearchTypeChange?.('details');
              onSearchChange('');
            }}
            labelStyle="text-wrap"
          >
            {t('Dashboard.SearchFilter.crateDetailsButton')}
          </Button>
          <Button
            tw={cn('w-[50%]', searchType === 'id' ? 'bg-gray-700' : 'bg-gray-400')}
            mode="contained"
            onPress={(evt) => {
              evt.stopPropagation();
              onSearchTypeChange?.('id');
              onSearchChange('');
            }}
          >
            {t('Dashboard.SearchFilter.crateIdButton')}
          </Button>
        </View>
      ) : null}

      {searchType ? (
        <Text variant="TextMedium" tw="text-base mt-2">
          {searchType === 'details'
            ? t('Dashboard.SearchFilter.detailsMessage')
            : t('Dashboard.SearchFilter.idMessage')}
        </Text>
      ) : null}

      <View tw="flex flex-row items-center justify-between">
        <Input
          tw={cn(
            'border bg-white border-gray-700 rounded-sm my-2 h-11',
            searchType === 'details' || !searchType ? 'w-[90%] mr-2' : 'w-full'
          )}
          label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
          value={internalSearch}
          onChangeText={onSearchChange}
          left={<TextInput.Icon icon="magnify" />}
        />
        {(searchType === 'details' || !searchType) && sortingMenu && sortingMenu}
      </View>
    </View>
  );
}
