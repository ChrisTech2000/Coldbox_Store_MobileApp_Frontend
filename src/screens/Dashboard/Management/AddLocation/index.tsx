import merge from 'lodash/merge';
import React, { useRef } from 'react';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { Point } from 'wkx';
import { useShallow } from 'zustand/react/shallow';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import reportCrash from '#ui/lib/reportCrash';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { AddLocationOverlay } from '#screens/Dashboard/Tutorial/AddLocationOverlay';
import { EEmployeeTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';
import { LocationGeocoder } from '#services/LocationGeocoder';

import FormManager, {
  DEFAULT_VALUES,
  type FormValues,
  type PreprocessedFormValues,
} from './components/FormManager';
import LocationNameModule from './modules/LocationNameModule';
import StepFactory from './modules/StepFactory';
import StepModule from './modules/StepModule';
import { getCountryFullName } from './utils';

function AddLocation(props: ManagementRouteProps<'AddLocation'>) {
  const { navigation } = props;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { mutate } = useSWRConfig();
  const company = useManagementStore(useShallow((store) => store.company));

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.ADD_LOCATION_STEP,
    OverlayComponent: AddLocationOverlay,
    fullScreen: true,
  });

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
            console.error(exception);
            toast.show(t('Dashboard.Management.Location.toasts.failedToFetchLocation'), {
              type: 'md_danger',
            });
            return;
          }
          break;
        }
        default:
          break;
      }

      await ColdtivateService.addLocation(datums);

      toast.show(t('Dashboard.Management.Location.toasts.addLocationSuccess'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getLocations', company?.id));
      navigation.navigate('Locations');
    } catch (exception) {
      toast.show(t('Dashboard.Management.Location.toasts.locationSubmissionError'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error);
    }
  }

  if (!formInitialValues.current) {
    const values = { ...DEFAULT_VALUES } as FormValues;
    values.country = getCountryFullName(company?.country) ?? '';
    formInitialValues.current = values;
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
      {(handler, isSubmitting) => (
        <View tw="flex-1">
          <KeyboardAwareScrollView
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="pt-5 mx-4 flex-1">
              <LocationNameModule />
              <StepModule />
              <StepFactory />
            </View>
          </KeyboardAwareScrollView>

          <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
            <Button
              tw="w-full"
              mode="contained"
              onPress={handler}
              icon={isSubmitting ? undefined : 'plus-circle'}
              uppercase
              testID="add-location-button"
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </HideWithKeyboardView>
        </View>
      )}
    </FormManager>
  );
}

export default withSafeArea(AddLocation, ['bottom'], true);
