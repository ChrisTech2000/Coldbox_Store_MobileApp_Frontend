import React, { useMemo } from 'react';

import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';

import { useCompanyData } from '../store';
import { UserSection } from '../../components/UserSection';

export function UsersContent() {
  const { t } = useTranslationUtils();
  const { companyData } = useCompanyData();

  const employees = useMemo(() => {
    return {
      total: companyData?.compRegUsers?.[0],
      female: companyData?.compRegUsersFem?.[0],
      male: companyData?.compRegUsersMa?.[0],
      other: companyData?.compRegUsersOt?.[0],
    };
  }, [companyData]);

  const operators = useMemo(() => {
    return {
      total: companyData?.compOp?.[0],
      female: companyData?.compOpFem?.[0],
      male: companyData?.compOpMa?.[0],
      other: companyData?.compOpOt?.[0],
    };
  }, [companyData]);

  const users = useMemo(() => {
    return {
      total: companyData?.compCoolUsers?.[0],
      female: companyData?.compCoolUsersFem?.[0],
      male: companyData?.compCoolUsersMa?.[0],
      other: companyData?.compCoolUsersOt?.[0],
    };
  }, [companyData]);

  const usersTypes = useMemo(() => {
    return {
      farmer: companyData?.compFarmers?.[0],
      trader: companyData?.compTraders?.[0],
    };
  }, [companyData]);

  const beneficiaries = useMemo(() => {
    const female = Math.round(companyData?.compBeneficiariesFem?.[0] || 0);
    const male = Math.round(companyData?.compBeneficiariesMa?.[0] || 0);
    return {
      total: female + male,
      female,
      male,
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
        })}
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
        })}
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
        })}
        userType1={t('Dashboard.Analytics.maleLabel', {
          amount: users.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.femaleLabel', {
          amount: users.female ?? 0,
        })}
        otherType={users.other ?? 0}
      />

      <UserSection
        title={t('Dashboard.Analytics.companyTab.usersTab.usersType')}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', {
          amount: usersTypes.farmer ?? 0,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', {
          amount: usersTypes.trader ?? 0,
        })}
      />

      <UserSection
        title={t('Dashboard.Analytics.beneficiariesTotal', {
          amount: beneficiaries.total ?? 0,
        })}
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
