import React from 'react';
import { View, type GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useAuthStore } from '#stores/auth';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { ERoles } from '#types/global';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

import FormManager from '../FormManager';
import { usePopup } from './utils';

export default function DeleteAccountAction() {
  const {
    formState: { isSubmitting },
  } = FormManager.useFormManager();

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();

  const [isProcessing, toggleProcessing] = useToggle(false);
  const [state, { displayPopup, resetPopup }] = usePopup();

  async function onDelete(evt: GestureResponderEvent): Promise<void> {
    evt.stopPropagation();
    if (!user) return; // safe guard
    toggleProcessing();
    try {
      switch (user?.role) {
        case ERoles.EMPLOYEE: {
          const companyId = useManagementStore.getState().company?.id;
          if (!companyId) return; // safe guard
          const companyEmployees = await ColdtivateService.getCompanyEmployees(companyId);
          if (companyEmployees.length === 1) {
            const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
              companyId,
              isFarmer: false,
              notEmpty: true,
            });
            if (nonEmptyCoolingUnits.length >= 1) {
              const names = nonEmptyCoolingUnits.map((coolingUnit) => coolingUnit.name).join(', ');
              displayPopup(t('Dashboard.AccountDetails.popups.activeCheckInRE', { names })); // warning popup
              return;
            }
            displayPopup(t('Dashboard.AccountDetails.popups.lastRegisteredEmployee'), true); // confirmation popup
            return;
          }
          break;
        }

        case ERoles.OPERATOR: {
          const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
            userId: user.id,
            isFarmer: false,
            notEmpty: true,
          });
          if (nonEmptyCoolingUnits.length >= 1) {
            const names = nonEmptyCoolingUnits.map((coolingUnit) => coolingUnit.name).join(', ');
            displayPopup(t('Dashboard.AccountDetails.popups.activeCheckInOP', { names })); // warning popup
            return;
          }
          break;
        }

        case ERoles.COOLING_USER: {
          const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
            userId: user.id,
            isFarmer: true,
            notEmpty: true,
          });
          if (nonEmptyCoolingUnits.length >= 1) {
            const names = nonEmptyCoolingUnits.map((coolingUnit) => coolingUnit.name).join(', ');
            displayPopup(t('Dashboard.AccountDetails.popups.activeCheckInCU', { names })); // warning popup
            return;
          }
          break;
        }

        default:
          return; // safe guard
      }

      displayPopup(t('Dashboard.AccountDetails.popups.default'), true); // confirmation popup
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  async function onConfirm(): Promise<void> {
    if (!user) return; // safe guard
    try {
      resetPopup();
      toggleProcessing();
      await ColdtivateService.deleteUser(user.id);
      useAuthStore.getState().revokeSession();
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  return (
    <React.Fragment>
      <Button
        tw="w-full"
        mode="contained"
        onPress={onDelete}
        icon={isProcessing ? undefined : 'trash-can-outline'}
        buttonColor={paperTheme.colors.error}
        disabled={isSubmitting || isProcessing}
        uppercase
      >
        {isProcessing ? <ActivityIndicator size="small" color="white" /> : t('actions.delete')}
      </Button>

      <Portal>
        <Modal visible={state.isVisible} onDismiss={resetPopup}>
          <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            <View tw="items-center space-y-3">
              {state.showActions ? (
                <MaterialIcons
                  name="check-circle-outline"
                  size={50}
                  color={paperTheme.colors.primary}
                />
              ) : (
                <MaterialIcons name="warning" size={50} color={paperTheme.colors.error} />
              )}
              <Text variant="TitleSmall">{state.message}</Text>
            </View>
            <View tw="flex-row self-end space-x-2">
              {state.showActions ? (
                <React.Fragment>
                  <Button mode="text" onPress={resetPopup}>
                    {t('actions.cancel')}
                  </Button>
                  <Button mode="text" onPress={onConfirm}>
                    {t('actions.confirm')}
                  </Button>
                </React.Fragment>
              ) : (
                <Button mode="text" onPress={resetPopup}>
                  {t('actions.close')}
                </Button>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}
