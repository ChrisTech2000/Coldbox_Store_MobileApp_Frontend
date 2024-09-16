import React, { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';

import { type Company, ERoles, type CoolingUnit } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';

export const useCoolingUnitStore = createSelectStore<CoolingUnit>();
export const useCompanyStore = createSelectStore<Company>();

type FilterContext = {
  userId: number | undefined;
  userRole: ERoles | undefined;
  companyId: number | undefined;
};

const _FilterContext = createContext<FilterContext>({
  userId: undefined,
  userRole: undefined,
  companyId: undefined,
});

export default function Filter(props: PropsWithChildren) {
  const user = useAuthStore(useShallow((store) => store.user));
  const managementCompany = useManagementStore(useShallow((store) => store.company)); // RE & OP
  const farmerCompanies = useDashboardStore(useShallow((store) => store.farmerCompanies));
  const company = farmerCompanies?.length
    ? useCompanyStore(useShallow((store) => store.selectedItem))
    : null; // CU

  const values = useMemo(
    () => ({
      userId: user?.id,
      userRole: user?.role,
      companyId: managementCompany?.id || company?.id,
    }),
    [user, company]
  );

  return (
    <_FilterContext.Provider value={values}>
      <View tw="w-full">{props.children}</View>
    </_FilterContext.Provider>
  );
}

Filter.CoolingUnits = function _CoolingUnitsFilter() {
  const { userId, companyId, userRole } = useContext(_FilterContext);
  const selectedItem = useCoolingUnitStore(useShallow((store) => store.selectedItem));

  const [isVisible, setVisibility] = useState<boolean>(false);
  const { t } = useTranslationUtils();

  const { data } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      ...(userRole === ERoles.OPERATOR
        ? { operator: userId as number }
        : { company: companyId as number }),
    },
    {
      skip:
        !userRole || userRole === ERoles.OPERATOR
          ? typeof userId === 'undefined'
          : typeof companyId === 'undefined',
      defaultData: [],
    }
  );

  return (
    <SelectWithStore<CoolingUnit>
      emptyMessage={t('Dashboard.noCoolingUnitAvailable')}
      datums={data ?? []}
      isModalVisible={isVisible}
      setIsModalVisible={setVisibility}
      itemName={(item) => item.name}
      useSelectStore={useCoolingUnitStore}
      label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
        name: selectedItem?.name ?? '',
      })}
      modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
      divider
      autoSelect
    />
  );
};

Filter.Companies = function _FarmerCompaniesFilter() {
  const farmerCompanies = useDashboardStore(useShallow((store) => store.farmerCompanies));
  const company = useCompanyStore(useShallow((store) => store.selectedItem));

  const [isVisible, setVisibility] = useState<boolean>(false);
  const { t } = useTranslationUtils();

  return (
    <SelectWithStore<Company>
      emptyMessage={t('Dashboard.noCompanyAvailable')}
      datums={farmerCompanies ?? []}
      isModalVisible={isVisible}
      setIsModalVisible={setVisibility}
      itemName={(item) => item?.name}
      useSelectStore={useCompanyStore}
      label={t('Dashboard.Company.SelectCompany.label', {
        name: company?.name ?? '',
      })}
      modalHeader={t('Dashboard.Company.SelectCompany.header')}
      divider
      autoSelect
      occupyFullWidth
    />
  );
};
