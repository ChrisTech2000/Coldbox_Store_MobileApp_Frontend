import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function Operators(props: ManagementRouteProps<'Operators'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      {['John Travolta'].map((item, itemIdx) => (
        <View key={`${item}-#${itemIdx}`}>
          <List.Item
            title={item}
            onPress={() => {
              navigation.navigate('EditOperator', {
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
