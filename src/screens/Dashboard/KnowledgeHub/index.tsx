import React from 'react';
import { View, Linking } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { withErrorBoundary } from '#ui/primitives/error-boundary';

import { DEEP_LINK_DOMAIN, YOUR_VCCA_PDF_LINK } from '#constants/environment';
import { GenericError } from '#ui/components/GenericError';
import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import { useTranslationUtils } from '#i18n/utils';

const BASE_SOURCE_URI = `https://${DEEP_LINK_DOMAIN}`;

function KnowledgeHub(props: KnowledgeHubStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.KnowledgeHub.comic')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/slider-comic` })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.cooling')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/cooling` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.quality')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/quality` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.optimal')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/optimal` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.table')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/table` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.sensors')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/sensors` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.tips')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/tips` })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.glitches')}
        onPress={() => navigation.navigate('Details', { sourceUri: `${BASE_SOURCE_URI}/response` })}
        titleNumberOfLines={2}
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

export default withSafeArea(
  withErrorBoundary(KnowledgeHub, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
