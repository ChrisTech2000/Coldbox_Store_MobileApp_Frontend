import React from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AuthRouteProps } from '#navigation/Auth';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues, buildInitialValues } from './components/FormManager';
import FormFields from './components/FormFields';

const LOGO_SIZE = Dimensions.get('screen').width / 2.5;

function Invite(props: AuthRouteProps<'Invite'>) {
  const { params } = props.route;

  const { t } = useTranslationUtils();

  async function onSubmit(values: FormValues): Promise<void> {
    console.log({ values, params });
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={buildInitialValues(params)}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          tw="h-full pt-5 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <ColdtivateLogo width={LOGO_SIZE} height={LOGO_SIZE} tw="self-center mb-6" />

          <FormFields />

          <Button tw="w-full mt-6" mode="contained" onPress={submitHandler} uppercase>
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
