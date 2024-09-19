import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import AuthService from '#services/AuthService';
import { EApiGender, type Farmer } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues } from './components/FormManager';
import TextFields from './modules/TextFields';
import GenderField from './modules/GenderField';
import ContactField from './modules/ContactField';
import LanguageField from './modules/LanguageField';
import InAppNotifications from '#common/InAppNotifications';

const width = (Dimensions.get('window').width - 42) / 2;

function AddCoolingUser(props: ManagementRouteProps<'AddCoolingUser'>) {
  const { params } = props.route;

  const operator = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const { data, isLoading } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    params?.userId as number,
    {
      skip: !params?.userId,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const contextualFarmer = data?.at(0);

  async function revalidateCUCache(): Promise<void> {
    await mutate(getQueryKey('getOperatorFarmers', { operator: operator?.id }));
  }

  async function onSubmit(values: FormValues): Promise<void> {
    if (!company) return; // safe guard
    try {
      // assign existing cooling user to the company if he already has an account, fyk: added by code
      if (typeof params?.userId !== 'undefined' && typeof contextualFarmer !== 'undefined') {
        await ColdtivateService.updateFarmerCompany({
          farmerId: contextualFarmer.id,
          companyId: company.id,
        });
        await revalidateCUCache();
        return props.navigation.goBack();
      }

      // assign new cooling user if he doesn't have the app, fyk: added by phone number
      const result = await AuthService.signUpAsCoolingUser({
        user: {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          phone: values.phone,
          language: values.language,
          password: 'fakePassword',
        },
        createUser: false,
        parentName: values.parentName,
      });

      await ColdtivateService.updateFarmerCompany({
        farmerId: result!.id,
        companyId: company.id,
      });

      await revalidateCUCache();

      toast.show(t('Dashboard.Management.AddCoolingUser.toasts.add'), { type: 'md_success' });

      props.navigation.navigate('EditCoolingUserStack', {
        screen: 'CoolingUsersSurvey',
        params: { farmerId: result!.id, redirectTo: 'CoolingUsers' },
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  const disabled = (data ?? []).length >= 1;

  return (
    <FormManager onSubmit={onSubmit} initialValues={_buildInitialValues(contextualFarmer)}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          contentContainerStyle="flex-1 justify-between pt-6 pb-8 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View tw="w-full">
            <TextFields disabled={disabled} />
            <GenderField disabled={disabled} />
            <ContactField disabled={disabled} />
            <LanguageField disabled={disabled} />
          </View>
          <View tw="w-full flex-row items-center justify-between mt-5">
            <Button
              style={{ width }}
              mode="contained"
              onPress={props.navigation.goBack}
              icon="close-circle-outline"
              buttonColor={paperTheme.colors.error}
              uppercase
            >
              {t('actions.cancel')}
            </Button>
            <Button
              style={{ width }}
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle-outline'}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

function _buildInitialValues(contextualFarmer?: Farmer) {
  const values = {} as FormValues;
  values.parentName = contextualFarmer?.parentName ?? '';
  values.firstName = contextualFarmer?.user?.firstName ?? '';
  values.lastName = contextualFarmer?.user?.lastName ?? '';
  values.gender = contextualFarmer?.user?.gender ?? EApiGender.OTHER;
  values.phone = contextualFarmer?.user?.phone ?? '';
  values.language =
    (contextualFarmer?.user?.language as TranslationLocales) ?? LanguageStorage.read();
  return values;
}

export default withSafeArea(AddCoolingUser);
