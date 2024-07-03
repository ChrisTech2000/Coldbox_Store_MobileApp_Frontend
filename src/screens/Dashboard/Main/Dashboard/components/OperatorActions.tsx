import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';
import CratesManagement from '#assets/icons/crates-management.svg';
import { cn } from '#ui/lib/cn';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

type ManagementMode = 'check-in' | 'check-out';

export function OperatorActions() {
  const [isCrateManagementOpen, setIsCrateManagementOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [managementMode, setManagementMode] = useState<ManagementMode | undefined>();

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
          <View tw="w-full items-center mx-16 bg-white rounded-sm py-1 max-h-80">
            <Text tw="text-lg font-bold mb-1 mt-2">{managementMode}</Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
