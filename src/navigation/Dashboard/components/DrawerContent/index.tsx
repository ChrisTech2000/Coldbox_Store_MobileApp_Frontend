import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { styled } from 'nativewind';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Drawer } from 'react-native-paper';
import { useSWRConfig } from 'swr';

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
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import RBAC from '#common/RBAC';
import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils, type Translator } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import DataloaderService from '#services/DataloaderService';

import type { DashboardRoutes } from '../../index';
import { resetAllStores } from './resetStoresUtil';

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
  const user = useAuthStore((store) => store.user);
  const focusedRoute = routeNames[index];

  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const { mutate } = useSWRConfig();

  const { start } = useWalkthroughStep({
    number: ECommonTutorialSteps.REPEAT_TUTORIAL_STEP,
    OverlayComponent: RepeatTutorialOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EOperatorTutorialSteps.GO_TO_MANAGEMENT_STEP,
    OverlayComponent: DrawerManagementOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP,
    OverlayComponent: DrawerAccountDetailsOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_KNOWLEDGE_HUB_STEP,
    OverlayComponent: DrawerKnowledgeHubOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_FAQ_STEP,
    OverlayComponent: DrawerFAQOverlay,
    fullScreen: true,
  });

  const onLogout = useCallback(() => {
    resetAllStores();
    mutate(() => true, undefined, false);
    useAuthStore.getState().revokeSession();
    DataloaderService.clearAllCaches();
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
              onPress={(evt) => {
                evt.stopPropagation();
                switch (routeName) {
                  case 'AccountDetails':
                    return props.navigation.navigate('AccountDetails', { screen: 'Root' });
                  case 'Management':
                    return props.navigation.navigate('Management', { screen: 'Root' });
                  case 'Tutorial': {
                    start();
                    toggleTutorial(true);
                    if (user?.role === ERoles.OPERATOR) {
                      emitter.emit(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS);
                    }
                    return props.navigation.navigate('Dashboard', { screen: 'RootMainTabStack' });
                  }
                  default:
                    return props.navigation.navigate(routeName);
                }
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
