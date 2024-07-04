import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Modal } from '#ui/components/Modal';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useToggle } from '#ui/hooks/useToggle';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues, DEFAULT_VALUES } from './AddLocation/components/FormManager';
import LocationNameModule from './AddLocation/modules/LocationNameModule';
import StepModule from './AddLocation/modules/StepModule';
import StepFactory from './AddLocation/modules/StepFactory';
import { getCountryFullName, pickFormValues } from './AddLocation/utils';

const width = (Dimensions.get('screen').width - 42) / 2;

const ButtonLoader = () => <ActivityIndicator animating size="small" color="white" />;

function EditLocation(props: ManagementRouteProps<'EditLocation'>) {
  const { locationId, companyId } = props.route.params;
  const navigation = props.navigation;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const [isModalVisible, toggleModalVisibility] = useToggle();
  const [isProcessing, toggleProcessing] = useToggle();

  const { t } = useTranslationUtils();
  const { mutate, cache } = useSWRConfig();

  const { data, isLoading } = useApiCall(
    'getLocation',
    ColdtivateService.getLocation,
    { locationId, companyId },
    {
      skip: !locationId || !companyId,
      defaultData: undefined,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  async function onSubmit(values: FormValues) {
    try {
      const data = pickFormValues(values);
      if (!data) throw new Error();

      await ColdtivateService.editLocation({ ...data, locationId });

      await Promise.all([
        mutate(getQueryKey('getLocation', { locationId, companyId })),
        mutate(getQueryKey('getLocations', companyId)),
      ]);
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  async function onDelete() {
    try {
      toggleModalVisibility();
      toggleProcessing();
      await ColdtivateService.deleteLocation(locationId);

      await mutate(getQueryKey('getLocations', companyId));
      cache.delete(getQueryKey('getLocation', { locationId, companyId }));
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  if (!formInitialValues.current) {
    const values = { ...DEFAULT_VALUES } as FormValues;
    values.name = data.name;
    values.country = getCountryFullName(data.company.country) ?? '';

    if (data.latitude) {
      values.latitude = data.latitude;
      values.longitude = data.longitude;
    } else {
      values._step = 'address';
      values.city = data.city;
      values.street = data.street;
      values.state = data.state;
      values.zipCode = data.zipCode;
      values.street = data.street;
      values.streetNumber = data.streetNumber ?? '';
    }

    formInitialValues.current = values;
  }

  return (
    <React.Fragment>
      <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
        {(handler, isSubmitting) => (
          <KeyboardAwareScrollView
            tw="h-full pt-5 mx-4"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <LocationNameModule />
            <StepModule />
            <StepFactory />
            <View tw="w-full flex-row items-center justify-between mt-5">
              <Button
                style={{ width }}
                mode="contained"
                onPress={toggleModalVisibility}
                icon={isProcessing ? undefined : 'trash-can-outline'}
                buttonColor={paperTheme.colors.error}
                uppercase
              >
                {isProcessing ? <ButtonLoader /> : t('actions.delete')}
              </Button>
              <Button
                style={{ width }}
                mode="contained"
                onPress={handler}
                icon={isSubmitting ? undefined : 'pencil'}
                uppercase
              >
                {isSubmitting ? <ButtonLoader /> : t('actions.edit')}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        )}
      </FormManager>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModalVisibility}>
          <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-48 max-h-48 p-8 self-center space-y-6">
            <Text variant="TitleSmall">{t('Dashboard.Management.modal.message')}</Text>
            <View tw="flex-row self-end space-x-2">
              <Button mode="text" onPress={toggleModalVisibility}>
                {t('actions.cancel')}
              </Button>
              <Button mode="text" onPress={onDelete}>
                {t('actions.ok')}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}

export default withSafeArea(EditLocation);
