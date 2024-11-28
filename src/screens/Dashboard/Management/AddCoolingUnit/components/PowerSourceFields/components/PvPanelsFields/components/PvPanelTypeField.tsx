import React, { useState } from 'react';
import { View } from 'react-native';
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
  PV_PANELS_TYPES,
  type PvPanelsTypes,
} from '#screens/Dashboard/Management/AddCoolingUnit/constants';
import { FlatList } from 'react-native';

const PANELS_LIST = Object.keys(PV_PANELS_TYPES);

export default function PvPanelTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedPvPanelType = watch('pvPanelType', null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<PvPanelsTypes | null>(
    selectedPvPanelType
  );

  const currentValue = selectedPvPanelType ? PV_PANELS_TYPES[selectedPvPanelType] : '';

  const fieldError = !!formState.errors.pvPanelType;

  return (
    <React.Fragment>
      <Controller
        name="pvPanelType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedPvPanelType)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelType')}
                  displayValue={truncate(currentValue, { length: 30 })}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelType')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedPvPanelType);
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
                    onValueChange={(value) => setInternalSelection(value as PvPanelsTypes)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={PANELS_LIST}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={PV_PANELS_TYPES[item as PvPanelsTypes]}
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
