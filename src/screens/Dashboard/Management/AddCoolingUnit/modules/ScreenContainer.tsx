import React, { useRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdRoom from '#assets/icons/coldroom.svg';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { paperTheme } from '#ui/lib/theme';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues } from '../contexts/FormManager';
import FormFields from '../components/FormFields';
import DataAggregator from '../contexts/DataAggregator';
import { METRIC_UNITS, PRICING_TYPE } from '../constants';

export default function ScreenContainer() {
  const initialFormValues = useRef<FormValues | undefined>(undefined);

  const { isLoading } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!initialFormValues.current) {
    initialFormValues.current = _buildInitialValues();
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <FormManager onSubmit={async (v) => console.log(v)} initialValues={initialFormValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
              <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
              <Text tw="text-lg">Add Cooling Unit Screen</Text>
            </View>
            <FormFields />
            <Button
              tw="w-11/12 self-center mt-7"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle-outline'}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </React.Fragment>
        )}
      </FormManager>
    </KeyboardAwareScrollView>
  );
}

export function _buildInitialValues() {
  return {
    name: '',
    location: null,
    coolingUnitType: null,
    priceType: PRICING_TYPE.PER_DAY,
    metricUnit: METRIC_UNITS.CRATES,
    price: 0,
    capacityInMetricTons: 0,
    foodCapacityInMetricTons: 0,
    roomLength: 0,
    roomWidth: 0,
    roomHeight: 0,
    roomWeight: 0,
    roomInsulator: 0,
    capacityInNumberCrates: 0,
    crateWeight: 25,
    crateLength: 0,
    crateWidth: 0,
    crateHeight: 0,
    editableCheckins: true,
    sensor: false,
    public: false,
    operators: [],
    crops: [],
    refrigerantType: '',
    amountRefrigerant: 0,
    powerConsumptionInMt: 0,
    dailyRoomWattage: 0,
    powerSource: null,
    electricityStorageSystem: null,
    powerSourceDieselConsumptionKwh: 0,
    pvPanelCount: 0,
    pvPanelType: null,
    pvPanelSize: 0,
    pvPanelWeight: 0,
    pvPanelMaxPower: 0,
    powerSourceDieselPercent: 0,
    powerSourceGridPercent: 0,
    powerSourcePvPercent: 0,
    powerSourceBiomassPercent: 0,
    batteryType: null,
    batteryCount: 0,
    batteryWeight: 0,
    batteryCapacity: 0,
    batteryMaxCurrent: 0,
    batteryPeakEnergyStorage: 0,
    thermalStorageMethod: null,
  } satisfies FormValues;
}
