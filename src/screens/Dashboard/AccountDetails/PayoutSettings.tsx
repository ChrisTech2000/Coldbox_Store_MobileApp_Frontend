import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { Translator, useTranslationUtils } from '#i18n/utils';
import { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { Bank, EBankAccountType } from '#types/global';

import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

interface FormValues {
  accountName: string;
  accountNumber: string;
  country: string;
  bank: string;
  accountType: string;
}

const useBankStore = createSelectStore<Bank>();
const useAccountTypeStore = createSelectStore<EBankAccountType>();

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

function PayoutSettings(props: AccountDetailsRouteProps<'PayoutSettings'>) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { data, isLoading: isLoadingBankAccounts } = useApiCall(
    'getUserBankAccounts',
    MarketplaceService.getUserBankAccounts,
    {},
    {
      defaultData: undefined,
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
    resolver: zodResolver((z) =>
      z.object({
        accountName: z
          .string()
          .min(1, {
            message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountName'),
          }),
        accountNumber: z
          .string()
          .min(1, { message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.account') }),
        country: z.string().min(1),
        bank: z
          .string()
          .min(1, { message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.bank') }),
        accountType: z
          .string()
          .min(1, {
            message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountType'),
          }),
      })
    ),
  });

  const [isBanksModalOpen, setIsBanksModalOpen] = useState<boolean>(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState<boolean>(false);

  const hasPayoutMethods = useMemo(() => !!data.length, [data.length]);
  const [bank, setBank] = useBankStore((store) => [store.selectedItem, store.onSelect]);
  const [accountType, setAccountType] = useAccountTypeStore((store) => [
    store.selectedItem,
    store.onSelect,
  ]);

  const onSubmit = useCallback(async (data: FormValues) => {
    try {
      await MarketplaceService.addUserAccount({
        accountType: mapEnum(t)[data.accountType],
        bankCode: data.bank,
        accountNumber: data.accountNumber,
        countryCode: countriesMeta.getISOByName(data.country) ?? 'NG',
        accountName: data.accountName,
      });

      toast.show(t('Dashboard.AccountDetails.PayoutSettings.successMessage'), {
        type: 'md_success',
        style: { marginBottom: 50 },
      });

      props.navigation.goBack();
    } catch (error) {
      toast.show(t('navigation.error.errorMessage'), {
        type: 'md_danger',
        style: { marginBottom: 50 },
      });
    }
  }, []);

  useEffect(() => {
    if (bank) setValue('bank', `${bank.id}`);
  }, [bank]);

  useEffect(() => {
    if (accountType) setValue('accountType', mapBankAccountTypes(t)[accountType]);
  }, [accountType, t]);

  useEffect(() => {
    if (data?.length && availableBanks?.banks?.length) {
      reset({
        country: t('Dashboard.AccountDetails.PayoutSettings.form.nigeria'),
        accountName: data?.[data?.length - 1]?.accountName ?? '',
        accountNumber: data?.[data?.length - 1]?.accountNumber ?? '',
      });

      setBank(
        availableBanks?.banks?.find(
          (b) => b.id.toString() === data?.[data?.length - 1]?.bankCode
        ) ?? null
      );
      setAccountType(data?.[data?.length - 1]?.accountType);
    }
  }, [data, availableBanks, t]);

  if (isLoadingAvailableBanks || isLoadingBankAccounts) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full p-3"
      contentContainerStyle="flex-1 justify-between"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {hasPayoutMethods ? (
          <Text tw="text-base font-bold text-green-primary">
            {t('Dashboard.AccountDetails.PayoutSettings.editTitle')}
          </Text>
        ) : (
          <Text tw="text-base font-bold text-green-primary">
            {t('Dashboard.AccountDetails.PayoutSettings.addTitle')}
          </Text>
        )}

        <View tw="mt-4 space-y-3">
          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.countryLabel')}
            </Text>
            <Controller
              control={control}
              name="country"
              render={({ field: { value } }) => (
                <Input tw="bg-white border rounded-sm" value={value} disabled />
              )}
            />
          </View>

          <View>
            <Text tw="text-base mb-1.5">
              {t('Dashboard.AccountDetails.PayoutSettings.form.accountType')}
            </Text>
            <SelectWithStore<EBankAccountType>
              datums={[EBankAccountType.PERSONAL, EBankAccountType.BUSINESS]}
              isModalVisible={isAccountTypeOpen}
              setIsModalVisible={setIsAccountTypeOpen}
              itemName={(item) => mapBankAccountTypes(t)[item]}
              useSelectStore={useAccountTypeStore}
              label={
                accountType
                  ? mapBankAccountTypes(t)[accountType]
                  : t('Dashboard.AccountDetails.PayoutSettings.form.selectAccountType')
              }
              modalHeader={t('Dashboard.AccountDetails.PayoutSettings.form.selectAccountType')}
              occupyFullWidth
              border
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
              datums={availableBanks.banks ?? []}
              isModalVisible={isBanksModalOpen}
              setIsModalVisible={setIsBanksModalOpen}
              itemName={(item) => item?.name}
              useSelectStore={useBankStore}
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
      </View>

      <View tw="flex flex-row items-end justify-evenly">
        <Button
          tw="w-[48%] border-green-primary"
          mode="outlined"
          onPress={() => props.navigation.goBack()}
          uppercase
        >
          {t('actions.cancel')}
        </Button>

        <Button
          tw="w-[48%]"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          icon={isSubmitting ? undefined : 'check-circle-outline'}
          disabled={hasPayoutMethods && !isDirty}
          uppercase
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : hasPayoutMethods ? (
            t('actions.save-changes')
          ) : (
            t('actions.save')
          )}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(PayoutSettings, ['bottom'], true);
