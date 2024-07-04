import React from 'react';
import { View, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

function EditLocation(props: ManagementRouteProps<'EditLocation'>) {
  const { locationId, companyId } = props.route.params;

  const { data, isLoading } = useApiCall(
    'getLocation',
    ColdtivateService.getLocation,
    { locationId, companyId },
    {
      skip: !locationId || !companyId,
      defaultData: null,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating={true} color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}

export default withSafeArea(EditLocation);
