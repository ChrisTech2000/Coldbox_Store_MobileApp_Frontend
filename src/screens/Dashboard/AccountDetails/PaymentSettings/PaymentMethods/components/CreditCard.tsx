import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { cn } from '#ui/lib/cn';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import Visa from '#assets/images/visa.svg';
import Mastercard from '#assets/images/mastercard.svg';

import { dateFmt, useTranslationUtils } from '#i18n/utils';

enum ECreditCardBrands {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
}

export type Card = {
  brand: string;
  number: string;
  predefined?: boolean;
  details?: {
    owner: string;
    expirationDate: Date;
  };
};

type CreditCardProps = {
  color: string;
} & Card;

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('')}`;
}

function CreditCard({ number, predefined, brand, color, details }: CreditCardProps) {
  const colors = useTailwindColors();
  const { t } = useTranslationUtils();

  const first4Digits = number.slice(0, 4);
  const last4Digits = number.slice(number.length - 4);

  const predefinedColor = useMemo(() => {
    if (!predefined) return;

    const hexColor = color;
    const { r, g, b } = hexToRgb(hexColor);

    const darkenAmount = 40;
    const newR = Math.max(0, r - darkenAmount);
    const newG = Math.max(0, g - darkenAmount);
    const newB = Math.max(0, b - darkenAmount);

    return rgbToHex(newR, newG, newB);
  }, [color, predefined]);

  const brandLogo = useMemo(() => {
    switch (brand.toLowerCase()) {
      case ECreditCardBrands.VISA:
        return <Visa width={50} height={50} />;
      case ECreditCardBrands.MASTERCARD:
        return <Mastercard width={50} height={50} />;
      default:
        return null;
    }
  }, [brand]);

  return (
    <SkiaShadow blur={4} dx={1} dy={6} color={colors.zinc[200]} borderRadius={20}>
      <LinearGradient
        colors={[color, colors.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.75, y: 1.75 }}
        tw={cn('rounded-xl m-2')}
      >
        {predefined ? (
          <View
            tw={cn('px-2 py-1 w-1/3 self-end rounded-tr-lg rounded-bl-lg')}
            style={{ backgroundColor: predefinedColor }}
          >
            <Text tw="text-white text-sm">
              {t('Dashboard.AccountDetails.PaymentSettings.creditCard.predefined')}
            </Text>
          </View>
        ) : null}

        <View
          tw={cn('flex-row justify-between px-4 pt-2 pb-1 items-center', !predefined && 'mt-6')}
        >
          <Text tw="text-white text-xl font-bold">
            {first4Digits} **** **** {last4Digits}
          </Text>
          {brandLogo}
        </View>

        <View tw="flex-row justify-between p-4">
          <View tw="max-w-[40%]">
            <Text tw="text-white text-xs">
              {t('Dashboard.AccountDetails.PaymentSettings.creditCard.owner')}
            </Text>
            <Text tw="text-white text-sm font-bold uppercase">{details?.owner}</Text>
          </View>
          {details?.expirationDate ? (
            <View tw="max-w-[30%]">
              <Text tw="text-white text-xs">
                {t('Dashboard.AccountDetails.PaymentSettings.creditCard.date')}
              </Text>
              <Text tw="text-white text-sm font-bold uppercase">
                {dateFmt(details.expirationDate.toISOString(), 'MM/yy')}
              </Text>
            </View>
          ) : null}
          <View tw="max-w-[30%]">
            <Text tw="text-white text-xs">
              {t('Dashboard.AccountDetails.PaymentSettings.creditCard.cvv')}
            </Text>
            <Text tw="text-white text-sm font-bold uppercase">***</Text>
          </View>
        </View>
      </LinearGradient>
    </SkiaShadow>
  );
}

export default CreditCard;
