import merge from 'lodash/merge';
import React, { useRef } from 'react';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { AddLocationOverlay } from '#screens/Dashboard/Tutorial/AddLocationOverlay';
import { EEmployeeTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

import FormManager, {
  DEFAULT_VALUES,
  type FormValues,
  type PreprocessedFormValues,
} from './components/FormManager';
import LocationNameModule from './modules/LocationNameModule';
import StepFactory from './modules/StepFactory';
import StepModule from './modules/StepModule';
import { Geocoder, getCountryFullName } from './utils';

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
      const geocoder = new Geocoder();
      let datums: Partial<PreprocessedFormValues> = {};

      switch (_step) {
        case 'geolocation':
        case 'coordinates': {
          try {
            const address = await geocoder.getAddressFromCoords({
              latitude: rest.latitude,
              longitude: rest.longitude,
            });
            datums = merge(rest, address);
          } catch (exception) {
            console.error(exception);
            return;
          }
          break;
        }
        case 'address': {
          try {
            const coordinates = await geocoder.getCoordsFromAddress(rest);
            datums = merge(rest, coordinates);
          } catch (exception) {
            toast.show(t('Dashboard.Management.Location.toasts.failedToFetchLocation'), {
              type: 'md_danger',
            });
            console.error(exception);
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
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
      toast.show(t('Dashboard.Management.Location.toasts.locationSubmissionError'), {
        type: 'md_danger',
      });
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
        <KeyboardAwareScrollView
          tw="pt-5 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <LocationNameModule />
          <StepModule />
          <StepFactory />
          <Button
            tw="w-full my-6"
            mode="contained"
            onPress={handler}
            icon={isSubmitting ? undefined : 'plus-circle'}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
          </Button>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(AddLocation, ['bottom'], true);
