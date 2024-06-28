import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { CommonRoutes } from './components/CommonRoutes';

function ManagementMain(props: ManagementRouteProps<'Root'>) {
  const { navigation } = props;
  const { user } = useAuthStore();

  const isOperator = useMemo(() => user?.role === ERoles.OPERATOR, [user?.role]);

  if (isOperator) {
    return (
      <View tw="flex-1 justify-start">
        <List.Item
          title="Cooling users"
          onPress={() => {
            navigation.navigate('CoolingUsers');
          }}
          left={(props) => <List.Icon {...props} icon="account-multiple-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <CommonRoutes {...props} />
      </View>
    );
  }

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

      <CommonRoutes {...props} />
    </View>
  );
}

export default withSafeArea(ManagementMain);
