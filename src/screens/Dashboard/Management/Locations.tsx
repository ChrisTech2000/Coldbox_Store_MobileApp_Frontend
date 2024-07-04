import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { useManagementStore } from '#stores/management';

function Locations(props: ManagementRouteProps<'Locations'>) {
  const { navigation } = props;

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
        <ActivityIndicator animating={true} color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 justify-start">
      <FlatList
        data={data}
        keyExtractor={(item) => `location-item-#${item.id}`}
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
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
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

export default withSafeArea(Locations);
