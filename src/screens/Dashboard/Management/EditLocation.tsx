import merge from 'lodash/merge';
import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { Point } from 'wkx';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { LocationGeocoder } from '#services/LocationGeocoder';

import { parsePoint } from './utils';
import FormManager, {
  DEFAULT_VALUES,
  type FormValues,
  type PreprocessedFormValues,
} from './AddLocation/components/FormManager';
import LocationNameModule from './AddLocation/modules/LocationNameModule';
import StepFactory from './AddLocation/modules/StepFactory';
import StepModule from './AddLocation/modules/StepModule';
import { getCountryFullName } from './AddLocation/utils';

const width = (Dimensions.get('window').width - 42) / 2;

const ButtonLoader = () => <ActivityIndicator animating size="small" color="white" />;

function EditLocation(props: ManagementRouteProps<'EditLocation'>) {
  const { locationId, companyId } = props.route.params;
  const navigation = props.navigation;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const [isModalVisible, toggleModalVisibility] = useToggle();
  const [isProcessing, toggleProcessing] = useToggle();

  const { t } = useTranslationUtils();
  const { mutate, cache } = useSWRConfig();
  const toast = InAppNotifications.useToast();

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

  async function onSubmit(values: PreprocessedFormValues) {
    const { _step, ...rest } = values;

    try {
      let datums: Partial<PreprocessedFormValues> = {};

      switch (_step) {
        case 'geolocation':
        case 'coordinates': {
          const address = await LocationGeocoder.getAddressFromCoords({
            latitude: rest.latitude,
            longitude: rest.longitude,
          });
          datums = merge(rest, address);
          datums.point = new Point(
            rest.longitude,
            rest.latitude,
            undefined,
            undefined,
            4326
          ).toEwkt();
          break;
        }
        case 'address': {
          try {
            const coordinates = await LocationGeocoder.getCoordsFromAddress(rest);
            const point = new Point(
              coordinates.longitude,
              coordinates.latitude,
              undefined,
              undefined,
              4326
            ).toEwkt();
            datums = merge(rest, { point });
          } catch (exception) {
            toast.show(t('Dashboard.Management.Location.toasts.failedToFetchLocation'), {
              type: 'md_danger',
            });
            reportCrash(exception as Error);
            return;
          }
          break;
        }
        default:
          break;
      }

      await ColdtivateService.editLocation({ ...datums, locationId });

      toast.show(t('Dashboard.Management.Location.toasts.editLocationSuccess'), {
        type: 'md_success',
      });

      await Promise.allSettled([
        mutate(getQueryKey('getLocation', { locationId, companyId })),
        mutate(getQueryKey('getLocations', companyId)),
      ]);
      navigation.goBack();
    } catch (exception) {
      toast.show(t('Dashboard.Management.Location.toasts.locationSubmissionError'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error);
    }
  }

  async function onDelete() {
    try {
      toggleModalVisibility();
      toggleProcessing();
      await ColdtivateService.deleteLocation(locationId);

      toast.show(
        t('Dashboard.Management.Location.toasts.removeLocationSuccess', { name: data.name }),
        { type: 'md_success' }
      );

      await mutate(getQueryKey('getLocations', companyId));
      cache.delete(getQueryKey('getLocation', { locationId, companyId }));
      navigation.goBack();
    } catch (exception) {
      reportCrash(exception as Error);
    } finally {
      toggleProcessing();
    }
  }

  if (!formInitialValues.current) {
    const values = { ...DEFAULT_VALUES } as FormValues;
    values.name = data.name;
    values.country = getCountryFullName(data.company?.country) ?? ''; // TODO: we don't get the country we submitted, just the company country

    const point = parsePoint(data.point);
    values._step = 'coordinates';
    values.latitude = point.latitude?.toString();
    values.longitude = point.longitude?.toString();
    values.city = data.city ?? '';
    values.state = data.state ?? '';
    values.zipCode = data.zipCode ?? '';
    values.street = data.street ?? '';
    values.streetNumber = data.streetNumber?.toString() ?? '';

    formInitialValues.current = values;
  }

  return (
    <React.Fragment>
      <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
        {(handler, isSubmitting) => (
          <View tw="flex-1">
            <KeyboardAwareScrollView
              tw="h-full pt-5 mx-4"
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
            >
              <LocationNameModule />
              <StepModule />
              <StepFactory />
            </KeyboardAwareScrollView>

            <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
              <Button
                style={{ width }}
                mode="contained"
                onPress={toggleModalVisibility}
                icon={isProcessing ? undefined : 'trash-can-outline'}
                buttonColor={paperTheme.colors.error}
                disabled={isProcessing || isSubmitting}
                uppercase
              >
                {isProcessing ? <ButtonLoader /> : t('actions.delete')}
              </Button>
              <Button
                style={{ width }}
                mode="contained"
                onPress={handler}
                icon={isSubmitting ? undefined : 'pencil'}
                disabled={isProcessing || isSubmitting}
                uppercase
              >
                {isSubmitting ? <ButtonLoader /> : t('actions.save')}
              </Button>
            </HideWithKeyboardView>
          </View>
        )}
      </FormManager>

      <Portal>
        <Dialog
          visible={isModalVisible}
          onDismiss={toggleModalVisibility}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content>
            <Text tw="text-base">{t('Dashboard.Management.Location.modal.message')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleModalVisibility} disabled={isProcessing}>
              {t('actions.cancel')}
            </Button>
            <Button textColor={paperTheme.colors.error} onPress={onDelete} disabled={isProcessing}>
              {t('actions.ok')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}

export default withSafeArea(EditLocation, ['bottom'], true);
