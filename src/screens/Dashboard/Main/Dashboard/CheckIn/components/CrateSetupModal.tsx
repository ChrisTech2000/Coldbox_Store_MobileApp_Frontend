import { FlashList } from '@shopify/flash-list';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Divider, Icon, Portal, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { ModalMode, SetupSchema } from '../CrateSetup';

type CrateModalProps = {
  crates: SetupSchema['crates'];
  isOpen: boolean;
  mode: ModalMode;
  numberOfCrates: number;
  setValue: (crates: SetupSchema['crates']) => void;
  title: string;
  closeModal: () => void;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function CrateSetupModal({
  crates,
  isOpen,
  mode,
  title,
  closeModal,
  setValue,
}: CrateModalProps) {
  const { t } = useTranslationUtils();

  const [initialId, setInitialId] = useState<number | undefined>(undefined);
  const [modalCrates, setModalCrates] = useState<SetupSchema['crates']>(crates);

  const weightMode = useMemo(() => mode === 'weight', [mode]);

  const onChangeNumericKeyboard = useCallback(
    (newVal: string | number, index: number) => {
      const value = Number(newVal);

      if (!isNaN(value)) {
        const crates = cloneDeep(modalCrates);
        crates[index][weightMode ? 'crateWeight' : 'crateId'] = value;
        setModalCrates(crates);
      }
    },
    [modalCrates, weightMode]
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
      <Modal tw="w-[85%] pb-32" visible={isOpen} onDismiss={dismissModal}>
        <View tw="w-full mx-8 items-center bg-white rounded-sm py-1 max-h-90">
          <Text tw="text-lg font-bold mb-1 mt-2">{title}</Text>
          <Divider tw="w-full bg-gray-400 my-2" />

          <ScrollView tw="w-full">
            <FlashList
              data={modalCrates}
              extraData={crates}
              renderItem={({ index }) => (
                <View
                  key={`crate-${mode}-${index}`}
                  tw="w-full flex flex-row items-center px-2 my-1"
                >
                  <View tw="flex flex-row items-center space-x-1">
                    {weightMode && <Icon source="basket" size={15} />}
                    <Text tw="mr-4 ml-1">
                      {t('Dashboard.CrateManagement.CheckIn.Setup.modals.crateLabel')} {index + 1}
                    </Text>
                  </View>

                  <View tw="flex flex-row items-center justify-between">
                    <Input
                      tw={cn('bg-white border rounded-sm h-10', !weightMode && 'w-[80%]')}
                      onChangeText={(newVal) => onChangeNumericKeyboard(newVal, index)}
                      value={modalCrates[index][weightMode ? 'crateWeight' : 'crateId']?.toString()}
                      keyboardType="numeric"
                      right={
                        weightMode && (
                          <TextInput.Icon
                            icon={() => (
                              <Text variant="TextMedium" tw="text-green-primary">
                                {t('Dashboard.ProduceDetails.kilogram')}
                              </Text>
                            )}
                          />
                        )
                      }
                    />

                    {weightMode && (
                      <View tw="flex flex-row items-center">
                        <Button
                          labelStyle="text-xl"
                          tw="w-8 mx-2"
                          onPress={() =>
                            onChangeNumericKeyboard(
                              Number(
                                modalCrates[index][weightMode ? 'crateWeight' : 'crateId'] ?? 0
                              ) + 1,
                              index
                            )
                          }
                        >
                          +
                        </Button>
                        <Button
                          labelStyle="text-xl"
                          tw="w-8 mx-2"
                          onPress={() =>
                            onChangeNumericKeyboard(
                              !modalCrates[index][weightMode ? 'crateWeight' : 'crateId']
                                ? 0
                                : Number(
                                    modalCrates[index][weightMode ? 'crateWeight' : 'crateId']
                                  ) - 1,
                              index
                            )
                          }
                        >
                          -
                        </Button>
                      </View>
                    )}
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

          {!weightMode && (
            <View tw="w-full px-3 mt-4 mb-2">
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
          )}

          <Button
            mode="contained"
            tw="my-3"
            uppercase
            contentStyle="flex flex-row-reverse items-center"
            icon="check-circle-outline"
            onPress={saveChanges}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
