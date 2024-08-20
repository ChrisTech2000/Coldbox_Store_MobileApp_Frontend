import React from 'react';
import { Linking, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type {
  KnowledgeHubStackRouteProps,
  KnowledgeHubStackRoutes,
} from '#navigation/Dashboard/KnowledgeHub';
import { useTranslationUtils } from '#i18n/utils';
import { KNOWLEDGE_HUB_URL, YOUR_VCCA_PDF_LINK } from '#constants/environment';

// TODO: assign every specific uri path to each List Item

function KnowledgeHub(props: KnowledgeHubStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.KnowledgeHub.comic')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.cooling')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.quality')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.optimal')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.table')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.sensors')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.tips')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <List.Item
        title={t('Dashboard.KnowledgeHub.glitches')}
        onPress={() => navigation.navigate('Details', _paramsFactory(''))}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />

      <View tw="m-4">
        <Text tw="text-zinc-500 text-sm">
          {t('Dashboard.KnowledgeHub.source')}
          <Text
            tw="text-blue-500 text-sm"
            onPress={async (evt) => {
              evt.stopPropagation();
              await Linking.openURL(YOUR_VCCA_PDF_LINK);
            }}
          >
            &nbsp;{t('Dashboard.KnowledgeHub.clickHere')}
          </Text>
        </Text>
      </View>
    </View>
  );
}

function _paramsFactory(path: string): KnowledgeHubStackRoutes['Details'] {
  return { uri: [KNOWLEDGE_HUB_URL, path].join('') };
}

export default withSafeArea(KnowledgeHub);
