import React, { useMemo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, IconButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { type CartItem as CartItemType } from '#types/global';

import { CompanyBottomSheetDatum } from '../../Marketplace/components/CompanyBottomSheet';
import CartItemInput from './CartItemInput';

const countriesMeta = countriesDict();

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { t } = useTranslationUtils();

  const { data: coolingUnits, isLoading: isLoadingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {},
    {
      skip: !item,
      defaultData: [],
    }
  );

  const { data: company, isLoading: isLoadingCompany } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    item.relCompanyId as number,
    {
      defaultData: undefined,
    }
  );

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      defaultData: [],
    }
  );

  const coolingUnit = useMemo(
    () => coolingUnits?.find((c) => c.id === item.relCoolingUnitId),
    [coolingUnits]
  );

  const crop = useMemo(() => crops?.find((c) => c.id === item.relCropId), [crops]);

  if (isLoadingCompany || isLoadingCrops || isLoadingUnits) {
    return (
      <View tw="flex-1 w-full my-3 py-2 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-row w-full my-3 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
      <View
        tw={cn(
          'bg-green-400 w-2 rounded-l-sm border-y-4 border-green-400',
          item.relCrateRemainingShelfLife &&
            item.relCrateRemainingShelfLife <= 7 &&
            item.relCrateRemainingShelfLife > 2 &&
            'bg-yellow-400 border-yellow-400',
          item.relCrateRemainingShelfLife &&
            item.relCrateRemainingShelfLife < 2 &&
            'bg-red-500 border-red-500',
          (!item.relCrateRemainingShelfLife || item.relCrateRemainingShelfLife === -1) &&
            'bg-gray-300 border-gray-300'
        )}
      />
      <View tw="flex-col p-3">
        <View tw="w-full flex-row items-start justify-between">
          <View tw="flex-col">
            {item.relCrateRemainingShelfLife ? (
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
                    item.relCrateRemainingShelfLife < 2 && 'text-red-500'
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
              <Text tw="text-base text-gray-500">{item.relCheckInMovementCode}</Text>
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
          onPress={(evt) => {
            evt.stopPropagation();
            emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL, {
              name: company?.name,
              locationName: countriesMeta.getNameByISO(company?.country ?? '') ?? '',
              address: '', // TODO: add
              latitude: 0,
              longitude: 0,
            } satisfies CompanyBottomSheetDatum);
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
              ${item.producePricePerKg} {t('Dashboard.ShoppingCart.perKg')}
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
              emitter.emit(APP_EVENTS.DISPATCH_CART_REVALIDATION);
            }}
          />
        </View>
      </View>
    </View>
  );
}
