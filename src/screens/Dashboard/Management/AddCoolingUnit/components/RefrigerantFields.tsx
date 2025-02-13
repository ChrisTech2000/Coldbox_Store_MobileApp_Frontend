import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';
import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../contexts/FormManager';
import { REFRIGERANTS } from '../constants';

export default function RefrigerantFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedRefrigerantType = watch('refrigerantType');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<string | null>(
    selectedRefrigerantType ?? null
  );

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="refrigerantType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedRefrigerantType)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.refrigerantType')}
                  displayValue={selectedRefrigerantType}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.AddCoolingUnit.fields.refrigerantType')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedRefrigerantType);
                        }}
                      >
                        {t('actions.cancel')}
                      </Button>
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          onChange(internalSelection);
                        }}
                      >
                        {t('actions.ok')}
                      </Button>
                    </View>
                  }
                >
                  <RadioButton.Group
                    value={internalSelection ?? ''}
                    onValueChange={(value) => setInternalSelection(value)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={REFRIGERANTS}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={item}
                          value={item}
                          tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                        />
                      )}
                    />
                  </RadioButton.Group>
                </Select.Dialog>
              </Select>
            </View>
            <Divider
              tw={cn('w-full bg-gray-700', !!errors.refrigerantType && 'bg-red-700 h-0.5')}
            />
          </View>
        )}
      />

      <Controller
        name="amountRefrigerant"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.amountRefrigerant')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.amountRefrigerant}
            suffix="kg"
          />
        )}
      />
    </React.Fragment>
  );
}
