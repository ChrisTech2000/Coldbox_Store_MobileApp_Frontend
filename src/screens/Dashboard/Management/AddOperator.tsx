import React, { useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Banner, Checkbox, Divider, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import colors from 'tailwindcss/colors';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

type FormValues = {
  phoneNumber: string;
  coolingUnits: Array<number>;
};

function AddOperator() {
  const [isModalVisible, toggleModalVisibility] = useToggle();
  const { t, zodResolver } = useTranslationUtils();
  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      company: company?.id as number,
    },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const options = useMemo(
    () =>
      data?.map((coolingUnit) => ({
        id: coolingUnit.id,
        name: coolingUnit.name,
      })) ?? [],
    [data]
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { phoneNumber: '', coolingUnits: [] },
    resolver: zodResolver((z) =>
      z.object({
        phoneNumber: z.string().min(2),
        coolingUnits: z.array(z.number()).min(1),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const [internalSelection, setInternalSelection] = useState<Array<number>>([]);
  const selectedCoolingUnits = watch('coolingUnits');

  const selectLabel = useMemo(() => {
    const selectedOptions = options
      .filter((option) => selectedCoolingUnits.includes(option.id))
      .map((option) => option.name);
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select a cooling unit';
  }, [options, selectedCoolingUnits]);

  async function onSubmit(values: FormValues) {
    console.log(values);
  }

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      tw="h-full pt-5 space-y-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <View tw="mx-4">
        <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
          <Banner
            visible
            elevation={0}
            style={{ backgroundColor: paperTheme.colors.elevation.level3 }}
          >
            After adding the user, they will receive an sms with an invitation link, where they can
            activate their account.
          </Banner>
        </SkiaShadow>

        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent my-7"
              label="Phone number"
              mode="outlined"
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.phoneNumber}
            />
          )}
          name="phoneNumber"
        />

        <View tw="space-y-4">
          <Select
            variant="md"
            label={selectLabel}
            isModalOpen={isModalVisible}
            onClick={toggleModalVisibility}
            error={!!errors.coolingUnits}
            content={{
              options: (
                <React.Fragment>
                  {options.map((option, optionIdx) => (
                    <Checkbox.Item
                      key={`cooling-unit-item-${option.id}-#${optionIdx}`}
                      label={option.name}
                      status={internalSelection.includes(option.id) ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setInternalSelection((prev) => {
                          const clone = [...prev];
                          const idx = clone.indexOf(option.id);
                          if (idx === -1) clone.push(option.id);
                          else clone.splice(idx, 1);
                          return clone;
                        });
                      }}
                    />
                  ))}
                </React.Fragment>
              ),
              footer: (
                <View tw="flex flex-row items-center justify-end">
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection(selectedCoolingUnits);
                      toggleModalVisibility();
                    }}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setValue('coolingUnits', internalSelection);
                      toggleModalVisibility();
                    }}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              ),
            }}
          />
          <Divider
            tw={cn('w-full bg-gray-700 mt-2 my-2', !!errors.coolingUnits && 'bg-red-700 h-0.5')}
          />
        </View>
      </View>

      <Button
        mode="contained"
        tw="w-2/3 self-center"
        icon={isSubmitting ? undefined : 'account-arrow-down-outline'}
        onPress={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <ActivityIndicator animating size="small" color="white" /> : 'Invite'}
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(AddOperator);
