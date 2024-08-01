import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { EApiGender, type Farmer } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues } from '../AddCoolingUser/components/FormManager';
import TextFields from '../AddCoolingUser/modules/TextFields';
import GenderField from '../AddCoolingUser/modules/GenderField';
import ContactField from '../AddCoolingUser/modules/ContactField';
import LanguageField from '../AddCoolingUser/modules/LanguageField';

import FarmerDashboardData from './components/FarmerDashboardData';
import DeleteAction from './components/DeleteAction';

import { DataLoader } from './utils';

export const GET_FARMER_RECORD_SWR_KEY = 'getFarmerRecord';

function EditCoolingUser(props: ManagementRouteProps<'EditCoolingUser'>) {
  const { params } = props.route;

  const currentUser = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const { data, isLoading, refetch } = useApiCall(
    GET_FARMER_RECORD_SWR_KEY,
    DataLoader.loadFarmerRecord,
    params.farmerId,
    {
      skip: !params?.farmerId,
      defaultData: undefined,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  async function revalidateCUCache(): Promise<void> {
    await mutate(getQueryKey('getOperatorFarmers', { operator: currentUser?.id }));
  }

  async function onSubmit(values: FormValues): Promise<void> {
    try {
      const userDatum = await ColdtivateService.updateUser({
        userId: data?.user.id as number,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        gender: values.gender,
        language: values.language,
        parentName: values.parentName,
      });

      if (typeof userDatum !== 'undefined' && typeof data !== 'undefined') {
        await ColdtivateService.updateFarmer({
          farmerId: data.id,
          country: data.country,
          parentName: values.parentName,
          updateUser: true,
        });
      }
      await Promise.all([refetch(), revalidateCUCache()]);
      props.navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={_buildInitialValues(data)}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          contentContainerStyle="flex-1 justify-between pt-6 pb-8 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View tw="w-full">
            <TextFields
              disabledFields={!params.createdByOperator ? ['firstName', 'lastName'] : undefined}
            />
            <GenderField disabled={!params.createdByOperator} />
            <ContactField disabled />
            <LanguageField />
          </View>
          <View tw="mt-5">
            <FarmerDashboardData farmerId={params.farmerId} />

            <Button
              tw="w-full mb-4"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'check-circle-outline'}
              uppercase
            >
              {isSubmitting ? (
                <ActivityIndicator animating size="small" color="white" />
              ) : (
                t('Dashboard.Management.CompanyDetails.actions.save')
              )}
            </Button>

            <DeleteAction
              farmerId={params.farmerId}
              userId={data?.user.id as number}
              isSubmitting={isSubmitting}
              goBack={props.navigation.goBack}
              revalidateCache={revalidateCUCache}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

function _buildInitialValues(datum?: Farmer) {
  const values = {} as FormValues;
  values.parentName = datum?.parentName ?? '';
  values.firstName = datum?.user?.firstName ?? '';
  values.lastName = datum?.user?.lastName ?? '';
  values.gender = datum?.user?.gender ?? EApiGender.OTHER;
  values.phone = datum?.user?.phone ?? '';
  values.language = (datum?.user?.language as TranslationLocales) ?? LanguageStorage.read();
  return values;
}

export default withSafeArea(EditCoolingUser);
