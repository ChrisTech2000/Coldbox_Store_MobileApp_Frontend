import { currencies } from 'currencies.json';
import React, { useCallback, useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useCheckInStore } from '#stores/checkIn';
import { useManagementStore } from '#stores/management';
import {
  type CoolingUnit,
  type Farmer,
  ECoolingUnitMetric,
  EDateCropped,
  EPricingType,
} from '#types/global';

import { CrateSetupModal } from '../components/CrateSetupModal';
import CropDetails from './CropDetails';
import CratesAmount from './CratesAmount';
import PlannedDays from './PlannedDays';
import CropHarvest from './CropHarvest';
import FloatingFooter from './FloatingFooter';
import Sellable from './Sellable';

export type SetupSchema = {
  numberOfCrates: number;
  generalCrateWeight: number;
  crates: Array<{
    crateWeight: number;
    crateId: number | undefined;
  }>;
  plannedDays: number | undefined;
  dateHarvested: EDateCropped;
};

export type ModalMode = 'weight' | 'id' | undefined;

function CrateSetup({ route, navigation }: CheckInStackRouteProps<'CrateSetup'>) {
  const { additionalInfo, crop } = route.params;
  const { company } = useManagementStore();
  const { addProduce, coolingUnit, user } = useCheckInStore();

  const { t, zodResolver } = useTranslationUtils();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SetupSchema>({
    resolver: zodResolver((z, t) =>
      z.object({
        numberOfCrates: z
          .number()
          .min(1, {
            message: t('Dashboard.CrateManagement.CheckIn.Setup.cratesError'),
          })
          .default(0),
        generalWeight: z
          .number()
          .min(1, {
            message: t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightError'),
          })
          .default(coolingUnit?.crateWeight ?? 0),
        crates: z
          .object({
            crateWeight: z.number(),
            crateId: z.number().optional(),
          })
          .array(),
        plannedDays: z.number().optional(),
        dateHarvested: z
          .enum([
            EDateCropped.TODAY,
            EDateCropped.YESTERDAY,
            EDateCropped.DAY_BEFORE,
            EDateCropped.EVEN_BEFORE,
          ])
          .optional()
          .refine((date) => !!date, {
            message: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateError'),
          }),
      })
    ),
  });

  const [openModal, setOpenModal] = useState<ModalMode>(undefined);

  const plannedDays = watch('plannedDays');
  const numberOfCrates = watch('numberOfCrates');
  const generalCrateWeight = watch('generalCrateWeight');
  const crates = watch('crates');

  const currencySymbol = useMemo(() => {
    return currencies.find((c) => c.code === company?.currency)?.symbol ?? '';
  }, [company]);

  const totalPrice = useMemo(() => {
    const price = coolingUnit?.commonPricingType.value ?? 0;
    const multiplier =
      coolingUnit?.commonPricingType.type === EPricingType.PERIODICITY ? plannedDays ?? 0 : 1;

    if (coolingUnit?.commonPricingType.metric === ECoolingUnitMetric.KILOGRAMS) {
      if (!crates) return '0.00';
      const dailyPrice =
        crates?.reduce((acc, current) => (acc += current.crateWeight * price), 0) ?? 0;
      return (dailyPrice * multiplier).toFixed(2);
    }

    return (price * (crates?.length ?? 0) * multiplier).toFixed(2);
  }, [crates, coolingUnit, plannedDays]);

  const dailyPriceLabel = useMemo(() => {
    if (coolingUnit?.commonPricingType.type === EPricingType.FIXED) {
      return t('Dashboard.CrateManagement.CheckIn.Setup.fixedPriceLabel');
    }
    if (coolingUnit?.commonPricingType.metric === ECoolingUnitMetric.KILOGRAMS) {
      return t('Dashboard.CrateManagement.CheckIn.Setup.pricePerDayAndKilogramLabel');
    }
    return t('Dashboard.CrateManagement.CheckIn.Setup.pricePerDayAndCrateLabel');
  }, [coolingUnit]);

  const onChangeNumericKeyboard = useCallback(
    (
      newVal: string | number,
      onChange: (...event: unknown[]) => void,
      field?: keyof SetupSchema
    ) => {
      const value = Number(newVal);

      if (isNaN(value)) return;

      onChange(value);
      field && clearErrors(field);

      if (field === 'generalCrateWeight' && crates) {
        const crateWeight = value;
        setValue(
          'crates',
          crates.map((crate) => ({
            ...crate,
            crateWeight,
          }))
        );
      }

      if (field === 'numberOfCrates') {
        const numberOfCrates = value;
        const weight = generalCrateWeight ?? coolingUnit?.crateWeight ?? 25;

        let newCrates =
          !crates || crates.length === 0
            ? Array.from({ length: numberOfCrates }, () => ({
                crateWeight: weight,
                crateId: undefined,
              }))
            : [...crates];

        if (newCrates.length !== numberOfCrates) {
          if (newCrates.length < numberOfCrates) {
            const additionalCrates = Array.from(
              { length: numberOfCrates - newCrates.length },
              () => ({
                crateWeight: weight,
                crateId: undefined,
              })
            );
            newCrates = [...newCrates, ...additionalCrates];
          } else {
            newCrates = newCrates.slice(0, numberOfCrates);
          }
        }
        setValue('crates', newCrates);
      }
    },
    [crates, generalCrateWeight, coolingUnit]
  );

  const onOpenModal = useCallback(
    (mode: ModalMode) => {
      if (!numberOfCrates || numberOfCrates < 1) {
        setError('numberOfCrates', {
          message: t('Dashboard.CrateManagement.CheckIn.Setup.cratesError'),
        });
      } else {
        setOpenModal(mode);
      }
    },
    [numberOfCrates]
  );

  const onSubmit: SubmitHandler<SetupSchema> = useCallback(
    (values) => {
      if (!coolingUnit || !user) return;

      const dateHarvested = values.dateHarvested;
      let harvestDate = null;

      if (dateHarvested === EDateCropped.TODAY) {
        harvestDate = crop.harvestedToday;
      } else if (dateHarvested === EDateCropped.YESTERDAY) {
        harvestDate = crop.harvestedYesterday;
      } else if (dateHarvested === EDateCropped.DAY_BEFORE) {
        harvestDate = crop.harvestedDayBeforeYesterday;
      } else if (dateHarvested === EDateCropped.EVEN_BEFORE) {
        harvestDate = crop.harvestedBefore;
      }

      addProduce({
        crop: {
          id: crop.id,
          name: crop.name,
          image: crop.image,
        },
        additionalInfo,
        crates: values.crates.map((crate) => ({
          checkOut: null,
          weight: crate.crateWeight,
          tag: crate.crateId?.toString() ?? '',
          coolingUnitId: coolingUnit.id,
          plannedDays: values.plannedDays,
        })),
        initialGrade: null,
        harvestDate: (harvestDate ?? dateHarvested) as number,
        hasPicture: false, // TODO: confirm this in the future, but sending true returns a 500 error
      });

      navigation.navigate('CheckIn', {
        user: user ?? undefined,
        coolingUnit: coolingUnit ?? undefined,
      });
    },
    [coolingUnit, additionalInfo, crop, user]
  );

  return (
    <React.Fragment>
      <KeyboardAwareScrollView tw="p-4 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-48">
          <CropDetails cropName={crop.name} additionalInfo={additionalInfo} />

          <View tw="mt-8">
            <Text tw="text-base text-green-primary font-bold">Details</Text>
            <CratesAmount
              onChangeNumericKeyboard={onChangeNumericKeyboard}
              formControl={control}
              errorMessage={errors.numberOfCrates?.message}
            />
            <Sellable formControl={control} />

            <View tw="flex-col">
              <List.Item
                tw="px-0 m-0"
                title={undefined}
                onPress={(evt) => {
                  evt?.stopPropagation();
                  onOpenModal('weight');
                }}
                left={() => (
                  <View tw="flex-row">
                    <Text tw="text-base">Crate weight</Text>
                    <Sup>({t('Dashboard.ProduceDetails.kilogram').toUpperCase()})</Sup>
                    <Text tw="text-base">and pricing</Text>
                    <Sup>({company?.currency?.toUpperCase() ?? 'NGN'})</Sup>
                  </View>
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
              <Divider tw="bg-gray-400" />
            </View>

            <View tw="flex-col">
              <List.Item
                tw="px-0 m-0"
                title={undefined}
                onPress={(evt) => {
                  evt?.stopPropagation();
                  onOpenModal('id');
                }}
                left={() => (
                  <Text tw="text-base self-center">
                    {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateIdButton')}
                  </Text>
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
              <Divider tw="bg-gray-400" />
            </View>
          </View>

          <View tw="mt-8">
            <Text tw="text-base text-green-primary font-bold">Storage</Text>
            <PlannedDays onChangeNumericKeyboard={onChangeNumericKeyboard} formControl={control} />
            <CropHarvest formControl={control} errorMessage={errors.dateHarvested?.message} />
          </View>
        </View>

        <CrateSetupModal
          setValue={(crates: SetupSchema['crates']) => setValue('crates', crates)}
          crates={crates}
          mode={openModal}
          isOpen={openModal !== undefined}
          numberOfCrates={numberOfCrates}
          closeModal={() => setOpenModal(undefined)}
          title={openModal ? t(`Dashboard.CrateManagement.CheckIn.Setup.modals.${openModal}`) : ''}
        />
      </KeyboardAwareScrollView>

      <FloatingFooter
        dailyPriceLabel={dailyPriceLabel}
        currencySymbol={currencySymbol}
        commonPrice={(coolingUnit?.commonPricingType.value ?? 0).toFixed(2)}
        totalPrice={totalPrice}
        cancelFunc={(evt) => {
          evt.stopPropagation();
          navigation.navigate('CheckIn', {
            user: user as Farmer,
            coolingUnit: coolingUnit as CoolingUnit,
          });
        }}
        saveFunc={handleSubmit(onSubmit)}
      />
    </React.Fragment>
  );
}

export default withSafeArea(CrateSetup);
