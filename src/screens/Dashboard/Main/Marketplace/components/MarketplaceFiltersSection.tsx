import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Dialog, Portal, RadioButton } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { Touchable } from '#ui/components/Touchable';
import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import type { GetAvailableListingParams } from '#types/api.params';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import type { MarketplaceRoutes } from '#navigation/Dashboard/Main/MarketplaceStack';
import { paperTheme } from '#ui/lib/theme';
import type { TranslationPaths } from '#i18n/index';

import MarketplaceLocationFilter from './LocationFilter';
import FilterChip from './FilterChip';

import { useMarketplaceQueryParams } from '../store';

const DIALOG_MAX_WIDTH = Dimensions.get('window').width * 0.68;
const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.31;

type InternalSelectionState = Exclude<GetAvailableListingParams['sortBy'], undefined>;

const OPTIONS_TRANSLATIONS: Record<InternalSelectionState, TranslationPaths> = {
  'price-asc': 'Dashboard.Marketplace.sorting.price-asc',
  'price-desc': 'Dashboard.Marketplace.sorting.price-desc',
  'nearby-me': 'Dashboard.Marketplace.sorting.nearby-me',
};

export default function MarketplaceFiltersSection() {
  const { t } = useTranslationUtils();
  const sortBy = useMarketplaceQueryParams(useShallow((store) => store.sortBy));

  const navigation = useNavigation<NavigationProp<MarketplaceRoutes>>();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [internalSelection, setInternalSelection] = useState<InternalSelectionState>(
    sortBy ?? 'price-asc'
  );

  function resetState() {
    setInternalSelection(sortBy ?? 'price-asc');
    toggleVisibility();
  }

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => emitter.emit(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS)}
      >
        <View tw="bg-zinc-100 py-4 space-y-3">
          <View tw="flex-row items-center justify-between mx-4">
            <MarketplaceLocationFilter />

            <Touchable
              tw="flex-row items-center justify-center space-x-2.5 p-1.5"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                navigation.navigate('MarketplaceFilters');
              }}
            >
              <MaterialCommunityIcon name="filter-variant" size={28} color={colors.zinc[600]} />
              <Text tw="text-base">Filters</Text>
            </Touchable>
          </View>

          <FilterChip />

          <View tw="flex-row items-center justify-between px-4">
            <Text variant="TextMedium" tw="text-xl">
              Produces
            </Text>

            <Touchable
              tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                toggleVisibility();
              }}
            >
              <Text tw="text-base text-green-primary">
                {t(OPTIONS_TRANSLATIONS[sortBy as unknown as InternalSelectionState])}
              </Text>
              <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
            </Touchable>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Portal>
        <Dialog
          visible={isVisible}
          onDismiss={resetState}
          style={{
            backgroundColor: 'white',
            maxWidth: DIALOG_MAX_WIDTH,
            maxHeight: DIALOG_MAX_HEIGHT,
            alignSelf: 'center',
          }}
        >
          <Dialog.Content tw="mb-0 android:pb-1.5">
            <RadioButton.Group
              value={internalSelection}
              onValueChange={(value) => setInternalSelection(value as InternalSelectionState)}
            >
              {Object.keys(OPTIONS_TRANSLATIONS).map((option, itemIdx) => (
                <RadioButtonItem
                  key={`${option}-#${itemIdx}`}
                  label={t(OPTIONS_TRANSLATIONS[option as unknown as InternalSelectionState])}
                  value={option}
                  tw="flex flex-row-reverse ml-[-10] w-full"
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions tw="mt-0 justify-around android:pt-1.5">
            <Button
              tw="w-1/2"
              mode="text"
              onPress={(evt) => {
                evt.stopPropagation();
                resetState();
              }}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              tw="w-1/2"
              mode="contained"
              onPress={(evt) => {
                evt.stopPropagation();
                useMarketplaceQueryParams.getState().setParams({ sortBy: internalSelection });
                toggleVisibility();
              }}
            >
              {t('actions.ok')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}
