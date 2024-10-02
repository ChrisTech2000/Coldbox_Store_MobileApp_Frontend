import React, { useState } from 'react';
import { View } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Modal, Portal, RadioButton } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import capitalize from 'lodash/capitalize';
import colors from 'tailwindcss/colors';

import { Touchable } from '#ui/components/Touchable';
import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import type { GetAvailableListingParams } from '#types/api.params';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import type { MarketplaceRoutes } from '#navigation/Dashboard/Main/MarketplaceStack';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceLocationFilter from './LocationFilter';
import FilterChip from './FilterChip';

import { useMarketplaceQueryParams } from '../store';

type InternalSelectionState = Exclude<GetAvailableListingParams['sortBy'], undefined>;

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

  const sortLabel = capitalize(sortBy).replace('-', ' '); // TODO: replace with correct translation

  return (
    <React.Fragment>
      <View tw="bg-zinc-100 py-4 space-y-3">
        <View tw="flex-row items-center justify-between px-4">
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
            <Text tw="text-base text-green-primary">{sortLabel}</Text>
            <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
          </Touchable>
        </View>
      </View>

      <Portal>
        <Modal visible={isVisible} onDismiss={resetState}>
          <View tw="w-full items-center bg-zinc-50 rounded-3xl w-1/2 max-w-1/2 h-auto py-3 px-2 self-center space-y-2">
            <View tw="items-start space-y-1 my-1 w-full">
              <RadioButton.Group
                value={internalSelection}
                onValueChange={(value) => setInternalSelection(value as InternalSelectionState)}
              >
                <RadioButtonItem
                  label="Price asc"
                  value="price-asc"
                  tw="flex flex-row-reverse ml-[-10] w-full"
                />
                <RadioButtonItem
                  label="Price desc"
                  value="price-desc"
                  tw="flex flex-row-reverse ml-[-10] w-full"
                />
                <RadioButtonItem
                  label="Nearby me"
                  value="nearby-me"
                  tw="flex flex-row-reverse ml-[-10] w-full"
                />
              </RadioButton.Group>
            </View>
            <View tw="w-full flex-row items-center justify-between px-2">
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
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}
