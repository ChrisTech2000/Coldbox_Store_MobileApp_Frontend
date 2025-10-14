import React, { useCallback, useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Platform, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import launchArgs from '#constants/launch.args';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { ListItemArrow } from '#screens/Dashboard/AccountDetails/components/ListItemArrow';
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
import {
  resetCrateWeightPricingBridge,
  useCrateWeightPricingBridge,
} from '../CrateWeightAndPricing';
import CratesAmount from './CratesAmount';
import CropDetails from './CropDetails';
import CropHarvest from './CropHarvest';
import FloatingFooter from './FloatingFooter';
import PlannedDays from './PlannedDays';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

export type SetupSchema = {
  numberOfCrates: number;
  generalCrateWeight: number;
  crates: Array<{
    weight: number;
    tag: string | undefined;
    isSellable: boolean | undefined;
  }>;
  plannedDays: number | undefined;
  dateHarvested: EDateCropped;
  price: number | undefined;
};

function CrateSetup({ route, navigation }: CheckInStackRouteProps<'CrateSetup'>) {
  const contextualCrop =
    'contextualProduce' in route.params ? route.params.contextualProduce.crop : route.params.crop;
  const contextualAdditionalInfo =
    'contextualProduce' in route.params
      ? (route.params.contextualProduce?.additionalInfo ?? '')
      : (route.params?.additionalInfo ?? '');

  const company = useManagementStore((store) => store.company);
  const [addProduce, coolingUnit, user, removeProduce] = useCheckInStore((store) => [
    store.addProduce,
    store.coolingUnit,
    store.user,
    store.removeProduce,
  ]);

  const { t, zodResolver } = useTranslationUtils();
  const locale = LanguageManager.read();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SetupSchema>({
    ...('contextualProduce' in route.params
      ? {
          defaultValues: {
            numberOfCrates: route.params.contextualProduce.crates.length,
            generalCrateWeight: coolingUnit?.crateWeight ?? 25,
            crates: route.params.contextualProduce.crates ?? [],
            plannedDays: route.params.contextualProduce.crates[0].plannedDays,
            price: route.params.contextualProduce.price,
            dateHarvested: route.params.contextualProduce.harvestDate,
          },
        }
      : {}),
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
            weight: z.number(),
            tag: z.string().regex(/^\d+$/).optional(),
            isSellable: z.boolean(),
          })
          .array(),
        plannedDays: z.number().optional(),
        price: z.number().optional(),
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

  const [openModal, setOpenModal] = useState<boolean>(false);

  useCrateWeightPricingBridge((values) => {
    reset((state) => ({
      ...state,
      crates: values.crates.map((crate) => ({
        tag: crate.tag,
        weight: crate.weight,
        isSellable: crate.isSellable,
      })),
      numberOfCrates: values.crates.length,
      price: values.price,
    }));
  });

  const plannedDays = watch('plannedDays');
  const numberOfCrates = watch('numberOfCrates');
  const generalCrateWeight = watch('generalCrateWeight');
  const crates = watch('crates');

  const effectivePricing = useMemo(() => {
    const cropPricing = coolingUnit?.crops.find((c) => c.cropId === contextualCrop.id);

    if (cropPricing?.pricing) {
      const pricingType = cropPricing.pricing.pricingType;
      const price =
        pricingType === EPricingType.PERIODICITY
          ? cropPricing.pricing.dailyRate
          : cropPricing.pricing.fixedRate;
      return { price, type: pricingType };
    }

    return {
      price: coolingUnit?.commonPricingType?.value ?? 0,
      type: coolingUnit?.commonPricingType?.type,
    };
  }, [coolingUnit, contextualCrop.id]);

  const totalPrice = useMemo(() => {
    if (!crates || crates.length === 0) return '0.00';

    const { price, type } = effectivePricing;
    const metric = coolingUnit?.commonPricingType?.metric;

    return crates
      .reduce((acc, crate) => {
        const metricMultiplier = metric === ECoolingUnitMetric.KILOGRAMS ? crate.weight : 1;

        if (type === EPricingType.FIXED) {
          acc += metricMultiplier * price;
        } else {
          const multiplier = plannedDays ? plannedDays : 1;
          acc += metricMultiplier * multiplier * price;
        }

        return acc;
      }, 0)
      .toFixed(2);
  }, [crates, coolingUnit, plannedDays, effectivePricing]);

  const dailyPriceLabel = useMemo(() => {
    if (effectivePricing.type === EPricingType.FIXED) {
      return t('Dashboard.CrateManagement.CheckIn.Setup.fixedPriceLabel');
    }
    if (coolingUnit?.commonPricingType?.metric === ECoolingUnitMetric.KILOGRAMS) {
      return t('Dashboard.CrateManagement.CheckIn.Setup.pricePerDayAndKilogramLabel');
    }
    return t('Dashboard.CrateManagement.CheckIn.Setup.pricePerDayAndCrateLabel');
  }, [coolingUnit, effectivePricing]);

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
                weight,
                tag: undefined,
                isSellable: false,
              }))
            : [...crates];

        if (newCrates.length !== numberOfCrates) {
          if (newCrates.length < numberOfCrates) {
            const additionalCrates = Array.from(
              { length: numberOfCrates - newCrates.length },
              () => ({
                weight,
                tag: undefined,
                isSellable: false,
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

  const onOpenModal = useCallback(() => {
    if (!numberOfCrates || numberOfCrates < 1) {
      setError('numberOfCrates', {
        message: t('Dashboard.CrateManagement.CheckIn.Setup.cratesError'),
      });
    } else {
      setOpenModal((state) => !state);
    }
  }, [numberOfCrates]);

  const onSubmit: SubmitHandler<SetupSchema> = useCallback(
    (values) => {
      if (!coolingUnit || !user) return;

      if ('contextualProduce' in route.params) {
        removeProduce(route.params.contextualProduce);
      }

      addProduce({
        crop: contextualCrop,
        additionalInfo: contextualAdditionalInfo,
        crates: values.crates.map((crate) => ({
          checkOut: null,
          weight: crate.weight,
          tag: crate.tag?.toString() ?? '',
          coolingUnitId: coolingUnit.id,
          plannedDays: values.plannedDays,
          isSellable: crate.isSellable,
        })),
        initialGrade: null,
        harvestDate: values.dateHarvested,
        hasPicture: false, // TODO: confirm this in the future, but sending true returns a 500 error
        price: values.price,
      });

      resetCrateWeightPricingBridge();
      reset();
      navigation.navigate('CheckIn', {
        user: user ?? undefined,
        coolingUnit: coolingUnit ?? undefined,
      });
    },
    [coolingUnit, contextualAdditionalInfo, contextualCrop, user, reset, route.params]
  );

  const cropName = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    return find(buildMap(), {
      name: contextualCrop.name,
      country: company?.country,
      locale,
    });
  }, [contextualCrop, company?.country, locale]);

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        tw={cn('py-4 bg-white', HORIZONTAL_SPACING)}
        showsVerticalScrollIndicator={false}
      >
        <View tw="flex-1 pb-48">
          <CropDetails cropName={cropName} additionalInfo={contextualAdditionalInfo} />

          <View tw="mt-8">
            <Text tw="text-base text-green-primary font-bold">Details</Text>
            <CratesAmount
              onChangeNumericKeyboard={onChangeNumericKeyboard}
              formControl={control}
              errorMessage={errors.numberOfCrates?.message}
            />

            <View tw="flex-col">
              <List.Item
                tw="px-0 m-0"
                title={undefined}
                disabled={!crates || crates.length === 0}
                onPress={(evt) => {
                  evt.stopPropagation();
                  const totalWeight = crates.reduce(
                    (acc, curr) => (curr.isSellable ? (acc += curr.weight) : acc),
                    0
                  );
                  const sellingPrice = (getValues('price') ?? 0) / totalWeight;
                  const contextualCrates = crates.map((crate) => ({
                    weight: crate.weight,
                    isSellable: crate.isSellable ?? false,
                    tag: crate.tag,
                  }));
                  navigation.navigate('CrateWeightAndPricing', {
                    companyCurrency: company?.currency?.toUpperCase() ?? DEFAULT_CURRENCY_CODE,
                    crates: contextualCrates,
                    sellingPrice: isNaN(sellingPrice) ? 0 : sellingPrice,
                    applyToAll: contextualCrates.every(
                      (crate, _, array) => crate.isSellable && crate.weight === array[0].weight
                    ),
                  });
                }}
                left={() => (
                  <Text tw={cn('text-base', !crates || crates.length === 0 ? 'text-gray-400' : '')}>
                    {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightLabel')}
                  </Text>
                )}
                right={(props) => (
                  <ListItemArrow
                    {...props}
                    color={!crates || crates.length === 0 ? colors.gray[400] : colors.gray[800]}
                  />
                )}
              />
              <Divider tw="bg-gray-400" />
            </View>

            <View tw="flex-col">
              <List.Item
                tw="px-0 m-0"
                title={undefined}
                onPress={(evt) => {
                  evt?.stopPropagation();
                  onOpenModal();
                }}
                left={() => (
                  <Text tw="text-base self-center">
                    {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateIdButton')}
                  </Text>
                )}
                right={ListItemArrow}
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
          isOpen={openModal}
          numberOfCrates={numberOfCrates}
          closeModal={() => setOpenModal(false)}
          title={openModal ? t(`Dashboard.CrateManagement.CheckIn.Setup.modals.id`) : ''}
        />
      </KeyboardAwareScrollView>

      <HideWithKeyboardView isE2e={launchArgs.isE2E}>
        <FloatingFooter
          dailyPriceLabel={dailyPriceLabel}
          currencyCode={company?.currency || DEFAULT_CURRENCY_CODE}
          commonPrice={effectivePricing.price.toFixed(2)}
          totalPrice={totalPrice}
          cancelFunc={(evt) => {
            evt.stopPropagation();
            resetCrateWeightPricingBridge();
            reset();
            navigation.navigate('CheckIn', {
              user: user as Farmer,
              coolingUnit: coolingUnit as CoolingUnit,
            });
          }}
          saveFunc={handleSubmit(onSubmit)}
        />
      </HideWithKeyboardView>
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(CrateSetup, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
