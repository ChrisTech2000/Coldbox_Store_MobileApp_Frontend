import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function RegisteredEmployee(props: ManagementRouteProps<'RegisteredEmployee'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      <List.Item title="Invited (0)" />
      <Divider />

      <List.Item title="Registered (1)" />
      <Divider />

      {['Juan Faro 20/06/2024'].map((item, itemIdx) => (
        <View key={`${item}-#${itemIdx}`}>
          <List.Item
            title={item}
            onPress={() => {
              navigation.navigate('RegisteredEmployeeDetails', {
                firstName: item.split(' ')[0],
                familyName: item.split(' ')[1],
              });
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </View>
      ))}
    </View>
  );
}

export default withSafeArea(RegisteredEmployee);
