import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Dialog, Icon, Portal, TextInput } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import CratesManagement from '#assets/icons/crates-management.svg';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import type { CoolingUnit, Farmer } from '#types/global';

import {
  CheckInButtonOverlay,
  OperatorActionsOverlay,
} from '#screens/Dashboard/Tutorial/CheckInOverlays';
import { OperatorActionsOverlay as CheckoutOverlay } from '#screens/Dashboard/Tutorial/CheckoutOverlays';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { BOTTOM_NAV_HEIGHT } from '#ui/primitives/withSafeArea';
import { USER_WITHOUT_PHONE } from '#constants/general';

type ManagementMode = 'check-in' | 'check-out';

const SCREEN_WIDTH = Dimensions.get('window').width;

export function OperatorActions({
  navigation,
  coolingUnit,
}: MainTabStackRouteProps<'RootMainTabStack'> & { coolingUnit: CoolingUnit | null }) {
  const { t } = useTranslationUtils();
  const { user } = useAuthStore();
  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const [isCrateManagementOpen, setIsCrateManagementOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [managementMode, setManagementMode] = useState<ManagementMode | undefined>();
  const [selectedUser, setSelectedUser] = useState<Farmer | undefined>();
  const [search, setSearch] = useState<string>('');

  const isRTL = LanguageManager.isRTL;

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.INITIATE_CHECK_IN_STEP_1,
    OverlayComponent: OperatorActionsOverlay,
    onPressMask: () => setIsCrateManagementOpen(true),
    layoutAdjustments: {
      x: isRTL ? SCREEN_WIDTH - 65 : undefined,
    },
  });

  const { onLayout: onInitiateCheckoutLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_OUT_STEP_1,
    OverlayComponent: CheckoutOverlay,
    onStart: () => setIsCrateManagementOpen(true),
    onFinish: () => setIsCrateManagementOpen(false),
    layoutAdjustments: {
      x: isRTL ? SCREEN_WIDTH - 108 : undefined,
    },
  });

  const { onLayout: onCheckInLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.INITIATE_CHECK_IN_STEP_2,
    OverlayComponent: CheckInButtonOverlay,
    layoutAdjustments: {
      x: isRTL ? SCREEN_WIDTH - 157 : undefined,
    },
  });

  const { data, isLoading } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    { operator: user?.id as number },
    {
      skip: !isModalOpen || !user?.id || !coolingUnit,
      defaultData: [],
    }
  );

  const noPhoneUser = useMemo(
    () => data?.find(({ user }) => user.firstName === USER_WITHOUT_PHONE),
    [data]
  );

  const users = useMemo(
    () => (data ?? []).filter(({ user }) => user.id !== noPhoneUser?.user.id),
    [data, noPhoneUser]
  );

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(
      ({ user }) => user.lastName.includes(search) || user.firstName.includes(search)
    );
  }, [users, search]);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
    setManagementMode(undefined);
  }, []);

  const onCheckIn = useCallback(() => {
    setManagementMode('check-in');
    setIsCrateManagementOpen(false);
    setIsModalOpen(true);
  }, []);

  const onCheckOut = useCallback(() => {
    setManagementMode('check-out');
    setIsCrateManagementOpen(false);
    setIsModalOpen(true);
  }, []);

  const navigateToCheckOut = useCallback((selectedUser?: Farmer) => {
    navigation.navigate('CheckOutStack', {
      screen: 'CrateSelection',
      params: { user: selectedUser, coolingUnit: null },
    });
  }, []);

  const navigateToCheckIn = useCallback(
    (selectedUser?: Farmer) => {
      navigation.navigate('CheckInStack', {
        screen: 'CheckIn',
        params: { user: selectedUser, coolingUnit: coolingUnit ?? undefined },
      });
    },
    [selectedUser, coolingUnit]
  );

  const navigate = managementMode === 'check-in' ? navigateToCheckIn : navigateToCheckOut;

  const onNavigate = useCallback(() => {
    navigate(selectedUser);
    setIsModalOpen(false);
    setSearch('');
    setSelectedUser(undefined);
  }, [selectedUser]);

  const navigateToCoolingUsers = useCallback(() => {
    dashboardNavigation.navigate('Management');
    setIsModalOpen(false);
    setSearch('');
    setSelectedUser(undefined);
  }, []);

  useAppEventListener(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS, () =>
    setIsCrateManagementOpen(false)
  );

  useAppEventListener(APP_EVENTS.DISPATCH_OPEN_OPERATOR_ACTIONS, () =>
    setIsCrateManagementOpen(true)
  );

  const combinedUsers = useMemo(() => {
    const shouldShowNoPhoneUser =
      !isLoading && (!search || noPhoneUser?.user.firstName.includes(search));

    const noPhoneUserArray = shouldShowNoPhoneUser ? [noPhoneUser] : [];

    return [...filteredUsers, ...noPhoneUserArray];
  }, [filteredUsers, isLoading, search, noPhoneUser]);

  return (
    <View
      style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}
      tw="absolute right-4 bottom-2 flex flex-row-reverse items-center"
    >
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        <TouchableOpacity
          tw={cn(
            'w-12 h-12 items-center justify-center rounded-xl',
            !coolingUnit ? 'bg-zinc-400' : isCrateManagementOpen ? 'bg-red-600' : 'bg-green-primary'
          )}
          onPress={(evt) => {
            evt.stopPropagation();
            setIsCrateManagementOpen((v) => !v);
          }}
          onLayout={onLayout}
          disabled={!coolingUnit}
          testID="dashboard-operator-actions"
        >
          {isCrateManagementOpen ? (
            <Icon source="close" size={25} color="white" />
          ) : (
            <CratesManagement width={30} height={30} />
          )}
        </TouchableOpacity>
      </SkiaShadow>
      {isCrateManagementOpen ? (
        <View tw="flex flex-row">
          <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
            <TouchableOpacity
              tw="w-10 h-10 mx-1 items-center justify-center rounded-xl bg-green-primary"
              onPress={onCheckIn}
              onLayout={onCheckInLayout}
              testID="dashboard-operator-actions-checkin"
            >
              <CheckIn width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
          <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
            <TouchableOpacity
              tw="w-10 h-10 mx-1 items-center justify-center rounded-xl bg-red-400"
              onPress={onCheckOut}
              onLayout={onInitiateCheckoutLayout}
              testID="dashboard-operator-actions-checkout"
            >
              <CheckOut width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
        </View>
      ) : null}

      <Portal>
        <Dialog visible={isModalOpen} onDismiss={onModalClose} style={{ backgroundColor: 'white' }}>
          <Dialog.Title>{`${t('Dashboard.CrateManagement.userModalTitle')}:`}</Dialog.Title>
          <Dialog.Content>
            <Input
              tw="border bg-white border-gray-700 rounded-sm mt-2 mb-3 h-11 w-full"
              label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
              onChangeText={(value) => setSearch(value)}
              value={search}
              left={<TextInput.Icon icon="magnify" />}
              disabled={isLoading}
            />
            <ScrollView tw="max-h-52" showsVerticalScrollIndicator>
              {isLoading ? (
                <View tw="w-full flex-1 items-center justify-center">
                  <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  data={combinedUsers}
                  extraData={selectedUser}
                  keyExtractor={(item) => item?.id?.toString() ?? ''}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedUser(item)}
                      tw={cn(
                        'border-gray-300 px-1 py-2',
                        (selectedUser as Farmer)?.id === item?.id
                          ? 'border border-green-primary'
                          : 'border-b'
                      )}
                      testID={`check-in-user-${item?.user.firstName}`}
                    >
                      <Text variant="TextMedium" tw="text-base">
                        {`${item?.user.firstName} ${item?.user.lastName}`}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </ScrollView>

            <Button
              tw="w-[85%] mt-4 mb-1 self-center"
              mode="contained"
              uppercase
              onPress={onNavigate}
              icon="check-circle-outline"
              disabled={!selectedUser}
              contentStyle="flex flex-row-reverse items-center"
            >
              {t('actions.confirm')}
            </Button>

            {managementMode === 'check-in' ? (
              <TouchableOpacity onPress={navigateToCoolingUsers} tw="mb-3">
                <Text variant="TextMedium" tw="text-base text-green-primary">
                  {t('Dashboard.CrateManagement.addUserLink')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}
