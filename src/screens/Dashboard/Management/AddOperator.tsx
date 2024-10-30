import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Banner, Checkbox, Divider } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Select } from '#ui/components/Select';
import { Input } from '#ui/components/Input';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import validator from 'validator';

type FormValues = {
  phoneNumber: string;
  coolingUnits: Array<number>;
};

function AddOperator(props: ManagementRouteProps<'AddOperator'>) {
  const { navigation } = props;

  const company = useManagementStore(useShallow((store) => store.company));
  const { t, zodResolver } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const [isModalVisible, toggleModalVisibility] = useToggle();

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

  const options = useMemo(
    () =>
      data?.map((coolingUnit) => ({
        id: coolingUnit.id,
        name: coolingUnit.name,
      })) ?? [],
    [data]
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { phoneNumber: '', coolingUnits: [] },
    resolver: zodResolver((z) =>
      z.object({
        phoneNumber: z
          .string()
          .min(1, { message: t('Auth.SignUp.schema.phoneError') })
          .default('')
          .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
        coolingUnits: z.array(z.number()).min(1),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const [internalSelection, setInternalSelection] = useState<Array<number>>([]);
  const selectedCoolingUnits = watch('coolingUnits');

  const selectLabel = useMemo(() => {
    const selectedOptions = options
      .filter((option) => selectedCoolingUnits.includes(option.id))
      .map((option) => option.name);
    return selectedOptions.length > 0
      ? selectedOptions.join(', ')
      : t('Dashboard.Management.Operators.fields.selectCoolingUnit');
  }, [options, selectedCoolingUnits]);

  async function onSubmit(values: FormValues) {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return; // safe guard

    try {
      await ColdtivateService.sendOperatorInvitation({
        phone: values.phoneNumber,
        coolingUnits: values.coolingUnits,
        userId,
      });

      toast.show(t('Dashboard.Management.AddOperator.toasts.success'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getInvitedOperators', company?.id));
      navigation.goBack();
    } catch (exception) {
      toast.show(t('Dashboard.Management.AddOperator.toasts.error'), {
        type: 'md_danger',
      });
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
      tw="h-full pt-5 space-y-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <View tw="mx-4">
        <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
          <Banner
            visible
            elevation={0}
            style={{ backgroundColor: paperTheme.colors.elevation.level3 }}
          >
            {t('Dashboard.Management.Operators.banner')}
          </Banner>
        </SkiaShadow>

        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              tw="w-full bg-transparent mt-7 mb-2"
              label={`${t('Auth.ForgotPassword.phoneInputLabel')}*`}
              mode="flat"
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phoneNumber}
            />
          )}
          name="phoneNumber"
        />

        <View tw="space-y-4 mx-4 mt-2">
          <Select
            variant="md"
            label={selectLabel}
            isModalOpen={isModalVisible}
            onClick={() => {
              setInternalSelection(selectedCoolingUnits);
              toggleModalVisibility();
            }}
            error={!!errors.coolingUnits}
            content={{
              options: (
                <React.Fragment>
                  {options.map((option, optionIdx) => (
                    <Checkbox.Item
                      key={`cooling-unit-item-${option.id}-#${optionIdx}`}
                      label={option.name}
                      status={internalSelection.includes(option.id) ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setInternalSelection((prev) => {
                          const clone = [...prev];
                          const idx = clone.indexOf(option.id);
                          if (idx === -1) clone.push(option.id);
                          else clone.splice(idx, 1);
                          return clone;
                        });
                      }}
                    />
                  ))}
                </React.Fragment>
              ),
              footer: (
                <View tw="flex flex-row items-center justify-end">
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection(selectedCoolingUnits);
                      toggleModalVisibility();
                    }}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setValue('coolingUnits', internalSelection);
                      toggleModalVisibility();
                    }}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              ),
            }}
          />
        </View>
        <Divider
          tw={cn('w-full bg-gray-700 mt-2 my-2', !!errors.coolingUnits && 'bg-red-700 h-0.5')}
        />
      </View>

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

export default withSafeArea(AddOperator, ['bottom'], true);
