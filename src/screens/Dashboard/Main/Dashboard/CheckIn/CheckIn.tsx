import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import colors from 'tailwindcss/colors';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useCheckInStore } from '#stores/checkIn';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit } = route.params;

  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { refreshDashboard } = useDashboardStore();
  const { produces, removeProduce, setCoolingUnit, setUser, resetCheckInStore } = useCheckInStore();

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const toast = useToast();

  const total = useMemo(() => {
    const dailyPricePerCrate = coolingUnit.commonPricingType.value;
    const allCrates = produces.flatMap((produce) => produce.crates);

    return allCrates
      .reduce((acc, current) => {
        acc += (current.plannedDays ?? 1) * dailyPricePerCrate;
        return acc;
      }, 0)
      .toFixed(2);
  }, [produces.length, coolingUnit]);

  const onSubmit = useCallback(async () => {
    const result = await ColdtivateService.checkIn({
      farmerId: user.id,
      id: undefined,
      produces: produces.map((produce) => ({
        ...produce,
        crop: {
          id: produce.crop.id,
        },
      })),
    });

    if (result) {
      resetCheckInStore();
      toast.show(t('Dashboard.CrateManagement.CheckIn.successMessage'), {
        type: 'success',
      });

      setTimeout(() => refreshDashboard?.(), 1000);
      rootNavigation.navigate('RootMainTabStack');
    }
  }, [user, produces]);

  useEffect(() => {
    if (coolingUnit) setCoolingUnit(coolingUnit);
    if (user) setUser(user);
  }, [coolingUnit, user]);

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
        <FlatList
          data={produces}
          keyExtractor={(item, itemIdx) => `crate-${item.crop.id}-#${itemIdx}`}
          renderItem={({ item, index }) => (
            <View>
              <View tw="flex flex-row items-center justify-between">
                <View tw="flex flex-row items-center space-x-2">
                  <FastImage
                    tw="w-20 h-20 my-1"
                    source={{
                      uri: `${API_BASE_URL}media/${item.crop.image}`,
                      priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text variant="TitleMedium">
                    {item.crop.name} — {item.crates.length}
                  </Text>
                </View>
                <View tw="flex flex-row items-center space-x-2">
                  {coolingUnit && (
                    <Text variant="TextMedium">
                      {company?.currency}{' '}
                      {(coolingUnit.commonPricingType.value * item.crates.length).toFixed(2)} /{' '}
                      {t('Dashboard.CrateManagement.CheckIn.day')}
                    </Text>
                  )}
                  <TouchableHighlight onPress={() => removeProduce(item)}>
                    <Icon source="trash-can-outline" size={30} color={colors.red[500]} />
                  </TouchableHighlight>
                </View>
              </View>
              <Divider tw="w-full bg-grey-400" />
            </View>
          )}
          nestedScrollEnabled
        />
      </ScrollView>

      <View tw="space-y-2">
        <Button
          tw="w-full border-2 border-green-primary"
          mode="outlined"
          onPress={() => navigation.navigate('SelectCropType')}
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
            {`${company?.currency} ${total}`}
          </Text>
        </View>
        <View tw="w-full flex flex-row items-center justify-center space-x-1">
          <Button
            tw="w-1/2 border-2 border-red-400"
            mode="outlined"
            onPress={() => rootNavigation.navigate('RootMainTabStack')}
            icon="close-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            labelStyle="text-red-400"
          >
            {t('actions.cancel')}
          </Button>
          <Button
            tw="w-1/2 border-2 border-green-primary"
            mode="contained"
            onPress={onSubmit}
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
