import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import type { TranslationLocales } from '#i18n/constants';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import type { EditCoolingUserStackRouteProps } from '#navigation/Dashboard/Management/EditCoolingUserStack';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { EApiGender, type Farmer } from '#types/global';

import FormManager, { type FormValues } from '../AddCoolingUser/components/FormManager';
import ContactField from '../AddCoolingUser/modules/ContactField';
import GenderField from '../AddCoolingUser/modules/GenderField';
import LanguageField from '../AddCoolingUser/modules/LanguageField';
import TextFields from '../AddCoolingUser/modules/TextFields';

import DeleteAction from './components/DeleteAction';
import FarmerDashboardData from './components/FarmerDashboardData';

import { DataLoader } from './utils';

export const STATIC_START_DATE = '2022-10-01';
export const GET_FARMER_RECORD_SWR_KEY = 'getFarmerRecord';

const screenHeight = Dimensions.get('window').height;

function EditCoolingUser(props: EditCoolingUserStackRouteProps<'Root'>) {
  const { params } = props.route;

  const currentUser = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const { data, isLoading, refetch, hasError } = useApiCall(
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
        firstName: values.firstName ?? '',
        lastName: values.lastName ?? '',
        phone: values.phone,
        gender: values.gender,
        language: values.language,
        parentName: values.parentName ?? '',
      });

      if (typeof userDatum !== 'undefined' && typeof data !== 'undefined') {
        await ColdtivateService.updateFarmer({
          farmerId: data.id,
          country: data.country,
          parentName: values.parentName,
          updateUser: true,
        });
      }

      toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.edit'), { type: 'md_success' });

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
          contentContainerStyle={cn(
            'justify-between pt-6 pb-8 mx-4',
            screenHeight > SMALL_SCREEN_THRESHOLD ? 'flex-1' : 'flex-col'
          )}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View tw="w-full">
            <TextFields
              disabledFields={
                !params.createdByOperator
                  ? ['firstName', 'lastName']
                  : params.isUserWithoutPhone
                    ? ['firstName', 'lastName', 'parentName']
                    : undefined
              }
            />
            <GenderField disabled={!params.createdByOperator || params.isUserWithoutPhone} />
            <ContactField disabled />
            <LanguageField disabled={params.isUserWithoutPhone} />
          </View>
          <View tw="mt-5">
            <FarmerDashboardData farmerId={params.farmerId} />

            <Button
              tw="w-full mb-4"
              mode="contained"
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate('CoolingUsersSurvey', {
                  farmerId: params.farmerId,
                });
              }}
              disabled={!data || hasError}
              icon="newspaper"
              uppercase
            >
              {t('navigation.history.BaseSurvey')}
            </Button>

            <Button
              tw="w-full mb-4"
              mode="contained"
              onPress={submitHandler}
              disabled={params.isUserWithoutPhone}
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

export default withSafeArea(EditCoolingUser, ['bottom'], true);
