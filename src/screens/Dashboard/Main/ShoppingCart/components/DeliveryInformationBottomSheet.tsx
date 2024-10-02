import Clipboard from '@react-native-clipboard/clipboard';
import truncate from 'lodash/truncate';
import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Divider, List, Portal } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';

export type DeliveryInformationDatum = {
  companyName: string;
  phoneNumber: string;
  produces: Array<{ cropName: string; weight: number; code: string }>;
};

// TODO → maybe replace Flatlist + .map() with Flashlist for better performance (would need to test it first)
export default function DeliveryInformationBottomSheet() {
  const { t } = useTranslationUtils();

  const [datum, setDatum] = useState<Array<DeliveryInformationDatum> | null>(null);
  const modalRef = useRef<Modalize>(null);

  useAppEventListener<[Array<DeliveryInformationDatum>]>(
    'DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION',
    (info) => {
      setDatum(info);
      modalRef.current?.open();
    }
  );

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="px-4 pb-4 pt-2.5 space-y-3.5">
          <Text tw="text-2xl mb-1.5">{t('Dashboard.ShoppingCart.contactsForDelivery')}</Text>
          <FlatList
            data={datum ?? []}
            keyExtractor={(_, itemIdx) => `delivery-information-list-item-#${itemIdx}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View tw="w-full border border-solid border-zinc-300 rounded-xl py-2 px-3 my-2">
                <_Field
                  label={t('Dashboard.ShoppingCart.companyName')}
                  value={item.companyName}
                  mode="text"
                />
                <_Field
                  label={t('Dashboard.ShoppingCart.phoneNumber')}
                  value={item.phoneNumber}
                  mode="clipboard"
                />
                <Divider tw="bg-zinc-400 mt-1.5" />
                {item.produces.map((produce, produceIdx) => (
                  <_Field
                    key={`delivery-information-${index}-produce-#${produceIdx}`}
                    label={produce.cropName}
                    value={`${produce.weight}KG`}
                    smallText={produce.code}
                    mode="highlight"
                  />
                ))}
              </View>
            )}
          />
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300">
          <Button mode="outlined" tw="w-5/6" uppercase onPress={() => modalRef.current?.close()}>
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}

function _Field(props: {
  mode: 'text' | 'clipboard' | 'highlight';
  label: string;
  value: string;
  smallText?: string;
}) {
  const { mode, label, value, smallText } = props;
  return (
    <List.Item
      title={undefined}
      tw="p-0 m-0"
      left={() => (
        <View>
          <Text tw={cn('text-lg', mode === 'clipboard' || (mode === 'highlight' && 'font-bold'))}>
            {label}
          </Text>
          {mode === 'highlight' && <Text tw="text-zinc-500">{smallText}</Text>}
        </View>
      )}
      right={() => (
        <Touchable
          tw="flex-row items-center justify-center space-x-1.5 pl-1 pr-0.5"
          rippleColor={colors.zinc[200]}
          onPress={(evt) => {
            evt.stopPropagation();
            if (mode === 'clipboard') Clipboard.setString(value);
          }}
        >
          <Text tw={cn('text-lg', mode === 'highlight' ? 'font-bold' : 'text-zinc-500')}>
            {truncate(value, { length: 28 })}
          </Text>
          {mode === 'clipboard' && (
            <MaterialCommunityIcon
              name="content-copy"
              size={16}
              color={paperTheme.colors.primary}
            />
          )}
        </Touchable>
      )}
    />
  );
}
