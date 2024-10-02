import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';
import merge from 'lodash/merge';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, {
  type FormValues,
  DEFAULT_VALUES,
  type PreprocessedFormValues,
} from './components/FormManager';
import LocationNameModule from './modules/LocationNameModule';
import StepModule from './modules/StepModule';
import StepFactory from './modules/StepFactory';

import { Geocoder, getCountryFullName } from './utils';
import InAppNotifications from '#common/InAppNotifications';

function AddLocation(props: ManagementRouteProps<'AddLocation'>) {
  const { navigation } = props;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { mutate } = useSWRConfig();
  const company = useManagementStore(useShallow((store) => store.company));

  async function onSubmit(values: PreprocessedFormValues) {
    try {
      const { _step, ...rest } = values;

      let datums: Partial<PreprocessedFormValues> = {};
      const geocoder = new Geocoder();

      switch (_step) {
        case 'geolocation':
        case 'coordinates': {
          const address = await geocoder.getAddressFromCoords({
            latitude: rest.latitude,
            longitude: rest.longitude,
          });
          datums = merge(rest, address);
          break;
        }
        case 'address': {
          const coordinates = await geocoder.getCoordsFromAddress(rest);
          datums = merge(rest, coordinates);
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
