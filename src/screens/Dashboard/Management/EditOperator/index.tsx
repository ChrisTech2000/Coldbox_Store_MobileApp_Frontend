import React, { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';
import { EApiGender } from '#types/global';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import FormManager, { type FormValues } from './components/FormManager';
import CoolingUnitsField from './modules/CoolingUnitsField';
import GenderField from './modules/GenderField';

const ButtonLoader = () => <ActivityIndicator animating size="small" color="white" />;

function EditOperator(props: ManagementRouteProps<'EditOperator'>) {
  const { navigation, route } = props;
  const userId = route.params.userId;

  const { mutate } = useSWRConfig();
  const company = useManagementStore(useShallow((store) => store.company));
  const toast = InAppNotifications.useToast();

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const { t } = useTranslationUtils();

  const { data: operator, isLoading: isLoadingOperator } = useApiCall(
    'getOperatorByUserId',
    ColdtivateService.getOperatorByUserId,
    userId,
    {
      skip: !userId,
      defaultData: [],
    }
  );

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
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

  const contextualOperator = operator.at(0);

  const coolingUnitsOptions = useMemo(
    () =>
      coolingUnits?.map((coolingUnit) => ({
        id: coolingUnit.id,
        name: coolingUnit.name,
      })) ?? [],
    [coolingUnits]
  );

  async function onSubmit(values: FormValues) {
    try {
      await ColdtivateService.updateUser({
        gender: values.gender,
        coolingUnits: values.coolingUnits,
        userId,
      });

      toast.show(t('Dashboard.Management.EditOperator.toasts.success'), { type: 'md_success' });

      await Promise.all([
        mutate(getQueryKey('getOperatorByUserId', userId)),
        mutate(getQueryKey('getOperators', company?.id)),
      ]);
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  useEffect(() => {
    const currentValues = {
      gender: contextualOperator?.user.gender ?? EApiGender.OTHER,
      coolingUnits: contextualOperator?.coolingUnits ?? [],
    };

    formInitialValues.current = currentValues;
  }, [contextualOperator]);

  if (isLoadingOperator || isLoadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle="h-full pt-5 space-y-6" showsVerticalScrollIndicator={false}>
      <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <View tw="mx-4 space-y-6">
            <TextInput
              tw="w-full bg-transparent"
              label={t('Auth.SignUp.commonForm.firstNameLabel')}
              mode="flat"
              value={contextualOperator?.user.firstName}
              disabled
              dense
            />
            <TextInput
              tw="w-full bg-transparent"
              label={t('Auth.SignUp.commonForm.lastNameLabel')}
              mode="flat"
              value={contextualOperator?.user.lastName}
              disabled
              dense
            />

            <GenderField />

            <TextInput
              tw="w-full bg-transparent"
              label={t('Auth.ForgotPassword.phoneInputLabel')}
              mode="flat"
              value={contextualOperator?.user.phone}
              disabled
              dense
            />

            <CoolingUnitsField coolingUnits={coolingUnitsOptions} />

            <View tw="space-y-5">
              <Button
                tw="w-full"
                mode="contained"
                onPress={() => navigation.goBack()}
                icon="close-circle-outline"
                buttonColor={paperTheme.colors.error}
                disabled={isSubmitting}
                uppercase
              >
                {t('actions.cancel')}
              </Button>
              <Button
                tw="w-full"
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'check-circle-outline'}
                disabled={isSubmitting}
                uppercase
              >
                {isSubmitting ? <ButtonLoader /> : t('Dashboard.Management.Operators.actions.save')}
              </Button>
            </View>
          </View>
        )}
      </FormManager>
    </ScrollView>
  );
}

export default withSafeArea(EditOperator, ['bottom'], true);
