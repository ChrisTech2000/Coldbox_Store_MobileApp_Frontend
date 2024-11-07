import { CurrencyStandardization } from 'currency-format-utils';
import isNil from 'lodash/isNil';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, IconButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useDashboardStore } from '#stores/dashboard';
import useCartStore from '#stores/shoppingCart';
import { type CartItem as CartItemType } from '#types/global';

import { CompanyBottomSheetDatum } from '../../Marketplace/components/CompanyBottomSheet';
import CartItemInput from './CartItemInput';

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { t } = useTranslationUtils();
  const [fetchCart, coolingUnits] = useCartStore((store) => [
    store.fetchCart,
    store.allCoolingUnits,
  ]);
  const crops = useDashboardStore((store) => store.allCrops);

  const { data: company, isLoading: isLoadingCompany } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    item.relCompanyId as number,
    {
      defaultData: undefined,
    }
  );

  const { data: ownerCompany, isLoading: isLoadingOwnerCompany } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    item.ownedOnBehalfOfCompanyId as number,
    {
      defaultData: undefined,
      skip: !item.ownedOnBehalfOfCompanyId,
    }
  );

  const { data: owner, isLoading: isLoadingOwner } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    item.ownedByUserId as number,
    {
      defaultData: undefined,
      skip: !item.ownedByUserId,
    }
  );

  const coolingUnit = useMemo(
    () => coolingUnits?.find((c) => c.id === item.relCoolingUnitId),
    [coolingUnits]
  );

  const crop = useMemo(() => crops?.find((c) => c.id === item.relCropId), [crops]);

  const openCompanyDetailsModal = useDebouncedCallback(async () => {
    const unit = await ColdtivateService.getCoolingUnit({
      companyId: item.relCompanyId,
      coolingUnitId: item.relCoolingUnitId,
    });

    const result = await ColdtivateService.getLocation({
      companyId: item.relCompanyId,
      locationId: unit.location,
    });

    const datum = {
      name: result.company.name,
      locationName: result.name,
      address: [
        result.streetNumber,
        result.street,
        result.city,
        result.state,
        result.zipCode,
        countriesDict().getNameByISO(result.company.country ?? 'NG'),
      ]
        .filter(Boolean)
        .join(', '),
      latitude: result.latitude,
      longitude: result.longitude,
    } satisfies CompanyBottomSheetDatum;

    emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL, datum);
  }, 800);

  if (isLoadingCompany || isLoadingOwnerCompany || isLoadingOwner) {
    return (
      <View tw="flex-1 w-full my-3 py-2 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const color =
    isNil(item.relCrateRemainingShelfLife) || item.relCrateRemainingShelfLife === -1
      ? 'bg-gray-300 border-gray-300'
      : item.relCrateRemainingShelfLife && item.relCrateRemainingShelfLife > 7
        ? 'bg-green-400 border-green-400'
        : item.relCrateRemainingShelfLife &&
            item.relCrateRemainingShelfLife <= 7 &&
            item.relCrateRemainingShelfLife > 2
          ? 'bg-yellow-400 border-yellow-400'
          : 'bg-red-500 border-red-500';

  return (
    <View tw="flex-row w-full my-3 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
      <View tw={cn('w-2 rounded-l-sm border-y-4', color)} />
      <View tw="flex-col p-3">
        <View tw="w-full flex-row items-start justify-between">
          <View tw="flex-col">
            {!isNil(item.relCrateRemainingShelfLife) ? (
              <View tw="flex-row items-center space-x-2">
                <MaterialCommunityIcon
                  name="timer-outline"
                  size={23}
                  color={
                    item.relCrateRemainingShelfLife > 7
                      ? colors.green[400]
                      : item.relCrateRemainingShelfLife <= 7 && item.relCrateRemainingShelfLife > 2
                        ? colors.yellow[400]
                        : colors.red[400]
                  }
                />
                <Text
                  variant="TextMedium"
                  tw={cn(
                    'text-base',
                    'text-green-400',
                    item.relCrateRemainingShelfLife <= 7 &&
                      item.relCrateRemainingShelfLife > 2 &&
                      'text-yellow-400',
                    item.relCrateRemainingShelfLife <= 2 && 'text-red-500'
                  )}
                >
                  {item.relCrateRemainingShelfLife} {t('Dashboard.ShoppingCart.daysLeft')}
                </Text>
              </View>
            ) : null}

            <View tw="my-1.5">
              <Text variant="TextMedium" tw="text-xl">
                {crop?.name}
              </Text>
              <Text variant="TextMedium" tw="text-sm text-gray-600">
                {t('Dashboard.Marketplace.owner')}:{' '}
                {owner
                  ? `${owner[0]?.user.firstName ?? ''} ${owner[0]?.user.lastName ?? ''}`
                  : (ownerCompany.name ?? '')}
              </Text>
            </View>
          </View>
          <FastImage
            tw="w-20 h-16 mr-1"
            resizeMode="contain"
            source={{ uri: `${API_BASE_URL}media/${crop?.image}` }}
          />
        </View>
        <Touchable
          tw="flex-row items-center justify-center space-x-2.5 px-1.5 py-2 self-start mb-0.5"
          rippleColor={colors.zinc[200]}
          onPress={async (evt) => {
            evt.stopPropagation();
            try {
              await openCompanyDetailsModal();
            } catch (exception) {
              console.error(exception);
            }
          }}
        >
          <MaterialCommunityIcon
            name="information-outline"
            size={19}
            color={paperTheme.colors.primary}
          />
          <Text tw="text-base text-gray-500">
            {company?.name ?? ''}&nbsp;-&nbsp;{coolingUnit?.name ?? ''}
          </Text>
        </Touchable>

        <Divider tw="bg-gray-400 my-0.5 w-[97%] self-center" />
        <View tw="flex-row items-center pt-1.5 pb-2.5 justify-between">
          <View tw="flex-row items-center justify-between px-2 w-full">
            <Text variant="TextMedium" tw="text-base">
              {item.crateAvailableWeight}
              {t('Dashboard.ShoppingCart.weight')}
            </Text>
            <Text variant="TextMedium" tw="text-base">
              {CurrencyStandardization.currencyCode({
                code: company?.currency ?? 'NGN',
                value: item.producePricePerKg,
              }).getValueFormated()}
              {t('Dashboard.ShoppingCart.perKg')}
            </Text>
          </View>
        </View>

        <Divider tw="bg-gray-400 my-0.5 w-[97%] self-center" />
        <View tw="flex-row items-center justify-between pt-2">
          <View>
            <CartItemInput
              crateId={item.relCrateId}
              initialValue={item.orderedProduceWeight}
              availableWeight={item.crateAvailableWeight}
            />
          </View>
          <IconButton
            mode="contained-tonal"
            icon="trash-can-outline"
            size={30}
            tw="self-center"
            iconColor={paperTheme.colors.error}
            containerColor={colors.white}
            onPress={async (evt) => {
              evt.stopPropagation();
              await MarketplaceService.removeItemFromCart(item.relCrateId);
              fetchCart();
            }}
          />
        </View>
      </View>
    </View>
  );
}
