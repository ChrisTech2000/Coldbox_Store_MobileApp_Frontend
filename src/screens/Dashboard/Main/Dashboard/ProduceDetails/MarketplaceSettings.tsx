import React from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import { useMarketplaceSettingsStore } from './store';

function MarketplaceSettings(props: ProduceDetailsStackRouteProps<'MarketplaceSettings'>) {
  const { crates, produceShelfLife, companyCurrency } = props.route.params;

  const isFocused = useIsFocused();
  const datums = useMarketplaceSettingsStore(useShallow((store) => store.datums));

  if (datums.size === 0 && isFocused) {
    useMarketplaceSettingsStore.getState().reset(
      crates.map((crate) => ({
        isSellable: false,
        crateId: crate.id,
        crateWeight: crate.weight,
        cratePrice: 0,
      }))
    );
  }

  const { t } = useTranslationUtils();

  return (
    <ScrollView tw="px-3 pt-3 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-16">
        <Text variant="TextMedium" tw="text-lg mt-3">
          Select the crates you want to sell.
        </Text>
        <Divider tw="bg-gray-400 mt-3" />

        <FlatList
          data={crates}
          keyExtractor={(item) => `marketplace-settings-list-item-#${item.id}`}
          ItemSeparatorComponent={Divider}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const contextualDatum = datums.get(item.id);
            if (typeof contextualDatum === 'undefined') return null;
            return (
              <List.Item
                title={undefined}
                tw="p-0 m-0 py-2"
                left={() => (
                  <View tw="flex-row space-x-6 relative">
                    <FastImage
                      resizeMode="contain"
                      tw="w-20 h-16"
                      source={{ uri: `${API_BASE_URL}media/${item.cropImage}` }}
                    />
                    <View tw="flex-col items-start">
                      <Text tw="text-lg">{item.movementCode}</Text>
                      <Text tw="text-sm text-zinc-500">{item.name}</Text>
                      <Text tw="text-sm text-zinc-500">
                        {`${item.weight} ${t('Dashboard.ProduceDetails.kilogram')}`}
                      </Text>
                    </View>
                    {contextualDatum.isSellable ? (
                      <View tw="absolute -bottom-1 -left-4">
                        <SkiaShadow
                          blur={4}
                          dx={0}
                          dy={4}
                          color={colors.zinc[300]}
                          borderRadius={20}
                        >
                          <View tw="bg-white rounded-full p-2">
                            <Icon name="cart-check" size={20} color={paperTheme.colors.primary} />
                          </View>
                        </SkiaShadow>
                      </View>
                    ) : null}
                  </View>
                )}
                right={() => (
                  <View tw="flex-row space-x-8">
                    <View tw="flex-col justify-evenly">
                      <Text tw="text-sm text-green-primary">TTP: {produceShelfLife}</Text>
                      <Text tw="text-sm text-zinc-500">{`${t('Dashboard.CrateManagement.CheckOut.checkIn')}:`}</Text>
                      <Text tw="text-sm text-zinc-500">
                        {dateFmt(item.checkInDate.toString(), 'MMM dd yyyy')}
                      </Text>
                    </View>
                    <View tw="self-center">
                      <Icon name="chevron-right" size={28} />
                    </View>
                  </View>
                )}
                onPress={(evt) => {
                  evt.stopPropagation();
                  props.navigation.navigate('EditCrateWeightAndPricing', {
                    companyCurrency,
                    ...contextualDatum,
                  });
                }}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(MarketplaceSettings);
