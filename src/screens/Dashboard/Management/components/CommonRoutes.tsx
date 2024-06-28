import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { ManagementRouteProps } from 'navigation/Dashboard/Management';

export const CommonRoutes = (props: ManagementRouteProps<'Root'>) => {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title="Revenue analysis"
        onPress={() => {
          navigation.navigate('RevenueAnalysis');
        }}
        left={(props) => <List.Icon {...props} icon="cash-multiple" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Usage Analysis"
        onPress={() => {
          navigation.navigate('UsageAnalysis');
        }}
        left={(props) => <List.Icon {...props} icon="archive-arrow-up-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
    </View>
  );
};
