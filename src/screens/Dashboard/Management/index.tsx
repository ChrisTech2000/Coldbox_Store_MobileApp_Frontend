import React from 'react';
import { ScrollView, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

import { LocationsOverlay } from '../Tutorial/LocationsOverlay';
import { ManagementCoolingUnitsOverlay } from '../Tutorial/ManagementCoolingUnitsOverlay';
import { ManagementEmployeesOperatorsOverlay } from '../Tutorial/ManagementEmployeesOperatorsOverlay';
import { ManagementOverlay } from '../Tutorial/ManagementOverlay';
import { EEmployeeTutorialSteps, EOperatorTutorialSteps } from '../Tutorial/utils/constants';

function ManagementMain(props: ManagementRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();
  const colors = useTailwindColors();

  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  useWalkthroughStep({
    number: EOperatorTutorialSteps.GO_TO_COOLING_USERS_STEP,
    OverlayComponent: ManagementOverlay,
    maskAllowInteraction: true,
    fullScreen: true,
    onPressMask: () => props.navigation.navigate('CoolingUsers'),
  });

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.LOCATIONS_STEP,
    OverlayComponent: LocationsOverlay,
    maskAllowInteraction: true,
    fullScreen: true,
    onPressMask: () => props.navigation.navigate('AddLocation'),
  });

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.COOLING_UNITS_STEP,
    OverlayComponent: ManagementCoolingUnitsOverlay,
    maskAllowInteraction: true,
    fullScreen: true,
    onPressMask: () => navigation.navigate('AddCoolingUnit'),
  });

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.ADD_EMPLOYEES_OPERATORS_STEP,
    OverlayComponent: ManagementEmployeesOperatorsOverlay,
    maskAllowInteraction: true,
    fullScreen: true,
    onPressMask: () => props.navigation.goBack(),
  });

  const disabledCoolingUnits = isLoading || !data.length;
  const coolingUnitsColor = disabledCoolingUnits ? colors.gray[400] : colors.gray[800];

  return (
    <ScrollView tw="p-4" showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <Text tw="text-base text-green-primary font-bold">
          {t('Dashboard.AccountDetails.sections.details')}
        </Text>

        <RBAC.ProtectedResource action="NAVIGATE" subject="CoolingUsers">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base w-[80%]">{t('navigation.management.CoolingUsers')}</Text>
            )}
            onPress={() => navigation.navigate('CoolingUsers')}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="CompanyDetails">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base w-[80%]">{t('navigation.management.CompanyDetails')}</Text>
            )}
            onPress={() => navigation.navigate('CompanyDetails')}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="Locations">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => <Text tw="text-base w-[80%]">{t('navigation.management.Locations')}</Text>}
            onPress={() => {
              navigation.navigate('Locations');
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="CoolingUnits">
          <List.Item
            tw="px-0 py-2"
            title={disabledCoolingUnits ? t('navigation.management.CoolingUnits') : undefined}
            description={
              disabledCoolingUnits ? t('navigation.management.DisabledCoolingUnitsDescription') : ''
            }
            disabled={disabledCoolingUnits}
            onPress={() => {
              navigation.navigate('CoolingUnits');
            }}
            left={() =>
              disabledCoolingUnits ? null : (
                <Text tw="text-base w-[80%]">{t('navigation.management.CoolingUnits')}</Text>
              )
            }
            right={(props) => (
              <List.Icon {...props} icon="chevron-right" color={coolingUnitsColor} />
            )}
            titleStyle={{ color: coolingUnitsColor }}
            descriptionStyle={{ color: coolingUnitsColor }}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="Operators">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => <Text tw="text-base w-[80%]">{t('navigation.management.Operators')}</Text>}
            onPress={() => {
              navigation.navigate('Operators');
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="RegisteredEmployees">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base w-[80%]">{t('navigation.management.RegisteredEmployee')}</Text>
            )}
            onPress={() => {
              navigation.navigate('RegisteredEmployee');
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="RevenueAnalysis">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base w-[80%]">{t('navigation.management.RevenueAnalysis')}</Text>
            )}
            onPress={() => {
              navigation.navigate('RevenueAnalysis');
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>

        <RBAC.ProtectedResource action="NAVIGATE" subject="UsageAnalysis">
          <List.Item
            tw="px-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base w-[80%]">{t('navigation.management.UsageAnalysis')}</Text>
            )}
            onPress={() => {
              navigation.navigate('UsageAnalysis');
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </RBAC.ProtectedResource>
      </View>

      <RBAC.ProtectedResource action="VIEW" subject="CompanySellerSettings">
        <View tw="space-y-3 mt-6">
          <Text tw="text-base text-green-primary font-bold">
            {t('Dashboard.AccountDetails.sections.companySellerSettings')}
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
                  props.navigation.navigate('PayoutSettings', { isCompanyView: true });
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

          <RBAC.ProtectedResource action="NAVIGATE" subject="DeliveryContacts">
            <List.Item
              tw="px-0 py-2"
              title={undefined}
              left={() => (
                <Text tw="text-base w-[80%]">{t('navigation.management.DeliveryContacts')}</Text>
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate('DeliveryContacts');
              }}
            />
            <Divider tw="bg-gray-400" />
          </RBAC.ProtectedResource>
        </View>
      </RBAC.ProtectedResource>
    </ScrollView>
  );
}

export default withSafeArea(ManagementMain, ['bottom'], true);
