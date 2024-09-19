import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';

import { useAppEventListener } from '#ui/lib/emitter';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceItemWrapper from './MarketplaceItem';

type Datum = {
  id: number;
  cropName: string;
  movementCode: string;
  cropImage: string;
  crateWeight: number;
  price: number;
  shelfLife: number;
  company: {
    name: string;
    country: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  coolingUnit: {
    name: string;
  };
};

export default function AddToCartModal() {
  const [datum, setDatum] = useState<Datum | undefined>(undefined);

  useAppEventListener<[Datum]>('DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL', setDatum);

  const isVisible = typeof datum !== 'undefined';

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={() => setDatum(undefined)}>
        <View tw="w-full items-center bg-zinc-50 rounded-3xl w-11/12 max-w-11/12 h-auto py-4 px-5 self-center space-y-2">
          <View tw="items-start space-y-1 my-2.5 w-full">
            <Text variant="TitleMedium">Select quantity</Text>
            {isVisible ? (
              <MarketplaceItemWrapper>
                <MarketplaceItemWrapper.Body
                  shelfLife={datum.shelfLife}
                  cropName={datum.cropName}
                  movementCode={datum.movementCode}
                  cropImageUri={`${API_BASE_URL}media/${datum.cropImage}`}
                />
                <MarketplaceItemWrapper.CompanyAction
                  company={datum.company}
                  coolingUnitName={datum.coolingUnit.name}
                  readOnly
                />
                <MarketplaceItemWrapper.BuyAction
                  crateWeight={datum.crateWeight}
                  price={datum.price}
                />
              </MarketplaceItemWrapper>
            ) : null}
            <Input
              tw="bg-white border rounded-sm h-14 text-center rounded-md w-full"
              keyboardType="numeric"
              defaultValue="2"
              left={<TextInput.Icon icon="minus" color={paperTheme.colors.primary} />}
              right={<TextInput.Icon icon="plus" color={paperTheme.colors.primary} />}
            />
          </View>
          <View tw="w-full flex-col items-center space-y-2">
            <Button
              tw="w-11/12"
              mode="outlined"
              onPress={(evt) => {
                evt.stopPropagation();
                setDatum(undefined);
              }}
            >
              Add to cart and continue shopping
            </Button>
            <Button
              tw="w-11/12"
              mode="contained"
              onPress={(evt) => {
                evt.stopPropagation();
                setDatum(undefined);
              }}
            >
              Buy now
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
