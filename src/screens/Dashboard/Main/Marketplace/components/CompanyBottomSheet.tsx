import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from 'tailwindcss/colors';
import truncate from 'lodash/truncate';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { Button } from '#ui/components/Button';
import * as BottomSheet from '#ui/components/BottomSheet';

import { useTranslationUtils } from '#i18n/utils';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

export type CompanyBottomSheetDatum = {
  name: string;
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
  coolingUnit: string;
};

export default function CompanyBottomSheet() {
  const { t } = useTranslationUtils();

  const [datum, setDatum] = useState<CompanyBottomSheetDatum | null>(null);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  useAppEventListener<[CompanyBottomSheetDatum]>(
    APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL,
    (company) => {
      setDatum(company);
      modalActions.open();
    }
  );

  return (
    <BottomSheet.Root ref={modalRef} onClose={() => setDatum(null)}>
      <BottomSheet.Content tw="pt-2.5">
        <Text variant="TextMedium" tw="text-2xl">
          {datum?.name}
        </Text>
        <Text variant="TextMedium" tw="text-xl">
          {datum?.coolingUnit}
        </Text>
        <View tw="mt-3">
          <_CompanyField
            label={t('Dashboard.Management.AddCoolingUnit.fields.location')}
            value={datum?.locationName ?? ''}
          />
          <Divider tw="bg-zinc-400" />

          <_CompanyField
            label={t('Dashboard.Management.Location.chips.address')}
            value={datum?.address ?? ''}
          />
          <Divider tw="bg-zinc-400" />

          <_CompanyField
            label={t('Dashboard.Management.Location.chips.coordinates')}
            value={datum !== null ? _formatCoords(datum.latitude, datum.longitude) : ''}
          />
        </View>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          mode="outlined"
          tw="w-5/6"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            modalActions.close();
          }}
        >
          {t('Dashboard.ShoppingCart.gotItButton')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet.Root>
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
