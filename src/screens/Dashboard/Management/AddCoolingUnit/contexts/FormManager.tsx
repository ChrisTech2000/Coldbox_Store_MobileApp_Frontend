import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { ValueOf } from '#types/miscellaneous';
import { useTranslationUtils } from '#i18n/utils';
import {
  COOLING_UNIT_TYPES,
  PRICING_TYPE,
  METRIC_UNITS,
  type PowerSourcesIds,
  type ElectricityStorageIds,
  type PvPanelsTypes,
  type BatteryTypes,
  type ThermalStorageTypes,
} from '../constants';

export type FormValues = {
  //
  // Base Fields
  name: string; // cooling unit name
  location: number | null; // location identifier
  coolingUnitType: ValueOf<typeof COOLING_UNIT_TYPES> | null; // cooling unit description
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
  powerSource: PowerSourcesIds | null; // "how is the cooling unit powered?" field → POWER_SOURCE key/id
  electricityStorageSystem: ElectricityStorageIds | null; // electricity storage system field → ELECTRICITY_STORAGE key/id
  //
  // Power Source Conditional Fields
  // scope: generator
  powerSourceDieselConsumptionKwh: number;
  // scope: pvpanels
  pvPanelCount: number;
  pvPanelType: PvPanelsTypes | null;
  pvPanelSize: number;
  pvPanelWeight: number;
  pvPanelMaxPower: number;
  // scope: hybrid → it is basically the union of the generator and pvpanels fields with these:
  powerSourceDieselPercent: number;
  powerSourceGridPercent: number;
  powerSourcePvPercent: number;
  powerSourceBiomassPercent: number;
  //
  // Electricity Storage Conditional Fields
  // scope: hybrid → it is basically the union of the battery and thermal storage fields
  // scope: battery
  batteryType: BatteryTypes | null;
  batteryCount: number;
  batteryWeight: number;
  batteryCapacity: number;
  batteryMaxCurrent: number;
  batteryPeakEnergyStorage: number;
  // scope: thermal storage
  thermalStorageMethod: ThermalStorageTypes | null;
};

export function buildInitialValues(): FormValues {
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
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) => {
      const baseSchema = z.object({
        name: z.string().min(1),
        location: z.number().gt(0).positive(),
        coolingUnitType: z.string().min(1),
        priceType: z.string().min(1),
        metricUnit: z.string().min(1),
        price: z.number().gt(0).positive(),
        capacityInMetricTons: z.number().positive(),
        foodCapacityInMetricTons: z.number().positive(),
        roomLength: z.number().gte(0).optional(),
        roomWidth: z.number().gte(0).optional(),
        roomHeight: z.number().gte(0).optional(),
        roomWeight: z.number().gte(0).optional(),
        roomInsulator: z.number().gte(0).optional(),
        capacityInNumberCrates: z.number().gt(0).positive(),
        crateWeight: z.number().gt(0).positive(),
        crateLength: z.number().gte(0).optional(),
        crateWidth: z.number().gte(0).optional(),
        crateHeight: z.number().gte(0).optional(),
        editableCheckins: z.boolean(),
        sensor: z.boolean(),
        public: z.boolean(),
        operators: z.array(z.number()),
        crops: z.array(z.number()),
        refrigerantType: z.string().optional(),
        amountRefrigerant: z.number().gte(0).optional(),
        powerConsumptionInMt: z.number().gte(0).optional(),
        dailyRoomWattage: z.number().gte(0).optional(),
        powerSource: z.union([
          z.literal('generator'),
          z.literal('pvpanels'),
          z.literal('hybrid'),
          z.literal('biomass'),
          z.literal('grid'),
          z.literal(null),
        ]),
        electricityStorageSystem: z.union([
          z.literal('battery'),
          z.literal('thermal storage'),
          z.literal('hybrid'),
          z.literal('none'),
          z.literal(null),
        ]),
      });

      const baseGeneratorPowerSource = z.object({
        powerSourceDieselConsumptionKwh: z.number().positive(),
      });

      const basePvPanelsPowerSource = z.object({
        pvPanelCount: z.number().gte(0).optional(),
        pvPanelType: z.string().nullable(),
        pvPanelSize: z.number().gte(0).optional(),
        pvPanelWeight: z.number().gte(0).optional(),
        pvPanelMaxPower: z.number().gte(0).optional(),
      });

      const generatorPowerSource = baseGeneratorPowerSource.extend({
        powerSource: z.literal('generator'),
      });

      const pvPanelsPowerSource = basePvPanelsPowerSource.extend({
        powerSource: z.literal('pvpanels'),
      });

      const hybridPowerSource = baseGeneratorPowerSource.merge(basePvPanelsPowerSource).extend({
        powerSource: z.literal('hybrid'),
        powerSourceDieselPercent: z.number().gte(0).optional(),
        powerSourceGridPercent: z.number().gte(0).optional(),
        powerSourcePvPercent: z.number().gte(0).optional(),
        powerSourceBiomassPercent: z.number().gte(0).optional(),
      });

      const powerSourceConditions = z.discriminatedUnion('powerSource', [
        generatorPowerSource,
        pvPanelsPowerSource,
        hybridPowerSource,
        z.object({ powerSource: z.literal('grid') }),
        z.object({ powerSource: z.literal('biomass') }),
        z.object({ powerSource: z.literal(null) }),
      ]);

      const schemaWithPowerSource = z.intersection(baseSchema, powerSourceConditions);

      const baseBatteryStorage = z.object({
        batteryType: z.string().nullable(),
        batteryCount: z.number().gte(0).optional(),
        batteryWeight: z.number().gte(0).optional(),
        batteryCapacity: z.number().gte(0).optional(),
        batteryMaxCurrent: z.number().gte(0).optional(),
        batteryPeakEnergyStorage: z.number().gte(0).optional(),
      });

      const baseThermalStorage = z.object({
        thermalStorageMethod: z.string().nullable(),
      });

      const electricityBatteryStorage = baseBatteryStorage.extend({
        electricityStorageSystem: z.literal('battery'),
      });

      const electricityThermalStorage = baseThermalStorage.extend({
        electricityStorageSystem: z.literal('thermal storage'),
      });

      const electricityHybridStorage = baseBatteryStorage.merge(baseThermalStorage).extend({
        electricityStorageSystem: z.literal('hybrid'),
      });

      const electricityStorageConditions = z.discriminatedUnion('electricityStorageSystem', [
        electricityBatteryStorage,
        electricityThermalStorage,
        electricityHybridStorage,
        z.object({ electricityStorageSystem: z.literal('none') }),
        z.object({ electricityStorageSystem: z.literal(null) }),
      ]);

      return z.intersection(schemaWithPowerSource, electricityStorageConditions);
    }),
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
