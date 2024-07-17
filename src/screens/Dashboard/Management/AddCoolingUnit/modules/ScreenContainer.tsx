import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import ColdRoom from '#assets/icons/coldroom.svg';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { buildInitialValues } from '../contexts/FormManager';
import FormFields from '../components/FormFields';
import DataAggregator from '../contexts/DataAggregator';

export default function ScreenContainer() {
  const { isLoading } = DataAggregator.useDataAggregator();

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <FormManager onSubmit={async () => undefined} initialValues={buildInitialValues()}>
      {() => (
        <React.Fragment>
          <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
            <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
            <Text tw="text-lg">Add Cooling Unit Screen</Text>
          </View>

          <FormFields />
        </React.Fragment>
      )}
    </FormManager>
  );
}
