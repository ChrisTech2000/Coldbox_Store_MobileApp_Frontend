import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';

import { UserSection } from '../../components/UserSection';
import { useAggregatedData } from '../store';

const screenHeight = Dimensions.get('window').height;

export function UsersContent() {
  const { t } = useTranslationUtils();
  const { coolingUnitData } = useAggregatedData();

  const operators = useMemo(() => {
    return {
      total:
        Math.round(
          Object.values(coolingUnitData?.roomOp ?? {}).reduce((acc, current) => (acc += current), 0)
        ) ?? 0,
      female:
        Math.round(
          Object.values(coolingUnitData?.roomOpFem ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
      male:
        Math.round(
          Object.values(coolingUnitData?.roomOpMa ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
      other:
        Math.round(
          Object.values(coolingUnitData?.roomOpOt ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const users = useMemo(() => {
    return {
      total:
        Math.round(
          Object.values(coolingUnitData?.roomActiveUsers ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
      female:
        Math.round(
          Object.values(coolingUnitData?.roomActiveFem ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
      male:
        Math.round(
          Object.values(coolingUnitData?.roomActiveMa ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
      other:
        Math.round(
          Object.values(coolingUnitData?.roomActiveOt ?? {}).reduce(
            (acc, current) => (acc += current),
            0
          )
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const beneficiaries = useMemo(() => {
    return {
      total:
        Object.values(coolingUnitData?.roomBeneficiaries ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      female: Math.round(
        Object.values(coolingUnitData?.roomBeneficiariesFem ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0
      ),
      male: Math.round(
        Object.values(coolingUnitData?.roomBeneficiariesMa ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0
      ),
    };
  }, [coolingUnitData]);

  return (
    <ScrollView
      tw={cn('w-full mt-2', screenHeight <= SMALL_SCREEN_THRESHOLD ? 'mb-12' : 'mb-8')}
      contentContainerStyle="items-center"
      showsVerticalScrollIndicator={false}
    >
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
