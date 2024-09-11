import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { useAppEventListener } from '#ui/lib/emitter';
import { cn } from '#ui/lib/cn';

import type { MarkerDatum } from '../utils';

type Props = {
  markers: Array<MarkerDatum>;
};

export default function PointAnnotationModal(props: Props) {
  const { markers } = props;

  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const [marker, setMarker] = useState<MarkerDatum | undefined>(undefined);

  useAppEventListener<[boolean, number]>('DISPATCH_MAPS_TAB_MODAL', (status, markerDatumIdx) => {
    setModalVisibility(status);
    setMarker(markers.at(markerDatumIdx));
  });

  const safeValue = marker?.coolingUnitsInfo ?? [];

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View
          tw={cn(
            'w-full bg-white rounded-3xl w-4/5 max-w-4/5 h-auto pt-6 pb-4 self-center',
            safeValue.length >= 2 && 'h-2/3'
          )}
        >
          <Text variant="TitleSmall" tw="px-6">
            {marker?.title}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={safeValue}
            nestedScrollEnabled
            keyExtractor={(_, itemIdx) => `marker-cooling-unit-info-#${itemIdx}`}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <List.Section tw="pt-3 px-6 m-0">
                <List.Subheader tw="m-0 p-0">
                  <Text variant="TitleSmall" tw="m-0 p-0">
                    {item.name}:
                  </Text>
                </List.Subheader>
                <List.Item tw="p-0 m-0" title={_formattedContent(item.commodity)} />
                <List.Item tw="p-0 m-0" title={_formattedContent(item.remainingCapacity)} />
                <List.Item tw="p-0 m-0" title={_formattedContent(item.price)} />
              </List.Section>
            )}
          />
          <View tw="self-end pr-6">
            <Button
              mode="text"
              onPress={(evt) => {
                evt?.stopPropagation();
                toggleVisibility();
                setMarker(undefined);
              }}
            >
              {t('actions.close')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

function _formattedContent(content: string | number): string {
  return ` * ${content}`;
}
