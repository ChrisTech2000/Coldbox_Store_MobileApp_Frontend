import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Dialog, Divider, List, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import type { MarkerDatum } from '../utils';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.55;

type Props = {
  markers: Array<MarkerDatum>;
};

export default function PointAnnotationModal(props: Props) {
  const { markers } = props;

  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const [marker, setMarker] = useState<MarkerDatum | undefined>(undefined);

  useAppEventListener<[boolean, number]>(
    APP_EVENTS.DISPATCH_MAPS_TAB_MODAL,
    (status, markerDatumIdx) => {
      setModalVisibility(status);
      setMarker(markers.at(markerDatumIdx));
    }
  );

  const safeValue = marker?.coolingUnitsInfo ?? [];
  const isScrollable = safeValue.length >= 2;
  const Container = isScrollable ? Dialog.ScrollArea : Dialog.Content;

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={toggleVisibility}
        style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
      >
        <Dialog.Title tw="text-lg">{marker?.title}</Dialog.Title>
        <Container {...(isScrollable ? { showsVerticalScrollIndicator: false } : {})}>
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            data={safeValue}
            keyExtractor={(_, itemIdx) => `marker-cooling-unit-info-#${itemIdx}`}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <List.Section tw="p-3 m-0">
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
        </Container>
        <Dialog.Actions>
          <Button
            onPress={(evt) => {
              evt?.stopPropagation();
              toggleVisibility();
              setMarker(undefined);
            }}
          >
            {t('actions.close')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

function _formattedContent(content: string | number): string {
  return ` * ${content}`;
}
