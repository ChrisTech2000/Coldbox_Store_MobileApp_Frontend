import React from 'react';
import { View } from 'react-native';
import { type NavigationProp } from '@react-navigation/native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';

type FormValues = {
  code: string;
};

const DEFAULT_VALUES = {
  code: '',
} satisfies FormValues;

type Props = {
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>;
};

export default function FormModal(props: Props) {
  const { navigation } = props;

  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t, zodResolver } = useTranslationUtils();

  useAppEventListener<[boolean]>('DISPATCH_CU_FORM_MODAL', setModalVisibility);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver((z) =>
      z.object({
        code: z.string().min(1),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  function onClose() {
    toggleVisibility();
    form.reset(DEFAULT_VALUES);
  }

  function onSubmit(values: FormValues) {
    console.log(values);
    toggleVisibility();
    navigation.navigate('AddCoolingUser');
  }

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onClose}>
        <View tw="w-full bg-white rounded-3xl w-2/3 max-w-2/3 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            Enter an user code
          </Text>
          <Text tw="px-6">
            You can find the code in your account-details if you registered as a cooling user.
          </Text>
          <View tw="w-full pt-1.5 pb-3">
            <Controller
              name="code"
              control={form.control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  tw="bg-transparent mx-6"
                  placeholder="AS23F4AD"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!form.formState.errors.code}
                />
              )}
            />
          </View>
          <View tw="flex-row self-end px-6">
            <Button mode="text" onPress={onClose}>
              {t('actions.cancel')}
            </Button>
            <Button mode="text" onPress={form.handleSubmit(onSubmit)}>
              {t('actions.import')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
