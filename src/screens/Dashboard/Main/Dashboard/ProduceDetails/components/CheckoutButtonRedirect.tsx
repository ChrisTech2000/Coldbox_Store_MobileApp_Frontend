import React from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '#ui/components/Button';

import type { CoolingUnit, Crate, Farmer } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import RBAC from '#common/RBAC';

export default function CheckoutButtonRedirect(props: {
  coolingUnit: CoolingUnit | null;
  farmer?: Farmer;
  crates: Array<Crate>;
}) {
  const { coolingUnit, farmer, crates } = props;

  // eslint-disable-next-line
  const navigation = useNavigation<NavigationProp<any>>();
  const { t } = useTranslationUtils();

  return (
    <RBAC.ProtectedResource action="VIEW" subject="OperatorActions">
      <Button
        mode="contained"
        uppercase
        tw="w-[85%]"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('Main', {
            screen: 'Dashboard',
            params: {
              screen: 'CheckOutStack',
              params: {
                screen: 'CrateSelection',
                params: {
                  coolingUnit,
                  user: farmer,
                  crates,
                },
              },
            },
          });
        }}
      >
        {t('Dashboard.ProduceDetails.checkOutButton')}
      </Button>
    </RBAC.ProtectedResource>
  );
}
