import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Checkbox, Divider, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';

import type { GetAllCropsResponse } from '#types/api.responses';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../components/FormManager';

type Props = {
  crops: Array<GetAllCropsResponse>;
};

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CommodityField(props: Props) {
  const { crops } = props;

  const { control, watch, formState } = FormManager.useFormManager();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCommodities = watch('commodities');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedCommodities);

  const datums = useMemo(
    () => crops.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const selectLabel = useMemo(() => {
    const selectedOptions = datums
      .filter((option) => selectedCommodities.includes(option.id))
      .slice(0, 2)
      .map((option) => truncate(option.name, { length: 7 }));
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : '';
  }, [datums, selectedCommodities]);

  const fieldError = !!formState.errors.country;

  return (
    <View tw="mb-2">
      <Controller<FormValues>
        name="commodities"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              label="Commodity Shortlist"
              currentValue={selectLabel}
              isModalOpen={isVisible}
              onClick={toggleVisibility}
              useScrollView={false}
              content={{
                header: 'Select a commodity',
                headerComponent: (
                  <TextInput
                    tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600 mb-2"
                    label="Search..."
                    value={search}
                    onChangeText={(val) => setSearch(val)}
                    left={<TextInput.Icon icon="magnify" />}
                  />
                ),
                options: (
                  <FlashList
                    data={[...datums]}
                    renderItem={({ item, index }) => (
                      <React.Fragment>
                        <Checkbox.Item
                          key={`commodity-item-${item.id}-#${index}`}
                          label={item.name}
                          status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setInternalSelection((prev) => {
                              const clone = [...prev];
                              const idx = clone.indexOf(item.id);
                              if (idx === -1) clone.push(item.id);
                              else clone.splice(idx, 1);
                              return clone;
                            });
                          }}
                        />
                        <Divider />
                      </React.Fragment>
                    )}
                    estimatedItemSize={40}
                    estimatedListSize={{
                      height: deviceHeight,
                      width: deviceWidth / 2,
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
                        setInternalSelection(selectedCommodities);
                        toggleVisibility();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      mode="text"
                      uppercase
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChange(internalSelection);
                        toggleVisibility();
                      }}
                    >
                      Ok
                    </Button>
                  </View>
                ),
              }}
            />
          </View>
        )}
      />
      <Divider tw={cn('w-full bg-gray-700 my-3', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
