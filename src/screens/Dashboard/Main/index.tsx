import React, { useCallback, useMemo, useState } from 'react';
import { Image, View } from 'react-native';

import ColdRoom from '#assets/icons/coldroom.svg';
import MineCart from '#assets/icons/mine-cart.svg';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { EPricingType, type Company, type CoolingUnit, type DashboardProduce } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import SelectWithStore, { createSelectStore } from './components/SelectWithStore';
import { TextInput } from 'react-native-paper';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { sortProduces } from './utils/sortProduces';

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

  // STATE
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

  // ACTIONS
  const generateDaysString = useCallback((days: number) => {
    return `${days} Day${days > 1 ? 's' : ''}`;
  }, []);

  const getPricing = useCallback((produce: DashboardProduce, currency: string) => {
    return `${produce.cratesCombinedCost} ${currency}${produce.crates[0]?.pricing[0]?.pricingType === EPricingType.PERIODICITY ? ' / Day' : ''}`; // TODO: get currency
  }, []);

  return (
    <View tw="absolute left-0 right-0 top-0 bottom-0">
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
              'mt-2 border bg-white border-gray-700 rounded-sm mb-2 h-11',
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

      <ScrollView contentContainerStyle="items-center justify-center space-y-4 pr-3 pl-2">
        {filteredProduces?.map((produce, index) => (
          <View key={`${produce.id}-${index}`} tw="w-[95%] h-24 flex flex-row mt-3">
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
                  <Text variant="TextMedium" tw="text-base">
                    {produce.cratesAmount}
                  </Text>
                </View>
              </View>
              <View tw="w-full justify-between">
                <View tw="flex flex-row items-center w-[80%] justify-between">
                  <Text variant="TextBold" tw="font-bold text-base">
                    {produce.movementCode}
                  </Text>
                  <View tw="items-end">
                    {produce.minimumRemainingShelfLife && (
                      <Text variant="TextBold" tw="text-green-400 text-base font-bold">
                        {generateDaysString(produce.minimumRemainingShelfLife)}
                      </Text>
                    )}
                    <Text
                      variant="TextMedium"
                      tw="underline text-green-primary"
                      onPress={() => navigation.navigate('ProduceDetails')}
                    >
                      See Details
                    </Text>
                  </View>
                </View>
                <View tw="flex flex-row items-center w-[80%] justify-between">
                  <View>
                    {produce.cropName.split(' ').map((name, index) => (
                      <Text key={`${name}-${index}`} tw="text-gray-400">
                        {name}
                      </Text>
                    ))}
                  </View>
                  <Text variant="TextMedium" tw="text-gray-400">
                    {produce.farmer}
                  </Text>
                </View>
                <View tw="flex flex-row items-center w-[80%] justify-between">
                  <Text variant="TextMedium" tw="text-gray-400">
                    {getPricing(produce, company?.currency ?? '')}
                  </Text>
                  <View tw="flex flex-row items-center space-x-1">
                    <ColdRoom width={14} height={14} tw="text-black" />
                    <Text variant="TextMedium" tw="text-base">
                      {generateDaysString(produce.currentStorageDays)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(DashboardMain);
