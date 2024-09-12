import React from 'react';
import { Button } from 'react-native-paper';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import type { Crate } from '#types/global';
import type { ProduceDetailsStackRoutes } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import RBAC from '#common/RBAC';

export default function MarketplaceSettingsButton(props: {
  crates: Array<Crate>;
  produceShelfLife: number;
}) {
  const { crates, produceShelfLife } = props;

  const navigation = useNavigation<NavigationProp<ProduceDetailsStackRoutes>>();

  return (
    <RBAC.ProtectedResource action="VIEW" subject="EditSellingSettings">
      <Button
        mode="outlined"
        uppercase
        tw="w-[85%] my-4"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('MarketplaceSettings', {
            crates,
            produceShelfLife,
          });
        }}
      >
        Edit Selling Settings
      </Button>
    </RBAC.ProtectedResource>
  );
}
