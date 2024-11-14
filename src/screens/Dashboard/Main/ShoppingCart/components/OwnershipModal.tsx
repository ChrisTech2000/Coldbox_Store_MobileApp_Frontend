import React from 'react';
import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import useCartStore from '#stores/shoppingCart';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import MarketplaceService from '#services/MarketplaceService';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

type OwnershipModalProps = {
  isVisible: boolean;
  close: () => void;
};

export function OwnershipModal({ isVisible, close }: OwnershipModalProps) {
  const { t } = useTranslationUtils();
  const [cartData, setCart] = useCartStore((store) => [store.cartData, store.setCart]);
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={close} style={{ backgroundColor: 'white' }}>
        <Dialog.Content>
          <Text tw="text-base">
            {t('Dashboard.ShoppingCart.changeOwnership', {
              name: cartData?.ownedOnBehalfOfCompanyId
                ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
                : (company?.name ?? ''),
            })}
          </Text>

          <View tw="mt-5 flex flex-row items-center justify-between">
            <Button mode="outlined" tw="border border-green-primary w-[48%]" onPress={close}>
              {t('actions.cancel')}
            </Button>
            <Button
              mode="contained"
              tw="border border-green-primary w-[48%]"
              onPress={async () => {
                const result = await MarketplaceService.toggleCartOwnership();
                if (result.cart) {
                  setCart(result.cart);
                }
                close();
              }}
            >
              {t('actions.continue')}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
