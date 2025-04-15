import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AboutStackRouteProps } from '#navigation/Dashboard/About';
import { useTranslationUtils } from '#i18n/utils';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

function About(props: AboutStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.About.runtimeAgree')}
        onPress={() => navigation.navigate('ComsolAgreement')}
        right={ListItemArrow}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.userLicense')}
        onPress={() => navigation.navigate('UserAgreement')}
        right={ListItemArrow}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.privacyPolicy')}
        onPress={() => navigation.navigate('Privacy')}
        right={ListItemArrow}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.comsolAbout')}
        onPress={() => navigation.navigate('ComsolAbout')}
        right={ListItemArrow}
      />
      <Divider />
    </View>
  );
}

export default withSafeArea(About);
