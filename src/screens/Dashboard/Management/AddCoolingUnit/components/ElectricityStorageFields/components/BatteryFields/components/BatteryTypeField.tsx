import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import {
  BATTERY_TYPES,
  type BatteryTypes,
} from '#screens/Dashboard/Management/AddCoolingUnit/constants';

const BATTERIES_LIST = Object.keys(BATTERY_TYPES);

export default function BatteryTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedBatteryType = watch('batteryType', null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<BatteryTypes | null>(
    selectedBatteryType
  );

  const currentValue = selectedBatteryType ? BATTERY_TYPES[selectedBatteryType] : '';

  const fieldError = !!formState.errors.batteryType;

  return (
    <React.Fragment>
      <Controller
        name="batteryType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedBatteryType)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.batteryType')}
                  displayValue={truncate(currentValue, { length: 30 })}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.AddCoolingUnit.fields.batteryType')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedBatteryType);
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
                    onValueChange={(value) => setInternalSelection(value as BatteryTypes)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={BATTERIES_LIST}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={BATTERY_TYPES[item as BatteryTypes]}
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
    </React.Fragment>
  );
}
