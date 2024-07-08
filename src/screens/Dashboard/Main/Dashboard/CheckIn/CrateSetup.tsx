import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, RadioButton } from 'react-native-paper';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useManagementStore } from '#stores/management';
import { EDateCropped } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { RadioButtonItem } from '#ui/components/RadioButton';

type SetupSchema = {
  numberOfCrates: number;
  generalCrateWeight: number;
  crates: Array<{
    crateWeight: number;
    crateId: number;
  }>;
  plannedDays: number | undefined;
  dateHarvested: EDateCropped;
};

function CrateSetup({ route, navigation }: CheckInStackRouteProps<'CrateSetup'>) {
  const { crop, coolingUnit } = route.params;
  const { company } = useManagementStore();

  const { t, zodResolver } = useTranslationUtils();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetupSchema>({
    resolver: zodResolver((z, t) =>
      z.object({
        numberOfCrates: z.number().min(1, {
          message: t('Dashboard.CrateManagement.CheckIn.Setup.cratesError'),
        }),
        generalWeight: z
          .number()
          .min(1, {
            message: t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightError'),
          })
          .default(40),
        crates: z
          .object({
            crateWeight: z.number(),
            crateId: z.number().nullable(),
          })
          .array(),
        plannedDays: z.number().nullable(),
        dateHarvested: z
          .enum([
            EDateCropped.TODAY,
            EDateCropped.YESTERDAY,
            EDateCropped.DAY_BEFORE,
            EDateCropped.EVEN_BEFORE,
          ])
          .refine((date) => !!date, {
            message: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateError'),
          }),
      })
    ),
  });

  const plannedDays = watch('plannedDays');

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

  const onChangeNumericKeyboard = useCallback(
    (newVal: string, onChange: (...event: unknown[]) => void) =>
      !Number.isNaN(Number(newVal)) && onChange(newVal),
    []
  );

  const onSubmit = useCallback(() => {}, []);

  return (
    <ScrollView tw="p-4 bg-white space-y-6">
      <View tw="bg-blue-50 p-2 rounded-sm space-y-2">
        <View tw="flex flex-row items-center justify-between space-y-1">
          <Text variant="TextBold" tw="text-lg font-bold ml-2">
            {t('Dashboard.CrateManagement.CheckIn.Setup.selectedCrop')}
          </Text>
          <View tw="flex flex-row space-x-1">
            <Text variant="TextBold" tw="text-lg font-bold ml-2">
              {crop.name}
            </Text>
            <FastImage
              tw="w-10 h-6"
              source={{
                uri: `${API_BASE_URL}media/${crop.image}`,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
        <Button
          mode="contained"
          tw="bg-gray-300"
          labelStyle="text-black text-base font-bold"
          onPress={() => navigation.goBack()}
        >
          {t('Dashboard.CrateManagement.CheckIn.Setup.changeCropButton')}
        </Button>
      </View>

      <View>
        <Text variant="TextMedium" tw="text-lg font-bold">
          {t('Dashboard.CrateManagement.CheckIn.Setup.numberOfCratesLabel')}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              tw="w-full px-4 bg-white border rounded-sm h-12 mt-1"
              onChangeText={(newVal) => onChangeNumericKeyboard(newVal, onChange)}
              value={value?.toString()}
            />
          )}
          name="numberOfCrates"
        />
        {errors.numberOfCrates && (
          <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
            {errors.numberOfCrates.message?.toString()}
          </Text>
        )}
      </View>

      <View>
        <View tw="flex flex-row space-x-1">
          <Text variant="TextMedium" tw="text-lg font-bold">
            {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightLabel')}
          </Text>
          <Text variant="TextMedium" tw="text-lg font-bold text-green-primary">
            ({t('Dashboard.ProduceDetails.kilogram').toUpperCase()})
          </Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={40}
          render={({ field: { onChange, value } }) => (
            <View tw="w-full flex flex-row justify-between items-center space-x-1">
              <Input
                tw="w-1/2 px-4 bg-white border rounded-sm h-12 mt-1"
                onChangeText={(newVal) => onChangeNumericKeyboard(newVal, onChange)}
                value={value?.toString()}
                keyboardType="numeric"
              />
              <Button
                contentStyle="bg-green-50"
                labelStyle="text-lg"
                onPress={() => onChange(Number(value ?? 0) + 1)}
              >
                +
              </Button>
              <Button
                contentStyle="bg-green-50"
                labelStyle="text-lg"
                onPress={() => onChange(!value ? 0 : Number(value) - 1)}
              >
                -
              </Button>
            </View>
          )}
          name="generalCrateWeight"
        />
        {errors.generalCrateWeight && (
          <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
            {errors.generalCrateWeight.message?.toString()}
          </Text>
        )}
      </View>

      <View tw="flex flex-row w-full justify-between space-x-0.5 ml-[-10]">
        <IconButton
          tw="bg-gray-300 w-[50%]"
          icon={() => (
            <Text tw="w-full text-center font-bold text-wrap">
              {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateWeightButton')}
            </Text>
          )}
          onPress={() => null}
        />

        <IconButton
          tw="bg-gray-300 w-[50%] px-1"
          icon={() => (
            <Text tw="w-full text-center font-bold text-wrap">
              {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateIdButton')}
            </Text>
          )}
          onPress={() => null}
        />
      </View>

      <View>
        <Text variant="TextMedium" tw="text-lg font-bold">
          {t('Dashboard.CrateManagement.CheckIn.Setup.plannedDaysLabel')}
        </Text>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              tw="w-full px-4 bg-white border rounded-sm h-12 mt-1"
              onChangeText={(newVal) => onChangeNumericKeyboard(newVal, onChange)}
              value={value?.toString()}
              keyboardType="numeric"
            />
          )}
          name="plannedDays"
        />
      </View>

      <View tw="bg-blue-50 p-2 rounded-sm space-y-1">
        <View tw="flex flex-row items-center justify-between">
          <Text variant="TextBold" tw="text-lg font-bold ml-2">
            {t('Dashboard.CrateManagement.CheckIn.Setup.pricePerDayLabel')}
          </Text>
          <Text variant="TextBold" tw="text-lg font-bold ml-2 text-green-primary">
            {company?.currency} {coolingUnit.commonPricingType.value.toFixed(2)}
          </Text>
        </View>
        <View tw="flex flex-row items-center justify-between">
          <Text variant="TextBold" tw="text-lg font-bold ml-2">
            {t('Dashboard.CrateManagement.CheckIn.Setup.totalPriceLabel')}
          </Text>
          <Text variant="TextBold" tw="text-lg font-bold ml-2 text-green-primary">
            {company?.currency}{' '}
            {(coolingUnit.commonPricingType.value * (plannedDays ?? 0)).toFixed(2)}
          </Text>
        </View>
      </View>

      <View>
        <Text variant="TextMedium" tw="text-lg font-bold">
          {t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateLabel')}
        </Text>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
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

      <View tw="flex flex-row self-center space-x-2 mb-8">
        <Button
          mode="outlined"
          tw="border border-red-400"
          labelStyle="text-red-400 text-lg"
          contentStyle="flex flex-row-reverse"
          icon="close-circle-outline"
        >
          {t('actions.cancel')}
        </Button>
        <Button
          mode="contained"
          labelStyle="text-lg"
          contentStyle="flex flex-row-reverse"
          icon="check-circle-outline"
          onPress={() => handleSubmit(onSubmit)}
        >
          {t('actions.save-changes')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(CrateSetup);
