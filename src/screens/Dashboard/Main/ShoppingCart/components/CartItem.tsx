import Clipboard from '@react-native-clipboard/clipboard';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Divider, Icon, IconButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { getDefaultCropValues } from '#i18n/transl/misc/crops';
import { useTranslationUtils } from '#i18n/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { parsePoint } from '#screens/Dashboard/Management/utils';
import ColdtivateService from '#services/ColdtivateService';
import DataloaderService from '#services/DataloaderService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import type { GetAllCropsResponse } from '#types/api.responses';
import { type CartItem as CartItemType } from '#types/global';

import { formatCurrencyWithSymbol } from '../../Dashboard/CheckIn/utils';
import { CompanyBottomSheetDatum } from '../../Marketplace/components/CompanyBottomSheet';
import CartItemInput from './CartItemInput';

type CartItemProps = {
  item: Omit<CartItemType, 'relCropId'> & {
    crop?: GetAllCropsResponse;
  };
};

export function CartItem({ item }: CartItemProps) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [setCart, coolingUnits] = useCartStore((store) => [store.setCart, store.allCoolingUnits]);

  const { data: company, isLoading: isLoadingCompany } = useApiCall(
    'getMarketplaceCompanyById',
    DataloaderService.marketplaceCompanies.getById,
    item.relCompanyId as number,
    {
      defaultData: undefined,
    }
  );

  const { data: ownerCompany, isLoading: isLoadingOwnerCompany } = useApiCall(
    'getMarketplaceOwnerCompanyById',
    DataloaderService.marketplaceCompanies.getById,
    item.ownedOnBehalfOfCompanyId as number,
    {
      defaultData: undefined,
      skip: !item.ownedOnBehalfOfCompanyId,
    }
  );

  const { data: owner, isLoading: isLoadingOwner } = useApiCall(
    'getUser',
    ColdtivateService.getUser,
    item.ownedByUserId as number,
    {
      defaultData: undefined,
      skip: !item.ownedByUserId || !!item.ownedOnBehalfOfCompanyId,
    }
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const coolingUnit = useMemo(
    () => coolingUnits?.find((c) => c.id === item.relCoolingUnitId),
    [coolingUnits]
  );

  const openCompanyDetailsModal = useDebouncedCallback(async () => {
    const unit = await ColdtivateService.getCoolingUnit({
      companyId: item.relCompanyId,
      coolingUnitId: item.relCoolingUnitId,
    });

    const result = await ColdtivateService.getLocation({
      companyId: item.relCompanyId,
      locationId: unit.location,
    });

    const point = parsePoint(result.point);

    const datum = {
      name: result.company.name,
      locationName: result.name,
      coolingUnit: coolingUnit?.name ?? '',
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
      latitude: point.latitude,
      longitude: point.longitude,
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
                {item.crop?.name ?? getDefaultCropValues(t).name}
              </Text>
              <Text variant="TextMedium" tw="text-sm text-gray-600">
                {t('Dashboard.Marketplace.owner')}:{' '}
                {!isEmpty(owner)
                  ? `${owner?.firstName ?? ''} ${owner?.lastName ?? ''}`
                  : (ownerCompany.name ?? '')}
              </Text>
              {owner.isPhonePublic ? (
                <View tw="flex flex-row space-x-1 items-center">
                  <Icon source="cellphone" size={20} color={colors.gray[600]} />
                  <Text variant="TextMedium" tw="text-sm text-gray-600">
                    {owner.phone}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(owner.phone);
                      toast.show(t('Dashboard.ProduceDetails.contactCopied'), {
                        type: 'md_success',
                      });
                    }}
                  >
                    <Icon source="content-copy" size={15} color={paperTheme.colors.primary} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <FastImage
            tw="w-20 h-16 mr-1"
            resizeMode="contain"
            source={{
              uri: `${API_BASE_URL}media/${item.crop?.image ?? getDefaultCropValues(t).imageUri}`,
            }}
          />
        </View>
        <Touchable
          tw="flex-row items-center justify-center space-x-2.5 px-1.5 py-2 self-start mb-0.5"
          rippleColor={colors.zinc[200]}
          disabled={isProcessing}
          onPress={async (evt) => {
            evt.stopPropagation();
            try {
              await openCompanyDetailsModal();
            } catch (exception) {
              reportCrash(exception as Error);
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
              {formatCurrencyWithSymbol(
                company?.currency ?? DEFAULT_CURRENCY_CODE,
                item.producePricePerKg
              )}
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
              disabled={isProcessing}
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
              try {
                setIsProcessing(true);
                const result = await MarketplaceService.removeItemFromCart(item.relCrateId);
                setCart(result.cart);
              } catch (exception) {
                toast.show(t('navigation.error.serverErrorMessage', { type: 'md_danger' }));
                reportCrash(exception as Error);
              } finally {
                setIsProcessing(false);
              }
            }}
            disabled={isProcessing}
          />
        </View>
      </View>
    </View>
  );
}
