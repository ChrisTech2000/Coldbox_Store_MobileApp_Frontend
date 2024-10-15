import React from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, List } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';
import { DrawerActions } from '@react-navigation/native';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import type { TranslationLocales } from '#i18n/constants';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { EApiGender, ERoles } from '#types/global';
import { cn } from '#ui/lib/cn';

import type {
  AccountDetailsRouteProps,
  DetailsSectionParams,
} from '#navigation/Dashboard/AccountDetails';

import { countriesDict } from '../Management/CompanyDetails/utils';
import { CoolingUserSurveyOverlay } from '../Tutorial/CoolingUserSurveyOverlay';
import { LocalizationPreferencesOverlay } from '../Tutorial/LocalizationPreferancesOverlay';
import { EFarmerTutorialSteps } from '../Tutorial/utils/constants';
import { PersonalDetailsOverlay } from '../Tutorial/PersonalDetailsOverlay';

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

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_LOCALIZATION_PREFERENCES_STEP,
    OverlayComponent: LocalizationPreferencesOverlay,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_PERSONAL_DETAILS,
    OverlayComponent: PersonalDetailsOverlay,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_COOLING_USERS_SURVEY_STEP,
    OverlayComponent: CoolingUserSurveyOverlay,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    fullScreen: true,
    onPressMask: () => {
      props.navigation.goBack();
      props.navigation.dispatch(DrawerActions.openDrawer());
    },
  });

  return (
    <ScrollView tw="flex-1 p-4 space-y-6" showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <Text tw="text-base text-green-primary font-bold">
          {t('Dashboard.AccountDetails.sections.details')}
        </Text>
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

      {/** TODO: not sure if this will ever be a part of the app; leaving it just in case */}
      {/* <View>
        <RBAC.ProtectedResource action="SET" subject="BuyerSettings">
          <View tw="space-y-3">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.AccountDetails.sections.buyerSettings')}
            </Text>
            <View>
              <List.Item
                tw="p-0 py-2"
                title={undefined}
                left={() => (
                  <Text tw="text-base w-[80%]">{t('navigation.dashboard.PaymentMethods')}</Text>
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={(evt) => {
                  evt.stopPropagation();
                  props.navigation.navigate('PaymentSettings');
                }}
              />
              <Divider tw="bg-gray-400" />
            </View>
          </View>
        </RBAC.ProtectedResource>
      </View> */}

      <RBAC.ProtectedResource action="VIEW" subject="AccountSellerSettings">
        <View tw="space-y-3 mt-6">
          <Text tw="text-base text-green-primary font-bold">
            {t('Dashboard.AccountDetails.sections.sellerSettings')}
          </Text>
          <View>
            <RBAC.ProtectedResource action="SET" subject="PayoutSettings">
              <List.Item
                tw="px-0 py-2"
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
            <RBAC.ProtectedResource action="NAVIGATE" subject="ManageCouponsSettings">
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
                <Divider tw="bg-gray-400 mb-2" />
              </View>
            </RBAC.ProtectedResource>
            <View>
              <List.Item
                tw="p-0 pb-2"
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
      </RBAC.ProtectedResource>
    </ScrollView>
  );
}

export default withSafeArea(AccountDetails, ['bottom'], true);
