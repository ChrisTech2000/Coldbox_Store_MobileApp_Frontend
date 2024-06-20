import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Dashboard Main Screen</Text>

      <Button
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('ProduceDetails');
        }}
      >
        Go to Produce Details
      </Button>
    </View>
  );
}

export default withSafeArea(DashboardMain);
