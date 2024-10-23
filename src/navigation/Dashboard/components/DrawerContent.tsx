import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Drawer } from 'react-native-paper';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';

import { DrawerAccountDetailsOverlay } from '#screens/Dashboard/Tutorial/DrawerAccountDetailsOverlay';
import { DrawerFAQOverlay } from '#screens/Dashboard/Tutorial/DrawerFAQOverlay';
import { DrawerKnowledgeHubOverlay } from '#screens/Dashboard/Tutorial/DrawerKnowledgeHubOverlay';
import { DrawerManagementOverlay } from '#screens/Dashboard/Tutorial/DrawerManagementOverlay';
import { RepeatTutorialOverlay } from '#screens/Dashboard/Tutorial/RepeatTutorialOverlay';
import {
  ECommonTutorialSteps,
  EFarmerTutorialSteps,
  EOperatorTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';

import { Image } from '#ui/components/Image';

import RBAC from '#common/RBAC';
import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils, type Translator } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';

import type { DashboardRoutes } from '../index';
import { useSWRConfig } from 'swr';

const StyledDrawerContentScrollView = styled(DrawerContentScrollView);

type RoutePaths = Exclude<keyof DashboardRoutes, 'Main'>;

const DRAWER_ITEMS: Record<
  RoutePaths,
  { iconName: string; translationPath: TranslationPaths; permissionSubject?: string }
> = {
  AccountDetails: {
    translationPath: 'navigation.dashboard.AccountDetails',
    iconName: 'account-settings-outline',
  },
  Management: {
    translationPath: 'navigation.dashboard.Management',
    iconName: 'account-supervisor-outline',
    permissionSubject: 'ManagementStack',
  },
  KnowledgeHub: {
    translationPath: 'navigation.dashboard.KnowledgeHub',
    iconName: 'information-outline',
  },
  Tutorial: { translationPath: 'navigation.dashboard.Tutorial', iconName: 'card-multiple-outline' },
  FAQ: { translationPath: 'navigation.dashboard.FAQ', iconName: 'chat-question-outline' },
  About: { translationPath: 'navigation.dashboard.About', iconName: 'information-outline' },
};

type Props = {
  t: Translator;
  logoURI?: string | null;
} & DrawerContentComponentProps;

export default function DrawerContent(props: Props) {
  const { routeNames, index } = props.state;
  const { t } = useTranslationUtils();
  const focusedRoute = routeNames[index];
  const resetManagementStore = useManagementStore((store) => store.reset);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const { mutate } = useSWRConfig();

  const { onLayout: onTutorialTabLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.REPEAT_TUTORIAL_STEP,
    enableHardwareBack: true,
    OverlayComponent: RepeatTutorialOverlay,
  });

  const { onLayout: onManagementTabLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.GO_TO_MANAGEMENT_STEP,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    OverlayComponent: DrawerManagementOverlay,
    onPressMask: () => props.navigation.navigate('Management'),
  });

  const { onLayout: onAccountDetailsLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    OverlayComponent: DrawerAccountDetailsOverlay,
    onPressMask: () => props.navigation.navigate('AccountDetails'),
  });

  const { onLayout: onKnowledgeHubLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_KNOWLEDGE_HUB_STEP,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    OverlayComponent: DrawerKnowledgeHubOverlay,
  });

  const { onLayout: onFAQLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_FAQ_STEP,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    OverlayComponent: DrawerFAQOverlay,
    onPressMask: () => {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      props.navigation.navigate('Dashboard');
    },
  });

  const getLayoutFunc = useCallback((route: string) => {
    switch (route) {
      case 'Tutorial':
        return onTutorialTabLayout;
      case 'Management':
        return onManagementTabLayout;
      case 'AccountDetails':
        return onAccountDetailsLayout;
      case 'KnowledgeHub':
        return onKnowledgeHubLayout;
      case 'FAQ':
        return onFAQLayout;
      default:
        return undefined;
    }
  }, []);

  const onLogout = useCallback(() => {
    resetManagementStore();
    useAuthStore.getState().revokeSession();
    mutate(() => true, undefined, false);
  }, []);

  return (
    <StyledDrawerContentScrollView {...props} tw="flex-1">
      <View tw="mx-6 mb-4">
        {!props.logoURI ? (
          <ColdtivateLogo width={60} height={60} />
        ) : (
          <Image
            tw="h-14 w-14"
            source={{
              uri: props.logoURI.replace(
                'http:',
                'https:'
              ) /** TODO: maybe handle this in the BE */,
            }}
            resizeMode="contain"
          />
        )}
      </View>

      <Drawer.Section tw="space-y-1.5">
        {Object.entries(DRAWER_ITEMS).map(([routeName, datums], routeIdx) => (
          <RBAC.ProtectedResource
            key={`${routeName}-#${routeIdx}`}
            action="NAVIGATE"
            subject={datums.permissionSubject ?? routeName}
          >
            <Drawer.Item
              label={props.t(datums.translationPath)}
              active={focusedRoute === routeName}
              onLayout={getLayoutFunc(routeName)}
              onPress={(evt) => {
                evt.stopPropagation();
                if (routeName === 'Tutorial') {
                  toggleTutorial(true);
                  props.navigation.navigate('Dashboard');
                  return;
                }
                props.navigation.navigate(routeName);
              }}
              icon={datums.iconName}
            />
          </RBAC.ProtectedResource>
        ))}
      </Drawer.Section>

      <Drawer.Item label={t('navigation.auth.Logout')} onPress={onLogout} icon="logout-variant" />
    </StyledDrawerContentScrollView>
  );
}
