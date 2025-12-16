import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { GenericError } from '#ui/components/GenericError';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useManagementStore } from '#stores/management';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-3',
  ios: 'mx-3',
});

function LegacyContacts() {
  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);
  const setCompany = useManagementStore((store) => store.setCompany);

  const [processingContactIds, setProcessingContactIds] = useState<Set<number>>(new Set());
  const [menuVisibleForContact, setMenuVisibleForContact] = useState<number | null>(null);
  const [selectedRoomsByContact, setSelectedRoomsByContact] = useState<Record<number, number[]>>(
    {}
  );
  const [draftSelection, setDraftSelection] = useState<Record<number, number[]>>({});
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [roomSearchQuery, setRoomSearchQuery] = useState<string>('');

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: company!.id },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const {
    data: legacyContacts,
    isLoading,
    refetch,
  } = useApiCall('getLegacyContacts', MarketplaceService.getLegacyContacts, company?.id as number, {
    skip: !company?.id,
    defaultData: [],
  });
  const { data: locations, isLoading: isLoadingLocations } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const locationById = useMemo(() => {
    const map = new Map<number, string>();
    locations?.forEach((loc) => map.set(loc.id, loc.name));
    return map;
  }, [locations]);

  const handleAssignRoom = useCallback(
    async (contactId: number, coolingUnitIds: number[]) => {
      if (processingContactIds.has(contactId)) return;
      if (!coolingUnitIds.length) {
        toast.show(t('Dashboard.Management.Delivery.selectRoom'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
        return;
      }

      setProcessingContactIds((prev) => new Set(prev).add(contactId));
      setMenuVisibleForContact(null);

      try {
        await MarketplaceService.updateDeliveryContact({
          contactId,
          coolingUnitId: coolingUnitIds,
        });

        const [, updatedCompany] = await Promise.all([
          refetch(),
          ColdtivateService.getCompanyById(company!.id),
        ]);
        setCompany(updatedCompany);

        toast.show(
          t('Dashboard.Management.Delivery.legacyContactsScreen.contactAssignedSuccessfully'),
          {
            type: 'md_success',
            style: { marginBottom: 50 },
          }
        );

        emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
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
    [company, processingContactIds, refetch, setCompany, toast, t]
  );

  useEffect(() => {
    if (!legacyContacts?.length) return;
    setSelectedRoomsByContact((prev) => {
      const next = { ...prev };
      legacyContacts.forEach((contact) => {
        if (typeof contact.coolingUnitId === 'number' && !next[contact.id]) {
          next[contact.id] = [contact.coolingUnitId];
        }
      });
      return next;
    });
  }, [legacyContacts]);

  const assignableContactIds = useMemo(() => {
    const ready = legacyContacts
      ?.filter((contact) => (selectedRoomsByContact[contact.id] || []).length > 0)
      .map((contact) => contact.id);
    return ready ?? [];
  }, [legacyContacts, selectedRoomsByContact]);
  const hasBulkAssignButton = assignableContactIds.length > 1;

  const handleBulkAssign = useCallback(async () => {
    if (!assignableContactIds.length) return;
    setProcessingContactIds((prev) => new Set([...prev, ...assignableContactIds]));

    try {
      await Promise.all(
        assignableContactIds.map((contactId) =>
          MarketplaceService.updateDeliveryContact({
            contactId,
            coolingUnitId: selectedRoomsByContact[contactId],
          })
        )
      );

      const [, updatedCompany] = await Promise.all([
        refetch(),
        ColdtivateService.getCompanyById(company!.id),
      ]);
      setCompany(updatedCompany);

      toast.show(
        t('Dashboard.Management.Delivery.legacyContactsScreen.contactAssignedSuccessfully'),
        {
          type: 'md_success',
          style: { marginBottom: 50 },
        }
      );

      emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), {
        type: 'md_danger',
        style: { marginBottom: 50 },
      });
      reportCrash(exception as Error);
    } finally {
      setProcessingContactIds((prev) => {
        const next = new Set(prev);
        assignableContactIds.forEach((id) => next.delete(id));
        return next;
      });
    }
  }, [assignableContactIds, company, refetch, selectedRoomsByContact, setCompany, t, toast]);

  const handleDeleteContact = useCallback(
    async (contactId: number) => {
      if (processingContactIds.has(contactId)) return;

      setProcessingContactIds((prev) => new Set(prev).add(contactId));

      try {
        await MarketplaceService.deleteDeliveryContactId({
          contactId,
        });

        await refetch();

        toast.show(
          t('Dashboard.Management.Delivery.legacyContactsScreen.contactDeletedSuccessfully'),
          {
            type: 'md_success',
            style: { marginBottom: 50 },
          }
        );

        emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
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
    [processingContactIds, refetch, toast, t]
  );

  if (isLoading || isLoadingCoolingUnits || isLoadingLocations) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 bg-white">
      {legacyContacts.length ? (
        <View tw="bg-orange-50 border-b border-orange-200 p-4 mb-3">
          <View tw="flex-row items-start">
            <Icon
              name="alert-circle-outline"
              size={24}
              color="#E17100"
              style={{ marginRight: 12 }}
            />
            <View tw="flex-1">
              <Text tw="text-base font-semibold text-orange-900 mb-1">
                {t('Dashboard.Management.Delivery.legacyContactsScreen.warningTitle', {
                  count: legacyContacts?.length || 0,
                })}
              </Text>
              <Text tw="text-sm text-[#BB4D00] leading-5">
                {t('Dashboard.Management.Delivery.legacyContactsScreen.warningMessage')}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      <View tw={cn('flex-1', HORIZONTAL_SPACING, hasBulkAssignButton ? 'pb-20' : 'pb-4')}>
        {!legacyContacts?.length ? (
          <View tw="items-center space-y-3.5 mt-[50%]">
            <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
              <Icon name="check-circle-outline" size={60} color={paperTheme.colors.primary} />
            </View>
            <Text tw="text-base text-center px-8">
              {t('Dashboard.Management.Delivery.legacyContactsScreen.allAssignedMessage')}
            </Text>
          </View>
        ) : (
          <FlashList
            data={legacyContacts}
            extraData={[processingContactIds, menuVisibleForContact, selectedRoomsByContact]}
            keyExtractor={(item) => `legacy-contact-${item.id}`}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingBottom: hasBulkAssignButton ? 96 : 16,
            }}
            renderItem={({ item }) => {
              const isProcessing = processingContactIds.has(item.id);
              const selectedRoomIds = selectedRoomsByContact[item.id] || [];
              const currentSelection = draftSelection[item.id] ?? selectedRoomIds;
              const selectedRooms = (coolingUnits || []).filter((unit) =>
                currentSelection.includes(unit.id)
              );
              const filteredRooms = (coolingUnits || []).filter((unit) =>
                unit.name.toLowerCase().includes(roomSearchQuery.toLowerCase())
              );
              const hasSelection = selectedRooms.length > 0;
              return (
                <View
                  tw={cn(
                    'w-full px-4 py-3 rounded-2xl my-2 bg-white border',
                    hasSelection ? 'border-teal-600' : 'border-zinc-300'
                  )}
                  style={{
                    backgroundColor: hasSelection ? '#F8FDFB' : undefined,
                  }}
                >
                  <View tw="py-2">
                    <View tw="flex flex-row items-center justify-between mb-2  border-b border-zinc-200 pb-3">
                      <Text tw="text-sm text-zinc-900">
                        {t('Dashboard.Management.Delivery.companyName')}
                      </Text>
                      <Text tw="text-base text-gray-500">{item.deliveryCompanyName}</Text>
                    </View>
                    <View tw="flex flex-row items-center justify-between mb-2  border-b border-zinc-200 pb-3 pt-1">
                      <Text tw="text-sm text-zinc-900">
                        {t('Dashboard.Management.Delivery.contactName')}
                      </Text>
                      <Text tw="text-base text-gray-500">{item.contactName}</Text>
                    </View>
                    <View tw="flex flex-row items-center justify-between  border-b border-zinc-200 pb-3 pt-1">
                      <Text tw="text-sm text-zinc-900">
                        {t('Dashboard.Management.Delivery.phoneNumber')}
                      </Text>
                      <Text tw="text-base text-gray-500">{item.phone}</Text>
                    </View>
                  </View>

                  <Select
                    variant="lg"
                    isOpen={menuVisibleForContact === item.id}
                    onOpenChange={(isOpen) => {
                      setMenuVisibleForContact(isOpen ? item.id : null);
                      if (!isOpen) setRoomSearchQuery('');
                    }}
                    disabled={isProcessing}
                    onDismiss={() => {
                      setDraftSelection((prev) => {
                        const copy = { ...prev };
                        delete copy[item.id];
                        return copy;
                      });
                      setRoomSearchQuery('');
                    }}
                  >
                    <TouchableOpacity
                      tw="flex-row items-center justify-between pb-3 pt-1 border-b border-zinc-200"
                      onPress={() => {
                        setDraftSelection((prev) => ({
                          ...prev,
                          [item.id]: selectedRoomIds,
                        }));
                        setMenuVisibleForContact(item.id);
                      }}
                      disabled={isProcessing}
                    >
                      <View tw="flex-row items-center">
                        <Text tw="text-sm text-zinc-900">
                          {t('Dashboard.Management.Delivery.rooms')}
                        </Text>
                        <MaterialIcon
                          name="arrow-drop-down"
                          size={20}
                          color="#666"
                          style={{ marginLeft: 4 }}
                        />
                      </View>
                      <Text tw="text-sm text-gray-500">
                        {t('Dashboard.Management.Delivery.legacyContactsScreen.assignToRoom')}
                      </Text>
                    </TouchableOpacity>
                    <Select.Dialog
                      enableScroll={false}
                      header={t('Dashboard.Management.Delivery.selectRoom')}
                    >
                      <View tw="px-6 py-3 border-b border-gray-200">
                        <TextInput
                          tw="w-full bg-transparent"
                          mode="outlined"
                          placeholder={t('actions.search')}
                          value={roomSearchQuery}
                          onChangeText={setRoomSearchQuery}
                          dense
                          left={<TextInput.Icon icon="magnify" />}
                        />
                      </View>
                      <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={filteredRooms}
                        keyExtractor={(unit) => `room-assign-${unit.id}`}
                        renderItem={({ item: unit }) => {
                          const isChecked = currentSelection.includes(unit.id);

                          const toggleSelection = () =>
                            setDraftSelection((prev) => {
                              const prevSelection = prev[item.id] ?? selectedRoomIds;
                              const updatedSelection = isChecked
                                ? prevSelection.filter((id) => id !== unit.id)
                                : [...prevSelection, unit.id];
                              return { ...prev, [item.id]: updatedSelection };
                            });

                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              tw="flex flex-row items-center justify-between px-4 py-2"
                              onPress={toggleSelection}
                              disabled={isProcessing}
                            >
                              <Text tw="text-base w-[70%]" numberOfLines={2}>
                                {unit.name}
                              </Text>
                              <Checkbox
                                status={isChecked ? 'checked' : 'unchecked'}
                                onPress={toggleSelection}
                                disabled={isProcessing}
                              />
                            </TouchableOpacity>
                          );
                        }}
                        ItemSeparatorComponent={Divider}
                      />
                      <View tw="flex flex-row items-center justify-end py-2 px-4 border-t border-gray-200">
                        <Button
                          mode="text"
                          uppercase
                          compact
                          onPress={() =>
                            setDraftSelection((prev) => ({
                              ...prev,
                              [item.id]: coolingUnits?.map((u) => u.id) || [],
                            }))
                          }
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.all')}
                        </Button>
                        <Button
                          uppercase
                          compact
                          mode="text"
                          onPress={() =>
                            setDraftSelection((prev) => ({
                              ...prev,
                              [item.id]: [],
                            }))
                          }
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.none')}
                        </Button>
                        <Button
                          uppercase
                          compact
                          mode="text"
                          onPress={() => {
                            setDraftSelection((prev) => {
                              const copy = { ...prev };
                              delete copy[item.id];
                              return copy;
                            });
                            setMenuVisibleForContact(null);
                          }}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.cancel')}
                        </Button>
                        <Button
                          uppercase
                          compact
                          mode="text"
                          onPress={() => {
                            setSelectedRoomsByContact((prev) => ({
                              ...prev,
                              [item.id]: currentSelection,
                            }));
                            setDraftSelection((prev) => {
                              const copy = { ...prev };
                              delete copy[item.id];
                              return copy;
                            });
                            setMenuVisibleForContact(null);
                          }}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.ok')}
                        </Button>
                      </View>
                    </Select.Dialog>
                  </Select>

                  {!!selectedRooms.length && (
                    <View tw="mt-3 bg-green-transparency rounded-md px-3 py-2">
                      <Text tw="text-xs text-gray-600 mb-1">
                        {t('Dashboard.Management.Delivery.legacyContactsScreen.roomLocation', {
                          count: selectedRooms.length,
                        })}
                      </Text>
                      {selectedRooms.map((room) => {
                        const locationName = locationById.get(room.location);
                        return (
                          <Text key={room.id} tw="text-base text-gray-800">
                            {locationName}
                          </Text>
                        );
                      })}
                    </View>
                  )}

                  <View tw="flex flex-row items-center justify-end pt-3">
                    {hasSelection ? (
                      <Button
                        labelStyle="text-sm font-semibold text-teal-700"
                        mode="text"
                        onPress={() => handleAssignRoom(item.id, selectedRoomIds)}
                        uppercase
                        icon="check"
                        contentStyle="flex flex-row-reverse items-center"
                        disabled={isProcessing || !selectedRoomIds.length}
                      >
                        {isProcessing ? <ActivityIndicator size="small" /> : t('actions.assign')}
                      </Button>
                    ) : null}
                    <Button
                      labelStyle="text-sm font-semibold text-red-700"
                      mode="text"
                      onPress={() => setContactToDelete(item.id)}
                      uppercase
                      icon="trash-can-outline"
                      contentStyle="flex flex-row-reverse items-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? <ActivityIndicator size="small" /> : t('actions.delete')}
                    </Button>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      {hasBulkAssignButton && (
        <View tw="absolute bottom-4 left-4 right-4">
          <Button
            mode="contained"
            uppercase
            compact
            tw="w-full rounded-full"
            icon="check"
            onPress={handleBulkAssign}
            disabled={assignableContactIds.some((id) => processingContactIds.has(id))}
            contentStyle="py-2"
          >
            {t('Dashboard.Management.Delivery.legacyContactsScreen.assignSelected')}
          </Button>
        </View>
      )}
      <Portal>
        <Dialog
          visible={contactToDelete !== null}
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
              labelStyle="text-sm text-teal-700"
            >
              {t('actions.cancel')}
            </Button>
            <Button
              onPress={(evt) => {
                evt.stopPropagation();
                if (contactToDelete !== null) {
                  handleDeleteContact(contactToDelete);
                  setContactToDelete(null);
                }
              }}
              disabled={contactToDelete !== null && processingContactIds.has(contactToDelete)}
              labelStyle="text-sm text-red-700"
            >
              {t('actions.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(LegacyContacts, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
