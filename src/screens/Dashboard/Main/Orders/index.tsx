import React from 'react';
import { FlatList, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { GenericError } from '#ui/components/GenericError';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

function OrdersRoot(props: OrdersRouteProps<'OrdersRoot'>) {
  const { t } = useTranslationUtils();

  return (
    <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="pb-32">
        <View tw="flex-row items-center justify-between">
          <Text variant="TextMedium" tw="text-lg">
            {t('navigation.bottomTabs.History')}
          </Text>
          <Touchable
            tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
            rippleColor={colors.zinc[200]}
            onPress={(evt) => {
              evt.stopPropagation();
              // TODO
            }}
          >
            <Text tw="text-base text-green-primary">Most recent</Text>
            <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
          </Touchable>
        </View>
        <FlatList
          data={MOCKS}
          keyExtractor={(item) => `orders-history-list-item-#${item.orderId}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Touchable
              tw="flex-row items-center border border-solid border-zinc-300 rounded-md p-3 my-2"
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate('OrdersDetails', { orderId: item.orderId });
              }}
            >
              <View tw="w-[90%]">
                <View tw="flex-row items-center">
                  <Text variant="TextMedium" tw="text-base w-[50%]">
                    Date
                  </Text>
                  <Text tw="text-base text-zinc-500">{dateFmt(item.date, 'dd//mm/yyyy')}</Text>
                </View>
                <View tw="flex-row items-center">
                  <Text variant="TextMedium" tw="text-base w-[50%]">
                    Order ID
                  </Text>
                  <Text tw="text-base text-zinc-500">{item.orderId}</Text>
                </View>
                <View tw="flex-row items-center">
                  <Text variant="TextMedium" tw="text-base w-[50%]">
                    Order Total
                  </Text>
                  <Text tw="text-base text-zinc-500">${item.orderTotal}</Text>
                </View>
              </View>
              <MaterialCommunityIcon name="chevron-right" size={28} />
            </Touchable>
          )}
        />
      </View>
    </ScrollView>
  );
}

const MOCKS = [
  {
    date: '2024-09-24T15:39:07+00:00',
    orderId: '123-456',
    orderTotal: 10.5,
  },
  {
    date: '2024-09-23T10:39:07+00:00',
    orderId: '798-901',
    orderTotal: 11,
  },
];

export default withSafeArea(
  withErrorBoundary(OrdersRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
