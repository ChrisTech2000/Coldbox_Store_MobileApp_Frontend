import React, { useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider, List, type ListItemProps } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type {
  ManagementRoutePaths,
  ManagementRouteProps,
  ManagementRoutes,
} from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import type { Farmer } from '#types/global';

import Prompt from './components/Prompt';
import FormModal from './components/FormModal';

function CoolingUsers(props: ManagementRouteProps<'CoolingUsers'>) {
  const user = useAuthStore(useShallow((store) => store.user));

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    { operator: user?.id as number },
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const datums = useMemo(
    () =>
      cloneDeep(data)?.sort((a, b) => {
        const nameA = a.user.firstName.toLowerCase();
        const nameB = b.user.firstName.toLowerCase();
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      }) ?? [],
    [data]
  );

  const coolingUsersIds: Array<number> = useMemo(
    () => data?.map((coolingUser) => coolingUser.id) ?? [],
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
      <FlatList
        data={datums}
        keyExtractor={(item) => `cooling-user-item-#${item.id}`}
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item {..._propsFactory(item, props.navigation)} />
            <Divider />
          </React.Fragment>
        )}
        refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        nestedScrollEnabled
      />

      <Prompt navigation={props.navigation} />
      <FormModal navigation={props.navigation} coolingUsersIds={coolingUsersIds} />
    </View>
  );
}

function _propsFactory(
  datum: Farmer,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
) {
  const props = {} as ListItemProps;
  props.title = [datum.user.firstName, datum.user.lastName].join(' ');
  if (datum.userCode) {
    props.right = (props) => <List.Icon {...props} icon="cellphone" />;
  }
  props.onPress = () => {
    navigation.navigate('EditCoolingUser', {
      userId: datum.user.id,
      createdByOperator: !datum.userCode,
    });
  };
  return props;
}

export default withSafeArea(CoolingUsers);
