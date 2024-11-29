import React, { useMemo } from 'react';
import { View, Linking } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { withErrorBoundary } from '#ui/primitives/error-boundary';

import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { KNOWLEDGE_HUB_URL, YOUR_VCCA_PDF_LINK } from '#constants/environment';
import { GenericError } from '#ui/components/GenericError';

import { countriesDict } from '../Management/CompanyDetails/utils';

function buildPath(path: string, countryCode?: string): string {
  return [KNOWLEDGE_HUB_URL, LanguageStorage.read(), path.replace(/^\/+|\/+$/g, ''), countryCode]
    .filter(Boolean)
    .join('/');
}

function KnowledgeHub(props: KnowledgeHubStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const countryCode = useMemo(() => {
    const activeUserCountry = companyCountry || farmerCountry || '';
    const lookupMap = countriesDict();
    const resolvedCountryName = lookupMap.getByValue(activeUserCountry)?.name;
    const countryISOCode = lookupMap.getISOByName(resolvedCountryName || '');
    const isEnglishLocale = LanguageStorage.read() === 'en';
    const isCountrySupported = ['NG', 'IN'].includes(countryISOCode || '');
    return isEnglishLocale && isCountrySupported ? countryISOCode : undefined;
  }, [companyCountry, farmerCountry]);

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.KnowledgeHub.comic')}
        onPress={() => navigation.navigate('Details', { sourceUri: buildPath('/farmer-journey') })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.cooling')}
        onPress={() => navigation.navigate('Details', { sourceUri: buildPath('/cooling-service') })}
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.quality')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/maximize-crop-quality') })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.optimal')}
        onPress={() =>
          navigation.navigate('Details', {
            sourceUri: buildPath('/multi-commodity-storage', countryCode),
          })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.table')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/crop-storage', countryCode) })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.sensors')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/sensors-pickup-model') })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.tips')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/crate-checking-tips') })
        }
        titleNumberOfLines={2}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.glitches')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/cold-room-glitches') })
        }
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
              await Linking.openURL(YOUR_VCCA_PDF_LINK as string);
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
