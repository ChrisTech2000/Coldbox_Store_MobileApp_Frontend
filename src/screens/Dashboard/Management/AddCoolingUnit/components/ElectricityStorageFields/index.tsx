import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../../contexts/FormManager';
import { ELECTRICITY_STORAGE, type ElectricityStorageIds } from '../../constants';
import StorageFactory from './components/StorageFactory';

const STORAGE_LIST = Object.keys(ELECTRICITY_STORAGE);

export default function ElectricityStorageFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedStorageSystem = watch('electricityStorageSystem');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<ElectricityStorageIds | null>(
    selectedStorageSystem
  );

  const currentValue = selectedStorageSystem ? ELECTRICITY_STORAGE[selectedStorageSystem] : '';

  const fieldError = !!formState.errors.electricityStorageSystem;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="electricityStorageSystem"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedStorageSystem)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.electricityStorageSystem')}
                  displayValue={truncate(currentValue, { length: 25 })}
                />
                <Select.Dialog
                  enableScroll={false}
                  header={t('Dashboard.Management.AddCoolingUnit.fields.electricityStorageSystem')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedStorageSystem);
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
                    onValueChange={(value) => setInternalSelection(value as ElectricityStorageIds)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={STORAGE_LIST}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={ELECTRICITY_STORAGE[item as ElectricityStorageIds]}
                          value={item}
                          tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                        />
                      )}
                    />
                  </RadioButton.Group>
                </Select.Dialog>
              </Select>
            </View>
            <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
          </View>
        )}
      />

      <StorageFactory />
    </React.Fragment>
  );
}
