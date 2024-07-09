import React from 'react';
import { type GestureResponderEvent } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';

import { useAuthStore } from '#stores/auth';
import { useToggle } from '#ui/hooks/useToggle';
import { ERoles } from '#types/global';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

export default function DeleteAccountAction() {
  const user = useAuthStore(useShallow((store) => store.user));

  const [isProcessing, toggleProcessing] = useToggle(false);

  async function onDelete(evt: GestureResponderEvent): Promise<void> {
    evt.stopPropagation();
    if (typeof user === 'undefined') return; // safe guard
    toggleProcessing();
    try {
      switch (user?.role) {
        case ERoles.EMPLOYEE: {
          const companyId = useManagementStore.getState().company?.id;
          if (!companyId) return; // safe guard
          const companyEmployees = await ColdtivateService.getCompanyEmployees(companyId);
          if (companyEmployees.length === 1) {
            const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
              companyId: companyId,
              isFarmer: false,
              notEmpty: true,
            });
            if (nonEmptyCoolingUnits.length >= 1) {
              // TODO: show toast -> RE can't delete account
              return;
            }
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
            // TODO: show toast -> OP can't delete account
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
            // TODO: show toast -> FARMER can't delete account
            return;
          }
          break;
        }

        default:
          break;
      }

      // TODO: show confirmation modal
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  return (
    <Button
      tw="w-full"
      mode="contained"
      onPress={onDelete}
      icon={isProcessing ? undefined : 'trash-can-outline'}
      buttonColor={paperTheme.colors.error}
      uppercase
    >
      {isProcessing ? <ActivityIndicator size="small" color="white" /> : 'Delete'}
    </Button>
  );
}
