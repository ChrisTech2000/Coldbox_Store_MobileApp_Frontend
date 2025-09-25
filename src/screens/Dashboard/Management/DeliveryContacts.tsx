import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Platform, View } from 'react-native';
import { ActivityIndicator, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import * as BottomSheetUI from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { cn } from '#ui/lib/cn';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-3',
  ios: 'mx-3',
});

interface FormValues {
  contactName: string;
  phoneNumber: string;
  deliveryCompanyName: string;
}

function DeliveryContacts() {
  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);

  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { data, isLoading, refetch } = useApiCall(
    'listDeliveryContacts',
    MarketplaceService.listDeliveryContacts,
    company!.id,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  useAppEventListener(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS, refetch);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        tw={cn('pt-3 bg-white', HORIZONTAL_SPACING)}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
      >
        <View tw="flex-1 pb-8">
          {!data?.length ? (
            <View tw="items-center space-y-3.5 mt-[50%]">
              <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
                <Icon name="phone-outline" size={60} color={paperTheme.colors.primary} />
              </View>
              <Text tw="text-base">{t('Dashboard.Management.Delivery.emptyMessage')}</Text>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => `contact-${item.contactName}-${index}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View tw="w-full px-5 py-3 space-y-3 border border-solid border-zinc-300 rounded-2xl my-2">
                  <View>
                    <View tw="flex flex-row items-center justify-between mb-2">
                      <Text tw="text-base">{t('Dashboard.Management.Delivery.companyName')}</Text>
                      <Text tw="text-base text-gray-500">{item.deliveryCompanyName}</Text>
                    </View>
                    <Divider tw="bg-gray-400" />
                  </View>

                  <View>
                    <View tw="flex flex-row items-center justify-between mb-2">
                      <Text tw="text-base">{t('Dashboard.Management.Delivery.contactName')}</Text>
                      <Text tw="text-base text-gray-500">{item.contactName}</Text>
                    </View>
                    <Divider tw="bg-gray-400" />
                  </View>

                  <View>
                    <View tw="flex flex-row items-center justify-between mb-2">
                      <Text tw="text-base">{t('Dashboard.Management.Delivery.phoneNumber')}</Text>
                      <Text tw="text-base text-gray-500">{item.phone}</Text>
                    </View>
                    <Divider tw="bg-gray-400" />
                  </View>

                  <View tw="flex flex-row justify-end">
                    <Button
                      labelStyle="text-red-700"
                      mode="text"
                      onPress={() => setContactToDelete(item.id)}
                      uppercase
                      icon="trash-can-outline"
                      contentStyle="flex flex-row-reverse items-center"
                    >
                      {t('actions.delete')}
                    </Button>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

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

      <BottomSheet />

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
              disabled={isProcessing}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              textColor={paperTheme.colors.error}
              onPress={async (evt) => {
                evt.stopPropagation();
                try {
                  setIsProcessing(true);
                  if (!contactToDelete || !company) throw new Error(); // safe guard

                  await MarketplaceService.deleteDeliveryContactId({
                    contactId: contactToDelete,
                    companyId: company.id,
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
                  setIsProcessing(false);
                }
              }}
              disabled={isProcessing}
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

function BottomSheet() {
  const { t, zodResolver } = useTranslationUtils();
  const isFocused = useIsFocused();
  const user = useAuthStore((store) => store.user);
  const toast = InAppNotifications.useToast();

  const [modalRef, modalActions] = BottomSheetUI.useBottomSheet();

  const {
    control,
    handleSubmit,
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
      })
    ),
  });

  useAppEventListener(APP_EVENTS.DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET, modalActions.open);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        const result = await MarketplaceService.createDeliveryContact({
          contactName: data.contactName,
          phone: data.phoneNumber,
          deliveryCompanyName: data.deliveryCompanyName,
        });

        if (result) {
          toast.show(t('Dashboard.Management.Delivery.contactedAddedSuccessfully'), {
            type: 'md_success',
            style: { marginBottom: 50 },
          });
          modalActions.close();
          emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
        }
      } catch (error) {
        toast.show(t('navigation.error.serverErrorMessage'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
        reportCrash(error as Error);
      }
    },
    [user, modalActions]
  );

  if (!isFocused) return null;

  return (
    <BottomSheetUI.Root ref={modalRef}>
      <BottomSheetUI.Content tw="mt-4 space-y-3">
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
              tw="w-full bg-transparent mt-1"
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
