import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRoutes } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useManagementStore } from '#stores/management';
import type { GetDeliveryContactsResponse } from '#types/api.responses';

import ContactBottomSheet from './components/ContactBottomSheet';
import ContactCard from './components/ContactCard';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-3',
  ios: 'mx-3',
});

type Contact = GetDeliveryContactsResponse[number];
type CoolingUnitOption = { id: number; name: string };
const useCoolingUnitFilterStore = createMultipleSelectStore<CoolingUnitOption>();

function DeliveryContacts() {
  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);
  const navigation = useNavigation<NativeStackNavigationProp<ManagementRoutes>>();

  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [processingContactIds, setProcessingContactIds] = useState<Set<number>>(new Set());
  const [roomMenuVisible, setRoomMenuVisible] = useState<boolean>(false);

  const { data: legacyContacts, isLoading: isLoadingLegacy } = useApiCall(
    'getLegacyContacts',
    MarketplaceService.getLegacyContacts,
    company?.id as number,
    {
      skip: !company?.id || !company?.hasLegacyContacts,
      defaultData: [],
    }
  );

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: company!.id },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const { data, isLoading, refetch } = useApiCall(
    'listDeliveryContacts',
    () => MarketplaceService.listDeliveryContacts(company!.id, undefined, undefined),
    undefined,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  useAppEventListener(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS, refetch);

  const handleToggleStatus = useCallback(
    async (contactId: number) => {
      if (processingContactIds.has(contactId)) return;

      setProcessingContactIds((prev) => new Set(prev).add(contactId));

      try {
        const currentContact = data?.find((c) => c.id === contactId);
        if (!currentContact) return;

        await MarketplaceService.updateDeliveryContact({
          contactId,
          isActive: !currentContact.isActive,
        });

        await refetch();

        toast.show(t('Dashboard.Management.Delivery.contactStatusChangedSuccessfully'), {
          type: 'md_success',
          style: { marginBottom: 50 },
        });
      } catch (exception) {
        toast.show(t('navigation.error.serverErrorMessage'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
        reportCrash(exception as Error);
      } finally {
        setProcessingContactIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(contactId);
          return newSet;
        });
      }
    },
    [data, processingContactIds, refetch, toast, t]
  );

  const handleEditContact = useCallback((contact: Contact) => {
    emitter.emit(APP_EVENTS.DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET, contact);
  }, []);

  const coolingUnitOptions = useMemo(
    () => (coolingUnits ?? []).map((unit) => ({ id: unit.id, name: unit.name })),
    [coolingUnits]
  );

  const selectedCoolingUnits = useCoolingUnitFilterStore((store) => store.selectedItems);
  const resetCoolingUnitSelection = useCoolingUnitFilterStore((store) => store.reset);
  const selectedCoolingUnitIds = useMemo(
    () => selectedCoolingUnits.map((unit) => unit.id),
    [selectedCoolingUnits]
  );

  const filteredContacts = useMemo(() => {
    if (!data) return [];
    if (
      !selectedCoolingUnitIds.length ||
      selectedCoolingUnitIds.length === coolingUnitOptions.length
    ) {
      return data;
    }

    return data.filter((contact) => {
      if (contact.coolingUnitId == null) return false;
      const ids = Array.isArray(contact.coolingUnitId)
        ? contact.coolingUnitId
        : [contact.coolingUnitId];
      return ids.some((id) => selectedCoolingUnitIds.includes(id));
    });
  }, [data, selectedCoolingUnitIds, coolingUnitOptions.length]);

  const scrollContentStyle = useMemo(
    () => (!filteredContacts?.length ? 'flex-1 justify-center items-center pb-8' : 'pb-8'),
    [filteredContacts?.length]
  );

  const coolingUnitDisplayValue = useMemo(() => {
    if (
      !selectedCoolingUnitIds.length ||
      selectedCoolingUnitIds.length === coolingUnitOptions.length
    ) {
      return t('Dashboard.Management.Delivery.legacyContactsScreen.allRooms');
    }
    return selectedCoolingUnits.map((unit) => unit.name).join(', ');
  }, [selectedCoolingUnitIds, coolingUnitOptions.length, selectedCoolingUnits, t]);

  useFocusEffect(
    useCallback(() => {
      resetCoolingUnitSelection();
      setRoomMenuVisible(false);
      return () => {
        resetCoolingUnitSelection();
        setRoomMenuVisible(false);
      };
    }, [resetCoolingUnitSelection])
  );

  if (isLoading || isLoadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <View tw="flex-1 bg-white">
        {!isLoadingLegacy && legacyContacts && legacyContacts.length > 0 && (
          <TouchableOpacity
            tw="bg-red-50 border-b border-red-200 p-4 mb-3"
            onPress={() => navigation.navigate('LegacyContacts')}
            activeOpacity={0.7}
          >
            <View tw="flex-row items-start">
              <Icon
                name="alert-circle-outline"
                size={24}
                color="#E7000B"
                style={{ marginRight: 12 }}
              />
              <View tw="flex-1">
                <Text tw="text-base font-semibold text-red-900 mb-1">
                  {t('Dashboard.Management.Delivery.legacyContactsBanner.title', {
                    count: legacyContacts.length,
                  })}
                </Text>
                <Text tw="text-sm text-red-600 mb-2 leading-5">
                  {t('Dashboard.Management.Delivery.legacyContactsBanner.description')}
                </Text>
                <View tw="flex-row items-center">
                  <Text tw="text-sm font-medium text-red-800 underline">
                    {t('Dashboard.Management.Delivery.legacyContactsBanner.link')}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View tw="flex-1">
          <View tw="pt-3 pb-2">
            <MultipleSelectWithStore
              useSelectStore={useCoolingUnitFilterStore}
              datums={coolingUnitOptions}
              isModalVisible={roomMenuVisible}
              setIsModalVisible={setRoomMenuVisible}
              label={t('Dashboard.Management.Delivery.roomContacts')}
              modalHeader={t('Dashboard.Management.Delivery.roomContacts')}
              itemName={(item) => item.name}
              autoSelectAll
              divider
              displayValue={coolingUnitDisplayValue}
            />
          </View>

          <KeyboardAwareScrollView
            tw={cn('flex-1', HORIZONTAL_SPACING)}
            contentContainerStyle={scrollContentStyle}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            {!filteredContacts?.length ? (
              <View tw="items-center space-y-3.5">
                <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
                  <Icon name="phone-outline" size={60} color={paperTheme.colors.primary} />
                </View>
                <Text tw="text-base">{t('Dashboard.Management.Delivery.emptyMessage')}</Text>
              </View>
            ) : (
              <FlashList
                data={filteredContacts}
                extraData={processingContactIds}
                keyExtractor={(item) => `contact-${item.id}`}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={150}
                renderItem={({ item }) => (
                  <ContactCard
                    contact={item}
                    coolingUnits={coolingUnits || []}
                    isProcessing={processingContactIds.has(item.id)}
                    onToggleStatus={() => handleToggleStatus(item.id)}
                    onEdit={() => handleEditContact(item)}
                    onDelete={() => setContactToDelete(item.id)}
                    unassignedLabel={t('Dashboard.Management.Delivery.unassigned')}
                    translations={{
                      companyName: t('Dashboard.Management.Delivery.companyName'),
                      contactName: t('Dashboard.Management.Delivery.contactName'),
                      phoneNumber: t('Dashboard.Management.Delivery.phoneNumber'),
                      rooms: t('Dashboard.Management.Delivery.rooms'),
                      show: t('Dashboard.Management.Delivery.show'),
                      hide: t('Dashboard.Management.Delivery.hide'),
                      edit: t('actions.edit'),
                      delete: t('actions.delete'),
                    }}
                  />
                )}
              />
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>

      <View tw="w-full bottom-0 left-0 py-3.5 px-4 flex-row items-center justify-evenly bg-zinc-50 border-t border-solid border-zinc-400">
        <Button
          tw="w-full"
          mode="contained"
          onPress={() => emitter.emit(APP_EVENTS.DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET, null)}
          icon="plus-circle-outline"
          uppercase
        >
          {t('actions.add')}
        </Button>
      </View>

      <ContactBottomSheet coolingUnits={coolingUnits || []} />

      <Portal>
        <Dialog
          visible={!!contactToDelete}
          onDismiss={() => setContactToDelete(null)}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content>
            <Text tw="text-base">{t('Dashboard.Management.Delivery.deleteContactMessage')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={(evt) => {
                evt.stopPropagation();
                setContactToDelete(null);
              }}
              disabled={contactToDelete !== null && processingContactIds.has(contactToDelete)}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              textColor={paperTheme.colors.error}
              onPress={async (evt) => {
                evt.stopPropagation();
                try {
                  if (!contactToDelete || !company) throw new Error();

                  setProcessingContactIds((prev) => new Set(prev).add(contactToDelete));

                  await MarketplaceService.deleteDeliveryContactId({
                    contactId: contactToDelete,
                  });

                  await refetch();
                  setContactToDelete(null);
                } catch (exception) {
                  toast.show(t('navigation.error.serverErrorMessage'), {
                    type: 'md_danger',
                    style: { marginBottom: 50 },
                  });
                  reportCrash(exception as Error);
                } finally {
                  if (contactToDelete) {
                    setProcessingContactIds((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(contactToDelete);
                      return newSet;
                    });
                  }
                }
              }}
              disabled={contactToDelete !== null && processingContactIds.has(contactToDelete)}
            >
              {t('actions.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(DeliveryContacts, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
