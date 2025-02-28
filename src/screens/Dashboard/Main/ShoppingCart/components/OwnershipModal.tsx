import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import InAppNotifications from '#common/InAppNotifications';
import useCartStore from '#stores/shoppingCart';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import MarketplaceService from '#services/MarketplaceService';
import reportCrash from '#ui/lib/reportCrash';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

type OwnershipModalProps = {
  isVisible: boolean;
  close: () => void;
};

export function OwnershipModal({ isVisible, close }: OwnershipModalProps) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [cartData, setCart] = useCartStore((store) => [store.cartData, store.setCart]);
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
            <Button
              mode="outlined"
              tw="border border-green-primary w-[48%]"
              onPress={close}
              disabled={isProcessing}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              mode="contained"
              tw="border border-green-primary w-[48%]"
              onPress={async (evt) => {
                evt.stopPropagation();
                try {
                  setIsProcessing(true);
                  const result = await MarketplaceService.toggleCartOwnership();
                  if (result.cart) setCart(result.cart);
                  setIsProcessing(false);
                  close();
                } catch (exception) {
                  toast.show(t('navigation.error.serverErrorMessage', { type: 'md_danger' }));
                  setIsProcessing(false);
                  reportCrash(exception as Error);
                }
              }}
              disabled={isProcessing}
            >
              {t('actions.continue')}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
