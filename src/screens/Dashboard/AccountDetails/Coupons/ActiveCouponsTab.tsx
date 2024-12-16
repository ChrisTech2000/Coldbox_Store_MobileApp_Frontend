import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import CouponService from '#services/CouponService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';

import { useManagementStore } from '#stores/management';
import CouponModal from './components/CouponModal';
import RevokeCouponModal from './components/RevokeCouponModal';
import { CouponStatusTabsRouteProps } from 'navigation/Dashboard/AccountDetails/CouponSettings/CouponStatusTabs';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const TEXT_STYLES =
  DEVICE_HEIGHT > SMALL_SCREEN_THRESHOLD ? 'min-w-[35%] max-w-[65%]' : 'min-w-[35%] max-w-[45%]';

function ActiveCouponsTab(props: CouponStatusTabsRouteProps<'Active'>) {
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const company = useManagementStore((store) => store.company);

  const modalRef = useRef<Modalize>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // eslint-disable-next-line
  // @ts-ignore
  const isManagementStack = props?.route?.params?.source === 'Management';

  const { data: coupons } = useApiCall('getCouponList', CouponService.getCouponList, undefined, {
    defaultData: { nodes: [] },
    skip: isManagementStack,
  });

  const { data: companyCoupons } = useApiCall(
    'getCompanyCouponList',
    CouponService.getCouponList,
    {
      ownedOnBehalfOfCompanyId: company?.id as number,
    },
    {
      defaultData: { nodes: [] },
      skip: !isManagementStack,
    }
  );

  const data = isManagementStack ? companyCoupons : coupons;
  const selectedCoupon = useRef<number | null>(null);

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="px-3 pt-3 pb-8">
          <FlatList
            data={data.nodes}
            keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View tw="w-full p-5 flex-row items-center justify-between border border-solid border-zinc-300 rounded-2xl my-2">
                <View tw="flex-1 flex-row items-center space-x-3">
                  <View tw={TEXT_STYLES}>
                    <Text variant="TitleMedium" tw="text-lg" numberOfLines={2} ellipsizeMode="tail">
                      {item.code}
                    </Text>
                  </View>
                  <Text tw="text-lg text-zinc-500">
                    -&nbsp;{(item.discountPercentage * 100).toFixed(0)}&#37;
                  </Text>
                </View>
                <Button
                  mode="text"
                  textColor={paperTheme.colors.error}
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    selectedCoupon.current = item.id;
                    setIsModalVisible(true);
                  }}
                >
                  {t('Dashboard.Management.Coupons.revoke')}
                </Button>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <RevokeCouponModal
        visible={isModalVisible}
        onChangeVisible={setIsModalVisible}
        onConfirm={async () => {
          if (typeof selectedCoupon.current !== 'number') throw new Error(); // safe guard
          await CouponService.revokeCoupon({
            couponId: selectedCoupon.current,
            ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
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
            mutate(
              getQueryKey(isManagementStack ? 'getCompanyCouponList' : 'getCouponList', {
                revoked: 'only',
                ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
              })
            ),
          ]);
        }}
      />

      <CouponModal
        modalRef={modalRef}
        onSubmit={async (values) => {
          await CouponService.createCoupon({
            ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
            code: values.code,
            discountPercentage: Math.min(values.percentage / 100, 1.0),
          });
          await mutate(
            getQueryKey(isManagementStack ? 'getCompanyCouponList' : 'getCouponList', {
              ownedOnBehalfOfCompanyId: isManagementStack ? company?.id : undefined,
            })
          );
          modalRef.current?.close();
        }}
      />

      <View tw="w-full bottom-0 left-0 py-6 items-center bg-zinc-50 border-t border-solid border-zinc-400">
        <Button
          tw="w-5/6"
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
    </React.Fragment>
  );
}

export default withSafeArea(ActiveCouponsTab, ['bottom'], true);
