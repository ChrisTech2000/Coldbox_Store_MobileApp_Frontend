import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, type GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { CustomError } from '#services/utils/ErrorUtil';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { useToggle } from '#ui/hooks/useToggle';

import FormManager from '../../AddCoolingUnit/contexts/FormManager';

const width = (Dimensions.get('window').width - 42) / 2;

type Props = {
  coolingUnitId: number;
  coolingUnitName: string;
  companyId: number | undefined;
};

export default function DeleteAction(props: Props) {
  const navigation = useNavigation();
  const { mutate, cache } = useSWRConfig();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore(useShallow((store) => store.user));

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

      await Promise.allSettled([
        mutate(getQueryKey('getLocations', props.companyId)),
        ...(typeof user?.id !== 'undefined' && typeof props.companyId !== 'undefined'
          ? [
              mutate(
                getQueryKey('getCoolingUnits', {
                  ...(user.role === ERoles.EMPLOYEE
                    ? { company: props.companyId }
                    : { operator: user.id }),
                })
              ),
            ]
          : []),
      ]);

      cache.delete(
        getQueryKey('getCoolingUnit', {
          coolingUnitId: props.coolingUnitId,
          companyId: props.companyId,
        })
      );

      toast.show(
        t('Dashboard.Management.EditCoolingUnit.toasts.successDelete', {
          name: props.coolingUnitName,
        }),
        {
          type: 'md_success',
        }
      );

      toggleModalVisibility();
      toggleProcessing();
      navigation.goBack();
    } catch (exception) {
      if (exception instanceof CustomError && exception.originalError.status >= 500) {
        toast.show(t('navigation.error.serverErrorMessage'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
      } else {
        toast.show(t('Dashboard.Management.EditCoolingUnit.toasts.cantDelete'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
      }

      reportCrash(exception as Error);
      toggleModalVisibility();
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
        <Dialog
          visible={isModalVisible}
          onDismiss={toggleModalVisibility}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Icon
            icon={() => <Icon name="warning" size={50} color={paperTheme.colors.error} />}
          />
          <Dialog.Content tw="mt-2.5">
            <Text tw="text-base">{t('Dashboard.Management.EditCoolingUnit.modal.askDelete')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="text" onPress={toggleModalVisibility} disabled={isProcessing}>
              {t('actions.cancel')}
            </Button>
            <Button mode="text" onPress={onConfirm} disabled={isProcessing}>
              {t('actions.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}
