import React from 'react';
import { View } from 'react-native';
import { type NavigationProp } from '@react-navigation/native';
import { Portal, TextInput } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { RNModal } from '#ui/primitives/RNModal';

import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import InAppNotifications from '#common/InAppNotifications';
import reportCrash from '#ui/lib/reportCrash';

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

  useAppEventListener<[boolean]>(APP_EVENTS.DISPATCH_CU_FORM_MODAL, setModalVisibility);

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
      const farmer = await ColdtivateService.getFarmerByUserCode(values.code);

      if (!farmer) {
        toast.show(t('Dashboard.Management.CoolingUsers.toasts.notFound'), { type: 'md_danger' });
        return;
      }

      if (coolingUsersIds.includes(farmer.id)) {
        toast.show(t('Dashboard.Management.CoolingUsers.toasts.taken'), { type: 'md_danger' });
        return;
      }

      onClose();
      navigation.navigate('AddCoolingUser', {
        farmer,
      });
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }

  return (
    <Portal>
      <RNModal visible={isVisible} onDismiss={onClose}>
        <View tw="w-full bg-white rounded-3xl w-2/3 max-w-2/3 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.CoolingUsers.modals.userCode')}
          </Text>
          <Text tw="px-6">{t('Dashboard.Management.CoolingUsers.modals.userCodeDesc')}</Text>
          <View tw="w-full pt-1.5 pb-3">
            <Controller
              name="code"
              control={form.control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  tw="bg-transparent mx-6"
                  placeholder="AS23F4AD"
                  mode="flat"
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
      </RNModal>
    </Portal>
  );
}
