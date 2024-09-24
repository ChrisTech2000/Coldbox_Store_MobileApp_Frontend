import React from 'react';
import {
  FlatList,
  type GestureResponderEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modalize } from 'react-native-modalize';
import { Divider, List } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';

import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

import type { DashboardMainRoutes } from '../Main';

const BOTTOM_NAV_ITEMS: Array<keyof DashboardMainRoutes> = [
  'Dashboard',
  'Marketplace',
  'Analytics',
];

const BOTTOM_SHEET_ITEMS: Array<keyof DashboardMainRoutes> = [
  'MarketPrice',
  'History',
  'CoolingUnits',
  'Orders',
];

const ICON_SIZE = 24;
const ICON_DEFAULT_COLOR = colors.zinc[500];

const filterBottomNavItems = (state: TabNavigationState<ParamListBase>) =>
  state.routes.filter(({ name }) => BOTTOM_NAV_ITEMS.includes(name as keyof DashboardMainRoutes));

const filterBottomSheetItems = (state: TabNavigationState<ParamListBase>) =>
  state.routes.filter(({ name }) => BOTTOM_SHEET_ITEMS.includes(name as keyof DashboardMainRoutes));

function BottomNavigation({ state, navigation, descriptors }: BottomTabBarProps) {
  const modalRef = React.useRef<Modalize>(null);
  const routeOptions = descriptors[state.routes[state.index].key].options;
  return (
    <React.Fragment>
      <BottomNavBar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        modalRef={modalRef}
        tabBarStyle={routeOptions.tabBarStyle as StyleProp<ViewStyle>}
      />
      <BottomSheet
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        modalRef={modalRef}
      />
    </React.Fragment>
  );
}

function BottomNavBar(
  props: Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'> & {
    modalRef: React.RefObject<Modalize>;
    tabBarStyle: StyleProp<ViewStyle>;
  }
) {
  const { state, descriptors, navigation, modalRef, tabBarStyle } = props;

  const { bottom } = useSafeAreaInsets();

  return (
    <View
      tw="absolute bottom-0 left-0 z-[9999] w-full"
      style={[tabBarStyle, { paddingBottom: bottom }]}
    >
      <SkiaShadow blur={3} dx={0} dy={2} color={colors.zinc[300]} borderRadius={16}>
        <View tw="flex-row items-center justify-evenly h-24 px-2 bg-white">
          {filterBottomNavItems(state).map((route, idx) => (
            <TabItem
              key={route.key}
              title={route.name}
              onPress={(evt: GestureResponderEvent) => {
                evt.stopPropagation();
                navigation.navigate(route.name);
                modalRef.current?.close();
              }}
              renderIcon={descriptors?.[route.key]?.options?.tabBarIcon}
              isFocused={state.index === idx}
            />
          ))}
          <TabItem
            title="More"
            onPress={(evt: GestureResponderEvent) => {
              evt.stopPropagation();
              modalRef.current?.open();
            }}
            renderIcon={() => (
              <MaterialCommunityIcon
                name="dots-vertical"
                color={state.index >= 3 ? colors.white : ICON_DEFAULT_COLOR}
                size={ICON_SIZE}
              />
            )}
            isFocused={state.index >= 3}
          />
        </View>
      </SkiaShadow>
    </View>
  );
}

const BottomSheet = ({
  state,
  descriptors,
  navigation,
  modalRef,
}: Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'> & {
  modalRef: React.RefObject<Modalize>;
}) => (
  <Modalize
    ref={modalRef}
    modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, marginBottom: 96 }}
    adjustToContentHeight
    withHandle={false}
  >
    <View tw="w-full items-center justify-center h-10">
      <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
    </View>

    <View tw="px-4 pb-4">
      <FlatList
        data={filterBottomSheetItems(state)}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <List.Item
            tw="px-0 m-0 py-2"
            title={item.name}
            left={() =>
              descriptors?.[item.key]?.options?.tabBarIcon?.({
                focused: false,
                color: ICON_DEFAULT_COLOR,
                size: ICON_SIZE,
              }) ?? null
            }
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={(evt) => {
              evt.stopPropagation();
              modalRef.current?.close();
              switch (item.name) {
                case 'History':
                  return navigation.navigate('History', { screen: 'RootHistoryTabStack' });
                case 'Orders':
                  return navigation.navigate('Orders', { screen: 'OrdersRoot' });
                default:
                  return navigation.navigate(item.name);
              }
            }}
          />
        )}
      />
    </View>
  </Modalize>
);

const TabItem = ({
  title,
  isFocused,
  onPress,
  renderIcon,
}: {
  title: string;
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  renderIcon?: (iconProps: { focused: boolean; color: string; size: number }) => React.ReactNode;
}) => (
  <View tw="flex-col items-center justify-start space-y-1">
    <View tw="rounded-full overflow-hidden">
      <Touchable
        tw={cn(
          'items-center justify-center w-20 h-10',
          isFocused ? 'bg-green-primary' : 'bg-transparent'
        )}
        onPress={onPress}
        rippleColor={paperTheme.colors.backdrop}
      >
        {renderIcon?.({
          focused: false,
          color: isFocused ? colors.white : ICON_DEFAULT_COLOR,
          size: ICON_SIZE,
        })}
      </Touchable>
    </View>
    <Text tw={cn('leading-none tracking-widest text-zinc-500', isFocused && 'text-black')}>
      {title}
    </Text>
  </View>
);

export default function BottomNavigationWrapper(props: BottomTabBarProps) {
  return <BottomNavigation {...props} />;
}
