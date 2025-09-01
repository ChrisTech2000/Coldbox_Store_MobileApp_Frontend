import React from 'react';
import { type GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import type { Farmer } from '#types/global';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCache } from '#services/hooks/useAPiCall';
import { usePopup } from '#screens/Dashboard/AccountDetails/components/DeleteAccountAction/utils';
import { useToggle } from '#ui/hooks/useToggle';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import InAppNotifications from '#common/InAppNotifications';
import reportCrash from '#ui/lib/reportCrash';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';

type Props = {
  farmerId: number;
  userId: number;
  isSubmitting: boolean;
  goBack: () => void;
  revalidateCache: () => Promise<void>;
};

export default function DeleteAction(props: Props) {
  const { farmerId, userId, isSubmitting, goBack, revalidateCache } = props;

  const contextualFarmer = useApiCache<number, Farmer>(GET_FARMER_RECORD_SWR_KEY, farmerId);

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

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
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
    } finally {
      toggleProcessing();
    }
  }

  async function onConfirm(): Promise<void> {
    try {
      if (typeof contextualFarmer === 'undefined' || !company) throw new Error(); // safe guard
      toggleProcessing();

      // eslint-disable-next-line
      // @ts-ignore
      if (!contextualFarmer.userCode && !contextualFarmer.farmer?.userCode) {
        await ColdtivateService.operatorProxyUserDelete(userId);
      } else await ColdtivateService.removeCompany({ farmerId, companyId: company.id });
      await revalidateCache();
      resetPopup();
      toggleProcessing();
      goBack();
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
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
        <Dialog
          visible={state.isVisible}
          onDismiss={resetPopup}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Icon
            icon={() => {
              if (!state.showActions)
                return <Icon name="warning" size={50} color={paperTheme.colors.error} />;
              return (
                <Icon name="check-circle-outline" size={50} color={paperTheme.colors.primary} />
              );
            }}
          />
          <Dialog.Content>
            <Text tw="text-base">{state.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {state.showActions ? (
              <React.Fragment>
                <Button onPress={resetPopup} disabled={isProcessing}>
                  {t('actions.cancel')}
                </Button>
                <Button onPress={onConfirm} disabled={isProcessing}>
                  {t('actions.confirm')}
                </Button>
              </React.Fragment>
            ) : (
              <Button onPress={resetPopup}>{t('actions.close')}</Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}
