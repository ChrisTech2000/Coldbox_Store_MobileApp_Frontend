import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

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

  const disabledCoolingUnits = isLoading || !data.length;
  const coolingUnitsColor = disabledCoolingUnits ? colors.gray[400] : colors.gray[800];

  return (
    <View tw="flex-1 justify-start">
      <RBAC.ProtectedResource action="NAVIGATE" subject="CoolingUsers">
        <List.Item
          title={t('navigation.management.CoolingUsers')}
          onPress={() => {
            navigation.navigate('CoolingUsers');
          }}
          left={(props) => <List.Icon {...props} icon="account-multiple-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="CompanyDetails">
        <List.Item
          title={t('navigation.management.CompanyDetails')}
          onPress={() => navigation.navigate('CompanyDetails')}
          left={(props) => <List.Icon {...props} icon="information-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="Locations">
        <List.Item
          title={t('navigation.management.Locations')}
          onPress={() => {
            navigation.navigate('Locations');
          }}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="CoolingUnits">
        <List.Item
          title={t('navigation.management.CoolingUnits')}
          description={
            disabledCoolingUnits ? t('navigation.management.DisabledCoolingUnitsDescription') : ''
          }
          disabled={disabledCoolingUnits}
          onPress={() => {
            navigation.navigate('CoolingUnits');
          }}
          left={(props) => (
            <List.Icon {...props} icon="coolant-temperature" color={coolingUnitsColor} />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={coolingUnitsColor} />}
          titleStyle={{ color: coolingUnitsColor }}
          descriptionStyle={{ color: coolingUnitsColor }}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="Operators">
        <List.Item
          title={t('navigation.management.Operators')}
          onPress={() => {
            navigation.navigate('Operators');
          }}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="RegisteredEmployees">
        <List.Item
          title={t('navigation.management.RegisteredEmployee')}
          onPress={() => {
            navigation.navigate('RegisteredEmployee');
          }}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="RevenueAnalysis">
        <List.Item
          title={t('navigation.management.RevenueAnalysis')}
          onPress={() => {
            navigation.navigate('RevenueAnalysis');
          }}
          left={(props) => <List.Icon {...props} icon="cash-multiple" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="NAVIGATE" subject="UsageAnalysis">
        <List.Item
          title={t('navigation.management.UsageAnalysis')}
          onPress={() => {
            navigation.navigate('UsageAnalysis');
          }}
          left={(props) => <List.Icon {...props} icon="archive-arrow-up-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
      </RBAC.ProtectedResource>
    </View>
  );
}

export default withSafeArea(ManagementMain, ['bottom'], true);
