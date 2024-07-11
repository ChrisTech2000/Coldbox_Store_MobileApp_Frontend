import React from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { EApiGender } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues } from './components/FormManager';
import TextFields from './modules/TextFields';
import GenderField from './modules/GenderField';
import ContactField from './modules/ContactField';
import LanguageField from './modules/LanguageField';

const width = (Dimensions.get('screen').width - 42) / 2;

function AddCoolingUser(props: ManagementRouteProps<'AddCoolingUser'>) {
  const { params } = props.route;

  const { t } = useTranslationUtils();

  const { data, isLoading } = useApiCall(
    'getFarmer',
    ColdtivateService.getFarmer,
    { userId: params?.userId as number },
    {
      skip: !params?.userId,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  function buildInitialValues() {
    const farmer = data?.at(0);
    const values = {} as FormValues;
    values.firstName = farmer?.user?.firstName ?? '';
    values.lastName = farmer?.user?.lastName ?? '';
    values.gender = farmer?.user?.gender ?? EApiGender.OTHER;
    values.phone = farmer?.user?.phone ?? '';
    values.language = (farmer?.user?.language as TranslationLocales) ?? LanguageStorage.read();
    return values;
  }

  const disabled = (data ?? []).length >= 1;

  return (
    <FormManager onSubmit={async () => undefined} initialValues={buildInitialValues()}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          contentContainerStyle="flex-1 justify-between pt-6 pb-8 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View tw="w-full">
            <TextFields disabled={disabled} />
            <GenderField disabled={disabled} />
            <ContactField disabled={disabled} />
            <LanguageField disabled={disabled} />
          </View>
          <View tw="w-full flex-row items-center justify-between mt-5">
            <Button
              style={{ width }}
              mode="contained"
              onPress={props.navigation.goBack}
              icon="close-circle-outline"
              buttonColor={paperTheme.colors.error}
              uppercase
            >
              {t('actions.cancel')}
            </Button>
            <Button
              style={{ width }}
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle-outline'}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(AddCoolingUser);
