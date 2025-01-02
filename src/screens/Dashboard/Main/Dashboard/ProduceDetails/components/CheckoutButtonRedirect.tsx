import React, { useMemo } from 'react';
import { View } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import type { CoolingUnit, Crate, Farmer } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

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

  const isDisabled = useMemo(
    () => crates.every((crate) => crate.lockedWithinPendingOrders),
    [crates]
  );

  return (
    <View
      tw={cn(
        'absolute left-0 bottom-0 bg-white border-t border-zinc-300 w-full items-center justify-center',
        isDisabled ? 'h-28' : ' h-20'
      )}
    >
      <Button
        mode="contained"
        uppercase
        disabled={isDisabled}
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

      {isDisabled ? (
        <View tw="p-1">
          <Text tw="text-center text-zinc-500">
            {t('Dashboard.CrateManagement.CheckOut.lockedWithinPendingOrders')}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
