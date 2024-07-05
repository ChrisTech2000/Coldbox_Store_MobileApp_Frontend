import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

type Props = {
  coolingUnits: Array<{ id: number; name: string }>;
};

export default function CoolingUnitsField(props: Props) {
  const { coolingUnits } = props;

  const {
    watch,
    setValue,
    formState: { errors },
  } = FormManager.useFormManager();

  const { t } = useTranslationUtils();
  const [isModalVisible, toggleModalVisibility] = useToggle();

  const selectedCoolingUnits = watch('coolingUnits');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedCoolingUnits);

  const selectLabel = useMemo(() => {
    const selectedOptions = coolingUnits
      .filter((option) => selectedCoolingUnits.includes(option.id))
      .map((option) => option.name);
    return selectedOptions.length > 0
      ? selectedOptions.join(', ')
      : t('Dashboard.Management.Operators.fields.coolingUnits');
  }, [coolingUnits, selectedCoolingUnits]);

  return (
    <View tw="mt-6">
      <View tw="px-5">
        <Select
          variant="md"
          label={t('Dashboard.Management.Operators.fields.coolingUnits')}
          currentValue={selectLabel}
          minifyLabel
          isModalOpen={isModalVisible}
          onClick={toggleModalVisibility}
          content={{
            header: t('Dashboard.Management.Operators.fields.coolingUnits'),
            options: (
              <React.Fragment>
                {coolingUnits.map((option, optionIdx) => (
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
                    toggleModalVisibility();
                    setInternalSelection(selectedCoolingUnits);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    toggleModalVisibility();
                    setValue('coolingUnits', internalSelection);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            ),
          }}
        />
      </View>
      <Divider tw={cn('w-full bg-gray-700 mt-2 my-2', !!errors.gender && 'bg-red-700 h-0.5')} />
    </View>
  );
}
