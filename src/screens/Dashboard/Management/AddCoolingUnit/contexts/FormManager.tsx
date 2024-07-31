import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { ValueOf } from '#types/miscellaneous';
import { useTranslationUtils } from '#i18n/utils';
import {
  PRICING_TYPE,
  METRIC_UNITS,
  type CoolingUnitTypes,
  type PowerSourcesIds,
  type ElectricityStorageIds,
  type PvPanelsTypes,
  type BatteryTypes,
  type ThermalStorageTypes,
} from '../constants';
import type { AddCoolingUnitParams } from '#types/api.params';

export type FormValues<T = string> = {
  //
  // Base Fields
  name: string; // cooling unit name
  location: number | null; // location identifier
  coolingUnitType: CoolingUnitTypes | null; // cooling unit description
  priceType: ValueOf<typeof PRICING_TYPE>;
  metricUnit: ValueOf<typeof METRIC_UNITS>;
  price: T;
  capacityInMetricTons: T; // total empty volume field
  foodCapacityInMetricTons: T; // max volume of food field
  roomLength: T; // cooling unit size → length
  roomWidth: T; // cooling unit size → width
  roomHeight: T; // cooling unit size → height
  roomWeight: T; // cooling unit size → weight
  roomInsulator: T; // insulator field
  capacityInNumberCrates: T; // max number of crates field
  crateWeight: T; // standard weight of a crate field
  crateLength: T; // dimensions of a standard crate → length
  crateWidth: T; // dimensions of a standard crate → width
  crateHeight: T; // dimensions of a standard crate → height
  editableCheckins: boolean; // make check-ins editable by operators field
  sensor: boolean; // sensor available field (sensor type, aka ecozen, etc) integration state
  public: boolean; // make cooling unit publicly available for potential cooling users field
  operators: Array<number>;
  crops: Array<number>; // commodities field
  cropSpecificPricing: AddCoolingUnitParams['cropUpdates'];
  refrigerantType: string; // type of refrigerant used field → REFRIGERANTS item/id
  amountRefrigerant: T; // amount of refrigerant field
  powerConsumptionInMt: T; // power consumption of cooling unit per MT field
  dailyRoomWattage: T; // daily wattage of the room field
  powerSource: PowerSourcesIds | null; // "how is the cooling unit powered?" field → POWER_SOURCE key/id
  electricityStorageSystem: ElectricityStorageIds | null; // electricity storage system field → ELECTRICITY_STORAGE key/id
  //
  // Power Source Conditional Fields
  // scope: generator
  powerSourceDieselConsumptionKwh: T;
  // scope: pvpanels
  pvPanelCount: T;
  pvPanelType: PvPanelsTypes | null;
  pvPanelSize: T;
  pvPanelWeight: T;
  pvPanelMaxPower: T;
  // scope: hybrid → it is basically the union of the generator and pvpanels fields with these:
  powerSourceDieselPercent: T;
  powerSourceGridPercent: T;
  powerSourcePvPercent: T;
  powerSourceBiomassPercent: T;
  //
  // Electricity Storage Conditional Fields
  // scope: hybrid → it is basically the union of the battery and thermal storage fields
  // scope: battery
  batteryType: BatteryTypes | null;
  batteryCount: T;
  batteryWeight: T;
  batteryCapacity: T;
  batteryMaxCurrent: T;
  batteryPeakEnergyStorage: T;
  // scope: thermal storage
  thermalStorageMethod: ThermalStorageTypes | null;
};

export type PreprocessedFormValues = FormValues<number>;

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
};

type FormManagerProps = {
  initialValues: FormValues;
  onSubmit: (values: PreprocessedFormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) => {
      const greaterThanEqual = z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0));
      const greaterThan = z.preprocess(
        (v) => (v ? Number(v) : 0),
        z.coerce.number().gt(0).positive()
      );

      const baseSchema = z.object({
        name: z.string().min(1),
        location: z.number().int().gt(0).positive(),
        coolingUnitType: z.string().min(1),
        priceType: z.string().min(1),
        metricUnit: z.string().min(1),
        price: greaterThan,
        capacityInMetricTons: greaterThan,
        foodCapacityInMetricTons: greaterThan,
        roomLength: greaterThanEqual.optional(),
        roomWidth: greaterThanEqual.optional(),
        roomHeight: greaterThanEqual.optional(),
        roomWeight: greaterThanEqual.optional(),
        roomInsulator: greaterThanEqual.optional(),
        capacityInNumberCrates: greaterThan,
        crateWeight: greaterThan,
        crateLength: greaterThanEqual.optional(),
        crateWidth: greaterThanEqual.optional(),
        crateHeight: greaterThanEqual.optional(),
        editableCheckins: z.boolean(),
        sensor: z.boolean(),
        public: z.boolean(),
        operators: z.array(z.number()),
        crops: z.array(z.number()),
        cropSpecificPricing: z.array(
          z.object({
            id: z.number().positive(),
            pricingType: z.string().min(1),
            dailyRate: z.coerce.number(),
            fixedRate: z.coerce.number(),
          })
        ),
        refrigerantType: z.string().optional(),
        amountRefrigerant: greaterThanEqual.optional(),
        powerConsumptionInMt: greaterThanEqual.optional(),
        dailyRoomWattage: greaterThanEqual.optional(),
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
        powerSourceDieselConsumptionKwh: z.preprocess(
          (v) => (v ? Number(v) : 0),
          z.coerce.number().positive()
        ),
      });

      const basePvPanelsPowerSource = z.object({
        pvPanelCount: greaterThanEqual.optional(),
        pvPanelType: z.string().nullable(),
        pvPanelSize: greaterThanEqual.optional(),
        pvPanelWeight: greaterThanEqual.optional(),
        pvPanelMaxPower: greaterThanEqual.optional(),
      });

      const generatorPowerSource = baseGeneratorPowerSource.extend({
        powerSource: z.literal('generator'),
      });

      const pvPanelsPowerSource = basePvPanelsPowerSource.extend({
        powerSource: z.literal('pvpanels'),
      });

      const hybridPowerSource = baseGeneratorPowerSource.merge(basePvPanelsPowerSource).extend({
        powerSource: z.literal('hybrid'),
        powerSourceDieselPercent: greaterThanEqual.optional(),
        powerSourceGridPercent: greaterThanEqual.optional(),
        powerSourcePvPercent: greaterThanEqual.optional(),
        powerSourceBiomassPercent: greaterThanEqual.optional(),
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
        batteryCount: greaterThanEqual.optional(),
        batteryWeight: greaterThanEqual.optional(),
        batteryCapacity: greaterThanEqual.optional(),
        batteryMaxCurrent: greaterThanEqual.optional(),
        batteryPeakEnergyStorage: greaterThanEqual.optional(),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submitHandler: form.handleSubmit(props.onSubmit as any),
    isSubmitting: form.formState.isSubmitting,
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
