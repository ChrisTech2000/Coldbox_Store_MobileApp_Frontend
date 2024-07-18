import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdRoom from '#assets/icons/coldroom.svg';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { paperTheme } from '#ui/lib/theme';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { buildInitialValues } from '../contexts/FormManager';
import FormFields from '../components/FormFields';
import DataAggregator from '../contexts/DataAggregator';

export default function ScreenContainer() {
  const { isLoading } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <FormManager onSubmit={async (v) => console.log(v)} initialValues={buildInitialValues()}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
              <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
              <Text tw="text-lg">Add Cooling Unit Screen</Text>
            </View>
            <FormFields />
            <Button
              tw="w-11/12 self-center mt-7"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle-outline'}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </React.Fragment>
        )}
      </FormManager>
    </KeyboardAwareScrollView>
  );
}
