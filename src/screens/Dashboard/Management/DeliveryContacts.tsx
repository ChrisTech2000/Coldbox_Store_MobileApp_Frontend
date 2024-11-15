import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import validator from 'validator';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';

interface FormValues {
  contactName: string;
  phoneNumber: string;
  deliveryCompanyName: string;
}

function DeliveryContacts() {
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);

  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  const { data, isLoading, refetch } = useApiCall(
    'listDeliveryContacts',
    MarketplaceService.listDeliveryContacts,
    company!.id,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  useAppEventListener('DISPATCH_RELOAD_DELIVERY_CONTACTS', refetch);

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
        tw="px-3 pt-3 bg-white"
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
          onPress={() => emitter.emit('DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET', null)}
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
            >
              {t('actions.cancel')}
            </Button>
            <Button
              textColor={paperTheme.colors.error}
              onPress={async (evt) => {
                evt.stopPropagation();
                await MarketplaceService.deleteDeliveryContactId({
                  contactId: contactToDelete as number,
                  companyId: company!.id,
                });
                refetch();
                setContactToDelete(null);
              }}
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

  const modalRef = useRef<Modalize>(null);

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
          .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
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

  useAppEventListener('DISPATCH_DELIVERY_CONTACT_BOTTOM_SHEET', () => {
    modalRef.current?.open();
  });

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
          modalRef.current?.close();
          emitter.emit(APP_EVENTS.DISPATCH_RELOAD_DELIVERY_CONTACTS);
        }
      } catch (error) {
        toast.show(t('navigation.error.errorMessage'), {
          type: 'md_danger',
          style: { marginBottom: 50 },
        });
      }
    },
    [user]
  );

  if (!isFocused) return null;

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="mt-4 space-y-3 mb-5">
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
          {errors.deliveryCompanyName && (
            <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
              {errors.deliveryCompanyName.message?.toString()}
            </Text>
          )}

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
          {errors.contactName && (
            <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
              {errors.contactName.message?.toString()}
            </Text>
          )}

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
          {errors.phoneNumber && (
            <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
              {errors.phoneNumber.message?.toString()}
            </Text>
          )}
        </View>

        <View tw="pb-10 items-center">
          <Button
            tw="w-[48%]"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.save')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
