import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useController } from 'react-hook-form';
import truncate from 'lodash/truncate';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import DataAggregator from '../contexts/DataAggregator';
import FormManager from '../contexts/FormManager';

export default function OperatorsField() {
  const { control } = FormManager.useFormManager();
  const { companyOperators } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'operators', control });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<Array<number>>(field.value);

  const displayValue = useMemo(() => {
    const selectedOperatorNames = Object.entries(companyOperators)
      .filter(([operatorId]) => field.value.includes(parseInt(operatorId)))
      .map(([, operatorName]) => operatorName);
    return truncate(selectedOperatorNames.join(', '), { length: 34 });
  }, [companyOperators, field.value]);

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-5">
      <View tw="px-4 pb-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value)}
        >
          <Select.Touchable
            testID="operators-select"
            label={t('navigation.management.Operators')}
            displayValue={displayValue}
          />
          <Select.Dialog
            enableScroll
            header={t('navigation.management.Operators')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    setInternalSelection(field.value);
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
                    field.onChange(internalSelection);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            }
          >
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={Object.keys(companyOperators)}
              keyExtractor={(item, itemIdx) => `operator-item-${item}-#${itemIdx}`}
              renderItem={({ item }) => {
                const itemId = parseInt(item);
                return (
                  <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                    <Text tw="text-base w-[70%]" numberOfLines={2}>
                      {companyOperators[itemId]}
                    </Text>
                    <Checkbox
                      tw="flex-row-reverse ml-[-10]"
                      status={internalSelection.includes(itemId) ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setInternalSelection((prev) =>
                          prev.includes(itemId)
                            ? prev.filter((id) => id !== itemId)
                            : [...prev, itemId]
                        );
                      }}
                    />
                  </View>
                );
              }}
              ItemSeparatorComponent={Divider}
            />
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
