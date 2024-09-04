import { currencies } from 'currencies.json';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Divider, IconButton, List, RadioButton, Switch } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { Sup } from '#ui/components/SuperscriptText';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useCheckInStore } from '#stores/checkIn';
import { useManagementStore } from '#stores/management';
import { CoolingUnit, ECoolingUnitMetric, EDateCropped, EPricingType, Farmer } from '#types/global';

import { CrateSetupModal } from './components/CrateSetupModal';
import { paperTheme } from '#ui/lib/theme';

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

  const harvestDateOptions = useMemo(
    () => [
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.today'),
        value: EDateCropped.TODAY,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.yesterday'),
        value: EDateCropped.YESTERDAY,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.dayBefore'),
        value: EDateCropped.DAY_BEFORE,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.evenBefore'),
        value: EDateCropped.EVEN_BEFORE,
      },
    ],
    [t]
  );

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
          <View tw="flex-col">
            <Text tw="text-base text-green-primary font-bold">Crop</Text>
            <List.Item
              tw="p-0 m-0 mt-3"
              title={undefined}
              onPress={(evt) => {
                evt?.stopPropagation();
                navigation.goBack();
              }}
              left={() => (
                <Text tw="text-base self-center">
                  {t('Dashboard.CrateManagement.CheckIn.Setup.selectedCrop')}
                </Text>
              )}
              right={(props) => (
                <View tw="flex-row items-center space-x-5">
                  <View tw="flex-col items-end space-y-1">
                    <Text tw="text-base">{crop.name}</Text>
                    {additionalInfo ? <Text tw="text-gray-500">{additionalInfo}</Text> : null}
                  </View>
                  <List.Icon {...props} icon="chevron-right" />
                </View>
              )}
            />
            <Divider tw={cn('bg-gray-400', !additionalInfo && 'mt-2')} />
          </View>

          <View tw="mt-8">
            <Text tw="text-base text-green-primary font-bold">Details</Text>
            <View tw="flex-col mt-3">
              <Text tw="text-base">
                {t('Dashboard.CrateManagement.CheckIn.Setup.numberOfCratesLabel')}
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View tw="w-full flex flex-row items-center justify-between">
                    <Input
                      tw={cn(
                        'w-1/2 px-4 bg-white border border-b-0 rounded-sm h-12 mt-1',
                        errors.numberOfCrates && 'border-red-300'
                      )}
                      keyboardType="numeric"
                      onChangeText={(newVal) =>
                        onChangeNumericKeyboard(newVal, onChange, 'numberOfCrates')
                      }
                      value={value?.toString() ?? ''}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="minus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(
                          !value ? 0 : Number(value) - 1,
                          onChange,
                          'numberOfCrates'
                        );
                      }}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="plus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange, 'numberOfCrates');
                      }}
                    />
                  </View>
                )}
                name="numberOfCrates"
              />
              {errors.numberOfCrates ? (
                <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">
                  {errors.numberOfCrates.message?.toString()}
                </Text>
              ) : null}
              <Divider tw="bg-gray-400 mt-4" />
            </View>

            <View tw="flex-col">
              <List.Item
                tw="p-0 m-0 mt-3"
                title={undefined}
                onPress={(evt) => evt?.stopPropagation()}
                left={() => <Text tw="text-base self-center">Sellable</Text>}
                right={() => <Switch value={false} onValueChange={() => undefined} />}
              />
              <Divider tw="bg-gray-400 mt-2" />
            </View>

            <View tw="flex-col mt-3">
              <View tw="flex flex-row">
                <Text tw="text-base">
                  {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightLabel')}
                </Text>
                <Sup>({t('Dashboard.ProduceDetails.kilogram').toUpperCase()})</Sup>
              </View>
              <Controller
                control={control}
                rules={{ required: true }}
                defaultValue={coolingUnit?.crateWeight ?? 25}
                render={({ field: { onChange, value } }) => (
                  <View tw="w-full flex flex-row justify-between items-center space-x-1">
                    <Input
                      tw="w-1/2 px-4 bg-white border rounded-sm h-12 mt-1"
                      onChangeText={(newVal) =>
                        onChangeNumericKeyboard(newVal, onChange, 'generalCrateWeight')
                      }
                      value={value?.toString() ?? ''}
                      keyboardType="numeric"
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="minus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(
                          !value ? 0 : Number(value) - 1,
                          onChange,
                          'generalCrateWeight'
                        );
                      }}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="plus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(
                          Number(value ?? 0) + 1,
                          onChange,
                          'generalCrateWeight'
                        );
                      }}
                    />
                  </View>
                )}
                name="generalCrateWeight"
              />
              {errors.generalCrateWeight ? (
                <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
                  {errors.generalCrateWeight.message?.toString()}
                </Text>
              ) : null}
              <Divider tw="bg-gray-400 mt-4" />
            </View>

            <View tw="flex-col">
              <List.Item
                tw="px-0 m-0"
                title={undefined}
                onPress={(evt) => {
                  evt?.stopPropagation();
                  onOpenModal('weight');
                }}
                left={() => (
                  <Text tw="text-base self-center">
                    {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateWeightButton')}
                  </Text>
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
            <View tw="flex-col mt-3">
              <Text tw="text-base">
                {t('Dashboard.CrateManagement.CheckIn.Setup.plannedDaysLabel')}
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View tw="w-full flex flex-row items-center justify-between">
                    <Input
                      tw="w-1/2 px-4 bg-white border rounded-sm h-12"
                      keyboardType="numeric"
                      onChangeText={(newVal) =>
                        onChangeNumericKeyboard(newVal, onChange, 'plannedDays')
                      }
                      value={value?.toString() ?? ''}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="minus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(
                          !value ? 0 : Number(value) - 1,
                          onChange,
                          'plannedDays'
                        );
                      }}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="plus"
                      size={30}
                      tw="rounded-md"
                      iconColor={paperTheme.colors.primary}
                      containerColor={paperTheme.colors.secondaryContainer}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange, 'plannedDays');
                      }}
                    />
                  </View>
                )}
                name="plannedDays"
              />
              <Divider tw="bg-gray-400 mt-4" />
            </View>

            <View tw="flex-col mt-3">
              <Text tw="text-base mb-1">
                {t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateLabel')}
              </Text>
              {errors.dateHarvested ? (
                <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">
                  {errors.dateHarvested.message?.toString()}
                </Text>
              ) : null}
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioButton.Group value={value?.toString() ?? ''} onValueChange={onChange}>
                    {harvestDateOptions.map((option, optionIdx) => (
                      <RadioButtonItem
                        key={`${option}-${optionIdx}`}
                        label={option.label}
                        value={option.value}
                        tw="flex flex-row-reverse ml-[-10]"
                      />
                    ))}
                  </RadioButton.Group>
                )}
                name="dateHarvested"
              />
            </View>
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

      <View tw="absolute bottom-0 right-0 w-full">
        <View tw="bg-teal-50 px-2 py-4 rounded-sm space-y-1">
          <View tw="flex flex-row items-center justify-between">
            <Text tw="text-lg ml-2">{dailyPriceLabel}</Text>
            <Text tw="text-lg ml-2 text-green-primary">
              {currencySymbol}
              {(coolingUnit?.commonPricingType.value ?? 0).toFixed(2)}
            </Text>
          </View>
          <View tw="flex flex-row items-center justify-between">
            <Text tw="text-lg ml-2">
              {t('Dashboard.CrateManagement.CheckIn.Setup.totalPriceLabel')}
            </Text>
            <Text tw="text-lg ml-2 text-green-primary">
              {currencySymbol}
              {totalPrice}
            </Text>
          </View>
        </View>
        <View tw="py-3 bg-white flex flex-row items-center justify-evenly border-t-0.5 border-gray-600 border-solid">
          <Button
            mode="outlined"
            tw="border border-red-400"
            labelStyle="text-red-400 text-lg"
            contentStyle="flex flex-row-reverse"
            icon="close-circle-outline"
            onPress={() =>
              navigation.navigate('CheckIn', {
                user: user as Farmer,
                coolingUnit: coolingUnit as CoolingUnit,
              })
            }
          >
            {t('actions.cancel')}
          </Button>
          <Button
            mode="contained"
            labelStyle="text-lg"
            contentStyle="flex flex-row-reverse"
            icon="check-circle-outline"
            onPress={handleSubmit(onSubmit)}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </View>
    </React.Fragment>
  );
}

export default withSafeArea(CrateSetup);
