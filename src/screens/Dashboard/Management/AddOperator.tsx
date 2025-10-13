import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Banner, Divider } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import colors from 'tailwindcss/colors';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Input } from '#ui/components/Input';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';

import { useRecaptcha } from '#hooks/useRecaptcha';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';

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
          .refine((value) => isValidPhoneNumber(value), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
        coolingUnits: z.array(z.number()),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<Array<number>>([]);
  const [isInviting, setIsInviting] = useState<boolean>(false);
  const selectedCoolingUnits = watch('coolingUnits');

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

  const selectLabel = useMemo(() => {
    if (!options.length || !selectedCoolingUnits.length) {
      return t('Dashboard.Management.Operators.fields.selectCoolingUnit');
    }
    return options
      .filter((option) => selectedCoolingUnits.includes(option.id))
      .map((option) => option.name)
      .join(', ');
  }, [options, selectedCoolingUnits, t]);

  async function performInvite(values: FormValues, recaptchaToken: string | null) {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return; // safe guard

    try {
      await ColdtivateService.sendOperatorInvitation({
        phone: values.phoneNumber,
        coolingUnits: values.coolingUnits,
        userId,
        recaptchaToken,
      });

      toast.show(t('Dashboard.Management.AddOperator.toasts.success'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getInvitedOperators', company?.id));
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
        <View tw="pt-5 space-y-8">
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

            <View tw="space-y-4 mx-4 mt-2 pb-2.5">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedCoolingUnits)}
                error={!!errors.coolingUnits}
              >
                <Select.Touchable label={selectLabel} />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.Operators.fields.coolingUnits')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setInternalSelection(selectedCoolingUnits);
                          setIsModalVisible(false);
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
                          setIsModalVisible(false);
                        }}
                      >
                        {t('actions.ok')}
                      </Button>
                    </View>
                  }
                >
                  <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={options}
                    keyExtractor={(item, itemIdx) => `cooling-unit-item-${item.id}-#${itemIdx}`}
                    renderItem={({ item }) => (
                      <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                        <Text tw="text-base w-[70%]" numberOfLines={2}>
                          {item.name}
                        </Text>
                        <Checkbox
                          status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setInternalSelection((prev) =>
                              prev.includes(item.id)
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            );
                          }}
                        />
                      </View>
                    )}
                  />
                </Select.Dialog>
              </Select>
            </View>
            <Divider tw={cn('w-full bg-gray-700', !!errors.coolingUnits && 'bg-red-700 h-0.5')} />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          tw="w-full"
          mode="contained"
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

export default withSafeArea(AddOperator, ['bottom'], true);
