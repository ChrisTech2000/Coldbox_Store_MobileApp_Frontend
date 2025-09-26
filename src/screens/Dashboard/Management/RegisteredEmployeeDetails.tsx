import React, { useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils, type TranslationPaths, LanguageManager } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

function RegisteredEmployeeDetails(props: ManagementRouteProps<'RegisteredEmployeeDetails'>) {
  const { registeredEmployeeId } = props.route.params;

  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getCompanyEmployee',
    ColdtivateService.getCompanyEmployee,
    { registeredEmployeeId, companyId: company?.id as number },
    {
      skip: !registeredEmployeeId || !company?.id,
      defaultData: undefined,
    }
  );

  const datums = useMemo(
    () =>
      [
        {
          t: 'Auth.SignUp.commonForm.firstNameLabel',
          value: data?.user?.firstName ?? '',
        },
        {
          t: 'Auth.SignUp.commonForm.lastNameLabel',
          value: data?.user?.lastName ?? '',
        },
        {
          t: 'Auth.SignUp.SignUpCompany.emailLabel',
          value: data?.user?.email ?? '',
        },
        {
          t: 'Auth.ForgotPassword.phoneInputLabel',
          value: data?.user?.phone ?? '',
        },
      ] satisfies Array<{ t: TranslationPaths; value: string }>,
    [data?.user]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const isCurrentUser = data?.user?.id === user?.id;
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw={cn('flex-1 space-y-32', isRTL && 'space-y-12')}>
      <View style={{ flex: 1 }}>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={datums}
          keyExtractor={(item) => `employee-detail-${item.t}`}
          estimatedItemSize={60}
          renderItem={({ item }) => (
            <React.Fragment>
              <View tw="flex-row h-12 max-h-12 px-4">
                <View tw="w-1/2 items-start justify-center">
                  <Text>{t(item.t)}</Text>
                </View>
                <View tw="w-1/2 items-start justify-center">
                  <Text tw="truncate">{item.value}</Text>
                </View>
              </View>
              <Divider />
            </React.Fragment>
          )}
          refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        />
      </View>

      <View tw="mx-4">
        <Text tw={cn('text-center', isRTL && 'text-left')}>
          {isCurrentUser
            ? t('Dashboard.Management.RegisteredEmployeeDetails.deletePersonal')
            : t('Dashboard.Management.RegisteredEmployeeDetails.deleteOther', {
                contact: 'app@yourvcca.org',
              })}
        </Text>
      </View>
    </View>
  );
}

export default withSafeArea(RegisteredEmployeeDetails, ['bottom'], true);
