import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import InAppNotifications from '#common/InAppNotifications';
import { Translator, useTranslationUtils } from '#i18n/utils';
import { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { CustomError } from '#services/utils/ErrorUtil';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { type Bank, EBankAccountType, ERoles } from '#types/global';

interface FormValues {
  accountName: string;
  accountNumber: string;
  country: string;
  bank: string;
  accountType: string;
}

export const usePayoutBankStore = createSelectStore<Bank>();
export const usePayoutAccountTypeStore = createSelectStore<EBankAccountType>();

const countriesMeta = countriesDict();

function mapBankAccountTypes(t: Translator) {
  return {
    [EBankAccountType.PERSONAL]: t(
      'Dashboard.AccountDetails.PayoutSettings.form.accountTypes.personal'
    ),
    [EBankAccountType.BUSINESS]: t(
      'Dashboard.AccountDetails.PayoutSettings.form.accountTypes.business'
    ),
  };
}

function mapEnum(t: Translator) {
  return {
    [t('Dashboard.AccountDetails.PayoutSettings.form.accountTypes.personal')]:
      EBankAccountType.PERSONAL,
    [t('Dashboard.AccountDetails.PayoutSettings.form.accountTypes.business')]:
      EBankAccountType.BUSINESS,
  };
}

const width = (Dimensions.get('window').width - 42) / 2;

function PayoutSettings(
  props: AccountDetailsRouteProps<'PayoutSettings'> | CheckInStackRouteProps<'AddFarmerBankAccount'>
) {
  const { t, zodResolver } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);
  const toast = InAppNotifications.useToast();

  const farmer = props.route.params?.farmer;

  const { data, isLoading: isLoadingBankAccounts } = useApiCall(
    'getUserBankAccounts',
    MarketplaceService.getUserBankAccounts,
    props.route.params?.isCompanyView ? company?.id : undefined,
    {
      defaultData: undefined,
      skip: !!farmer,
    }
  );

  const { data: availableBanks, isLoading: isLoadingAvailableBanks } = useApiCall(
    'getAvailableBanks',
    MarketplaceService.getAvailableBanks,
    {},
    {
      defaultData: undefined,
    }
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      country: t('Dashboard.AccountDetails.PayoutSettings.form.nigeria'),
    },
    resolver: zodResolver((z) =>
      z.object({
        accountName: z.string().min(1, {
          message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountName'),
        }),
        accountNumber: z
          .string()
          .min(1, { message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.account') }),
        country: z.string(),
        bank: z
          .string()
          .min(1, { message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.bank') }),
        accountType: z.string().min(1, {
          message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountType'),
        }),
      })
    ),
  });

  const [isBanksModalOpen, setIsBanksModalOpen] = useState<boolean>(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState<boolean>(false);

  const hasPayoutMethods = useMemo(() => !!data.length, [data.length]);
  const [bank, setBank] = usePayoutBankStore((store) => [store.selectedItem, store.onSelect]);
  const [accountType, setAccountType] = usePayoutAccountTypeStore((store) => [
    store.selectedItem,
    store.onSelect,
  ]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      const accountTypeEnum = mapEnum(t)[data.accountType];

      try {
        if (farmer) {
          await MarketplaceService.addFirstPaystackAccount({
            ownedByUserId: farmer.id,
            accountType: accountTypeEnum,
            bankCode: data.bank,
            accountNumber: data.accountNumber,
            countryCode: countriesMeta.getISOByName(data.country) ?? 'NG',
            accountName: data.accountName,
          });
        } else {
          await MarketplaceService.addPaystackAccount({
            ...(user?.role === ERoles.EMPLOYEE && props.route.params?.isCompanyView
              ? { companyId: company?.id }
              : {}),
            accountType: accountTypeEnum,
            bankCode: data.bank,
            accountNumber: data.accountNumber,
            countryCode: countriesMeta.getISOByName(data.country) ?? 'NG',
            accountName: data.accountName,
          });
        }

        toast.show(t('Dashboard.AccountDetails.PayoutSettings.successMessage'), {
          type: 'md_success',
          style: { marginBottom: 50 },
        });

        if (farmer) {
          props.route.params?.recheckEligibility?.();
          reset();
        }

        props.navigation.goBack();
      } catch (error) {
        if (error instanceof CustomError && error.originalError.response.status >= 500) {
          toast.show(t('navigation.error.serverErrorMessage'), {
            type: 'md_danger',
            style: { marginBottom: 50 },
          });
        } else {
          toast.show(t('Dashboard.AccountDetails.PayoutSettings.errorMessage'), {
            type: 'md_danger',
            style: { marginBottom: 50 },
          });
        }
        reportCrash(error as Error);
      }
    },
    [
      user,
      company,
      farmer,
      bank,
      accountType,
      t,
      toast,
      reset,
      props.navigation,
      props.route.params,
    ]
  );

  useEffect(() => {
    if (bank) {
      setValue('bank', `${bank.code}`, { shouldDirty: true, shouldValidate: true });
    }
  }, [bank, setValue]);

  useEffect(() => {
    if (accountType) {
      setValue('accountType', mapBankAccountTypes(t)[accountType], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [accountType, t, setValue]);

  useEffect(() => {
    if (data?.length && availableBanks?.banks?.length) {
      const accounts = data
        .filter((el) =>
          props.route.params?.isCompanyView
            ? !!el.ownedOnBehalfOfCompany
            : !el.ownedOnBehalfOfCompany
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (!accounts.length) return;

      const mostRecentAccount = accounts[0];
      const accountTypeDisplay = mapBankAccountTypes(t)[mostRecentAccount.accountType];

      reset({
        country: t('Dashboard.AccountDetails.PayoutSettings.form.nigeria'),
        accountName: mostRecentAccount.accountName ?? '',
        accountNumber: mostRecentAccount.accountNumber ?? '',
        accountType: accountTypeDisplay,
        bank: availableBanks?.banks?.find((b) => b.code === mostRecentAccount.bankCode)?.code,
      });

      setBank(
        availableBanks?.banks?.find((b) => b.code.toString() === mostRecentAccount.bankCode) ?? null
      );
      setAccountType(mostRecentAccount.accountType);
    }
  }, [data, availableBanks, t, reset, setBank, setAccountType, props.route.params?.isCompanyView]);

  if (isLoadingAvailableBanks || isLoadingBankAccounts) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <KeyboardAwareScrollView
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        contentContainerStyle="pt-3 px-4 pb-28"
      >
        {hasPayoutMethods ? (
          <Text tw="text-base font-bold text-green-primary">
            {user?.role === ERoles.EMPLOYEE && props.route.params?.isCompanyView
              ? t('Dashboard.AccountDetails.PayoutSettings.editTitleForCompany')
              : t('Dashboard.AccountDetails.PayoutSettings.editTitle')}
          </Text>
        ) : (
          <Text tw="text-base font-bold text-green-primary">
            {user?.role === ERoles.EMPLOYEE && props.route.params?.isCompanyView
              ? t('Dashboard.AccountDetails.PayoutSettings.addTittleForCompany')
              : farmer
                ? t('Dashboard.ProduceDetails.addBankAccountHeader', {
                    name: `${farmer.firstName} ${farmer.lastName}`,
                  })
                : t('Dashboard.AccountDetails.PayoutSettings.addTitle')}
          </Text>
        )}

        <View tw="mt-4 space-y-4">
          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.countryLabel')}
            </Text>
            <Controller
              control={control}
              name="country"
              render={({ field: { value } }) => (
                <Input
                  tw="bg-white border rounded-sm"
                  value={value ?? t('Dashboard.AccountDetails.PayoutSettings.form.nigeria')}
                  disabled
                />
              )}
            />
          </View>

          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.accountType')}
            </Text>
            <SelectWithStore<EBankAccountType>
              testID="account-type-select"
              datums={[EBankAccountType.PERSONAL, EBankAccountType.BUSINESS]}
              isModalVisible={isAccountTypeOpen}
              setIsModalVisible={setIsAccountTypeOpen}
              itemName={(item) => mapBankAccountTypes(t)[item]}
              useSelectStore={usePayoutAccountTypeStore}
              label={
                accountType
                  ? mapBankAccountTypes(t)[accountType]
                  : t('Dashboard.AccountDetails.PayoutSettings.form.selectAccountType')
              }
              modalHeader={t('Dashboard.AccountDetails.PayoutSettings.form.selectAccountType')}
              occupyFullWidth
              border
              enableScroll={false}
            />
            {errors.accountType && (
              <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
                {errors.accountType.message?.toString()}
              </Text>
            )}
          </View>

          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.nameLabel')}
            </Text>
            <Controller
              control={control}
              name="accountName"
              render={({ field: { value, onChange } }) => (
                <Input
                  tw="bg-white border rounded-sm"
                  placeholder={t('Dashboard.AccountDetails.PayoutSettings.form.namePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors.accountName}
                />
              )}
            />
          </View>

          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.accountNumberLabel')}
            </Text>
            <Controller
              control={control}
              name="accountNumber"
              render={({ field: { value, onChange } }) => (
                <Input
                  tw="bg-white border rounded-sm"
                  placeholder={t(
                    'Dashboard.AccountDetails.PayoutSettings.form.accountNumberPlaceholder'
                  )}
                  value={value}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  error={errors.accountNumber}
                />
              )}
            />
          </View>

          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.bank')}
            </Text>
            <SelectWithStore<Bank>
              testID="bank-select"
              datums={availableBanks.banks ?? []}
              isModalVisible={isBanksModalOpen}
              setIsModalVisible={setIsBanksModalOpen}
              itemName={(item) => item?.name}
              useSelectStore={usePayoutBankStore}
              label={
                bank ? bank.name : t('Dashboard.AccountDetails.PayoutSettings.form.selectBank')
              }
              modalHeader={t('Dashboard.AccountDetails.PayoutSettings.form.selectBank')}
              occupyFullWidth
              border
            />
            {errors.bank && (
              <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
                {errors.bank.message?.toString()}
              </Text>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          style={{ width }}
          mode="outlined"
          onPress={() => props.navigation.goBack()}
          uppercase
          disabled={isSubmitting}
        >
          {t('actions.cancel')}
        </Button>

        <Button
          style={{ width }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          icon={isSubmitting ? undefined : 'check-circle-outline'}
          disabled={(hasPayoutMethods && !isDirty) || isSubmitting}
          uppercase
          testID="payout-settings-save-button"
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : hasPayoutMethods ? (
            t('actions.save-changes')
          ) : (
            t('actions.save')
          )}
        </Button>
      </HideWithKeyboardView>
    </View>
  );
}

export default withSafeArea(PayoutSettings, ['bottom'], true);
