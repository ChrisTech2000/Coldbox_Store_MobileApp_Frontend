import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import useApiCall from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { user } = useAuthStore();

  const { data } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: 143, // TODO: fetch user's cooling units
      farmerId: user?.id as number,
    },
    {
      skip: !user?.id,
    }
  );

  console.log(data);
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Dashboard Main Screen</Text>

      <Button
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('ProduceDetails');
        }}
      >
        Go to Produce Details
      </Button>
    </View>
  );
}

export default withSafeArea(DashboardMain);
