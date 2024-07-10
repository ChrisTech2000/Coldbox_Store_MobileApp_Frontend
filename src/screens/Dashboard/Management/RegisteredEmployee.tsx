import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import type { User } from '#types/global';
import { dateFmt } from '#i18n/utils';

function RegisteredEmployee(props: ManagementRouteProps<'RegisteredEmployee'>) {
  const { navigation } = props;

  const company = useManagementStore(useShallow((store) => store.company));

  const {
    data: registeredEmployees,
    isLoading,
    isValidating,
    refetch: revalidateRegisteredEmployees,
  } = useApiCall(
    'getCompanyEmployees',
    ColdtivateService.getCompanyEmployees,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const { data: invitations, refetch: revalidateInvitations } = useApiCall(
    'getInvitedCompanyEmployees',
    ColdtivateService.getInvitedCompanyEmployees,
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

  return (
    <View tw="flex-1 justify-start">
      <List.Item title={`Invited (${invitations.length})`} />
      <Divider />
      <List.Item title={`Registered (${registeredEmployees.length})`} />
      <Divider />

      <FlatList
        data={registeredEmployees}
        keyExtractor={(item) => `registered-employee-item-#${item.id}`}
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item
              title={_getTitle(item.user)}
              onPress={() =>
                navigation.navigate('RegisteredEmployeeDetails', {
                  registeredEmployeeId: item.id,
                })
              }
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
          </React.Fragment>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={async () =>
              await Promise.all([revalidateRegisteredEmployees, revalidateInvitations])
            }
          />
        }
        nestedScrollEnabled
      />
    </View>
  );
}

function _getTitle(datum: User) {
  const formatted = dateFmt(datum.lastLogin);
  return [datum.firstName, datum.lastName, formatted].join(' ');
}

export default withSafeArea(RegisteredEmployee);
