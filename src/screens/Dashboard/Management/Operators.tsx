import React, { useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { dateFmt } from '#i18n/utils';

import { User } from '#types/global';

function Operators(props: ManagementRouteProps<'Operators'>) {
  const { navigation } = props;

  const company = useManagementStore(useShallow((store) => store.company));

  const {
    data: operators,
    isLoading,
    isValidating,
    refetch: revalidateOperators,
  } = useApiCall('getOperators', ColdtivateService.getOperators, company?.id as number, {
    skip: !company?.id,
    defaultData: [],
  });

  const { data: invites, refetch: revalidateInvites } = useApiCall(
    'getInvitedOperators',
    ColdtivateService.getInvitedOperators,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const datums = useMemo(() => operators.filter((operator) => operator?.user?.phone), [operators]);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 justify-start">
      <View tw="w-full bg-zinc-200 space-y-2 px-4 py-2">
        <Text variant="TextMedium">Invited ({invites.length})</Text>
        <Text variant="TextMedium">Registered ({datums.length})</Text>
      </View>

      <FlatList
        data={datums}
        keyExtractor={(item) => `operator-item-#${item.id}`}
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item
              title={_getTitle(item.user)}
              onPress={() => {
                navigation.navigate('EditOperator', {
                  firstName: item.user.firstName,
                  familyName: item.user.lastName,
                });
              }}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
          </React.Fragment>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={async () => await Promise.all([revalidateOperators, revalidateInvites])}
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

export default withSafeArea(Operators);
