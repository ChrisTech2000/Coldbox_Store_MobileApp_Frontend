import React, { useMemo } from 'react';

import { ScrollView } from '#ui/components/ScrollView';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { View } from 'react-native';
import { useCompanyData } from '../store';
import { Divider } from 'react-native-paper';

type SectionProps = {
  title: string;
  userType1: string;
  userType2: string;
  otherType?: number;
};

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
    return {
      total: companyData?.compBeneficiaries?.[0],
      female: Math.round(companyData?.compBeneficiariesFem?.[0] || 0),
      male: Math.round(companyData?.compBeneficiariesMa?.[0] || 0),
    };
  }, [companyData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center">
      <Button
        mode="contained"
        uppercase
        onPress={() => null}
        icon="check-circle-outline"
        contentStyle="flex flex-row-reverse"
        tw="w-[50%] my-2"
      >
        {t('Dashboard.Analytics.companyTab.usersTab.downloadDataButton')}
      </Button>

      <Section
        title={t('Dashboard.Analytics.companyTab.usersTab.employeesTotal', {
          amount: employees.total ?? 0,
        })}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.maleLabel', {
          amount: employees.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', {
          amount: employees.female ?? 0,
        })}
        otherType={employees.other ?? 0}
      />

      <Section
        title={t('Dashboard.Analytics.companyTab.usersTab.operatorsTotal', {
          amount: operators.total ?? 0,
        })}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.maleLabel', {
          amount: operators.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', {
          amount: operators.female ?? 0,
        })}
        otherType={operators.other ?? 0}
      />

      <Section
        title={t('Dashboard.Analytics.companyTab.usersTab.usersTotal', {
          amount: users.total ?? 0,
        })}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.maleLabel', {
          amount: users.male ?? 0,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', {
          amount: users.female ?? 0,
        })}
        otherType={users.other ?? 0}
      />

      <Section
        title={t('Dashboard.Analytics.companyTab.usersTab.usersType')}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', {
          amount: usersTypes.farmer ?? 0,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', {
          amount: usersTypes.trader ?? 0,
        })}
      />

      <Section
        title={t('Dashboard.Analytics.companyTab.usersTab.beneficiariesTotal', {
          amount: beneficiaries.total ?? 0,
        })}
        userType1={t('Dashboard.Analytics.companyTab.usersTab.maleLabel', {
          amount: beneficiaries.male,
        })}
        userType2={t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', {
          amount: beneficiaries.female,
        })}
      />
    </ScrollView>
  );
}

function Section({ title, userType1, userType2, otherType }: SectionProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full bg-green-transparency px-2 py-1 items-center rounded-lg space-y-2 my-2">
      <Text variant="TextMedium" tw="text-lg">
        {title}
      </Text>
      <View tw="flex flex-row space-x-2 items-center">
        <Text variant="TextMedium" tw="text-lg">
          {userType1}
        </Text>
        <Divider tw="bg-green-primary w-0.5 h-8" />
        <Text variant="TextMedium" tw="text-lg">
          {userType2}
        </Text>
      </View>
      {otherType !== undefined && (
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.companyTab.usersTab.otherLabel', { amount: otherType })}
        </Text>
      )}
    </View>
  );
}
