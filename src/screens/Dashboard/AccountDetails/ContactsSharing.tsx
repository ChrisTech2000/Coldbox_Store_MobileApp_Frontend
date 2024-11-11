import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import isNil from 'lodash/isNil';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import InAppNotifications from '#common/InAppNotifications';
import { useToggle } from '#ui/hooks/useToggle';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import RBAC from '#common/RBAC';

function ContactsSharing() {
  const { t } = useTranslationUtils();
  const [user, setUser] = useAuthStore((store) => [store.user, store.setUser]);
  const toast = InAppNotifications.useToast();

  const [isProcessing, toggleIsProcessing] = useToggle();

  const { data, isLoading, refetch } = useApiCall('getUser', ColdtivateService.getUser, user!.id, {
    skip: !user?.id,
    defaultData: null,
  });

  const [localPhonePublic, setLocalPhonePublic] = useState<boolean>(data?.isPhonePublic ?? false);
  const [localEmailPublic, setLocalEmailPublic] = useState<boolean>(data?.isEmailPublic ?? false);

  useEffect(() => {
    if (!data) return;
    const _isEmailPublic = data?.isEmailPublic || false;
    const _isPhonePublic = data?.isPhonePublic || false;
    if (localEmailPublic !== _isEmailPublic) setLocalEmailPublic(_isEmailPublic);
    if (localPhonePublic !== _isPhonePublic) setLocalPhonePublic(_isPhonePublic);
  }, [data?.isEmailPublic, data?.isPhonePublic]);

  const updatePreferences = useDebouncedCallback(
    async (publicPhone: boolean | undefined, publicEmail: boolean | undefined) => {
      if (!user) return;

      const userDatum = await ColdtivateService.updateUser({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        language: user.language,
        isEmailPublic: !isNil(publicEmail) ? publicEmail : user.isEmailPublic,
        isPhonePublic: !isNil(publicPhone) ? publicPhone : user.isPhonePublic,
      });

      setUser({ ...userDatum, role: user?.role });
      toast.show(t('Dashboard.AccountDetails.toasts.success'), {
        type: 'md_success',
        style: { marginBottom: 50 },
      });

      await refetch();
    },
    400
  );

  const handlePhoneSwitchChange = useCallback(
    async (value: boolean) => {
      const previousValue = localPhonePublic;
      try {
        toggleIsProcessing();
        setLocalPhonePublic(value);
        await updatePreferences(value, undefined);
      } catch (exception) {
        console.error(exception);
        toast.show(t('actions.error'), { type: 'md_danger' });
        setLocalPhonePublic(previousValue);
      } finally {
        toggleIsProcessing();
      }
    },
    [updatePreferences]
  );

  const handleEmailSwitchChange = useCallback(
    async (value: boolean) => {
      const previousValue = localEmailPublic;
      try {
        toggleIsProcessing();
        setLocalEmailPublic(value);
        await updatePreferences(undefined, value);
      } catch (exception) {
        console.error(exception);
        toast.show(t('actions.error'), { type: 'md_danger' });
        setLocalEmailPublic(previousValue);
      } finally {
        toggleIsProcessing();
      }
    },
    [updatePreferences]
  );

  const isDisabled = isLoading || isProcessing;

  return (
    <ScrollView tw="flex-1 p-3" showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <View>
          <List.Item
            tw="p-0 m-0 py-2"
            title={undefined}
            left={() => (
              <Text tw="text-base self-center">
                {t('Dashboard.AccountDetails.ContactsSharing.publicPhone')}
              </Text>
            )}
            right={() => (
              <Switch
                disabled={isDisabled}
                value={localPhonePublic}
                onValueChange={handlePhoneSwitchChange}
              />
            )}
          />
          <Divider tw="bg-gray-400" />
        </View>

        <RBAC.ProtectedResource action="VIEW" subject="ContactsSharingEmail">
          <View>
            <List.Item
              tw="p-0 m-0 py-2"
              title={undefined}
              left={() => (
                <Text tw="text-base self-center">
                  {t('Dashboard.AccountDetails.ContactsSharing.publicEmail')}
                </Text>
              )}
              right={() => (
                <Switch
                  disabled={isDisabled}
                  value={localEmailPublic}
                  onValueChange={handleEmailSwitchChange}
                />
              )}
            />
            <Divider tw="bg-gray-400" />
          </View>
        </RBAC.ProtectedResource>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(ContactsSharing, ['bottom'], true);
