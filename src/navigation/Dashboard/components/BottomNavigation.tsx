import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  type GestureResponderEvent,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Modalize } from 'react-native-modalize';
import { Divider, List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import RBAC from '#common/RBAC';
import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { MoreNavigationOverlay } from '#screens/Dashboard/Tutorial/MoreNavigationOverlay';
import { ECommonTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { BOTTOM_NAV_HEIGHT } from '#ui/primitives/withSafeArea';

import type { DashboardMainRoutePaths } from '../Main';

type NavigationState = TabNavigationState<ParamListBase>;
type NavigationRoutes = Array<DashboardMainRoutePaths>;

const BOTTOM_NAV_ITEMS: NavigationRoutes = ['Dashboard', 'Marketplace', 'Analytics'];
const BOTTOM_SHEET_ITEMS: NavigationRoutes = ['MarketPrice', 'History', 'CoolingUnits'];

const ROUTE_TITLE_META = {
  Dashboard: 'navigation.bottomTabs.Dashboard',
  Marketplace: 'navigation.dashboard.Marketplace',
  Analytics: 'navigation.bottomTabs.Analytics',
  MarketPrice: 'navigation.bottomTabs.MarketPrice',
  History: 'navigation.bottomTabs.History',
  CoolingUnits: 'navigation.bottomTabs.CoolingUnits',
  ShoppingCart: 'navigation.dashboard.ShoppingCart',
} satisfies Record<DashboardMainRoutePaths, TranslationPaths>;

const ICON_SIZE = 24;
const ICON_DEFAULT_COLOR = colors.zinc[500];

function filterBottomNavItems(state: NavigationState, shouldAdd: boolean) {
  const list: NavigationRoutes = shouldAdd ? [...BOTTOM_NAV_ITEMS, 'History'] : BOTTOM_NAV_ITEMS;
  return state.routes.filter(({ name }) => list.includes(name as DashboardMainRoutePaths));
}

function filterBottomSheetItems(state: NavigationState, shouldExclude: boolean) {
  const list = shouldExclude
    ? [...BOTTOM_SHEET_ITEMS.slice(0, 1), ...BOTTOM_SHEET_ITEMS.slice(2)]
    : BOTTOM_SHEET_ITEMS;
  return state.routes.filter(({ name }) => list.includes(name as DashboardMainRoutePaths));
}

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
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const includeHistoryTab = !guard('VIEW', 'MarketplaceListing');

  const { onLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.MORE_STEP,
    OverlayComponent: MoreNavigationOverlay,
    onPressMask: () => navigation.navigate('Main', { screen: 'History' }),
  });

  return (
    <View tw="absolute bottom-0 left-0 z-[9999] w-full" style={tabBarStyle}>
      <SkiaShadow blur={3} dx={0} dy={2} color={colors.zinc[300]} borderRadius={16}>
        <View
          tw="flex-row items-center justify-evenly px-2 bg-white pt-0.5"
          style={{ paddingBottom: bottom, height: BOTTOM_NAV_HEIGHT }}
        >
          {filterBottomNavItems(state, includeHistoryTab).map((route, idx) => (
            <TabItem
              key={route.key}
              title={t(ROUTE_TITLE_META[route.name as DashboardMainRoutePaths])}
              onPress={(evt: GestureResponderEvent) => {
                evt.stopPropagation();
                navigation.navigate(route.name);
                modalRef.current?.close();
              }}
              renderIcon={descriptors?.[route.key]?.options?.tabBarIcon}
              isFocused={state.index === idx}
            />
          ))}
          <View onLayout={onLayout}>
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
        </View>
      </SkiaShadow>
    </View>
  );
}

function BottomSheet({
  state,
  descriptors,
  navigation,
  modalRef,
}: Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'> & {
  modalRef: React.RefObject<Modalize>;
}) {
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const excludeHistoryTab = !guard('VIEW', 'MarketplaceListing');

  return (
    <Modalize
      ref={modalRef}
      modalStyle={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginBottom: BOTTOM_NAV_HEIGHT,
      }}
      adjustToContentHeight
      withHandle={false}
    >
      <View tw="w-full items-center justify-center h-10">
        <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
      </View>

      <View tw="px-4 pb-4">
        <FlatList
          data={filterBottomSheetItems(state, excludeHistoryTab)}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <List.Item
              tw="px-0 m-0 py-2"
              title={t(ROUTE_TITLE_META[item.name as DashboardMainRoutePaths])}
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
}

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
          'items-center justify-center w-16 h-8',
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
    <Text tw={cn('leading-none tracking-widest text-zinc-500 text-xs', isFocused && 'text-black')}>
      {title}
    </Text>
  </View>
);

export default function BottomNavigationWrapper(props: BottomTabBarProps) {
  return <BottomNavigation {...props} />;
}
