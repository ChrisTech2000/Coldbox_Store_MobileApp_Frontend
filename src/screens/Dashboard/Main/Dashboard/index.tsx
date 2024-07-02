import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { useTranslationUtils } from '#i18n/utils';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { type Company, type CoolingUnit } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { TextInput } from 'react-native-paper';
import SelectWithStore, { createSelectStore } from '../components/SelectWithStore';
import { sortProduces } from '../utils/sortProduces';
import { Produce } from './components/Produce';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { FlatList } from 'react-native-gesture-handler';

type Search = 'id' | 'details';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useCompanyStore = createSelectStore<Company>();

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { farmerId, farmerCompanies, farmerUnitsIds } = useDashboardStore();
  const { sorting } = useSortingStore();
  const { t } = useTranslationUtils();

  const { selectedItem: coolingUnit } = useCoolingUnitStore();

  const { selectedItem: company } = useCompanyStore();

  const { data: coolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      company: company?.id as number,
    },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const { data: dashboardProduces } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: coolingUnit?.id as number,
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId || !coolingUnit?.id,
      defaultData: [],
    }
  );

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<Search>('details');
  const [search, setSearch] = useState<string>('');

  const farmerUnits = useMemo(() => {
    return coolingUnits?.filter((unit) => farmerUnitsIds?.includes(unit.id)) ?? [];
  }, [coolingUnits]);

  const sortedProduces = useMemo(() => {
    return (dashboardProduces ?? []).slice().sort((a, b) => sortProduces(a, b, sorting));
  }, [dashboardProduces, sorting]);

  const filteredProduces = useMemo(() => {
    if (!search) return sortedProduces;
    const lowerCaseSearch = search.toLowerCase();

    return sortedProduces.filter((produce) => {
      if (searchType === 'id') {
        return produce.crates.some((crate) => crate.id.toString() === lowerCaseSearch);
      }

      return (
        produce.currentStorageDays.toString().includes(lowerCaseSearch) ||
        produce.farmer.toLowerCase().includes(lowerCaseSearch) ||
        produce.cropName.toLowerCase().includes(lowerCaseSearch) ||
        produce.movementCode.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [sortedProduces, search, searchType]);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0">
      <View tw="mt-2 px-4">
        {
          <SelectWithStore<Company>
            datums={farmerCompanies ?? []}
            isModalVisible={isCompaniesModalOpen}
            setIsModalVisible={setIsCompaniesModalOpen}
            itemName={(item) => item?.name}
            useSelectStore={useCompanyStore}
            label={t('Dashboard.Company.SelectCompany.label', {
              name: company ? company.name : '',
            })}
            modalHeader={t('Dashboard.Company.SelectCompany.header')}
          />
        }
        <SelectWithStore<CoolingUnit>
          datums={farmerUnits}
          isModalVisible={isUnitsModalOpen}
          setIsModalVisible={setIsUnitsModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useCoolingUnitStore}
          label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
            name: coolingUnit ? coolingUnit.name : '',
          })}
          modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
        />

        <View tw="flex flex-row items-center justify-center space-x-2 mt-4">
          <Button
            tw={searchType === 'details' ? 'bg-gray-700' : 'bg-gray-400'}
            mode="contained"
            onPress={() => setSearchType('details')}
          >
            {t('Dashboard.SearchFilter.crateDetailsButton')}
          </Button>
          <Button
            tw={searchType === 'id' ? 'bg-gray-700' : 'bg-gray-400'}
            mode="contained"
            onPress={() => setSearchType('id')}
          >
            {t('Dashboard.SearchFilter.crateIdButton')}
          </Button>
        </View>

        <Text variant="TextMedium" tw="text-base mt-2">
          {searchType === 'details'
            ? t('Dashboard.SearchFilter.detailsMessage')
            : t('Dashboard.SearchFilter.idMessage')}
        </Text>

        <View tw="flex flex-row items-center justify-between">
          <Input
            tw={cn(
              'border bg-white border-gray-700 rounded-sm my-2 h-11',
              searchType === 'details' ? 'w-[90%] mr-2' : 'w-full'
            )}
            label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
            onChangeText={(value) => setSearch(value)}
            value={search}
            left={<TextInput.Icon icon="magnify" />}
          />
          {searchType === 'details' && (
            <SortingMenu
              isModalVisible={isSortingModalOpen}
              setIsModalVisible={setIsSortingModalOpen}
            />
          )}
        </View>
      </View>

      <FlatList
        data={filteredProduces}
        renderItem={({ item: produce, index }) => (
          <Produce
            key={`${produce.id}-${index}`}
            produce={produce}
            onNavigate={() => navigation.navigate('ProduceDetails', { produce })}
            currency={company?.currency ?? ''}
          />
        )}
      />
    </View>
  );
}

export default withSafeArea(DashboardMain);
