import React, { useMemo } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import ColdRoom from '#assets/icons/coldroom.svg';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

function CoolingUnits(props: ManagementRouteProps<'CoolingUnits'>) {
  const { navigation } = props;
  const { t } = useTranslationUtils();

  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    { skip: !company?.id, defaultData: [] }
  );

  const datums = useMemo(
    () =>
      data.map((datum) => ({
        title: datum.name,
        data: datum.coolingUnits.map((coolingUnit) => ({
          id: coolingUnit.id,
          name: coolingUnit.name,
        })),
      })),
    [data]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 justify-start">
      <SectionList
        sections={datums}
        keyExtractor={(item, itemIdx) => `section-list-item-${item.name}-#${itemIdx}`}
        renderSectionHeader={({ section }) => (
          <React.Fragment>
            <List.Item
              tw="bg-zinc-200"
              title={section.title}
              left={(props) => <List.Icon {...props} icon="map-marker-outline" />}
            />
            {!section.data.length && (
              <Text tw="m-4 text-base text-left text-gray-400">
                {t('Dashboard.Management.CoolingUnit.emptyState')}
              </Text>
            )}
          </React.Fragment>
        )}
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item
              title={item.name}
              onPress={() =>
                navigation.navigate('EditCoolingUnit', {
                  coolingUnitId: item.id,
                })
              }
              left={() => <ColdRoom width={18} height={18} tw="text-black ml-5" />}
            />
            <Divider />
          </React.Fragment>
        )}
        refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        nestedScrollEnabled
      />
    </View>
  );
}

export default withSafeArea(CoolingUnits, ['bottom'], true);
