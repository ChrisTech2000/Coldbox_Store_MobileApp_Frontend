import React, { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';

import Employee from '#assets/icons/employee.svg';
import Farmer from '#assets/icons/farmer.svg';
import Operator from '#assets/icons/operator.svg';
import Logo from '#assets/images/coldtivate_logo.svg';

import InAppNotifications from '#common/InAppNotifications';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { AuthRouteProps } from '#navigation/Auth';
import AuthService from '#services/AuthService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles, MAP_ROLES } from '#types/global';
import { CustomError } from '#services/utils/ErrorUtil';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { useRecaptcha } from '#hooks/useRecaptcha';

import { AccountCard } from './components/AccountCard';

const IMG_SIZE = Dimensions.get('window').width / 2.5;
const ACCOUNT_TYPE_SIZE = Dimensions.get('window').width / 5;

export enum EAccountProfile {
  FARMER = ERoles.COOLING_USER,
  EMPLOYEE = ERoles.EMPLOYEE,
  OPERATOR = ERoles.OPERATOR,
}

type SignInSchema = {
  activeProfile: EAccountProfile;
  user: string;
  password: string;
};

function SignIn(props: AuthRouteProps<'SignIn'>) {
  const { navigation, route } = props;

  const setCompany = useManagementStore((store) => store.setCompany); // → this is for management (RE and OP)
  const { setSession, setUser } = useAuthStore((store) => ({
    setSession: store.setSession,
    setUser: store.setUser,
  }));

  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const descriptions = useMemo(
    () => ({
      [EAccountProfile.EMPLOYEE]: t('Auth.SignIn.accounts.registeredEmployee.description'),
      [EAccountProfile.OPERATOR]: t('Auth.SignIn.accounts.operator.description'),
      [EAccountProfile.FARMER]: t('Auth.SignIn.accounts.coolingUser.description'),
    }),
    []
  );

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver((z, t) =>
      z
        .object({
          activeProfile: z.enum([
            EAccountProfile.EMPLOYEE,
            EAccountProfile.FARMER,
            EAccountProfile.OPERATOR,
          ]),
          user: z.string(),
          password: z.string().min(1, {
            message: t('Auth.SignIn.form.password.messages.required'),
          }),
        })
        .superRefine((data, ctx) => {
          if (data.user.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_small,
              path: ['user'],
              minimum: 1,
              type: 'string',
              inclusive: true,
              message:
                data.activeProfile === EAccountProfile.EMPLOYEE
                  ? t('Auth.SignIn.form.user.messages.registeredEmployee')
                  : t('Auth.SignIn.form.user.messages.default'),
            });
          }
        })
    ),
    defaultValues: {
      activeProfile: route.params?.accountProfile ?? EAccountProfile.EMPLOYEE,
      user: '',
      password: '',
    },
  });

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const activeProfile = watch('activeProfile');

  const { recaptchaRef, showRecaptcha, handleVerify, handleError } = useRecaptcha({
    onVerify: async (recaptchaToken) => {
      try {
        setIsAuthenticating(true);
        const formData = watch();
        await performSignIn(formData, recaptchaToken);
      } finally {
        setIsAuthenticating(false);
      }
    },
    onError: async (error) => {
      setIsAuthenticating(false);
      toast.show(`reCAPTCHA error: ${error}`, { type: 'md_danger' });
    },
    onCancel: async () => {
      setIsAuthenticating(false);
      // User cancelled reCAPTCHA - could add analytics or cleanup here
    },
  });

  const performSignIn = useCallback(async (data: SignInSchema, recaptchaToken: string | null) => {
    try {
      const result = await AuthService.signIn(
        {
          userType: MAP_ROLES[data.activeProfile],
          password: data.password,
          username: data.user,
          language: LanguageManager.read(),
        },
        recaptchaToken
      );

      if (result) {
        if (typeof result.company !== 'undefined') {
          setCompany({
            id: result.company.id,
            country: result.company.country,
            currency: result.company.currency,
            name: result.company.name,
            hasDigitalTwin: result.company.digitalTwin,
            hasLegacyContacts: result.company.hasLegacyContacts,
          });
        }
        setSession({
          accessToken: result.access,
          refreshToken: result.refresh,
        });
        setUser({ ...result.user, role: result.role });

        toast.show(t('Auth.SignIn.accounts.toasts.success'), {
          type: 'md_success',
          style: { marginBottom: 50 },
        });

        await useAuthStore.getState().renewSession();
      }
    } catch (exception) {
      if (exception instanceof CustomError && exception.originalError.response.status <= 401) {
        toast.show(t('Auth.SignIn.accounts.toasts.login'), { type: 'md_danger' });
      } else {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      }
      reportCrash(exception as Error);
    }
  }, []);

  const onSubmit: SubmitHandler<SignInSchema> = useCallback(async () => {
    setIsAuthenticating(true);
    await showRecaptcha();
  }, [showRecaptcha]);

  return (
    <KeyboardAwareScrollView tw="mt-[-24]" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 items-center">
        <Logo width={IMG_SIZE} height={IMG_SIZE} tw="mb-4" />
        <Text tw="mb-2 text-xl font-bold">{t('Auth.SignIn.heading')}</Text>

        <View tw="w-full flex-row mb-2 justify-between px-2 mt-1" id="this-one">
          <View tw="items-center w-1/3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <AccountCard
                  isActive={activeProfile === EAccountProfile.EMPLOYEE}
                  onPress={() => {
                    clearErrors();
                    onChange(EAccountProfile.EMPLOYEE);
                  }}
                  testID="employee-account-card"
                >
                  <Employee width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
                </AccountCard>
              )}
              name="activeProfile"
            />
            <Text tw="mt-4 text-xs text-center">
              {t('Auth.SignIn.accounts.registeredEmployee.label')}
            </Text>
          </View>

          <View tw="items-center w-1/3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <AccountCard
                  isActive={activeProfile === EAccountProfile.OPERATOR}
                  onPress={() => {
                    clearErrors();
                    onChange(EAccountProfile.OPERATOR);
                  }}
                  testID="operator-account-card"
                >
                  <Operator width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
                </AccountCard>
              )}
              name="activeProfile"
            />
            <Text tw="mt-4 text-xs text-center">{t('Auth.SignIn.accounts.operator.label')}</Text>
          </View>

          <View tw="items-center w-1/3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <AccountCard
                  isActive={activeProfile === EAccountProfile.FARMER}
                  onPress={() => {
                    clearErrors();
                    onChange(EAccountProfile.FARMER);
                  }}
                  testID="farmer-account-card"
                >
                  <Farmer width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
                </AccountCard>
              )}
              name="activeProfile"
            />
            <Text tw="mt-4 text-xs text-center">{t('Auth.SignIn.accounts.coolingUser.label')}</Text>
          </View>
        </View>

        <Divider tw="w-full mb-2" />
        <Text tw="text-xs max-w-[95%]">{descriptions[activeProfile]}</Text>
        <Divider tw="w-full my-2" />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
              label={
                activeProfile === EAccountProfile.EMPLOYEE
                  ? t('Auth.SignIn.form.user.placeholder')
                  : t('Auth.ForgotPassword.phoneInputLabel')
              }
              left={<TextInput.Icon icon="phone" />}
              onChangeText={onChange}
              value={value}
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          name="user"
        />
        {errors.user && (
          <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
            {errors.user.message?.toString()}
          </Text>
        )}

        <Text tw="text-xs w-[95%] mt-1 mb-2 px-3">
          {activeProfile === EAccountProfile.EMPLOYEE
            ? t('Auth.SignIn.form.user.description.registeredEmployee')
            : t('Auth.SignIn.form.user.description.default')}
        </Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
              label={t('Auth.SignIn.form.password.placeholder')}
              secureTextEntry={hidePass}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye' : 'eye-off'}
                  onPress={() => setHidePass(!hidePass)}
                />
              }
              left={<TextInput.Icon icon="lock" />}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
            {errors.password.message?.toString()}
          </Text>
        )}

        <Button
          tw="w-[95%] border-2 mb-2"
          mode="contained"
          uppercase
          onPress={handleSubmit(onSubmit)}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            t('Auth.SignIn.form.actions.logIn')
          )}
        </Button>
        <Button
          mode="text"
          rippleColor="white"
          labelStyle="text-xs"
          tw="mb-8"
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.navigate('PasswordRecoveryRequest');
          }}
          disabled={isAuthenticating}
        >
          {t('Auth.ForgotPassword.heading')}
        </Button>
      </View>

      <RecaptchaModal ref={recaptchaRef} onVerify={handleVerify} onError={handleError} />
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignIn, ['top', 'bottom'], true);
