import { FlashList } from '@shopify/flash-list';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Divider, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { RNModal } from '#ui/primitives/RNModal';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import type { SetupSchema } from '../CrateSetup';

type CrateModalProps = {
  crates: SetupSchema['crates'];
  isOpen: boolean;
  numberOfCrates: number;
  setValue: (crates: SetupSchema['crates']) => void;
  title: string;
  closeModal: () => void;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function CrateSetupModal({ crates, isOpen, title, closeModal, setValue }: CrateModalProps) {
  const { t } = useTranslationUtils();

  const [initialId, setInitialId] = useState<number | undefined>(undefined);
  const [modalCrates, setModalCrates] = useState<SetupSchema['crates']>(crates);

  const onChangeNumericKeyboard = useCallback(
    (newVal: string | number, index: number) => {
      const value = Number(newVal);

      if (!isNaN(value)) {
        const crates = cloneDeep(modalCrates);
        crates[index].crateId = value;
        setModalCrates(crates);
      }
    },
    [modalCrates]
  );

  const onChangeInitialVal = useCallback((newVal: string) => {
    const value = Number(newVal);

    if (!value) return setInitialId(undefined);
    if (!isNaN(Number(value))) setInitialId(Number(newVal));
  }, []);

  const onSerialize = useCallback(() => {
    if (!initialId) return;

    let id = initialId;
    const newCrates = cloneDeep(modalCrates).map((crate) => {
      crate.crateId = id;
      id++;
      return crate;
    });

    setModalCrates(newCrates);
  }, [initialId, crates]);

  const saveChanges = useCallback(() => {
    setValue(modalCrates);
    closeModal();
  }, [modalCrates]);

  const dismissModal = useCallback(() => {
    setModalCrates(crates);
    setInitialId(undefined);
    closeModal();
  }, [crates]);

  useEffect(() => {
    setModalCrates(crates);
  }, [crates]);

  return (
    <Portal>
      <RNModal visible={isOpen} onDismiss={dismissModal}>
        <View tw="w-full bg-white rounded-3xl w-11/12 max-w-11/12 h-auto py-4 self-center space-y-2">
          <Text tw="text-lg px-6 py-2">{title}</Text>
          <Divider tw="bg-zinc-400 w-full" />

          <ScrollView tw="w-full max-h-56 px-4" showsVerticalScrollIndicator>
            <FlashList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={modalCrates}
              extraData={crates}
              renderItem={({ index }) => (
                <View
                  key={`crate-#${index}`}
                  tw="w-full flex flex-row items-center justify-between px-2 my-1"
                >
                  <View tw="flex flex-row items-center space-x-1">
                    <Text tw="mr-4 ml-1 w-14">
                      {t('Dashboard.CrateManagement.CheckIn.Setup.modals.crateLabel')} {index + 1}
                    </Text>
                  </View>

                  <View tw="flex flex-row items-center justify-between">
                    <Input
                      tw="bg-white border rounded-sm h-10 w-[80%]"
                      onChangeText={(newVal) => onChangeNumericKeyboard(newVal, index)}
                      value={modalCrates[index].crateId?.toString()}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              )}
              estimatedItemSize={40}
              estimatedListSize={{
                height: deviceHeight,
                width: deviceWidth / 2,
              }}
            />
          </ScrollView>

          <View tw="w-full px-6 mb-1.5 space-y-1.5">
            <Text variant="TextMedium" tw="text-base my-1">
              {t('Dashboard.CrateManagement.CheckIn.Setup.modals.selectInitialId')}
            </Text>
            <View tw="flex flex-row justify-between">
              <Input
                tw="bg-white border rounded-sm h-10 w-[50%]"
                onChangeText={onChangeInitialVal}
                value={initialId?.toString() ?? ''}
                keyboardType="numeric"
              />
              <Button mode="text" uppercase labelStyle="text-base" onPress={onSerialize}>
                {t('Dashboard.CrateManagement.CheckIn.Setup.modals.serialize')}
              </Button>
            </View>
          </View>

          <View tw="px-6">
            <Button
              mode="contained"
              uppercase
              contentStyle="flex flex-row-reverse items-center"
              icon="check-circle-outline"
              onPress={saveChanges}
            >
              {t('actions.save-changes')}
            </Button>
          </View>
        </View>
      </RNModal>
    </Portal>
  );
}
