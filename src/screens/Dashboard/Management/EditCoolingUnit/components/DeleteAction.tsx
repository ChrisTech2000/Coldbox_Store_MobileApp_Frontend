import React from 'react';
import { Dimensions, View, type GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';

import FormManager from '../../AddCoolingUnit/contexts/FormManager';
import InAppNotifications from '#common/InAppNotifications';

const width = (Dimensions.get('window').width - 42) / 2;

type Props = {
  coolingUnitId: number;
  companyId: number | undefined;
};

export default function DeleteAction(props: Props) {
  const navigation = useNavigation();
  const { mutate, cache } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const {
    formState: { isSubmitting },
  } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isModalVisible, toggleModalVisibility] = useToggle(false);
  const [isProcessing, toggleProcessing] = useToggle(false);

  async function onConfirm(evt: GestureResponderEvent): Promise<void> {
    evt.stopPropagation();
    toggleProcessing();
    try {
      await ColdtivateService.deleteCoolingUnit(props.coolingUnitId);

      await mutate(getQueryKey('getLocations', props.companyId));
      cache.delete(getQueryKey('getCoolingUnit', { ...props }));

      toast.show(t('Dashboard.Management.EditCoolingUnit.toasts.successDelete'), {
        type: 'md_success',
      });

      toggleModalVisibility();
      navigation.goBack();
    } catch (exception) {
      toast.show(t('Dashboard.Management.EditCoolingUnit.toasts.cantDelete'), {
        type: 'md_danger',
        style: {
          marginBottom: 50,
        },
      });
      toggleModalVisibility();
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  return (
    <React.Fragment>
      <Button
        style={{ width }}
        mode="contained"
        onPress={toggleModalVisibility}
        icon={isProcessing ? undefined : 'trash-can-outline'}
        buttonColor={paperTheme.colors.error}
        disabled={isSubmitting || isProcessing}
        uppercase
      >
        {isProcessing ? <ActivityIndicator size="small" color="white" /> : t('actions.delete')}
      </Button>

      <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModalVisibility}>
          <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            <View tw="items-center space-y-3">
              <Icon name="warning" size={40} color={paperTheme.colors.error} />
              <Text variant="TitleSmall">
                {t('Dashboard.Management.EditCoolingUnit.modal.askDelete')}
              </Text>
            </View>
            <View tw="flex-row self-end space-x-2">
              <Button mode="text" onPress={toggleModalVisibility}>
                {t('actions.cancel')}
              </Button>
              <Button mode="text" onPress={onConfirm}>
                {t('actions.confirm')}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}
