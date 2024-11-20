import React, { useRef } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';
import { useSWRConfig } from 'swr';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import CouponService from '#services/CouponService';
import { getQueryKey } from '#services/hooks/useAPiCall';

import CouponModal from './components/CouponModal';

function CouponsRoot() {
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const modalRef = useRef<Modalize>(null);

  return (
    <View tw="py-3 flex-1 flex-col items-center justify-between">
      <View tw="w-30 h-30" />

      <View tw="items-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <Icon name="ticket-percent-outline" size={60} color={paperTheme.colors.primary} />
        </View>
        <Text tw="text-base">{t('Dashboard.Management.Coupons.emptyMessage')}</Text>
      </View>

      <CouponModal
        modalRef={modalRef}
        onSubmit={async (values) => {
          try {
            await CouponService.createCoupon({
              code: values.code,
              discountPercentage: Math.min(values.percentage / 100, 1.0),
            });

            await Promise.allSettled([
              mutate(getQueryKey('getCouponList')),
              mutate(getQueryKey('getCouponList', { revoked: 'included' })),
            ]);

            modalRef.current?.close();
          } catch (exception) {
            console.error(exception);
          }
        }}
      />

      <Button
        tw="w-5/6 my-4"
        mode="outlined"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          modalRef.current?.open();
        }}
      >
        {t('Dashboard.Management.Coupons.addCoupon')}
      </Button>
    </View>
  );
}

export default withSafeArea(CouponsRoot, ['bottom'], true);
