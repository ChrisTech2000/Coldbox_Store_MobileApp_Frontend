import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { ValueOf } from '#types/miscellaneous';
import type { ElectricityStorageIds, PowerSourcesIds } from '../constants';
import { useTranslationUtils } from '#i18n/utils';

export const PRICING_TYPE = {
  FIXED: 'FIXED',
  PER_DAY: 'PERIODICITY',
} as const;

export const METRIC_UNITS = {
  CRATES: 'CRATES',
  KG: 'KILOGRAMS',
} as const;

export type FormValues = {
  name: string; // cooling unit name
  location: number; // location identifier
  coolingUnitType: string; // cooling unit description
  priceType: ValueOf<typeof PRICING_TYPE>;
  metricUnit: ValueOf<typeof METRIC_UNITS>;
  price: number;
  capacityInMetricTons: number; // total empty volume field
  foodCapacityInMetricTons: number; // max volume of food field
  roomLength: number; // cooling unit size → length
  roomWidth: number; // cooling unit size → width
  roomHeight: number; // cooling unit size → height
  roomWeight: number; // cooling unit size → weight
  roomInsulator: number; // insulator field
  capacityInNumberCrates: number; // max number of crates field
  crateWeight: number; // standard weight of a crate field
  crateLength: number; // dimensions of a standard crate → length
  crateWidth: number; // dimensions of a standard crate → width
  crateHeight: number; // dimensions of a standard crate → height
  editableCheckins: boolean; // make check-ins editable by operators field
  sensor: boolean; // sensor available field (sensor type, aka ecozen, etc) integration state
  public: boolean; // make cooling unit publicly available for potential cooling users field
  operators: Array<number>;
  crops: Array<number>; // commodities field
  refrigerantType: string; // type of refrigerant used field → REFRIGERANTS item/id
  amountRefrigerant: number; // amount of refrigerant field
  powerConsumptionInMt: number; // power consumption of cooling unit per MT field
  dailyRoomWattage: number; // daily wattage of the room field
  powerSource: PowerSourcesIds; // "how is the cooling unit powered?" field → POWER_SOURCE key/id
  electricityStorageSystem: ElectricityStorageIds; // electricity storage system field → ELECTRICITY_STORAGE key/id
};

export function buildInitialValues(): FormValues {
  return {
    name: '',
    location: 0,
    coolingUnitType: '',
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
    crateWeight: 0,
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
    powerSource: '',
    electricityStorageSystem: '',
  };
}

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
};

type FormManagerProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver((z) => z.null()),
    reValidateMode: 'onSubmit',
  });

  const callbackProps = {
    submitHandler: form.handleSubmit(props.onSubmit),
    isSubmitting: form.formState.isSubmitting,
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
