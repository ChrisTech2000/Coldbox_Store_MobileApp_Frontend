import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Banner, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import colors from 'tailwindcss/colors';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Button } from '#ui/components/Button';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

type FormValues = {
  phoneNumber: string;
};

function AddRegisteredEmployee() {
  const { t, zodResolver } = useTranslationUtils();

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
    console.log(values);
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
            mode="outlined"
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

export default withSafeArea(AddRegisteredEmployee);
