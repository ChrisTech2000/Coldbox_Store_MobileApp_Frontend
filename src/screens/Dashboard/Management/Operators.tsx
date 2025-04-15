import React, { useMemo } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import type { NavigationProp } from '@react-navigation/native';
import { ActivityIndicator, Divider, List, type ListItemProps } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type {
  ManagementRoutePaths,
  ManagementRouteProps,
  ManagementRoutes,
} from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import type { User } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

type Invite = { phone: string };

function Operators(props: ManagementRouteProps<'Operators'>) {
  const { navigation } = props;

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

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

  const datums = useMemo(() => {
    const invitedOperators: Array<Invite> = invites.map((invite) => ({ phone: invite.phone }));

    const registeredOperators: Array<User> = [];
    for (const operator of operators) {
      if (!operator?.user?.phone) continue;
      registeredOperators.push(operator.user);
    }

    return [
      {
        title: t('Dashboard.Management.Location.text.invited', { amount: invitedOperators.length }),
        data: invitedOperators,
      },
      {
        title: t('Dashboard.Management.Location.text.registered', {
          amount: registeredOperators.length,
        }),
        data: registeredOperators,
      },
    ] satisfies Array<{ title: string; data: Array<User | Invite> }>;
  }, [invites, operators]);

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
        keyExtractor={(_, itemIdx) => `section-list-item-#${itemIdx}`}
        renderSectionHeader={({ section }) => (
          <React.Fragment>
            <List.Item title={section.title} titleStyle={{ color: colors.zinc[500] }} />
            <Divider />
          </React.Fragment>
        )}
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item {..._propsFactory(item, navigation)} />
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

function _propsFactory(
  datum: User | Invite,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
) {
  const props = {} as ListItemProps;
  if ('firstName' in datum) {
    const _str: Array<string> = [datum.firstName, datum.lastName];
    if (typeof datum.lastLogin === 'string') _str.push(dateFmt(datum.lastLogin));
    props.title = _str.join(' ');
    props.onPress = () => {
      navigation.navigate('EditOperator', { userId: datum.id });
    };
    props.right = ListItemArrow;
  } else {
    props.title = datum.phone;
  }
  return props;
}

export default withSafeArea(Operators, ['bottom'], true);
