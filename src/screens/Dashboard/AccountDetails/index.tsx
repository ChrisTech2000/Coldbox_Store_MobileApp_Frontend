import React from 'react';
import { Platform, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import type { TranslationLocales } from '#i18n/constants';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
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
import { PersonalDetailsOverlay } from '../Tutorial/PersonalDetailsOverlay';
import { EFarmerTutorialSteps } from '../Tutorial/utils/constants';
import DeleteAccountAction from './components/DeleteAccountAction';
import { ListItemArrow } from './components/ListItemArrow';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

function AccountDetails(props: AccountDetailsRouteProps<'Root'>) {
  const { t } = useTranslationUtils();

  const user = useAuthStore(useShallow((store) => store.user));
  const [farmerParentName, farmerUserCode, farmerCountry, farmerId] = useDashboardStore(
    useShallow((store) => [
      store.farmerParentName,
      store.farmerUserCode,
      store.farmerCountry,
      store.farmerId,
    ])
  );

  function buildDetailsSectionParams() {
    return {
      kind: user?.role ?? ERoles.COOLING_USER,
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      language: (user?.language as TranslationLocales) ?? LanguageManager.read(),
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      gender: user?.gender ?? EApiGender.OTHER,
      parentName: farmerParentName ?? '',
      userCode: farmerUserCode ?? '',
      country: farmerCountry ? (countriesDict().getByValue(farmerCountry)?.name ?? '') : '',
      userId: user!.id,
      farmerId: farmerId!,
    } satisfies DetailsSectionParams;
  }

  const { onLayout: onLocalizationPreferencesLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_LOCALIZATION_PREFERENCES_STEP,
    OverlayComponent: LocalizationPreferencesOverlay,
    fullScreen: true,
  });

  const { onLayout: onPersonalDetailsLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_PERSONAL_DETAILS,
    OverlayComponent: PersonalDetailsOverlay,
    fullScreen: true,
  });

  const { onLayout: onSurveyLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.GO_TO_COOLING_USERS_SURVEY_STEP,
    OverlayComponent: CoolingUserSurveyOverlay,
    fullScreen: true,
  });

  return (
    <React.Fragment>
      <ScrollView
        tw={cn('flex-1 pt-3 pb-8 space-y-6', HORIZONTAL_SPACING)}
        showsVerticalScrollIndicator={false}
      >
        <View tw="space-y-3">
          <Text tw="text-base text-green-primary font-bold">
            {t('Dashboard.AccountDetails.sections.details')}
          </Text>
          <View>
            <View>
              <List.Item
                tw="px-0 py-2"
                title={undefined}
                onLayout={onPersonalDetailsLayout}
                left={() => (
                  <Text tw="text-base w-[80%]">{t('navigation.dashboard.PersonalDetails')}</Text>
                )}
                right={ListItemArrow}
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
                onLayout={onLocalizationPreferencesLayout}
                tw="px-0 py-2"
                title={undefined}
                left={() => (
                  <Text tw="text-base w-[80%]">
                    {t('navigation.dashboard.LocalizationPreferences')}
                  </Text>
                )}
                right={ListItemArrow}
                onPress={(evt) => {
                  evt.stopPropagation();
                  if (!user) return; // safe guard
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
                  onLayout={onSurveyLayout}
                  left={() => (
                    <Text tw="text-base w-[80%]" numberOfLines={1}>
                      {t('navigation.history.BaseSurvey')}
                    </Text>
                  )}
                  right={ListItemArrow}
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

        <RBAC.ProtectedResource action="VIEW" subject="AccountSellerSettings">
          <View tw="space-y-3 mt-6">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.AccountDetails.sections.sellerSettings')}
            </Text>
            <View>
              <View>
                <RBAC.ProtectedResource action="SET" subject="PayoutSettings">
                  <List.Item
                    tw="px-0 py-2"
                    title={undefined}
                    left={() => (
                      <Text tw="text-base w-[80%]">{t('navigation.dashboard.PayoutOptions')}</Text>
                    )}
                    right={ListItemArrow}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      props.navigation.navigate('PayoutSettings');
                    }}
                  />
                  <Divider tw="bg-gray-400" />
                </RBAC.ProtectedResource>
              </View>

              <RBAC.ProtectedResource action="NAVIGATE" subject="ManageCouponsSettings">
                <View>
                  <List.Item
                    tw="px-0 py-2"
                    title={undefined}
                    left={() => (
                      <Text tw="text-base w-[80%]">{t('Dashboard.Management.Coupons.title')}</Text>
                    )}
                    right={ListItemArrow}
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
                  tw="px-0 py-2"
                  title={undefined}
                  left={() => (
                    <Text tw="text-base w-[80%]">{t('navigation.dashboard.ContactsSharing')}</Text>
                  )}
                  right={ListItemArrow}
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

      <View tw="bottom-0 right-0 w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
        <DeleteAccountAction />
      </View>
    </React.Fragment>
  );
}

export default withSafeArea(AccountDetails, ['bottom'], true);
