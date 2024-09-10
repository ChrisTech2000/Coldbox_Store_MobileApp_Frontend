import React, { useMemo } from 'react';

import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';

import { UserSection } from '../../components/UserSection';
import { useAggregatedData } from '../store';

export function UsersContent() {
  const { t } = useTranslationUtils();
  const { coolingUnitData } = useAggregatedData();

  const operators = useMemo(() => {
    return {
      total: coolingUnitData?.roomOp?.['0'] ?? 0,
      female: coolingUnitData?.roomOpFem?.['0'] ?? 0,
      male: coolingUnitData?.roomOpMa?.['0'] ?? 0,
      other: coolingUnitData?.roomOpOt?.['0'] ?? 0,
    };
  }, [coolingUnitData]);

  const users = useMemo(() => {
    return {
      total: coolingUnitData?.roomActiveUsers?.['0'] ?? 0,
      female: coolingUnitData?.roomActiveFem?.['0'] ?? 0,
      male: coolingUnitData?.roomActiveMa?.['0'] ?? 0,
      other: coolingUnitData?.roomActiveOt?.['0'] ?? 0,
    };
  }, [coolingUnitData]);

  const beneficiaries = useMemo(() => {
    return {
      total: coolingUnitData?.roomBeneficiaries?.['0'] ?? 0,
      female: Math.round(coolingUnitData?.roomBeneficiariesFem?.['0'] || 0),
      male: Math.round(coolingUnitData?.roomBeneficiariesMa?.['0'] || 0),
    };
  }, [coolingUnitData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center" showsVerticalScrollIndicator={false}>
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
        title={t('Dashboard.Analytics.beneficiariesTotal', {
          amount: Math.round(beneficiaries.total) ?? 0,
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
