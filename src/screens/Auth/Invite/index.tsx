import React, { useCallback, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';
import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import type { RecaptchaModalRef } from '#ui/components/RecaptchaModal';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { Text } from '#ui/components/Text';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useRecaptcha } from '#hooks/useRecaptcha';
import { useTranslationUtils } from '#i18n/utils';
import type { AuthRouteProps } from '#navigation/Auth';
import AuthService from '#services/AuthService';
import { ERoles } from '#types/global';

import { EAccountProfile } from '../SignIn';
import FormFields from './components/FormFields';
import FormManager, { type FormValues, buildInitialValues } from './components/FormManager';

const LOGO_SIZE = Dimensions.get('window').width / 2.5;

function Invite(props: AuthRouteProps<'Invite'>) {
  const { params } = props.route;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const recaptchaRef = useRef<RecaptchaModalRef>(null);

  const { showRecaptcha, handleVerify, handleError } = useRecaptcha({
    onVerify: async (recaptchaToken) => {
      // This will be set by the FormManager when we need to submit
      if (pendingFormValues.current) {
        await performSubmit(pendingFormValues.current, recaptchaToken);
        pendingFormValues.current = null;
      }
    },
    onError: (error) => {
      toast.show(`reCAPTCHA error: ${error}`, { type: 'md_danger' });
    },
    onCancel: () => {
      pendingFormValues.current = null;
    },
  });

  const pendingFormValues = useRef<FormValues | null>(null);

  const performSubmit = useCallback(
    async (values: FormValues, recaptchaToken: string | null): Promise<void> => {
      const { kind, email, hasAcceptedTerms, ...rest } = values;
      if (!hasAcceptedTerms) return; // safe guard

      // The reCAPTCHA token is passed to the AuthService methods

      switch (kind) {
        case ERoles.OPERATOR: {
          try {
            const result = await AuthService.signUpOperatorByInvite(rest, recaptchaToken);
            if (!result) return;
            props.navigation.navigate('SignIn', { accountProfile: EAccountProfile.OPERATOR });
          } catch (exception) {
            reportCrash(exception as Error);
          }
          break;
        }
        case ERoles.EMPLOYEE: {
          try {
            const result = await AuthService.signUpEmployeeByInvite(
              { ...rest, email },
              recaptchaToken
            );
            if (!result) return;
            props.navigation.navigate('SignIn', { accountProfile: EAccountProfile.EMPLOYEE });
          } catch (exception) {
            reportCrash(exception as Error);
          }
          break;
        }
        default:
          break;
      }
    },
    [props.navigation]
  );

  async function onSubmit(values: FormValues): Promise<void> {
    // Store the form values and show reCAPTCHA
    pendingFormValues.current = values;
    showRecaptcha();
  }

  const isOperator = params.userType === 'op';

  return (
    <>
      <FormManager onSubmit={onSubmit} initialValues={buildInitialValues(params)}>
        {({ submitHandler, isSubmitting, isDisabled }) => (
          <KeyboardAwareScrollView
            tw="h-full mx-4"
            contentContainerStyle="pt-5 pb-8"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="items-center space-y-4">
              <Text variant="TitleMedium">{t('Auth.Invite.heading')}</Text>
              <Text style={{ color: paperTheme.colors.primary }}>
                {isOperator ? t('Auth.Invite.operator') : t('Auth.Invite.employee')}
              </Text>
            </View>

            <ColdtivateLogo width={LOGO_SIZE} height={LOGO_SIZE} tw="self-center my-4" />
            <FormFields />
            <Button
              tw="w-full mt-6"
              mode="contained"
              onPress={submitHandler}
              disabled={isDisabled}
              uppercase
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                t('Auth.SignUp.commonForm.submit')
              )}
            </Button>
          </KeyboardAwareScrollView>
        )}
      </FormManager>

      <RecaptchaModal ref={recaptchaRef} onVerify={handleVerify} onError={handleError} />
    </>
  );
}

export default withSafeArea(Invite, ['bottom'], true);
