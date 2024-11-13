import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';

import useCartStore from '#stores/shoppingCart';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import MarketplaceService from '#services/MarketplaceService';

import { Modal } from '#ui/components/Modal';
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
      <Modal visible={isVisible} onDismiss={close}>
        <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
          <Text tw="text-base text-center">
            {t('Dashboard.ShoppingCart.changeOwnership', {
              name: cartData?.ownedOnBehalfOfCompanyId
                ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
                : (company?.name ?? ''),
            })}
          </Text>

          <View tw="pt-4 flex flex-row space-x-4">
            <Button mode="outlined" tw="border border-green-primary" onPress={close}>
              {t('actions.cancel')}
            </Button>
            <Button
              mode="contained"
              tw="border border-green-primary"
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
        </View>
      </Modal>
    </Portal>
  );
}
