import React, { useMemo, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';
import { useFocusEffect } from '@react-navigation/native';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';
import { EApiGender } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import FormManager, { type FormValues } from './components/FormManager';
import CoolingUnitsField from './modules/CoolingUnitsField';
import GenderField from './modules/GenderField';

const width = (Dimensions.get('window').width - 42) / 2;

const ButtonLoader = () => <ActivityIndicator animating size="small" color="white" />;

function EditOperator(props: ManagementRouteProps<'EditOperator'>) {
  const { navigation, route } = props;
  const userId = route.params.userId;

  const { mutate } = useSWRConfig();
  const company = useManagementStore(useShallow((store) => store.company));
  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  useFocusEffect(() => (formInitialValues.current = undefined));

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
      reportCrash(exception as Error);
    }
  }

  if (isLoadingOperator || isLoadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!formInitialValues.current) {
    formInitialValues.current = {
      gender: contextualOperator?.user.gender ?? EApiGender.OTHER,
      coolingUnits: contextualOperator?.coolingUnits ?? [],
    };
  }

  return (
    <ScrollView contentContainerStyle="flex-1" showsVerticalScrollIndicator={false}>
      <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="pt-5 px-4 space-y-6">
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
            </View>

            <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
              <Button
                style={{ width }}
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
                style={{ width }}
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'check-circle-outline'}
                disabled={isSubmitting}
                uppercase
              >
                {isSubmitting ? <ButtonLoader /> : t('Dashboard.Management.Operators.actions.save')}
              </Button>
            </HideWithKeyboardView>
          </React.Fragment>
        )}
      </FormManager>
    </ScrollView>
  );
}

export default withSafeArea(EditOperator, ['bottom'], true);
