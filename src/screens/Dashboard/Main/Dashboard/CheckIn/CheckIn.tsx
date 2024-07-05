import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { useCheckInStore } from '#stores/checkIn';
import { Button } from '#ui/components/Button';
import { useManagementStore } from '#stores/management';

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit } = route.params;

  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { produces } = useCheckInStore();

  return (
    <View tw="flex-1 p-4">
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg">
          {user?.user.firstName}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUnitLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg">
          {coolingUnit?.name}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />

      <ScrollView>
        {produces.length === 0 && (
          <Text variant="TextMedium" tw="text-lg mt-3">
            {t('Dashboard.CrateManagement.CheckIn.emptyState')}
          </Text>
        )}
      </ScrollView>

      <View tw="space-y-2">
        <Button
          tw="w-full border-2 border-green-primary"
          mode="outlined"
          onPress={() => navigation.navigate('SelectCropType', { coolingUnit })}
          icon="basket"
          contentStyle="flex flex-row-reverse items-center"
        >
          {t('Dashboard.CrateManagement.CheckIn.addCrates')}
        </Button>
        <Button
          tw="w-full border-2 border-green-primary"
          mode="outlined"
          onPress={() => null}
          icon="ticket-confirmation-outline"
          contentStyle="flex flex-row-reverse items-center"
        >
          {t('Dashboard.CrateManagement.CheckIn.checkInWithCode')}
        </Button>
        <View tw="w-full flex flex-row items-center justify-between mb-2">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckIn.estimatedCost')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {`${company?.currency}0`}
          </Text>
        </View>
        <View tw="w-full flex flex-row items-center justify-center space-x-1">
          <Button
            tw="w-1/2 border-2 border-red-400"
            mode="outlined"
            onPress={() => null}
            icon="close-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            labelStyle="text-red-400"
          >
            {t('actions.cancel')}
          </Button>
          <Button
            tw="w-1/2 border-2 border-green-primary"
            mode="contained"
            onPress={() => null}
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('actions.confirm')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withSafeArea(CheckIn);
