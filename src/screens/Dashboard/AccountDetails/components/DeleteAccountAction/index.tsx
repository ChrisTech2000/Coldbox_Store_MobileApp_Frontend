import React from 'react';
import { type GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useAuthStore } from '#stores/auth';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { ERoles } from '#types/global';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { resetAllStores } from '#navigation/Dashboard/components/DrawerContent/resetStoresUtil';
import InAppNotifications from '#common/InAppNotifications';
import DataloaderService from '#services/DataloaderService';
import reportCrash from '#ui/lib/reportCrash';

import { usePopup } from './utils';

export default function DeleteAccountAction() {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const [isProcessing, toggleProcessing] = useToggle(false);
  const [state, { displayPopup, resetPopup }] = usePopup();

  async function onDelete(evt: GestureResponderEvent): Promise<void> {
    evt.stopPropagation();
    try {
      toggleProcessing();
      if (!user) throw new Error(); // safe guard

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
          return toggleProcessing(); // safe guard
      }

      displayPopup(t('Dashboard.AccountDetails.popups.default'), true); // confirmation popup
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
    } finally {
      toggleProcessing();
    }
  }

  async function onConfirm(): Promise<void> {
    try {
      toggleProcessing();
      if (!user) throw new Error(); // safe guard
      resetPopup();
      await ColdtivateService.deleteUser(user.id);
      resetAllStores();
      mutate(() => true, undefined, false);
      useAuthStore.getState().revokeSession();
      DataloaderService.clearAllCaches();
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
    } finally {
      toggleProcessing();
    }
  }

  return (
    <React.Fragment>
      <Button
        tw="w-4/5 my-4"
        mode="contained"
        onPress={onDelete}
        buttonColor={paperTheme.colors.error}
        disabled={isProcessing}
        uppercase
      >
        {isProcessing ? <ActivityIndicator size="small" color="white" /> : t('actions.delete')}
      </Button>

      <Portal>
        <Dialog
          visible={state.isVisible}
          onDismiss={resetPopup}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Icon
            icon={() =>
              state.showActions ? (
                <MaterialIcons
                  name="check-circle-outline"
                  size={50}
                  color={paperTheme.colors.primary}
                />
              ) : (
                <MaterialIcons name="warning" size={50} color={paperTheme.colors.error} />
              )
            }
          />
          <Dialog.Content>
            <Text tw="text-base">{state.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {state.showActions ? (
              <React.Fragment>
                <Button mode="text" onPress={resetPopup} disabled={isProcessing}>
                  {t('actions.cancel')}
                </Button>
                <Button mode="text" onPress={onConfirm} disabled={isProcessing}>
                  {t('actions.confirm')}
                </Button>
              </React.Fragment>
            ) : (
              <Button mode="text" onPress={resetPopup}>
                {t('actions.close')}
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}
