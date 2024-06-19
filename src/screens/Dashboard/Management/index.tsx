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
        left={(props) => <List.Icon {...props} icon="information-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Locations"
        onPress={() => {
          navigation.navigate('Locations');
        }}
        left={(props) => <List.Icon {...props} icon="map-marker" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Cooling units"
        onPress={() => {
          navigation.navigate('CoolingUnits');
        }}
        left={(props) => <List.Icon {...props} icon="coolant-temperature" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Operators"
        onPress={() => {
          navigation.navigate('Operators');
        }}
        left={(props) => <List.Icon {...props} icon="account-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title="Registered Employee"
        onPress={() => {
          navigation.navigate('RegisteredEmployee');
        }}
        left={(props) => <List.Icon {...props} icon="account-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

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
}
