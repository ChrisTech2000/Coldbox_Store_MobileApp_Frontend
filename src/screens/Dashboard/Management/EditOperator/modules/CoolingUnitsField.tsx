import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useController } from 'react-hook-form';

import { Button } from '#ui/components/Button';
import { Select } from '#ui/components/Select';
import { Checkbox } from '#ui/components/Checkbox';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

export default function CoolingUnitsField(props: {
  coolingUnits: Array<{ id: number; name: string }>;
}) {
  const { coolingUnits } = props;

  const { control } = FormManager.useFormManager();

  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'coolingUnits', control });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<Array<number>>(field.value);

  const selectLabel = useMemo(() => {
    const defaultLabel = t('Dashboard.Management.Operators.fields.coolingUnits');
    if (!field.value?.length) return defaultLabel;
    return (
      coolingUnits
        .filter((unit) => field.value.includes(unit.id))
        .map((unit) => unit.name)
        .join(', ') || defaultLabel
    );
  }, [coolingUnits, field.value, t]);

  const error = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-5">
      <View tw="px-3 pb-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value)}
        >
          <Select.Touchable
            label={t('Dashboard.Management.Operators.fields.coolingUnits')}
            displayValue={selectLabel}
          />
          <Select.Dialog
            enableScroll
            header={t('Dashboard.Management.Operators.fields.coolingUnits')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setInternalSelection(field.value);
                    setIsModalVisible(false);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    field.onChange(internalSelection);
                    setIsModalVisible(false);
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
              data={coolingUnits}
              keyExtractor={(item, itemIdx) => `cooling-unit-item-${item.id}-#${itemIdx}`}
              renderItem={({ item }) => (
                <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                  <Text tw="text-base w-[70%]" numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Checkbox
                    status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setInternalSelection((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  />
                </View>
              )}
            />
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw={cn('w-full bg-gray-700', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
