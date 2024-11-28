import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../../contexts/FormManager';
import { POWER_SOURCES, type PowerSourcesIds } from '../../constants';
import PowerSourceFactory from './components/PowerSourceFactory';

const SOURCES_LIST = Object.keys(POWER_SOURCES);

export default function PowerSourceFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedPowerSource = watch('powerSource');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<PowerSourcesIds | null>(
    selectedPowerSource
  );

  const currentValue = selectedPowerSource ? POWER_SOURCES[selectedPowerSource] : '';

  const fieldError = !!formState.errors.powerSource;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="powerSource"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedPowerSource)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.powerSource')}
                  displayValue={currentValue}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.AddCoolingUnit.fields.powerSource')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedPowerSource);
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
                    onValueChange={(value) => setInternalSelection(value as PowerSourcesIds)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={SOURCES_LIST}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={POWER_SOURCES[item as PowerSourcesIds]}
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

      <PowerSourceFactory />
    </React.Fragment>
  );
}
