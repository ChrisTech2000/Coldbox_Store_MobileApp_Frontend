import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Divider, List, Portal } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from 'tailwindcss/colors';
import truncate from 'lodash/truncate';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { Button } from '#ui/components/Button';

import { useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

export type CompanyBottomSheetDatum = {
  name: string;
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
};

export default function CompanyBottomSheet() {
  const [datum, setDatum] = useState<CompanyBottomSheetDatum | null>(null);
  const modalRef = useRef<Modalize>(null);

  useAppEventListener<[CompanyBottomSheetDatum]>(
    'DISPATCH_MARKETPLACE_COMPANY_MODAL',
    (company) => {
      setDatum(company);
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
        onClosed={() => setDatum(null)}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="px-4 pb-4 pt-2.5">
          <Text variant="TextMedium" tw="text-2xl">
            {datum?.name}
          </Text>
          <View tw="mt-3">
            <_CompanyField label="Location name" value={datum?.locationName ?? ''} />
            <Divider tw="bg-zinc-400" />

            <_CompanyField label="Address" value={datum?.address ?? ''} />
            <Divider tw="bg-zinc-400" />

            <_CompanyField
              label="Coordinates"
              value={datum !== null ? _formatCoords(datum.latitude, datum.longitude) : ''}
            />
          </View>
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300">
          <Button
            mode="outlined"
            tw="w-5/6"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              modalRef.current?.close();
            }}
          >
            Got it!
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}

function _CompanyField(props: { label: string; value: string }) {
  return (
    <List.Item
      tw="px-0 m-0"
      title={undefined}
      left={() => <Text tw="text-lg">{props.label}</Text>}
      right={() => (
        <Touchable
          tw="flex-row items-center justify-center space-x-1.5 pl-1 pr-0.5"
          rippleColor={colors.zinc[200]}
          onPress={(evt) => {
            evt.stopPropagation();
            Clipboard.setString(props.value);
          }}
        >
          <Text tw="text-lg text-zinc-500">{truncate(props.value, { length: 28 })}</Text>
          <MaterialCommunityIcon name="content-copy" size={16} color={paperTheme.colors.primary} />
        </Touchable>
      )}
    />
  );
}

function _formatCoords(lat: number, lon: number): string {
  const latDirection = lat >= 0 ? 'N' : 'S';
  const lonDirection = lon >= 0 ? 'E' : 'W';
  return `${lat}° ${latDirection}, ${lon}° ${lonDirection}`;
}
