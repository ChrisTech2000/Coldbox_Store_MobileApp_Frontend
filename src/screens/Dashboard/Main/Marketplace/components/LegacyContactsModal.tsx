import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import { useManagementStore } from '#stores/management';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import type { DashboardRoutes } from '#navigation/Dashboard';

export default function LegacyContactsModal() {
  const { t } = useTranslationUtils();
  const navigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();
  const [visible, setVisible] = useState<boolean>(false);
  const [contactCount, setContactCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const hasChecked = useRef<boolean>(false);

  const company = useManagementStore((state) => state.company);
  const legacyContactsModalShown = useManagementStore((state) => state.legacyContactsModalShown);
  const setLegacyContactsModalShown = useManagementStore(
    (state) => state.setLegacyContactsModalShown
  );
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function checkLegacyContacts() {
      if (hasChecked.current) {
        return;
      }
      hasChecked.current = true;

      try {
        if (user?.role !== ERoles.EMPLOYEE) {
          setLoading(false);
          return;
        }

        if (!company?.hasLegacyContacts) {
          setLoading(false);
          return;
        }

        if (legacyContactsModalShown) {
          setLoading(false);
          return;
        }

        const contacts = await MarketplaceService.getLegacyContacts(company.id);

        if (contacts.length > 0) {
          setContactCount(contacts.length);
          setVisible(true);
          setLegacyContactsModalShown(true);
        }
      } catch (error) {
        console.error('[LegacyContactsModal] Error checking legacy contacts:', error);
      } finally {
        setLoading(false);
      }
    }

    checkLegacyContacts();
  }, [company, user?.role, legacyContactsModalShown, setLegacyContactsModalShown]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const handleAssignNow = useCallback(() => {
    handleDismiss();
    navigation.navigate('Management', {
      screen: 'LegacyContacts',
    });
  }, [navigation, handleDismiss]);

  if (loading || !visible) {
    return null;
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleDismiss}
        style={{ backgroundColor: 'white', borderRadius: 25, marginHorizontal: 16 }}
      >
        <Dialog.Content style={{ paddingVertical: 10, paddingHorizontal: 24 }}>
          <View tw="space-y-4">
            <Text tw="text-base font-semibold text-gray-900">
              {t('Dashboard.Management.Delivery.legacyContactsModal.title')}
            </Text>
            <Text tw="text-sm text-gray-700 leading-6">
              {t('Dashboard.Management.Delivery.legacyContactsModal.descriptionPrefix')}
              <Text tw="font-bold">
                {t('Dashboard.Management.Delivery.legacyContactsModal.descriptionBold', {
                  count: contactCount,
                  plural: contactCount !== 1 ? 's' : '',
                })}
              </Text>
              {t('Dashboard.Management.Delivery.legacyContactsModal.descriptionSuffix')}
            </Text>
          </View>
          <View tw="bg-red-50 py-3 px-1 border-b border-red-200 flex-row items-start -mx-6 mt-4">
            <Icon
              name="alert-circle-outline"
              size={20}
              color="#E7000B"
              style={{ marginRight: 10, marginLeft: 24 }}
            />
            <View tw="flex-1 pr-6">
              <Text tw="text-sm font-semibold text-red-900 mb-1">
                {t('Dashboard.Management.Delivery.legacyContactsModal.important')}
              </Text>
              <Text tw="text-sm text-red-700 leading-5">
                {t('Dashboard.Management.Delivery.legacyContactsModal.importantMessage')}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            paddingHorizontal: 18,
            paddingBottom: 18,
            alignContent: 'flex-end',
          }}
        >
          <Button mode="text" onPress={handleDismiss} labelStyle="text-sm text-gray-500">
            {t('Dashboard.Management.Delivery.legacyContactsModal.remindMeLater')}
          </Button>
          <Button
            mode="text"
            onPress={handleAssignNow}
            labelStyle="text-sm font-semibold text-red-600"
          >
            {t('Dashboard.Management.Delivery.legacyContactsModal.assignNow')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
