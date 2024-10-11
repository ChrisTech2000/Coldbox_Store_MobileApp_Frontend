import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Banner, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';
import { useSWRConfig } from 'swr';

import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { BASE_UNIVERSAL_LINK_URL } from '#navigation/deepLinking';
import { ERoles, MAP_ROLES } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import InAppNotifications from '#common/InAppNotifications';

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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { phoneNumber: '' },
    resolver: zodResolver((z) => z.object({ phoneNumber: z.string().min(2) })),
    reValidateMode: 'onSubmit',
  });

  async function onSubmit(values: FormValues) {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return; // safe guard

    const head = `${BASE_UNIVERSAL_LINK_URL}/invite/`;
    const tail = `/${MAP_ROLES[ERoles.EMPLOYEE]}/${values.phoneNumber}`;

    const coolingUnits = data?.map((coolingUnit) => coolingUnit.id) ?? [];

    try {
      await ColdtivateService.sendEmployeeInvitation({
        coolingUnits,
        phone: values.phoneNumber,
        message: {
          partOne: t('Dashboard.Management.AddRegisteredEmployee.message', { link: head }),
          partTwo: tail,
        },
        url: {
          partOne: head,
          partTwo: tail,
        },
        userId,
      });

      toast.show(t('Dashboard.Management.AddRegisteredEmployee.toasts.success'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getInvitedCompanyEmployees', company?.id));
      navigation.goBack();
    } catch (exception) {
      toast.show(t('Dashboard.Management.AddOperator.toasts.error'), { type: 'md_danger' });
      console.error(exception);
    }
  }

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full pt-5 mx-4 space-y-6"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
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
            label={t('Auth.ForgotPassword.phoneInputLabel')}
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

      <Button
        mode="contained"
        tw="w-2/3 self-center"
        icon={isSubmitting ? undefined : 'account-arrow-down-outline'}
        onPress={handleSubmit(onSubmit)}
      >
        {isSubmitting ? (
          <ActivityIndicator animating size="small" color="white" />
        ) : (
          t('Dashboard.Management.Operators.actions.invite')
        )}
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(AddRegisteredEmployee, ['bottom'], true);
