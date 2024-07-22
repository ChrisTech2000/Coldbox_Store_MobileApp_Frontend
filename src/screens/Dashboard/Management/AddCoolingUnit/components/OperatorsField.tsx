import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { CheckboxItem } from '#ui/components/Checkbox';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

export default function OperatorsField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { companyOperators } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedOperators = watch('operators');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedOperators);

  const fieldError = !!formState.errors.operators;

  const currentValue = useMemo(() => {
    const _str: Array<string> = [];
    for (const [operatorId, operatorName] of Object.entries(companyOperators)) {
      if (!selectedOperators.includes(parseInt(operatorId))) continue;
      _str.push(operatorName);
    }
    return truncate(_str.join(', '), { length: 34 });
  }, [companyOperators, selectedOperators]);

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="operators"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={t('navigation.management.Operators')}
                currentValue={currentValue}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                useScrollView={false}
                content={{
                  header: t('navigation.management.Operators'),
                  options: (
                    <FlatList
                      nestedScrollEnabled
                      data={Object.keys(companyOperators)}
                      keyExtractor={(item, itemIdx) => `operator-item-${item}-#${itemIdx}`}
                      ItemSeparatorComponent={Divider}
                      renderItem={({ item }) => {
                        const itemId = parseInt(item);
                        return (
                          <CheckboxItem
                            tw="flex-row-reverse ml-[-10]"
                            label={companyOperators[itemId]}
                            status={internalSelection.includes(itemId) ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setInternalSelection((prev) => {
                                const clone = [...prev];
                                const idx = clone.indexOf(itemId);
                                if (idx === -1) clone.push(itemId);
                                else clone.splice(idx, 1);
                                return clone;
                              });
                            }}
                          />
                        );
                      }}
                    />
                  ),
                  footer: (
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          toggleVisibility();
                          setInternalSelection(selectedOperators);
                        }}
                      >
                        {t('actions.cancel')}
                      </Button>
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          toggleVisibility();
                          onChange(internalSelection);
                        }}
                      >
                        {t('actions.ok')}
                      </Button>
                    </View>
                  ),
                }}
              />
            </View>
            <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
          </View>
        )}
      />
    </React.Fragment>
  );
}
