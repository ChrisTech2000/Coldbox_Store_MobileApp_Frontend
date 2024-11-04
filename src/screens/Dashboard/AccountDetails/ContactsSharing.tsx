import isNil from 'lodash/isNil';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';

function ContactsSharing() {
  const { t } = useTranslationUtils();
  const [user, setUser] = useAuthStore((store) => [store.user, store.setUser]);
  const toast = InAppNotifications.useToast();
  const [loading, setLoading] = useState(false);

  const [localPhonePublic, setLocalPhonePublic] = useState(user?.isPhonePublic ?? false);
  const [localEmailPublic, setLocalEmailPublic] = useState(user?.isEmailPublic ?? false);

  const updatePreferences = useDebouncedCallback(async (publicPhone, publicEmail) => {
    if (!user) return;
    setLoading(true);

    try {
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
    } catch (exception) {
      console.error(exception);
    } finally {
      setLoading(false);
    }
  }, 800);

  const handlePhoneSwitchChange = useCallback((value: boolean) => {
    setLocalPhonePublic(value);
    updatePreferences(value, undefined);
  }, []);

  const handleEmailSwitchChange = useCallback((value: boolean) => {
    setLocalEmailPublic(value);
    updatePreferences(undefined, value);
  }, []);

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
                disabled={loading}
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
                  disabled={loading}
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
