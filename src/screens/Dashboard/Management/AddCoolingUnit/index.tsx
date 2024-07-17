import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import ColdRoom from '#assets/icons/coldroom.svg';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useManagementStore } from '#stores/management';
import { paperTheme } from '#ui/lib/theme';

import { useConsumer } from './consumer';

function AddCoolingUnit() {
  const company = useManagementStore(useShallow((store) => store.company));

  const { isLoading } = useConsumer(company?.id);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full mx-4"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <View tw="flex-row items-center space-x-3">
        <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
        <Text tw="text-lg">Add Cooling Unit Screen</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(AddCoolingUnit);
