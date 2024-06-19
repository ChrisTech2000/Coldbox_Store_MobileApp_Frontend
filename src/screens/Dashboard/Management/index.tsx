import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function ManagementMain(props: ManagementRouteProps<'Root'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title="Company details"
        onPress={() => {
          navigation.navigate('CompanyDetails');
        }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Locations"
        onPress={() => {
          navigation.navigate('Locations');
        }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Cooling units"
        onPress={() => {
          navigation.navigate('CoolingUnits');
        }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Operators"
        onPress={() => {
          navigation.navigate('Operators');
        }}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
    </View>
  );
}
