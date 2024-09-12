import React from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { API_BASE_URL } from '#constants/environment';

function MarketplaceSettings(props: ProduceDetailsStackRouteProps<'MarketplaceSettings'>) {
  const { crates, produceShelfLife } = props.route.params;

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
          renderItem={({ item }) => (
            <List.Item
              title={undefined}
              tw="p-0 m-0 py-2"
              left={() => (
                <View tw="flex-row space-x-6">
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
                // TODO
              }}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(MarketplaceSettings);
