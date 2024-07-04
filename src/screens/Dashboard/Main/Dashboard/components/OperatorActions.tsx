import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Icon, Portal, TextInput } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import CratesManagement from '#assets/icons/crates-management.svg';

import { useTranslationUtils } from '#i18n/utils';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import type { GetFarmerResponse } from '#types/api.responses';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

type ManagementMode = 'check-in' | 'check-out';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function OperatorActions({ navigation }: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { t } = useTranslationUtils();
  const { user } = useAuthStore();

  const [isCrateManagementOpen, setIsCrateManagementOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [managementMode, setManagementMode] = useState<ManagementMode | undefined>();
  const [selectedUser, setSelectedUser] = useState<GetFarmerResponse | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data } = useApiCall(
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

  const navigateToCheckOut = useCallback((selectedUser?: GetFarmerResponse) => {
    navigation.navigate('CheckOutStack', {
      screen: 'CrateSelection',
      params: { user: selectedUser },
    });
  }, []);

  // TODO: fix
  const navigateToCheckIn = (selectedUser?: GetFarmerResponse) => {
    console.log(selectedUser);
  };

  const navigate = managementMode === 'check-in' ? navigateToCheckIn : navigateToCheckOut;

  const onNavigate = useCallback(() => {
    navigate(selectedUser);
    setIsModalOpen(false);
    setSearch('');
    setSelectedUser(undefined);
  }, [selectedUser]);

  return (
    <View tw="absolute right-4 bottom-2 flex flex-row-reverse items-center">
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        <TouchableOpacity
          tw={cn(
            'w-12 h-12 items-center justify-center rounded-3xl',
            isCrateManagementOpen ? 'bg-red-500' : 'bg-green-primary'
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
              tw="w-10 h-10 mx-1 items-center justify-center rounded-3xl bg-green-100"
              onPress={onCheckIn}
            >
              <CheckIn width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
          <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
            <TouchableOpacity
              tw="w-10 h-10 mx-1 items-center justify-center rounded-3xl bg-orange-100"
              onPress={onCheckOut}
            >
              <CheckOut width={20} height={20} />
            </TouchableOpacity>
          </SkiaShadow>
        </View>
      )}

      <Portal>
        <Modal tw="w-2/3" visible={isModalOpen} onDismiss={onModalClose}>
          <View tw="w-full items-center mx-16 px-3 bg-white rounded-sm py-1 max-h-80">
            <Text
              variant="TitleMedium"
              tw="my-2"
            >{`${t('Dashboard.CrateManagement.userModalTitle')}:`}</Text>
            <Input
              tw="border bg-white border-gray-700 rounded-sm mt-2 mb-3 h-11 w-full"
              label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
              onChangeText={(value) => setSearch(value)}
              value={search}
              left={<TextInput.Icon icon="magnify" />}
            />
            <ScrollView tw="w-full">
              <FlashList
                data={filteredUsers}
                extraData={selectedUser}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedUser(item)}
                    tw={cn(
                      'my-1 border-b border-gray-300 p-1',
                      (selectedUser as GetFarmerResponse)?.id === item.id
                        ? 'border-2 border-green-primary'
                        : ''
                    )}
                  >
                    <Text
                      variant="TextMedium"
                      tw="text-base"
                    >{`${item.user.firstName} ${item.user.lastName}`}</Text>
                  </TouchableOpacity>
                )}
                estimatedItemSize={20}
                estimatedListSize={{
                  height: deviceHeight,
                  width: deviceWidth / 2,
                }}
              />
              {(!search || noPhoneUser?.user.firstName.includes(search)) && (
                <TouchableOpacity
                  onPress={() => setSelectedUser(noPhoneUser)}
                  tw={cn(
                    'my-1 border-b border-gray-300 p-1',
                    selectedUser?.id === noPhoneUser?.id ? 'border-2 border-green-primary' : ''
                  )}
                >
                  <Text variant="TextMedium" tw="text-base">
                    {noPhoneUser?.user.firstName}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            <Button
              tw="w-[85%] my-4"
              mode="contained"
              uppercase
              onPress={onNavigate}
              icon="check-circle-outline"
              disabled={!selectedUser}
              contentStyle="flex flex-row-reverse items-center"
            >
              {t('actions.confirm')}
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
