import React, { useMemo } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import { ActivityIndicator, Divider, List, type ListItemProps } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type {
  ManagementRoutePaths,
  ManagementRouteProps,
  ManagementRoutes,
} from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import type { User } from '#types/global';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

type Invite = { user: Pick<User, 'phone'> };
type Employee = { employeeId: number; user: User };

function RegisteredEmployee(props: ManagementRouteProps<'RegisteredEmployee'>) {
  const { navigation } = props;

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const {
    data: employees,
    isLoading,
    isValidating,
    refetch: revalidateEmployees,
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

  const datums = useMemo(() => {
    const invitedOperators: Array<Invite> = invitations.map((invite) => ({
      user: { phone: invite.phone },
    }));
    const registeredEmployees: Array<Employee> = employees.map((employee) => ({
      employeeId: employee.id,
      user: employee.user,
    }));

    return [
      {
        title: t('Dashboard.Management.RegisteredEmployee.invited', {
          amount: invitedOperators.length,
        }),
        data: invitedOperators,
      },
      {
        title: t('Dashboard.Management.RegisteredEmployee.registered', {
          amount: registeredEmployees.length,
        }),
        data: registeredEmployees,
      },
    ] satisfies Array<{ title: string; data: Array<Employee | Invite> }>;
  }, [invitations, employees]);

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
            onRefresh={async () => await Promise.all([revalidateEmployees, revalidateInvitations])}
          />
        }
        nestedScrollEnabled
      />
    </View>
  );
}

function _propsFactory(
  datum: Employee | Invite,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
) {
  const props = {} as ListItemProps;
  if ('employeeId' in datum) {
    const _str: Array<string> = [datum.user.firstName, datum.user.lastName];
    if (typeof datum.user.lastLogin === 'string') _str.push(dateFmt(datum.user.lastLogin));
    props.title = _str.join(' ');
    props.onPress = () => {
      navigation.navigate('RegisteredEmployeeDetails', {
        registeredEmployeeId: datum.employeeId,
      });
    };
    props.right = ListItemArrow;
  } else {
    props.title = datum.user.phone;
  }
  return props;
}

export default withSafeArea(RegisteredEmployee, ['bottom'], true);
