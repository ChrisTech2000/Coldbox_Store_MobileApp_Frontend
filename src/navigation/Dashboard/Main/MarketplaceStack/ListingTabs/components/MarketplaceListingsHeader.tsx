import React from 'react';
import { type ParamListBase, type TabNavigationState } from '@react-navigation/native';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBar, TabBarIndicator } from 'react-native-tab-view';
import colors from 'tailwindcss/colors';

import MarketplaceHeroSection from '#screens/Dashboard/Main/Marketplace/components/HeroSection';

import { Text } from '#ui/components/Text';

import { paperTheme } from '#ui/lib/theme';

export default function MarketplaceListingsHeader(props: MaterialTopTabBarProps) {
  return (
    <MarketplaceHeroSection>
      <_MaterialTopTabBar {...props} />
    </MarketplaceHeroSection>
  );
}

const ACTIVE_COLOR = paperTheme.colors.secondary;
const INACTIVE_COLOR = colors.zinc[500];

function _MaterialTopTabBar({ state, navigation, descriptors, ...rest }: MaterialTopTabBarProps) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  return (
    <TabBar
      {...rest}
      navigationState={state}
      scrollEnabled={focusedOptions.tabBarScrollEnabled}
      bounces={focusedOptions.tabBarBounces}
      getLabelText={({ route }) => route.name}
      renderLabel={(labelProps) => (
        <Text
          style={[
            focusedOptions.tabBarLabelStyle,
            labelProps.focused ? { color: ACTIVE_COLOR } : { color: INACTIVE_COLOR },
          ]}
        >
          {labelProps.route.name}
        </Text>
      )}
      activeColor={ACTIVE_COLOR}
      inactiveColor={INACTIVE_COLOR}
      pressColor={focusedOptions.tabBarPressColor}
      pressOpacity={focusedOptions.tabBarPressOpacity}
      tabStyle={focusedOptions.tabBarItemStyle}
      indicatorStyle={[
        { backgroundColor: paperTheme.colors.primary },
        focusedOptions.tabBarIndicatorStyle,
      ]}
      renderIcon={({ route, focused, color }) => {
        const IconElement = descriptors?.[route?.key]?.options?.tabBarIcon;
        if (typeof IconElement === 'undefined') return null;
        return <IconElement focused={focused} color={color} />;
      }}
      gap={focusedOptions.tabBarGap}
      android_ripple={focusedOptions.tabBarAndroidRipple}
      indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
      contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
      style={[{ backgroundColor: colors.white }, focusedOptions.tabBarStyle]}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (event.defaultPrevented) {
          preventDefault();
        }
      }}
      onTabLongPress={({ route }) => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      }}
      renderIndicator={({ navigationState: state, ...rest }) => {
        if (typeof focusedOptions.tabBarIndicator === 'undefined') {
          return <TabBarIndicator navigationState={state} {...rest} />;
        }
        return focusedOptions.tabBarIndicator({
          state: state as TabNavigationState<ParamListBase>,
          ...rest,
        });
      }}
    />
  );
}
