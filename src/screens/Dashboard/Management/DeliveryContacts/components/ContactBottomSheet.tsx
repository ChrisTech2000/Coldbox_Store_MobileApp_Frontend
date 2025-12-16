import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { isValidPhoneNumber } from 'libphonenumber-js';

import * as BottomSheetUI from '#ui/components/BottomSheet';
import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { Select } from '#ui/components/Select';
import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useManagementStore } from '#stores/management';
import reportCrash from '#ui/lib/reportCrash';
import type { CoolingUnit } from '#types/global';
import type { GetDeliveryContactsResponse } from '#types/api.responses';

interface FormValues {
  contactName: string;
  phoneNumber: string;
  deliveryCompanyName: string;
  coolingUnitIds: number[];
}

type Contact = GetDeliveryContactsResponse[number];

type Props = {
  coolingUnits: CoolingUnit[];
};

export default function ContactBottomSheet({ coolingUnits }: Props) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const company = useManagementStore((store) => store.company);

  const [modalRef, modalActions] = BottomSheetUI.useBottomSheet();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [roomsDialogOpen, setRoomsDialogOpen] = useState<boolean>(false);
  const [roomSearchQuery, setRoomSearchQuery] = useState<string>('');
  const [roomsDialogInitialSelection, setRoomsDialogInitialSelection] = useState<number[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver((z) =>
      z.object({
        contactName: z
          .string()
          .min(1, {
            message: t('Dashboard.Management.Delivery.contactNameError'),
          })
          .default(''),
        phoneNumber: z
          .string()
          .min(1, { message: t('Auth.SignUp.schema.phoneError') })
          .default('')
          .refine((value) => isValidPhoneNumber(value), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
        deliveryCompanyName: z
          .string()
          .min(1, {
            message: t('Dashboard.Management.Delivery.companyNameError'),
          })
          .default(''),
        coolingUnitIds: z
          .array(z.number())
          .min(1, { message: t('Dashboard.Management.Delivery.selectRoom') }),
      })
    ),
  });

  useAppEventListener(
    APP_EVENTS.DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET,
    (contact: Contact | null) => {
      if (contact) {
        setEditingContact(contact);
        reset({
          contactName: contact.contactName,
          phoneNumber: contact.phone,
          deliveryCompanyName: contact.deliveryCompanyName,
          coolingUnitIds: contact.coolingUnitId
            ? Array.isArray(contact.coolingUnitId)
              ? contact.coolingUnitId
              : [contact.coolingUnitId]
            : [],
        });
      } else {
        setEditingContact(null);
        reset({
          contactName: '',
          phoneNumber: '',
          deliveryCompanyName: '',
          coolingUnitIds: [],
        });
      }
      modalActions.open();
    }
  );

  const { refetch } = useApiCall(
    'getLegacyContacts',
    () => MarketplaceService.getLegacyContacts(company!.id),
    undefined,
    {
      skip: true,
      defaultData: [],
    }
  );

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        if (!company) throw new Error();

        if (editingContact) {
          await MarketplaceService.updateDeliveryContact({
            contactId: editingContact.id,
            contactName: data.contactName,
            phone: data.phoneNumber,
            deliveryCompanyName: data.deliveryCompanyName,
            coolingUnitIds: data.coolingUnitIds,
          });

          toast.show(t('Dashboard.Management.Delivery.contactUpdatedSuccessfully'), {
            type: 'md_success',
            style: { marginBottom: 50 },
          });
        } else {
          await MarketplaceService.createDeliveryContact({
            contactName: data.contactName,
            phone: data.phoneNumber,
            deliveryCompanyName: data.deliveryCompanyName,
            coolingUnitIds: data.coolingUnitIds,
          });

          toast.show(t('Dashboard.Management.Delivery.contactedAddedSuccessfully'), {
            type: 'md_success',
            style: { marginBottom: 50 },
          });
        }

        modalActions.close();
        emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
        await refetch();
      } catch (error) {
        toast.show(t('navigation.error.serverErrorMessage'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
        reportCrash(error as Error);
      }
    },
    [company, editingContact, modalActions, refetch, toast, t]
  );

  return (
    <BottomSheetUI.Root ref={modalRef}>
      <BottomSheetUI.Content style="space-y-3 px-0">
        <Controller
          control={control}
          name="deliveryCompanyName"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-1"
              label={t('Dashboard.Management.Delivery.companyName')}
              mode="flat"
              placeholder={t('Dashboard.Management.Delivery.companyNamePlaceholder')}
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.deliveryCompanyName}
            />
          )}
        />
        {errors.deliveryCompanyName ? (
          <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
            {errors.deliveryCompanyName.message?.toString()}
          </Text>
        ) : null}

        <Controller
          control={control}
          name="contactName"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-1"
              label={t('Dashboard.Management.Delivery.contactName')}
              mode="flat"
              placeholder={t('Dashboard.Management.Delivery.contactNamePlaceholder')}
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.contactName}
            />
          )}
        />
        {errors.contactName ? (
          <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
            {errors.contactName.message?.toString()}
          </Text>
        ) : null}

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-1 mb-4"
              label={t('Dashboard.Management.Delivery.phoneNumber')}
              mode="flat"
              placeholder={t('Dashboard.Management.Delivery.phoneNumberPlaceholder')}
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.phoneNumber}
            />
          )}
        />
        {errors.phoneNumber ? (
          <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
            {errors.phoneNumber.message?.toString()}
          </Text>
        ) : null}

        <Controller
          control={control}
          name="coolingUnitIds"
          render={({ field: { value, onChange } }) => {
            const selectedIds = value || [];
            const summary =
              selectedIds.length > 0
                ? selectedIds
                    .map((id) => coolingUnits.find((u) => u.id === id)?.name || `Room ${id}`)
                    .join(', ')
                : '';
            const filteredRooms = (coolingUnits || []).filter((unit) =>
              unit.name.toLowerCase().includes(roomSearchQuery.toLowerCase())
            );
            return (
              <View tw="px-4">
                <Select
                  variant="md"
                  isOpen={roomsDialogOpen}
                  onOpenChange={(open) => {
                    setRoomsDialogOpen(open);
                    if (open) {
                      setRoomsDialogInitialSelection(selectedIds);
                    }
                    if (!open) setRoomSearchQuery('');
                  }}
                >
                  <Select.Touchable
                    label={t('Dashboard.Management.Delivery.selectRoom')}
                    displayValue={summary}
                  />
                  <Select.Dialog
                    enableScroll={false}
                    header={t('Dashboard.Management.Delivery.selectRoom')}
                    FooterElement={
                      <View tw="flex flex-row items-center justify-end pb-2">
                        <Button
                          mode="text"
                          uppercase
                          onPress={() => onChange(coolingUnits.map((u) => u.id))}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.all')}
                        </Button>
                        <Button
                          mode="text"
                          uppercase
                          onPress={() => onChange([])}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.none')}
                        </Button>
                        <Button
                          mode="text"
                          uppercase
                          onPress={() => {
                            onChange(roomsDialogInitialSelection);
                            setRoomsDialogOpen(false);
                            setRoomSearchQuery('');
                          }}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.cancel')}
                        </Button>
                        <Button
                          mode="text"
                          uppercase
                          onPress={() => setRoomsDialogOpen(false)}
                          labelStyle="text-sm text-teal-700"
                        >
                          {t('actions.ok')}
                        </Button>
                      </View>
                    }
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
                      keyExtractor={(item) => `room-select-${item.id}`}
                      renderItem={({ item }) => {
                        const isChecked = selectedIds.includes(item.id);
                        const toggle = () => {
                          if (isChecked) {
                            onChange(selectedIds.filter((id) => id !== item.id));
                          } else {
                            onChange([...selectedIds, item.id]);
                          }
                        };
                        return (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={toggle}
                            tw="flex flex-row items-center justify-between px-6 py-2 border-b border-gray-200"
                          >
                            <Text tw="text-base" numberOfLines={2}>
                              {item.name}
                            </Text>
                            <Checkbox
                              status={isChecked ? 'checked' : 'unchecked'}
                              onPress={toggle}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </Select.Dialog>
                </Select>
              </View>
            );
          }}
        />
        {errors.coolingUnitIds ? (
          <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
            {errors.coolingUnitIds.message?.toString()}
          </Text>
        ) : null}
      </BottomSheetUI.Content>
      <BottomSheetUI.Footer>
        <Button
          tw="w-5/6"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
          uppercase
        >
          {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.save')}
        </Button>
      </BottomSheetUI.Footer>
    </BottomSheetUI.Root>
  );
}
