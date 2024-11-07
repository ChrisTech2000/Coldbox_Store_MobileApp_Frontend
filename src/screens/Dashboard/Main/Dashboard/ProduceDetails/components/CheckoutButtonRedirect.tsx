import React from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '#ui/components/Button';

import type { CoolingUnit, Crate, Farmer } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';

export default function CheckoutButtonRedirect(props: {
  coolingUnit: CoolingUnit | null;
  farmer?: Farmer;
  owner?: string;
  crates: Array<Crate>;
}) {
  const { coolingUnit, farmer, owner, crates } = props;

  // eslint-disable-next-line
  const navigation = useNavigation<NavigationProp<any>>();
  const { t } = useTranslationUtils();

  return (
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
                owner,
                crates,
              },
            },
          },
        });
      }}
    >
      {t('Dashboard.ProduceDetails.checkOutButton')}
    </Button>
  );
}
