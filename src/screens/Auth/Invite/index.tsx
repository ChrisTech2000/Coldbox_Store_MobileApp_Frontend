import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AuthRouteProps } from '#navigation/Auth';
import { useTranslationUtils } from '#i18n/utils';
import { ERoles } from '#types/global';
import AuthService from '#services/AuthService';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues, buildInitialValues } from './components/FormManager';
import FormFields from './components/FormFields';
import { EAccountProfile } from '../SignIn';

const LOGO_SIZE = Dimensions.get('window').width / 2.5;

function Invite(props: AuthRouteProps<'Invite'>) {
  const { params } = props.route;

  const { t } = useTranslationUtils();

  async function onSubmit(values: FormValues): Promise<void> {
    const { kind, email, hasAcceptedTerms, ...rest } = values;
    if (!hasAcceptedTerms) return; // safe guard
    switch (kind) {
      case ERoles.OPERATOR: {
        try {
          const result = await AuthService.signUpOperatorByInvite(rest);
          if (!result) return;
          props.navigation.navigate('SignIn', { accountProfile: EAccountProfile.OPERATOR });
        } catch (exception) {
          console.error(exception);
        }
        break;
      }
      case ERoles.EMPLOYEE: {
        try {
          const result = await AuthService.signUpEmployeeByInvite({ ...rest, email });
          if (!result) return;
          props.navigation.navigate('SignIn', { accountProfile: EAccountProfile.EMPLOYEE });
        } catch (exception) {
          console.error(exception);
        }
        break;
      }
      default:
        break;
    }
  }

  const isOperator = params.userType === 'op';

  return (
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
  );
}

export default withSafeArea(Invite);
