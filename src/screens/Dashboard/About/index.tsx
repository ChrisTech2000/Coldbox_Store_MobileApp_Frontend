import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AboutStackRouteProps } from '#navigation/Dashboard/About';
import { useTranslationUtils } from '#i18n/utils';

function About(props: AboutStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.About.runtimeAgree')}
        onPress={() => navigation.navigate('ComsolAgreement')}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.userLicense')}
        onPress={() => navigation.navigate('UserAgreement')}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.privacyPolicy')}
        onPress={() => navigation.navigate('Privacy')}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.About.comsolAbout')}
        onPress={() => navigation.navigate('ComsolAbout')}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
    </View>
  );
}

export default withSafeArea(About);
