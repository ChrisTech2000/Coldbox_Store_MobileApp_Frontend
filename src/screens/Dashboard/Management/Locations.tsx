import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function Locations(props: ManagementRouteProps<'Locations'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      {['Porto', 'Terceira'].map((item, itemIdx) => (
        <View key={`${item}-#${itemIdx}`}>
          <List.Item
            title={item}
            onPress={() => {
              navigation.navigate('EditLocation', {
                name: item,
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
