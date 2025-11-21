import React, { useEffect, useMemo, useRef } from 'react';
import { Platform, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Divider, Portal, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { RNModal } from '#ui/primitives/RNModal';

import type { RecursiveKeyOf } from '#types/miscellaneous';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import FormManager from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';
import { PRICING_TYPE } from '../constants';

type LocalFormValues<T = string> = { search: string; pricing: Record<string, T> };
type PreprocessedLocalFormValues = LocalFormValues<number>;

const ROOT_PRICING_PATH: RecursiveKeyOf<LocalFormValues> = 'pricing';

export default function CropSpecificPricing() {
  const { watch, setValue } = FormManager.useFormManager();
  const { companyCrops } = DataAggregator.useDataAggregator();
  const { t, zodResolver } = useTranslationUtils();

  const cropSpecificPricing = watch('cropSpecificPricing');
  const [isVisible, toggleVisibility] = useToggle(false);

  function _buildInitialValues(): LocalFormValues {
    return {
      search: '',
      pricing: Object.fromEntries(
        cropSpecificPricing.map((pricing) => [
          pricing.id,
          (pricing.dailyRate || pricing.fixedRate).toString(),
        ])
      ),
    };
  }

  const localForm = useForm<LocalFormValues>({
    defaultValues: _buildInitialValues(),
    resolver: zodResolver((z) =>
      z.object({
        search: z.string().optional(),
        pricing: z.record(
          z.string(),
          z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gt(0).positive())
        ),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  _useSyncLocalFormPricing(localForm.watch(), (newPricing) =>
    localForm.setValue('pricing', newPricing)
  );

  const searchTerm = localForm.watch('search');

  const datums = useMemo(
    () =>
      cropSpecificPricing
        .map((cropPricing) => ({
          path: [ROOT_PRICING_PATH, cropPricing.id].join('.'),
          name: companyCrops[cropPricing.id],
        }))
        .filter((datum) => datum.name.toLowerCase().includes(searchTerm?.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [cropSpecificPricing, companyCrops, searchTerm]
  );

  function onConfirm(values: PreprocessedLocalFormValues) {
    const pricingUpdates = cropSpecificPricing.map((cropPricing) => {
      const price = values.pricing[cropPricing.id];
      const isPerDay = cropPricing.pricingType === PRICING_TYPE.PER_DAY;
      return {
        ...cropPricing,
        dailyRate: isPerDay ? price : 0,
        fixedRate: isPerDay ? 0 : price,
      };
    });
    setValue('cropSpecificPricing', pricingUpdates);
    toggleVisibility();
  }

  return (
    <React.Fragment>
      <View tw="flex flex-row items-center justify-between h-14 px-3">
        <Text tw="text-gray-600 text-base truncate">
          {t('Dashboard.Management.AddCoolingUnit.fields.cropSpecificPricing')}
        </Text>
        <Button mode="contained" icon="eye-outline" onPress={toggleVisibility}>
          {t('Dashboard.Management.EditCoolingUnit.buttons.editPricing')}
        </Button>
      </View>
      <Divider tw="w-full bg-gray-700" />

      <Portal>
        <RNModal
          visible={isVisible}
          onDismiss={() => {
            localForm.reset(_buildInitialValues());
            toggleVisibility();
          }}
        >
          <View
            tw={cn(
              'w-full bg-white rounded-3xl w-5/6 max-w-5/6 pt-6 pb-4 self-center space-y-2',
              Platform.OS === 'ios' ? 'h-[70%]' : 'h-[80%]'
            )}
          >
            <Text variant="TitleRegular" tw="px-6">
              {t('Dashboard.Management.AddCoolingUnit.fields.selectCrops')}
            </Text>
            <View>
              <Controller
                name="search"
                control={localForm.control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600 mb-2"
                    label={t('actions.search')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    left={<TextInput.Icon icon="magnify" />}
                  />
                )}
              />
            </View>

            <FlashList
              style={{ flex: 1 }}
              scrollEnabled
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              data={datums}
              keyExtractor={(item, itemIdx) => `crop-specific-${item.path}-field-${itemIdx}`}
              estimatedItemSize={100}
              renderItem={({ item }) => (
                <Controller
                  name={item.path as 'pricing'}
                  control={localForm.control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      tw="bg-transparent px-3"
                      mode="flat"
                      keyboardType="numeric"
                      label={item.name}
                      value={value as unknown as string}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              )}
            />
            <View tw="flex-row items-center justify-end px-3">
              <Button
                mode="text"
                uppercase
                onPress={(evt) => {
                  evt.stopPropagation();
                  localForm.reset(_buildInitialValues());
                  toggleVisibility();
                }}
              >
                {t('actions.cancel')}
              </Button>
              <Button
                mode="text"
                uppercase
                // eslint-disable-next-line
                onPress={localForm.handleSubmit(onConfirm as any)}
              >
                {t('actions.ok')}
              </Button>
            </View>
          </View>
        </RNModal>
      </Portal>
    </React.Fragment>
  );
}

function _useSyncLocalFormPricing(
  formValues: LocalFormValues,
  cb: (newState: Record<string, string>) => void
) {
  const { watch, getValues } = FormManager.useFormManager();
  const [cropSpecificPricing, commonPrice] = watch(['cropSpecificPricing', 'price']);

  const previousPrice = useRef<string>(getValues('price'));

  const _effectCallback = useDebouncedCallback(() => {
    const keys = new Set<string>([
      ...Object.keys(formValues.pricing),
      ...(cropSpecificPricing || [])
        .map((cropPricing) => cropPricing?.id?.toString())
        .filter(Boolean),
    ]);

    const _previousPrice = previousPrice.current;
    previousPrice.current = commonPrice;

    const entries: Array<[string, string]> = [];
    for (const key of keys) {
      const value = formValues.pricing?.[key];
      if (typeof value === 'undefined') {
        entries.push([key, commonPrice]);
        continue;
      }

      if (value === _previousPrice) entries.push([key, commonPrice]);
      else entries.push([key, value]);
    }

    cb(Object.fromEntries(entries));
  }, 480);

  useEffect(_effectCallback, [cropSpecificPricing.length, commonPrice]);
}
