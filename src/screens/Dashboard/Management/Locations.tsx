import React from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';
import { cn } from '#ui/lib/cn';

function Locations(props: ManagementRouteProps<'Locations'>) {
  const { navigation } = props;
  const { t } = useTranslationUtils();

  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="flex-1 justify-start">
      {!data.length ? (
        <Text tw={cn('m-4 text-base text-center text-gray-400', isRTL && 'text-left')}>
          {t('Dashboard.Management.Location.emptyState')}
        </Text>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => `location-${item.id}`}
          estimatedItemSize={72}
          renderItem={({ item }) => (
            <React.Fragment>
              <List.Item
                title={item.name}
                onPress={() => {
                  navigation.navigate('EditLocation', {
                    locationId: item.id,
                    companyId: item.company.id,
                  });
                }}
                right={ListItemArrow}
              />
              <Divider />
            </React.Fragment>
          )}
          refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
          nestedScrollEnabled
        />
      )}
    </View>
  );
}

export default withSafeArea(Locations, ['bottom'], true);
