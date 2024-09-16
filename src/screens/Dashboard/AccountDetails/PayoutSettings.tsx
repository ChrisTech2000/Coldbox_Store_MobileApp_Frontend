import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';

interface FormValues {
  fullName: string;
  accountNumber: string;
  bankName: string;
}

function PayoutSettings(props: AccountDetailsRouteProps<'PayoutSettings'>) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>();

  // TODO: fetch current payout settings
  const hasPayoutMethods = useMemo(() => false, []);

  const onSubmit = useCallback((data: FormValues) => {
    // TODO: handle form submission
    console.log(data);

    toast.show(t('Dashboard.AccountDetails.PayoutSettings.successMessage'), {
      type: 'md_success',
      style: { marginBottom: 50 },
    });

    props.navigation.goBack();
  }, []);

  const onDelete = useCallback(() => {
    // TODO: handle delete submission
    console.log('deleted');
  }, []);

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

        <View tw="mt-4">
          <Controller
            control={control}
            name="fullName"
            rules={{ required: t('Dashboard.AccountDetails.PayoutSettings.form.errors.name') }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                tw="w-full bg-transparent mt-2"
                label={t('Dashboard.AccountDetails.PayoutSettings.form.nameLabel')}
                mode="flat"
                dense
                error={!!errors.fullName}
                placeholder={t('Dashboard.AccountDetails.PayoutSettings.form.namePlaceholder')}
              />
            )}
          />
          {errors.fullName && <Text tw="text-red-600 mt-2">{errors.fullName.message}</Text>}

          <Controller
            control={control}
            name="accountNumber"
            rules={{ required: t('Dashboard.AccountDetails.PayoutSettings.form.errors.account') }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                tw="w-full bg-transparent mt-2"
                label={t('Dashboard.AccountDetails.PayoutSettings.form.accountNumberLabel')}
                mode="flat"
                dense
                error={!!errors.accountNumber}
                placeholder={t(
                  'Dashboard.AccountDetails.PayoutSettings.form.accountNumberPlaceholder'
                )}
              />
            )}
          />
          {errors.accountNumber && (
            <Text tw="text-red-600 mt-2">{errors.accountNumber.message}</Text>
          )}

          <Controller
            control={control}
            name="bankName"
            rules={{ required: t('Dashboard.AccountDetails.PayoutSettings.form.errors.bank') }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                tw="w-full bg-transparent mt-2"
                label={t('Dashboard.AccountDetails.PayoutSettings.form.bankLabel')}
                mode="flat"
                dense
                error={!!errors.bankName}
                placeholder={t('Dashboard.AccountDetails.PayoutSettings.form.bankPlaceholder')}
              />
            )}
          />
          {errors.bankName && <Text tw="text-red-600 mt-2">{errors.bankName.message}</Text>}
        </View>
      </View>

      <View tw="flex flex-row items-end justify-evenly">
        {hasPayoutMethods ? (
          <Button
            tw="w-[48%] bg-red-700"
            mode="contained"
            onPress={onDelete}
            icon={isSubmitting ? undefined : 'trash-can-outline'}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.delete')}
          </Button>
        ) : (
          <Button tw="w-[48%]" mode="outlined" onPress={() => props.navigation.goBack()} uppercase>
            {t('actions.cancel')}
          </Button>
        )}
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

export default withSafeArea(PayoutSettings);
