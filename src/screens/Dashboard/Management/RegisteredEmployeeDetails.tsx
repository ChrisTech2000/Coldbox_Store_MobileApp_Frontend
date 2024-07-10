import React, { useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

type Datum = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
};

function RegisteredEmployeeDetails(props: ManagementRouteProps<'RegisteredEmployeeDetails'>) {
  const { registeredEmployeeId } = props.route.params;

  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getCompanyEmployee',
    ColdtivateService.getCompanyEmployee,
    { registeredEmployeeId, companyId: company?.id as number },
    {
      skip: !registeredEmployeeId || !company?.id,
      defaultData: undefined,
    }
  );

  const datum = useMemo(
    () =>
      ({
        name: data?.user?.firstName ?? '',
        lastName: data?.user?.lastName ?? '',
        email: data?.user?.email ?? '',
        phone: data?.user?.phone ?? '',
      }) satisfies Datum,
    [data?.user]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <FlatList
        data={Object.entries(datum)}
        keyExtractor={([key]) => `row-item-#${key}`}
        renderItem={({ item: [key, value] }) => (
          <React.Fragment>
            <View tw="flex-row h-12 max-h-12 px-4">
              <View tw="w-1/2 items-start justify-center">
                <Text>{key}</Text>
              </View>
              <View tw="w-1/2 items-start justify-center">
                <Text tw="truncate">{value}</Text>
              </View>
            </View>
            <Divider />
          </React.Fragment>
        )}
        refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        nestedScrollEnabled
      />
    </View>
  );
}

export default withSafeArea(RegisteredEmployeeDetails);
