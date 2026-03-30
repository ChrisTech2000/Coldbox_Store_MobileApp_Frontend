import React, { useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';

import { useCompanyData } from '../store';
import { UserSection } from '../../components/UserSection';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';

export function UsersContent() {
  const { t } = useTranslationUtils();
  const { companyData } = useCompanyData();
  const { company } = useManagementStore();

  const { data: companyEmployees, refetch: refetchEmployees } = useApiCall(
    'getCompanyEmployees',
    ColdtivateService.getCompanyEmployees,
    company?.id as number,
    { skip: !company?.id }
  );

  const { data: operatorUsers, refetch: refetchOperators } = useApiCall(
    'getOperators',
    ColdtivateService.getOperators,
    company?.id as number,
    { skip: !company?.id }
  );

  const { data: farmersData, refetch: refetchFarmers } = useApiCall(
    'getFarmers',
    ColdtivateService.getFarmers,
    undefined,
    { skip: !company?.id }
  );

  useFocusEffect(
    useCallback(() => {
      refetchEmployees?.();
      refetchOperators?.();
      refetchFarmers?.();
    }, [refetchEmployees, refetchOperators, refetchFarmers])
  );

  const employees = useMemo(() => {
    const list = Array.isArray(companyEmployees) ? companyEmployees : ((companyEmployees as any)?.results || []);
    return {
      total: companyData?.compRegUsers?.[0] || list.length,
      female: companyData?.compRegUsersFem?.[0] || list.filter((e: any) => e.user?.gender?.toLowerCase() === 'female').length,
      male: companyData?.compRegUsersMa?.[0] || list.filter((e: any) => e.user?.gender?.toLowerCase() === 'male').length,
      other: companyData?.compRegUsersOt?.[0] || list.filter((e: any) => !['male', 'female'].includes(e.user?.gender?.toLowerCase() || '')).length,
    };
  }, [companyData, companyEmployees]);

  const operators = useMemo(() => {
    const list = Array.isArray(operatorUsers) ? operatorUsers : ((operatorUsers as any)?.results || []);
    return {
      total: companyData?.compOp?.[0] || list.length,
      female: companyData?.compOpFem?.[0] || list.filter((o: any) => o.user?.gender?.toLowerCase() === 'female').length,
      male: companyData?.compOpMa?.[0] || list.filter((o: any) => o.user?.gender?.toLowerCase() === 'male').length,
      other: companyData?.compOpOt?.[0] || list.filter((o: any) => !['male', 'female'].includes(o.user?.gender?.toLowerCase() || '')).length,
    };
  }, [companyData, operatorUsers]);

  const users = useMemo(() => {
    const list = Array.isArray(farmersData) ? farmersData : ((farmersData as any)?.results || []);
    return {
      total: companyData?.compCoolUsers?.[0] || list.length,
      female: companyData?.compCoolUsersFem?.[0] || list.filter((u: any) => u.user?.gender?.toLowerCase() === 'female').length,
      male: companyData?.compCoolUsersMa?.[0] || list.filter((u: any) => u.user?.gender?.toLowerCase() === 'male').length,
      other: companyData?.compCoolUsersOt?.[0] || list.filter((u: any) => !['male', 'female'].includes(u.user?.gender?.toLowerCase() || '')).length,
    };
  }, [companyData, farmersData]);

  const usersTypes = useMemo(() => {
    const list = Array.isArray(farmersData) ? farmersData : ((farmersData as any)?.results || []);
    return {
      farmer: companyData?.compFarmers?.[0] || list.length,
      trader: companyData?.compTraders?.[0] || 0,
    };
  }, [companyData, farmersData]);

  const beneficiaries = useMemo(() => {
    const female = Math.round(companyData?.compBeneficiariesFem?.[0] || 0);
    const male = Math.round(companyData?.compBeneficiariesMa?.[0] || 0);
    return {
      total: (female + male) || 0,
      female: female || 0,
      male: male || 0,
    };
  }, [companyData]);

  return (
    <ScrollView
      tw="w-full mt-2"
      contentContainerStyle="items-center pb-20"
      showsVerticalScrollIndicator={false}
    >
      <UserSection
        title={t('Dashboard.Analytics.companyTab.usersTab.employeesTotal', {
          amount: employees.total ?? 0,
        }).replace('Total number of registered employees', 'Local Staff')}
        userType1={t('Dashboard.Analytics.maleLabel', {
          amount: employees.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.femaleLabel', {
          amount: employees.female ?? 0,
        })}
        otherType={employees.other ?? 0}
      />

      <UserSection
        title={t('Dashboard.Analytics.operatorsTotal', {
          amount: operators.total ?? 0,
        }).replace('Total number of operators', 'Harvest Managers')}
        userType1={t('Dashboard.Analytics.maleLabel', {
          amount: operators.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.femaleLabel', {
          amount: operators.female ?? 0,
        })}
        otherType={operators.other ?? 0}
      />

      <UserSection
        title={t('Dashboard.Analytics.usersTotal', {
          amount: users.total ?? 0,
        }).replace('Total number of distinct cooling users', 'Smallholder Farmers')}
        userType1={t('Dashboard.Analytics.maleLabel', {
          amount: users.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.femaleLabel', {
          amount: users.female ?? 0,
        })}
        otherType={users.other ?? 0}
      />

      <UserSection
        title={t('Dashboard.Analytics.companyTab.usersTab.usersType').replace('Type of cooling users', 'Farmer Groups')}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', {
          amount: usersTypes.farmer ?? 0,
        }).replace('Farmers', 'Smallholders')}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', {
          amount: usersTypes.trader ?? 0,
        }).replace('Traders', 'Market Traders')}
      />

      <UserSection
        title={t('Dashboard.Analytics.beneficiariesTotal', {
          amount: beneficiaries.total ?? 0,
        }).replace('Total number of indirect beneficiaries', 'Local Beneficiaries')}
        userType1={t('Dashboard.Analytics.maleLabel', {
          amount: beneficiaries.male,
        })}
        userType2={t('Dashboard.Analytics.femaleLabel', {
          amount: beneficiaries.female,
        })}
      />
    </ScrollView>
  );
}
