import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import { useToggle } from '#ui/hooks/useToggle';
import InAppNotifications from '#common/InAppNotifications';
import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { KNOWLEDGE_HUB_URL, YOUR_VCCA_PDF_LINK } from '#constants/environment';
import { GenericError } from '#ui/components/GenericError';
import { cn } from '#ui/lib/cn';

import { countriesDict } from '../Management/CompanyDetails/utils';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

const _getLanguage = () => LanguageManager.read();

function buildPath(path: string, countryCode?: string): string {
  return [KNOWLEDGE_HUB_URL, _getLanguage(), path.replace(/^\/+|\/+$/g, ''), countryCode]
    .filter(Boolean)
    .join('/');
}

function KnowledgeHub(props: KnowledgeHubStackRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));
  const toast = InAppNotifications.useToast();

  const [isDownloading, toggleDownloading] = useToggle(false);

  const _language = _getLanguage();

  const countryCode = useMemo(() => {
    const activeUserCountry = companyCountry || farmerCountry || '';
    if (!activeUserCountry) return undefined;

    const lookupMap = countriesDict();

    const countryDetails = lookupMap.getByValue(activeUserCountry);
    if (!countryDetails?.name) {
      console.warn(`Could not resolve country name for: ${activeUserCountry}`);
      return undefined;
    }

    const countryISOCode = lookupMap.getISOByName(countryDetails.name);
    if (!countryISOCode) {
      console.warn(`Could not resolve ISO code for country: ${countryDetails.name}`);
      return undefined;
    }

    const isEnglishLocale = _language === 'en';
    const isCountrySupported = ['NG', 'IN'].includes(countryISOCode);

    return isEnglishLocale && isCountrySupported ? countryISOCode : undefined;
  }, [companyCountry, farmerCountry, _language]);

  return (
    <View tw="flex-1 justify-start">
      <List.Item
        title={t('Dashboard.KnowledgeHub.comic')}
        onPress={() => navigation.navigate('Details', { sourceUri: buildPath('/farmer-journey') })}
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.cooling')}
        onPress={() => navigation.navigate('Details', { sourceUri: buildPath('/cooling-service') })}
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.quality')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/maximize-crop-quality') })
        }
        titleNumberOfLines={2}
        right={ListItemArrow}
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
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.table')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/crop-storage', countryCode) })
        }
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.sensors')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/sensors-pickup-model') })
        }
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.tips')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/crate-checking-tips') })
        }
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />
      <List.Item
        title={t('Dashboard.KnowledgeHub.glitches')}
        onPress={() =>
          navigation.navigate('Details', { sourceUri: buildPath('/cold-room-glitches') })
        }
        titleNumberOfLines={2}
        right={ListItemArrow}
      />
      <Divider />

      <View tw="m-4">
        <Text tw="text-zinc-500 text-sm">
          {t('Dashboard.KnowledgeHub.source')}
          <Text
            tw={cn('text-blue-500 text-sm', isDownloading && 'text-zinc-500 line-through')}
            disabled={isDownloading}
            onPress={async (evt) => {
              evt.stopPropagation();
              try {
                toggleDownloading();
                await FileUtility.downloadFile(
                  YOUR_VCCA_PDF_LINK,
                  'operators_manual_by_your_vcca',
                  'pdf'
                );
                toast.show(`${t('actions.done')}!`, { type: 'md_success' });
              } catch (exception) {
                toast.show(t('navigation.error.errorMessage'), { type: 'md_danger' });
                reportCrash(exception as Error);
              } finally {
                toggleDownloading();
              }
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
