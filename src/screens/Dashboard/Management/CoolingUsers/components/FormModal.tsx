import React from 'react';
import { type NavigationProp } from '@react-navigation/native';
import { Dialog, Portal, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import InAppNotifications from '#common/InAppNotifications';

type FormValues = {
  code: string;
};

const DEFAULT_VALUES = {
  code: '',
} satisfies FormValues;

type Props = {
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>;
  coolingUsersIds: Array<number>;
};

export default function FormModal(props: Props) {
  const { navigation, coolingUsersIds } = props;

  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

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

  async function onSubmit(values: FormValues) {
    try {
      const result = await ColdtivateService.getFarmerByUserCode(values.code);
      const coolingUser = result?.at(0);

      if (!coolingUser) {
        toast.show(t('Dashboard.Management.CoolingUsers.toasts.notFound'), { type: 'md_danger' });
        return;
      }

      if (coolingUsersIds.includes(coolingUser.id)) {
        toast.show(t('Dashboard.Management.CoolingUsers.toasts.taken'), { type: 'md_danger' });
        return;
      }

      onClose();
      navigation.navigate('AddCoolingUser', {
        userId: coolingUser.user.id,
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onClose} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.Management.CoolingUsers.modals.userCode')}</Dialog.Title>
        <Dialog.Content>
          <Text tw="text-base">{t('Dashboard.Management.CoolingUsers.modals.userCodeDesc')}</Text>
          <Controller
            name="code"
            control={form.control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                tw="bg-transparent"
                placeholder="AS23F4AD"
                mode="flat"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!form.formState.errors.code}
              />
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>{t('actions.cancel')}</Button>
          <Button onPress={form.handleSubmit(onSubmit)}>{t('actions.import')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
