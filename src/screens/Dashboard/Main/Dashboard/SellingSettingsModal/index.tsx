import React, { type PropsWithChildren, type LegacyRef } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { IconButton, Portal } from 'react-native-paper';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Modalize, type ModalizeProps } from 'react-native-modalize';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import type { Crate } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';

import CrateSelectionStep from './CrateSelectionStep';
import CrateSettingsStep from './CrateSettingsStep';

const modalHeight = Dimensions.get('window').height;
const width = (Dimensions.get('screen').width - 42) / 2;

function _PlatformSpecificHeader(props: {
  movementCode: string;
  closeFunc: ModalizeProps['onClose'];
}) {
  const { getValues, setValue } = useFormContext<SellingSettingsFormValues>();

  switch (Platform.OS) {
    case 'android': {
      return (
        <View tw="flex-row items-center space-x-1">
          <IconButton
            icon="arrow-left"
            size={25}
            onPress={(evt) => {
              evt.stopPropagation();
              switch (getValues('_step')) {
                case 'settings':
                  return setValue('_step', 'selection');
                case 'selection':
                default:
                  return props.closeFunc?.();
              }
            }}
          />
          <Text tw="text-xl">Set to sell {props.movementCode}</Text>
        </View>
      );
    }
    case 'ios': {
      return (
        <React.Fragment>
          <IconButton
            icon="arrow-left"
            size={25}
            onPress={(evt) => {
              evt.stopPropagation();
              props.closeFunc?.();
            }}
          />
          <Text tw="text-lg">Set to sell {props.movementCode}</Text>
        </React.Fragment>
      );
    }
    default:
      return null;
  }
}

export type SellingSettingsFormValues = {
  _step: 'selection' | 'settings';
  selectedCrates: Array<number>;
};

export function Root(props: PropsWithChildren) {
  const { zodResolver } = useTranslationUtils();

  const form = useForm<SellingSettingsFormValues>({
    defaultValues: {
      _step: 'selection',
      selectedCrates: [],
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        _step: z.union([z.literal('selection'), z.literal('settings')]),
        selectedCrates: z.array(z.number()),
      })
    ),
  });

  return (
    <Portal>
      <FormProvider {...form}>{props.children}</FormProvider>
    </Portal>
  );
}

export function Modal(
  props: PropsWithChildren<{
    modalRef: LegacyRef<Modalize>;
    closeFunc: ModalizeProps['onClose'];
    movementCode: string;
  }>
) {
  const { modalRef, movementCode, closeFunc } = props;

  return (
    <Modalize
      ref={modalRef}
      modalHeight={modalHeight}
      withHandle={false}
      modalStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      HeaderComponent={
        <View tw="flex flex-row items-center justify-between p-2 border-b border-solid border-zinc-400">
          <_PlatformSpecificHeader movementCode={movementCode} closeFunc={closeFunc} />
          <IconButton icon="close" size={25} onPress={closeFunc} />
        </View>
      }
    >
      <View tw="p-3">{props.children}</View>
    </Modalize>
  );
}

export function ModalContent(props: {
  crates: Array<Crate>;
  shelfLife: number;
  closeFunc: ModalizeProps['onClose'];
  cropName: string;
  combinedWeight: number;
}) {
  const { watch, setValue } = useFormContext<SellingSettingsFormValues>();
  const { t } = useTranslationUtils();

  switch (watch('_step')) {
    case 'settings':
      return (
        <CrateSettingsStep
          cropName={props.cropName}
          combinedWeight={props.combinedWeight}
          amountOfCrates={props.crates.length}
        >
          <View tw="flex flex-row w-full mt-4 justify-evenly">
            <Button
              mode="outlined"
              style={{ width }}
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                setValue('_step', 'selection');
              }}
            >
              {t('actions.back')}
            </Button>
            <Button
              mode="contained"
              style={{ width }}
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                // TODO
              }}
            >
              {t('actions.confirm')}
            </Button>
          </View>
        </CrateSettingsStep>
      );
    case 'selection':
    default:
      return (
        <CrateSelectionStep crates={props.crates} shelfLife={props.shelfLife}>
          <View tw="flex flex-row w-full mt-4 justify-evenly">
            <Button
              mode="outlined"
              style={{ width }}
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                props.closeFunc?.();
              }}
            >
              {t('actions.back')}
            </Button>
            <Button
              mode="contained"
              style={{ width }}
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                setValue('_step', 'settings');
              }}
              disabled={watch('selectedCrates').length === 0}
            >
              {t('actions.next')}
            </Button>
          </View>
        </CrateSelectionStep>
      );
  }
}
