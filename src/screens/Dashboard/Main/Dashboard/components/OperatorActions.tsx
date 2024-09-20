import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon, Portal, TextInput } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import CratesManagement from '#assets/icons/crates-management.svg';

import { useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';

import type { CoolingUnit, Farmer } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

type ManagementMode = 'check-in' | 'check-out';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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

  const { data, isLoading } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    {
      operator: user?.id as number,
    },
    {
      skip: !isModalOpen || !user?.id,
      defaultData: [],
    }
  );

  const noPhoneUser = useMemo(
    () => data?.find(({ user }) => user.firstName === 'User without a phone'),
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

  const combinedUsers = [
    ...filteredUsers,
    ...(!isLoading && (!search || noPhoneUser?.user.firstName.includes(search))
      ? [noPhoneUser]
      : []),
  ];

  return (
    <View tw="absolute right-4 bottom-2 flex flex-row-reverse items-center">
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        <TouchableOpacity
          tw={cn(
            'w-12 h-12 items-center justify-center rounded-xl',
            isCrateManagementOpen ? 'bg-red-600' : 'bg-green-primary'
          )}
          onPress={() => setIsCrateManagementOpen(!isCrateManagementOpen)}
        >
          {isCrateManagementOpen ? (
            <Icon source="close" size={25} color="white" />
          ) : (
            <CratesManagement width={30} height={30} />
          )}
        </TouchableOpacity>
      </SkiaShadow>
      {isCrateManagementOpen && (
        <View tw="flex flex-row">
          <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
            <TouchableOpacity
              tw="w-10 h-10 mx-1 items-center justify-center rounded-xl bg-green-primary"
              onPress={onCheckIn}
            >
              <CheckIn width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
          <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
            <TouchableOpacity
              tw="w-10 h-10 mx-1 items-center justify-center rounded-xl bg-red-400"
              onPress={onCheckOut}
            >
              <CheckOut width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
        </View>
      )}

      <Portal>
        <Modal visible={isModalOpen} onDismiss={onModalClose}>
          <View tw="bg-white rounded-3xl h-auto space-y-2 items-center mx-16 px-3 py-1">
            <Text variant="TitleMedium" tw="my-2">
              {`${t('Dashboard.CrateManagement.userModalTitle')}:`}
            </Text>
            <Input
              tw="border bg-white border-gray-700 rounded-sm mt-2 mb-3 h-11 w-full"
              label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
              onChangeText={(value) => setSearch(value)}
              value={search}
              left={<TextInput.Icon icon="magnify" />}
              disabled={isLoading}
            />
            <ScrollView tw="w-full" showsVerticalScrollIndicator={false}>
              {isLoading ? (
                <View tw="w-full flex-1 items-center justify-center">
                  <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
                </View>
              ) : (
                <FlashList
                  showsVerticalScrollIndicator={false}
                  data={combinedUsers}
                  extraData={selectedUser}
                  keyExtractor={(item) => item?.id?.toString() ?? ''}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedUser(item)}
                      tw={cn(
                        'my-1 border-b border-gray-300 p-1',
                        (selectedUser as Farmer)?.id === item?.id
                          ? 'border-2 border-green-primary'
                          : ''
                      )}
                    >
                      <Text variant="TextMedium" tw="text-base">
                        {`${item?.user.firstName} ${item?.user.lastName}`}
                      </Text>
                    </TouchableOpacity>
                  )}
                  estimatedItemSize={20}
                  estimatedListSize={{
                    height: deviceHeight,
                    width: deviceWidth / 2,
                  }}
                />
              )}
            </ScrollView>

            <Button
              tw="w-[85%] mt-4 mb-1"
              mode="contained"
              uppercase
              onPress={onNavigate}
              icon="check-circle-outline"
              disabled={!selectedUser}
              contentStyle="flex flex-row-reverse items-center"
            >
              {t('actions.confirm')}
            </Button>

            {managementMode === 'check-in' && (
              <TouchableOpacity onPress={navigateToCoolingUsers} tw="mb-3">
                <Text variant="TextMedium" tw="text-base text-green-primary">
                  {t('Dashboard.CrateManagement.addUserLink')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
