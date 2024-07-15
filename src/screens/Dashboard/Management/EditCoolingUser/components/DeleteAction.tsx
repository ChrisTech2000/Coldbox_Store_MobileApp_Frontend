import React from 'react';
import { type GestureResponderEvent, View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCache } from '#services/hooks/useAPiCall';
import type { GetFarmerParams } from '#types/api.params';
import type { GetFarmerResponse } from '#types/api.responses';
import { usePopup } from '#screens/Dashboard/AccountDetails/components/DeleteAccountAction/utils';
import { useToggle } from '#ui/hooks/useToggle';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

type Props = {
  userId: number;
  isSubmitting: boolean;
  goBack: () => void;
  revalidateCache: () => Promise<void>;
};

export default function DeleteAction(props: Props) {
  const { userId, isSubmitting, goBack, revalidateCache } = props;

  const cachedData = useApiCache<GetFarmerParams, GetFarmerResponse>('getFarmer', {
    userId,
  });

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const [state, { displayPopup, resetPopup }] = usePopup();
  const [isProcessing, toggleProcessing] = useToggle(false);

  async function onDelete(evt: GestureResponderEvent): Promise<void> {
    evt?.stopPropagation();
    if (!company) return; // safe guard
    try {
      toggleProcessing();
      const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
        userId,
        companyId: company.id,
        isFarmer: true,
        notEmpty: true,
      });

      if (nonEmptyCoolingUnits.length >= 1) {
        const names = nonEmptyCoolingUnits.map((coolingUnit) => coolingUnit.name).join(', ');
        displayPopup(t('Dashboard.Management.EditCoolingUsers.toasts.warning', { names })); // warning popup
        return;
      }

      displayPopup(t('Dashboard.Management.EditCoolingUsers.toasts.confirmation'), true); // confirmation popup
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  async function onConfirm(): Promise<void> {
    const contextualDatum = cachedData?.at(0);
    if (typeof contextualDatum === 'undefined' || !company) return;
    const farmerId = contextualDatum.id;
    const companyId = company.id;
    try {
      resetPopup();
      toggleProcessing();
      if (!contextualDatum.userCode) await ColdtivateService.deleteUser(userId);
      else await ColdtivateService.removeCompany({ farmerId, companyId });
      await revalidateCache();
      goBack();
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
        icon="trash-can-outline"
        buttonColor={paperTheme.colors.error}
        disabled={isProcessing || isSubmitting}
        uppercase
      >
        {isProcessing ? (
          <ActivityIndicator animating size="small" color="white" />
        ) : (
          t('actions.delete')
        )}
      </Button>

      <Portal>
        <Modal visible={state.isVisible} onDismiss={resetPopup}>
          <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            <View tw="items-center space-y-3">
              {state.showActions ? (
                <Icon name="check-circle-outline" size={50} color={paperTheme.colors.primary} />
              ) : (
                <Icon name="warning" size={50} color={paperTheme.colors.error} />
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
