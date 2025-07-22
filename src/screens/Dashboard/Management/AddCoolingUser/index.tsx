import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { TranslationLocales } from '#i18n/constants';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import AuthService from '#services/AuthService';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { EApiGender, type Farmer } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import InAppNotifications from '#common/InAppNotifications';
import FormManager, { type FormValues } from './components/FormManager';
import ContactField from './modules/ContactField';
import GenderField from './modules/GenderField';
import LanguageField from './modules/LanguageField';
import TextFields from './modules/TextFields';

const width = (Dimensions.get('window').width - 42) / 2;

function AddCoolingUser(props: ManagementRouteProps<'AddCoolingUser'>) {
  const { params } = props.route;

  const operator = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const farmer = params?.farmer;

  async function revalidateCUCache(): Promise<void> {
    await mutate(getQueryKey('getOperatorFarmers', { operator: operator?.id }));
  }

  async function onSubmit(values: FormValues): Promise<void> {
    if (!company) return; // safe guard
    try {
      // assign existing cooling user to the company if he already has an account, fyk: added by code
      if (typeof farmer !== 'undefined') {
        await ColdtivateService.updateFarmerCompany({
          farmerId: farmer.id,
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
      toast.show(t('Auth.SignUp.toasts.error'), { type: 'md_danger', style: { marginBottom: 55 } });
      reportCrash(exception as Error);
    }
  }

  const disabled = !!farmer;

  return (
    <FormManager onSubmit={onSubmit} initialValues={_buildInitialValues(farmer)}>
      {({ submitHandler, isSubmitting }) => (
        <View tw="flex-1 pt-4">
          <KeyboardAwareScrollView
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
            tw="px-4"
          >
            <TextFields disabled={disabled} />
            <GenderField disabled={disabled} />
            <ContactField disabled={disabled} />
            <LanguageField disabled={disabled} />
          </KeyboardAwareScrollView>

          <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
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
          </HideWithKeyboardView>
        </View>
      )}
    </FormManager>
  );
}

function _buildInitialValues(farmer?: Farmer) {
  const values = {} as FormValues;
  values.parentName = farmer?.parentName ?? '';
  values.firstName = farmer?.user?.firstName ?? '';
  values.lastName = farmer?.user?.lastName ?? '';
  values.gender = farmer?.user?.gender ?? EApiGender.OTHER;
  values.phone = farmer?.user?.phone ?? '';
  values.language = (farmer?.user?.language as TranslationLocales) ?? LanguageManager.read();
  return values;
}

export default withSafeArea(AddCoolingUser, ['bottom'], true);
