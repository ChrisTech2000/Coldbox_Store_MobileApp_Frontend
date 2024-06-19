import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function CoolingUnits(props: ManagementRouteProps<'CoolingUnits'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 justify-start">
      {['CU098765'].map((item, itemIdx) => (
        <View key={`${item}-#${itemIdx}`}>
          <List.Item
            title={item}
            onPress={() => {
              navigation.navigate('EditCoolingUnit', {
                unitId: item,
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
