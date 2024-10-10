import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';

interface FormValues {
  companyName: string;
  contactName: string;
  phoneNumber: string;
}

function DeliveryContacts(props: ManagementRouteProps<'DeliveryContacts'>) {
  const { t, zodResolver } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);
  const toast = InAppNotifications.useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver((z) =>
      z.object({
        companyName: z.string().min(1, {
          message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountName'),
        }),
        contactName: z
          .string()
          .min(1, { message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.account') }),
        phoneNumber: z.string().min(1, {
          message: t('Dashboard.AccountDetails.PayoutSettings.form.errors.accountType'),
        }),
      })
    ),
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        console.log(data);
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
    },
    [user, company]
  );

  // if (isLoading) {
  //   return (
  //     <View tw="flex-1 items-center justify-center mt-4">
  //       <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
  //     </View>
  //   );
  // }

  return (
    <KeyboardAwareScrollView
      tw="h-full p-3"
      contentContainerStyle="flex-1 justify-between"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View tw="mt-4 space-y-3">
          <Controller
            control={control}
            name="companyName"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                tw="w-full bg-transparent mt-1"
                label={t('Dashboard.Management.Delivery.companyName')}
                mode="flat"
                placeholder={t('Dashboard.Management.Delivery.companyNamePlaceholder')}
                dense
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.companyName}
              />
            )}
          />

          <Controller
            control={control}
            name="contactName"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                tw="w-full bg-transparent mt-1"
                label={t('Dashboard.Management.Delivery.contactName')}
                mode="flat"
                placeholder={t('Dashboard.Management.Delivery.contactNamePlaceholder')}
                dense
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.contactName}
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                tw="w-full bg-transparent mt-1"
                label={t('Dashboard.Management.Delivery.phoneNumber')}
                mode="flat"
                placeholder={t('Dashboard.Management.Delivery.phoneNumberPlaceholder')}
                dense
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.contactName}
              />
            )}
          />
        </View>
      </View>

      <View tw="flex flex-row items-end justify-evenly">
        <Button
          tw="w-[48%]"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          icon={isSubmitting ? undefined : 'check-circle-outline'}
          disabled={!isDirty}
          uppercase
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            t('actions.save-changes')
          )}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(
  withErrorBoundary(DeliveryContacts, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
