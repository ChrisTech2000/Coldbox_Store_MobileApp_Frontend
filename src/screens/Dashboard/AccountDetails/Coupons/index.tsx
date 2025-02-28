import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import * as BottomSheet from '#ui/components/BottomSheet';

import { useTranslationUtils } from '#i18n/utils';
import { CouponsSettingsRouteProps } from '#navigation/Dashboard/AccountDetails/CouponSettings';
import CouponService from '#services/CouponService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

import CouponModal from './components/CouponModal';

function CouponsRoot(props: CouponsSettingsRouteProps<'Root'>) {
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const company = useManagementStore((store) => store.company);

  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const isManagementStack = props.route.params?.source === 'Management';

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
        ref={modalRef}
        {...modalActions}
        onSubmit={async (values) => {
          await CouponService.createCoupon({
            ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
            code: values.code,
            discountPercentage: Math.min(values.percentage / 100, 1.0),
          });

          await Promise.allSettled([
            mutate(
              getQueryKey(isManagementStack ? 'getCompanyCouponList' : 'getCouponList', {
                ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
              })
            ),
            mutate(
              getQueryKey(isManagementStack ? 'getCompanyCouponList' : 'getCouponList', {
                revoked: 'included',
                ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
              })
            ),
          ]);

          modalActions.close();
        }}
      />

      <Button
        tw="w-5/6 my-4"
        mode="outlined"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          modalActions.open();
        }}
      >
        {t('Dashboard.Management.Coupons.addCoupon')}
      </Button>
    </View>
  );
}

export default withSafeArea(CouponsRoot, ['bottom'], true);
