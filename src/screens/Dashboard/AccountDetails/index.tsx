import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { EApiGender, ERoles } from '#types/global';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import type { TranslationLocales } from '#i18n/constants';
import RBAC from '#common/RBAC';
import { cn } from '#ui/lib/cn';

import type {
  AccountDetailsRouteProps,
  DetailsSectionParams,
} from '#navigation/Dashboard/AccountDetails';

import { countriesDict } from '../Management/CompanyDetails/utils';

function AccountDetails(props: AccountDetailsRouteProps<'Root'>) {
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const user = useAuthStore(useShallow((store) => store.user));
  const [farmerParentName, farmerUserCode, farmerCountry, farmerId] = useDashboardStore(
    useShallow((store) => [
      store.farmerParentName,
      store.farmerUserCode,
      store.farmerCountry,
      store.farmerId,
    ])
  );

  const disabledLocationPreferences = !guard('VIEW', 'FarmerFields');

  function buildDetailsSectionParams() {
    return {
      kind: user?.role ?? ERoles.COOLING_USER,
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      language: (user?.language as TranslationLocales) ?? LanguageStorage.read(),
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      gender: user?.gender ?? EApiGender.OTHER,
      parentName: farmerParentName ?? '',
      userCode: farmerUserCode ?? '',
      country: farmerCountry ? countriesDict().getISOByName(farmerCountry) ?? '' : '',
      userId: user!.id,
      farmerId: farmerId!,
    } satisfies DetailsSectionParams;
  }

  return (
    <ScrollView tw="flex-1 p-4 space-y-6" showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <Text tw="text-base text-green-primary font-bold">Details</Text>
        <View>
          <View>
            <List.Item
              tw="p-0 py-2"
              title={undefined}
              left={() => (
                <Text tw="text-base w-[80%]">{t('navigation.dashboard.PersonalDetails')}</Text>
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={(evt) => {
                evt.stopPropagation();
                if (!user) return; // safe guard
                props.navigation.navigate('PersonalDetails', buildDetailsSectionParams());
              }}
            />
            <Divider tw="bg-gray-400" />
          </View>
          <View>
            <List.Item
              tw="p-0 py-2"
              title={undefined}
              disabled={disabledLocationPreferences}
              left={() => (
                <Text tw={cn('text-base w-[80%]', disabledLocationPreferences && 'text-gray-400')}>
                  {t('navigation.dashboard.LocalizationPreferences')}
                </Text>
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon="chevron-right"
                  color={disabledLocationPreferences ? colors.gray[400] : colors.gray[800]}
                />
              )}
              onPress={(evt) => {
                evt.stopPropagation();
                if (!user || !farmerId) return; // safe guard
                props.navigation.navigate('LocalizationPreferences', buildDetailsSectionParams());
              }}
            />
            <Divider tw="bg-gray-400" />
          </View>
          <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
            <View>
              <List.Item
                tw="p-0 py-2"
                title={undefined}
                left={() => (
                  <Text tw="text-base w-[80%]" numberOfLines={1}>
                    {t('navigation.history.BaseSurvey')}
                  </Text>
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={(evt) => {
                  evt.stopPropagation();
                  if (!farmerId) return; // safe guard
                  props.navigation.navigate('CoolingUsersSurvey', { farmerId });
                }}
              />
              <Divider tw="bg-gray-400" />
            </View>
          </RBAC.ProtectedResource>
        </View>
      </View>

      <View tw="space-y-3">
        <Text tw="text-base text-green-primary font-bold">Seller Settings</Text>
        <View>
          <RBAC.ProtectedResource action="SET" subject="PayoutSettings">
            <List.Item
              tw="p-0 py-2"
              title={undefined}
              left={() => (
                <Text tw="text-base w-[80%]">{t('navigation.dashboard.PayoutOptions')}</Text>
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate('PayoutSettings');
              }}
            />
            <Divider tw="bg-gray-400" />
          </RBAC.ProtectedResource>
        </View>
        <View>
          <RBAC.ProtectedResource action="SET" subject="ManageCouponsSettings">
            <View>
              <List.Item
                tw="p-0 pb-2"
                title={undefined}
                left={() => <Text tw="text-base w-[80%]">Discount coupons</Text>}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={(evt) => {
                  evt.stopPropagation();
                  props.navigation.navigate('CouponStack');
                }}
              />
              <Divider tw="bg-gray-400" />
            </View>
          </RBAC.ProtectedResource>
          <View>
            <List.Item
              tw="p-0 py-2"
              title={undefined}
              left={() => (
                <Text tw="text-base w-[80%]">{t('navigation.dashboard.ContactsSharing')}</Text>
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate('ContactsSharing');
              }}
            />
            <Divider tw="bg-gray-400" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(AccountDetails);
