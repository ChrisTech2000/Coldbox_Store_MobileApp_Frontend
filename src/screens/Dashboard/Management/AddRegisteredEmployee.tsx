import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Banner, Text, TextInput } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import colors from 'tailwindcss/colors';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';

import { useRecaptcha } from '#hooks/useRecaptcha';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useTranslationUtils } from '#i18n/utils';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import InAppNotifications from '#common/InAppNotifications';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';

type FormValues = {
  phoneNumber: string;
};

function AddRegisteredEmployee(props: ManagementRouteProps<'AddRegisteredEmployee'>) {
  const { navigation } = props;

  const { t, zodResolver } = useTranslationUtils();
  const company = useManagementStore(useShallow((store) => store.company));
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const { data, isLoading } = useApiCall(
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

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { phoneNumber: '' },
    resolver: zodResolver((z) =>
      z.object({
        phoneNumber: z
          .string()
          .min(1, { message: t('Auth.SignUp.schema.phoneError') })
          .default('')
          .refine((value) => isValidPhoneNumber(value), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const [isInviting, setIsInviting] = useState<boolean>(false);

  const { recaptchaRef, showRecaptcha, handleVerify, handleError } = useRecaptcha({
    onVerify: async (recaptchaToken) => {
      try {
        setIsInviting(true);
        const formData = watch();
        await performInvite(formData, recaptchaToken);
      } finally {
        setIsInviting(false);
      }
    },
    onError: async (error) => {
      setIsInviting(false);
      toast.show(`reCAPTCHA error: ${error}`, { type: 'md_danger' });
    },
    onCancel: async () => {
      setIsInviting(false);
    },
  });

  async function performInvite(values: FormValues, recaptchaToken: string | null) {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return; // safe guard

    const coolingUnits = data?.map((coolingUnit) => coolingUnit.id) ?? [];

    try {
      await ColdtivateService.sendEmployeeInvitation({
        coolingUnits,
        phone: values.phoneNumber,
        userId,
        recaptchaToken,
      });

      toast.show(t('Dashboard.Management.AddRegisteredEmployee.toasts.success'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getInvitedCompanyEmployees', company?.id));
      navigation.goBack();
    } catch (exception) {
      toast.show(t('Auth.SignUp.toasts.error'), { type: 'md_danger' });
      reportCrash(exception as Error);
    }
  }

  async function onSubmit() {
    setIsInviting(true);
    await showRecaptcha();
  }

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <KeyboardAwareScrollView
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
      >
        <View tw="h-full pt-5 mx-4">
          <View>
            <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
              <Banner
                visible
                elevation={0}
                style={{ backgroundColor: paperTheme.colors.elevation.level3 }}
              >
                {t('Dashboard.Management.Operators.banner')}
              </Banner>
            </SkiaShadow>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                tw="w-full bg-transparent mt-6"
                label={`${t('Auth.ForgotPassword.phoneInputLabel')}*`}
                mode="flat"
                dense
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.phoneNumber}
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber ? (
            <Text tw="text-xs text-red-600 mt-2 mb-7 pl-3 w-[95%]">
              {errors.phoneNumber.message?.toString()}
            </Text>
          ) : null}
        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          mode="contained"
          tw="w-full"
          icon={isSubmitting ? undefined : 'account-arrow-down-outline'}
          onPress={handleSubmit(onSubmit)}
          disabled={isInviting}
        >
          {isInviting ? (
            <ActivityIndicator animating size="small" color="white" />
          ) : (
            t('Dashboard.Management.Operators.actions.invite')
          )}
        </Button>
      </HideWithKeyboardView>

      <RecaptchaModal ref={recaptchaRef} onVerify={handleVerify} onError={handleError} />
    </View>
  );
}

export default withSafeArea(AddRegisteredEmployee, ['bottom'], true);
