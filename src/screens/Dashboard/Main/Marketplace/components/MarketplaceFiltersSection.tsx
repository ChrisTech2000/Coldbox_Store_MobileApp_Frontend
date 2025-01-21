import { type NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Dialog, Divider, Portal, RadioButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';

import RBAC from '#common/RBAC';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import type { MarketplaceRoutes } from '#navigation/Dashboard/Main/Marketplace/MarketplaceStack';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import type { GetAvailableListingParams } from '#types/api.params';
import { cn } from '#ui/lib/cn';

import FilterChip from './FilterChip';
import MarketplaceLocationFilter from './LocationFilter';

import { useMarketplaceQueryParams } from '../store';

type InternalSelectionState = Exclude<GetAvailableListingParams['sortBy'], undefined>;
type BuyerInternalSelectionState = 'for-myself' | 'on-behalf';

const OPTIONS_TRANSLATIONS: Record<InternalSelectionState, TranslationPaths> = {
  'price-asc': 'Dashboard.Marketplace.sorting.price-asc',
  'price-desc': 'Dashboard.Marketplace.sorting.price-desc',
  'nearby-me': 'Dashboard.Marketplace.sorting.nearby-me',
};

const BUYER_OPTIONS_TRANSLATIONS: Record<BuyerInternalSelectionState, TranslationPaths> = {
  'for-myself': 'Dashboard.Marketplace.buyerSelection.forMyself',
  'on-behalf': 'Dashboard.Marketplace.buyerSelection.onBehalfOfCompany',
};

const DEVICE_HEIGHT = Dimensions.get('screen').height;

export default function MarketplaceFiltersSection() {
  const { t } = useTranslationUtils();
  const [sortBy] = useMarketplaceQueryParams(useShallow((store) => [store.sortBy]));
  const [cartData, setCart] = useCartStore((store) => [store.cartData, store.setCart]);

  const navigation = useNavigation<NavigationProp<MarketplaceRoutes>>();

  const [visibleModal, setVisibleModal] = useState<'buyer' | 'crates' | undefined>(undefined);
  const [internalSelection, setInternalSelection] = useState<InternalSelectionState>(
    sortBy ?? 'price-asc'
  );

  const [buyerInternalSelection, setBuyerInternalSelectionState] =
    useState<BuyerInternalSelectionState>(
      cartData?.ownedOnBehalfOfCompanyId ? 'on-behalf' : 'for-myself'
    );

  function resetState() {
    setInternalSelection(sortBy ?? 'price-asc');
    setBuyerInternalSelectionState(cartData?.ownedOnBehalfOfCompanyId ? 'on-behalf' : 'for-myself');
    setVisibleModal(undefined);
  }

  const closeMarketplaceTooltipsHandler = useDebouncedCallback(() => {
    emitter.emit(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS);
  }, 340);

  return (
    <React.Fragment>
      <View tw="bg-zinc-100 py-4 space-y-1" onTouchStart={closeMarketplaceTooltipsHandler}>
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
            <Text tw="text-base">{t('Dashboard.Marketplace.Filters.label')}</Text>
          </Touchable>
        </View>

        <FilterChip />

        <View tw="space-y-1 px-4">
          <View tw="flex-row items-center justify-between">
            <Text variant="TextMedium" tw="text-lg">
              {t('Dashboard.CoolingUnitsCratesInfo.crates')}
            </Text>

            <Touchable
              tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                setVisibleModal('crates');
              }}
            >
              <Text tw="text-base text-green-primary">
                {t(OPTIONS_TRANSLATIONS[sortBy as unknown as InternalSelectionState])}
              </Text>
              <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
            </Touchable>
          </View>

          <RBAC.ProtectedResource action="SET" subject="MarketplaceBuyerOption">
            <Divider tw="bg-gray-600" />

            <View tw="flex-row items-center justify-between">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.Marketplace.buyerSelection.label')}
              </Text>

              <Touchable
                tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
                rippleColor={colors.zinc[200]}
                onPress={(evt) => {
                  evt.stopPropagation();
                  setVisibleModal('buyer');
                }}
              >
                <Text tw="text-base text-green-primary">
                  {t(
                    BUYER_OPTIONS_TRANSLATIONS[
                      cartData?.ownedOnBehalfOfCompanyId
                        ? 'on-behalf'
                        : ('for-myself' as BuyerInternalSelectionState)
                    ]
                  )}
                </Text>
                <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
              </Touchable>
            </View>
          </RBAC.ProtectedResource>
        </View>
      </View>

      <Portal>
        <Dialog
          visible={visibleModal !== undefined}
          onDismiss={resetState}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content tw="android:pb-1.5 p-0">
            <RadioButton.Group
              value={visibleModal === 'buyer' ? buyerInternalSelection : internalSelection}
              onValueChange={(value) =>
                visibleModal === 'buyer'
                  ? setBuyerInternalSelectionState(value as BuyerInternalSelectionState)
                  : setInternalSelection(value as InternalSelectionState)
              }
            >
              {Object.keys(
                visibleModal === 'buyer' ? BUYER_OPTIONS_TRANSLATIONS : OPTIONS_TRANSLATIONS
              ).map((option, itemIdx) => (
                <RadioButtonItem
                  key={`${option}-#${itemIdx}`}
                  label={
                    visibleModal === 'buyer'
                      ? t(
                          BUYER_OPTIONS_TRANSLATIONS[
                            option as unknown as BuyerInternalSelectionState
                          ]
                        )
                      : t(OPTIONS_TRANSLATIONS[option as unknown as InternalSelectionState])
                  }
                  value={option}
                  tw="flex flex-row m-0 px-0 py-2 px-8 w-full"
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions
            tw={cn(
              'mt-4 space-x-2',
              DEVICE_HEIGHT > SMALL_SCREEN_THRESHOLD
                ? 'flex flex-row items-center justify-end'
                : 'items-center'
            )}
          >
            <Button
              onPress={(evt) => {
                evt.stopPropagation();
                resetState();
              }}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              onPress={async (evt) => {
                evt.stopPropagation();
                if (visibleModal === 'buyer') {
                  try {
                    const result = await MarketplaceService.toggleCartOwnership();
                    if (result.cart) setCart(result.cart);
                  } catch (exception) {
                    reportCrash(exception as Error);
                  }
                } else {
                  useMarketplaceQueryParams.getState().setParams({ sortBy: internalSelection });
                }
                setVisibleModal(undefined);
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
