import { useDrawerStatus } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Drawer } from 'react-native-paper';

import type { TranslationPaths, Translator } from '#i18n/utils';
import { DrawerAccountDetailsOverlay } from '#screens/Dashboard/Tutorial/DrawerAccountDetailsOverlay';
import { DrawerFAQOverlay } from '#screens/Dashboard/Tutorial/DrawerFAQOverlay';
import { DrawerKnowledgeHubOverlay } from '#screens/Dashboard/Tutorial/DrawerKnowledgeHubOverlay';
import { DrawerManagementOverlay } from '#screens/Dashboard/Tutorial/DrawerManagementOverlay';
import { RepeatTutorialOverlay } from '#screens/Dashboard/Tutorial/RepeatTutorialOverlay';
import {
  ECommonTutorialSteps,
  EFarmerTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

type DrawerItemProps = {
  t: Translator;
  datums: {
    iconName: string;
    translationPath: TranslationPaths;
    permissionSubject?: string;
  };
  focusedRoute: string;
  routeName: string;
  navigation: DrawerNavigationHelpers;
};

type LayoutFn = (event: LayoutChangeEvent) => void;

const screenWidth = Dimensions.get('window').width;

export function DrawerItem({ t, datums, routeName, focusedRoute, navigation }: DrawerItemProps) {
  const user = useAuthStore((store) => store.user);
  const drawerStatus = useDrawerStatus();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  const { start, onLayout: onTutorialLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.REPEAT_TUTORIAL_STEP,
    OverlayComponent: RepeatTutorialOverlay,
    layoutAdjustments: {
      addWidth: screenWidth / 2,
    },
  });

  const { onLayout: onManagementLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.GO_TO_MANAGEMENT_STEP,
    OverlayComponent: DrawerManagementOverlay,
    layoutAdjustments: {
      addWidth: screenWidth / 2,
    },
  });

  const { onLayout: onAccountDetailsLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP,
    OverlayComponent: DrawerAccountDetailsOverlay,
    layoutAdjustments: {
      addWidth: screenWidth / 2,
    },
  });

  const { onLayout: onKHLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_KNOWLEDGE_HUB_STEP,
    OverlayComponent: DrawerKnowledgeHubOverlay,
    layoutAdjustments: {
      addWidth: screenWidth / 2,
    },
  });

  const { onLayout: onFAQLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_FAQ_STEP,
    OverlayComponent: DrawerFAQOverlay,
    layoutAdjustments: {
      addWidth: screenWidth / 2,
    },
  });

  const layoutFns: Record<string, LayoutFn> = {
    Tutorial: onTutorialLayout,
    Management: onManagementLayout,
    AccountDetails: onAccountDetailsLayout,
    KnowledgeHub: onKHLayout,
    FAQ: onFAQLayout,
  };

  if (drawerStatus === 'closed') return null;

  return (
    <Drawer.Item
      label={t(datums.translationPath)}
      active={focusedRoute === routeName}
      onLayout={layoutFns[routeName]}
      onPress={(evt) => {
        evt.stopPropagation();
        switch (routeName) {
          case 'AccountDetails':
            return navigation.navigate('AccountDetails', { screen: 'Root' });
          case 'Management':
            return navigation.navigate('Management', { screen: 'Root' });
          case 'Tutorial': {
            start();
            toggleTutorial(true);
            if (user?.role === ERoles.OPERATOR) {
              emitter.emit(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS);
            }
            return navigation.navigate('Dashboard', { screen: 'RootMainTabStack' });
          }
          default:
            return navigation.navigate(routeName);
        }
      }}
      icon={datums.iconName}
    />
  );
}
