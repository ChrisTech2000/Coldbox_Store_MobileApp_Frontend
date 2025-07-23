import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { USER_WITHOUT_PHONE } from '#constants/general';
import type { TranslationLocales } from '#i18n/constants';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { EditCoolingUserStackRouteProps } from '#navigation/Dashboard/Management/EditCoolingUserStack';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { EApiGender, EBankAccountType, User, type Farmer } from '#types/global';

import FormManager, { type FormValues } from '../AddCoolingUser/components/FormManager';
import ContactField from '../AddCoolingUser/modules/ContactField';
import GenderField from '../AddCoolingUser/modules/GenderField';
import LanguageField from '../AddCoolingUser/modules/LanguageField';
import TextFields from '../AddCoolingUser/modules/TextFields';

import DeleteAction from './components/DeleteAction';
import FarmerDashboardData from './components/FarmerDashboardData';

import { DataLoader } from './utils';

export const GET_FARMER_RECORD_SWR_KEY = 'getFarmerRecord';

function EditCoolingUser(props: EditCoolingUserStackRouteProps<'Root'>) {
  const { params } = props.route;

  const currentUser = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const {
    data: { farmer, payoutDetails },
    isLoading,
    refetch,
    hasError,
  } = useApiCall(GET_FARMER_RECORD_SWR_KEY, DataLoader.loadFarmerRecord, params.farmerId, {
    skip: !params?.farmerId,
    defaultData: undefined,
  });

  const { data: availableBanks, isLoading: isLoadingAvailableBanks } = useApiCall(
    'getAvailableBanks',
    MarketplaceService.getAvailableBanks,
    undefined,
    {
      defaultData: undefined,
    }
  );

  const payoutDetailsData = useMemo(() => {
    if (!payoutDetails) return [];
    return [
      {
        label: t('Dashboard.AccountDetails.PayoutSettings.form.countryLabel'),
        value: t('Dashboard.AccountDetails.PayoutSettings.form.nigeria'),
      },
      {
        label: t('Dashboard.AccountDetails.PayoutSettings.form.accountType'),
        value: startCase(EBankAccountType[payoutDetails.accountType]?.toLowerCase() || ''),
      },
      {
        label: t('Dashboard.AccountDetails.PayoutSettings.form.nameLabel'),
        value: payoutDetails.accountName,
      },
      {
        label: t('Dashboard.AccountDetails.PayoutSettings.form.accountNumberLabel'),
        value: payoutDetails.accountNumber,
      },
      {
        label: t('Dashboard.AccountDetails.PayoutSettings.form.bank'),
        value: availableBanks?.banks?.find((b) => b.code === payoutDetails.bankCode)?.name || '',
      },
    ];
  }, [payoutDetails]);

  if (isLoading || isLoadingAvailableBanks) {
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
        userId: farmer?.user?.id as number,
        firstName: values.firstName ?? '',
        lastName: values.lastName ?? '',
        phone: values.phone,
        gender: values.gender,
        language: values.language,
        parentName: values.parentName ?? '',
      });

      if (typeof userDatum !== 'undefined' && typeof farmer !== 'undefined') {
        await ColdtivateService.updateFarmer({
          farmerId: farmer.id,
          country: farmer.country,
          parentName: values.parentName,
          updateUser: true,
        });
      }

      toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.edit'), { type: 'md_success' });

      await Promise.all([refetch(), revalidateCUCache()]);
      props.navigation.goBack();
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
    }
  }

  const isUserWithoutPhone = farmer?.user.firstName === USER_WITHOUT_PHONE && !farmer?.user.phone;

  return (
    <FormManager onSubmit={onSubmit} initialValues={_buildInitialValues(farmer)}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          contentContainerStyle={cn('justify-between pt-6 pb-8 mx-4 flex-col')}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <Text tw="text-base text-green-primary font-bold">
            {t('Dashboard.History.pdfModal.coolingUserLabel')}
          </Text>
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

          <RBAC.ProtectedResource action="VIEW" subject="MarketplaceListing">
            {isUserWithoutPhone ? null : (
              <View>
                <Text tw="text-base text-green-primary font-bold mt-5">
                  {t('Dashboard.Management.EditCoolingUsers.accountDetails')}
                </Text>
                <View tw="w-full">
                  {isEmpty(payoutDetails) ? (
                    <View>
                      <View tw="mx-4 mt-4">
                        <Text>
                          {t('Dashboard.ProduceDetails.operatorNoBankAccountWarning', {
                            name: `${farmer?.user.firstName ?? ''}`,
                          })}
                        </Text>
                        <Button
                          tw="self-end mt-2"
                          onPress={() =>
                            props.navigation.navigate('AddFarmerBankAccount', {
                              farmer: farmer?.user as User,
                              recheckEligibility: async () =>
                                mutate(getQueryKey(GET_FARMER_RECORD_SWR_KEY, params.farmerId)),
                            })
                          }
                        >
                          {t('Dashboard.ProduceDetails.addBankAccountButton')}
                        </Button>
                      </View>
                      <Divider tw="bg-gray-700" />
                    </View>
                  ) : (
                    <View tw="mt-4 space-y-2">
                      {payoutDetailsData.map((item, index) => (
                        <View
                          key={`payout-details-${index}`}
                          tw="flex flex-row justify-between border-b border-gray-300"
                        >
                          <Text tw="text-base mb-1.5 text-gray-600">{item.label}</Text>
                          <Text tw="text-base mb-1.5">{item.value}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          </RBAC.ProtectedResource>

          <View tw="mt-8">
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
              disabled={!farmer || hasError || isSubmitting}
              icon="newspaper"
              uppercase
            >
              {t('navigation.history.BaseSurvey')}
            </Button>

            <Button
              tw="w-full mb-4"
              mode="contained"
              onPress={submitHandler}
              disabled={params.isUserWithoutPhone || isSubmitting}
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
              userId={farmer?.user?.id as number}
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

function _buildInitialValues(datum?: Farmer): FormValues {
  return {
    parentName: datum?.parentName ?? '',
    firstName: datum?.user?.firstName ?? '',
    lastName: datum?.user?.lastName ?? '',
    gender: datum?.user?.gender ?? EApiGender.OTHER,
    phone: datum?.user?.phone ?? '',
    language: (datum?.user?.language as TranslationLocales) ?? LanguageManager.read(),
  };
}

export default withSafeArea(EditCoolingUser, ['bottom'], true);
