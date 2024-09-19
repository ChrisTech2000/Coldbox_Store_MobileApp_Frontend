import React from 'react';
import { View } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';

import { Touchable } from '#ui/components/Touchable';
import { Text } from '#ui/components/Text';

import type { MarketplaceRoutes } from '#navigation/Dashboard/Main/MarketplaceStack';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceLocationFilter from './LocationFilter';

export default function MarketplaceFiltersSection() {
  const navigation = useNavigation<NavigationProp<MarketplaceRoutes>>();

  return (
    <View tw="bg-zinc-100 p-4 space-y-3">
      <View tw="flex-row items-center justify-between">
        <MarketplaceLocationFilter />

        <Touchable
          tw="flex-row items-center justify-center space-x-2.5 p-1.5"
          rippleColor={colors.zinc[200]}
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.navigate('MarketplaceFilters');
          }}
        >
          <MaterialCommunityIcon name="filter-variant" size={28} color={colors.zinc[600]} />
          <Text tw="text-base">Filters</Text>
        </Touchable>
      </View>

      <View tw="flex-row items-center justify-between">
        <Text variant="TextMedium" tw="text-xl">
          Produces
        </Text>

        <Touchable
          tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
          rippleColor={colors.zinc[200]}
          onPress={(evt) => {
            evt.stopPropagation();
            // TODO
          }}
        >
          <Text tw="text-base text-green-primary">Near to me</Text>
          <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
        </Touchable>
      </View>
    </View>
  );
}
