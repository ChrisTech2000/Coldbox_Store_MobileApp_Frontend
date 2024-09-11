import React, { useRef, type PropsWithChildren } from 'react';
import { FlatList, View } from 'react-native';
import { Checkbox, Divider, IconButton, List, Switch, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { Input } from '#ui/components/Input';
import { Button } from '#ui/components/Button';
import HideWithKeyboard from '#ui/components/HideWithKeyboard';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

type FormValues<T = string> = {
  isSellable: boolean;
  applyToAll: boolean;
  crates: Array<{
    id: number | undefined;
    weight: T;
    price: T;
  }>;
};

function CrateWeightAndPricing(props: CheckInStackRouteProps<'CrateWeightAndPricing'>) {
  const { params } = props.route;

  const { t, zodResolver } = useTranslationUtils();

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      isSellable: params.isSellableInMarketplace,
      applyToAll: false,
      crates: params.crates.map((crate) => ({
        ...crate,
        weight: crate.crateWeight.toString(),
        price: '0.00',
      })),
    },
    resolver: zodResolver((z) => {
      const greaterThanEqual = z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0));
      return z.object({
        isSellable: z.boolean(),
        applyToAll: z.boolean(),
        crates: z
          .array(
            z.object({
              id: z.number().optional(),
              weight: greaterThanEqual,
              price: greaterThanEqual,
            })
          )
          .min(1),
      });
    }),
    reValidateMode: 'onSubmit',
  });

  function onSubmit(values: FormValues<number>): void {
    console.log(values);
    // TODO
  }

  const crateFields = useFieldArray({ control: form.control, name: 'crates' });

  const isSellable = form.watch('isSellable');
  const applyToAll = form.watch('applyToAll');

  const potentialPrice = form.watch('crates').reduce((acc, curr) => {
    const wInt = Number(curr.weight);
    const pInt = Number(curr.price);
    if (isNaN(wInt) || isNaN(pInt)) return acc;
    return wInt * pInt + acc;
  }, 0);

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        tw="px-3 pt-3 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View tw="flex-1 pb-36">
          <View tw="flex-col">
            <List.Item
              tw="p-0 m-0 py-1"
              title={undefined}
              left={() => (
                <View tw="flex-row items-center space-x-2">
                  <Icon name="information-outline" size={20} color={colors.gray[600]} />
                  <Text tw="text-base self-center">Sell in the Marketplace</Text>
                </View>
              )}
              right={() => (
                <Controller
                  control={form.control}
                  name="isSellable"
                  render={({ field: { value, onChange } }) => (
                    <Switch value={value} onValueChange={onChange} />
                  )}
                />
              )}
            />
            <Divider tw="bg-gray-400 mt-1" />
          </View>

          <View tw="flex-col">
            <List.Item
              tw="p-0 m-0 py-1"
              title={undefined}
              left={() => <Text tw="text-base self-center">Apply to all</Text>}
              right={() => (
                <Controller
                  control={form.control}
                  name="applyToAll"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      status={value ? 'checked' : 'unchecked'}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        onChange(!value);
                      }}
                    />
                  )}
                />
              )}
            />
            <Divider tw="bg-gray-400 mt-1" />
          </View>

          <FlatList
            tw="py-3"
            data={crateFields.fields}
            keyExtractor={(field) => `crate-weight-and-pricing-list-item-#${field.id}`}
            scrollEnabled={false}
            renderItem={({ index }) => {
              const cratePosition = index + 1;
              const isDisabled = applyToAll && index > 0;
              return (
                <View tw="flex-row items-center justify-between my-3">
                  <View tw="flex-col self-end px-3">
                    <Icon
                      name="basket-outline"
                      size={30}
                      color={isDisabled ? colors.gray[400] : paperTheme.colors.onSurface}
                    />
                    <Text tw={cn('text-base self-center', isDisabled && 'text-gray-400')}>
                      {cratePosition}
                    </Text>
                  </View>

                  <_InputWrapper adjust={isSellable}>
                    <View tw="flex-row mb-1">
                      <Text tw={cn('text-base self-center', isDisabled && 'text-gray-400')}>
                        Weight
                      </Text>
                      <Sup disabled={isDisabled}>
                        ({t('Dashboard.ProduceDetails.kilogram').toUpperCase()})
                      </Sup>
                    </View>
                    <Controller
                      control={form.control}
                      name={`crates.${index}.weight`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          tw={cn(
                            'bg-white border rounded-sm h-14 text-center',
                            isDisabled && 'border-gray-400'
                          )}
                          keyboardType="numeric"
                          value={value}
                          defaultValue="0"
                          placeholder="0"
                          onChangeText={(text) => {
                            if (!applyToAll) return onChange(text);
                            for (let i = 0; i < crateFields.fields.length; i++) {
                              form.setValue(`crates.${i}.weight`, text);
                            }
                          }}
                          disabled={isDisabled}
                          left={
                            <TextInput.Icon
                              icon="minus"
                              color={paperTheme.colors.primary}
                              disabled={isDisabled}
                              onPress={(evt) => {
                                evt.stopPropagation();
                                const int = Number(value);
                                if (isNaN(int)) return; // safe guard
                                const finalValue = (int - 1).toString();
                                if (!applyToAll) return onChange(finalValue);
                                for (let i = 0; i < crateFields.fields.length; i++) {
                                  form.setValue(`crates.${i}.weight`, finalValue);
                                }
                              }}
                            />
                          }
                          right={
                            <TextInput.Icon
                              icon="plus"
                              color={paperTheme.colors.primary}
                              disabled={isDisabled}
                              onPress={(evt) => {
                                evt.stopPropagation();
                                const int = Number(value);
                                if (isNaN(int)) return; // safe guard
                                const finalValue = (int + 1).toString();
                                if (!applyToAll) return onChange(finalValue);
                                for (let i = 0; i < crateFields.fields.length; i++) {
                                  form.setValue(`crates.${i}.weight`, finalValue);
                                }
                              }}
                            />
                          }
                        />
                      )}
                    />
                  </_InputWrapper>
                  <_InputWrapper renderChildren={isSellable}>
                    <View tw="flex-row mb-1">
                      <Text tw={cn('text-base self-center', isDisabled && 'text-gray-400')}>
                        Price/{t('Dashboard.ProduceDetails.kilogram').toUpperCase()}
                      </Text>
                      <Sup disabled={isDisabled}>({params.companyCurrency})</Sup>
                    </View>
                    <Controller
                      control={form.control}
                      name={`crates.${index}.price`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          tw={cn(
                            'bg-white border rounded-sm h-14',
                            isDisabled && 'border-gray-400'
                          )}
                          keyboardType="numeric"
                          value={value}
                          defaultValue="0"
                          onChangeText={(text) => {
                            if (!applyToAll) return onChange(text);
                            for (let i = 0; i < crateFields.fields.length; i++) {
                              form.setValue(`crates.${i}.price`, text);
                            }
                          }}
                          disabled={isDisabled}
                        />
                      )}
                    />
                  </_InputWrapper>

                  <IconButton
                    mode="contained-tonal"
                    icon="trash-can-outline"
                    size={30}
                    tw="self-end"
                    iconColor={isDisabled ? colors.gray[400] : paperTheme.colors.error}
                    containerColor={colors.white}
                    {...(!isDisabled && {
                      onPress: (evt) => {
                        evt.stopPropagation();
                        crateFields.remove(index);
                        scrollViewRef.current?.scrollToEnd(true);
                      },
                    })}
                  />
                </View>
              );
            }}
            ListFooterComponent={
              <Button
                tw="w-1/4 my-3"
                mode="text"
                disabled={applyToAll}
                uppercase
                onPress={(evt) => {
                  evt.stopPropagation();
                  crateFields.append({ id: undefined, weight: '25', price: '0.00' });
                  scrollViewRef.current?.scrollToEnd(true);
                }}
              >
                Add more
              </Button>
            }
          />
        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboard tw="absolute bottom-0 left-0 w-full">
        <View tw="flex flex-row items-center justify-between bg-teal-50 p-4 rounded-sm">
          <Text tw="text-lg">Potential selling value</Text>
          <Text tw="text-lg text-green-primary">
            {params.currencySymbol} {potentialPrice.toFixed(2)}
          </Text>
        </View>
        <View tw="w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
          <Button
            tw="w-5/6 my-4"
            mode="contained"
            uppercase
            // eslint-disable-next-line
            onPress={form.handleSubmit(onSubmit as any)}
            disabled={typeof form.formState.errors.crates !== 'undefined'}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </HideWithKeyboard>
    </React.Fragment>
  );
}

export default withSafeArea(CrateWeightAndPricing);

function _InputWrapper(props: PropsWithChildren<{ renderChildren: boolean; adjust: boolean }>) {
  const { renderChildren, adjust, children } = props;
  if (!renderChildren) return null;
  return <View tw={cn('flex-col', adjust ? 'w-1/3' : 'w-2/3')}>{children}</View>;
}
_InputWrapper.defaultProps = {
  adjust: true,
  renderChildren: true,
};
