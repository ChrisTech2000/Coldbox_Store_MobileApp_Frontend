import React, { type PropsWithChildren, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, List, Switch, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Controller, useForm } from 'react-hook-form';
import colors from 'tailwindcss/colors';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { Input } from '#ui/components/Input';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import { useTranslationUtils } from '#i18n/utils';
import { currenciesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

import SellInMarketplaceModal from '../CheckIn/components/SellInMarketplaceModal';
import { useMarketplaceSettingsStore } from './store';

type FormValues<T = string> = {
  isSellable: boolean;
  weight: T;
  price: T;
};

function EditCrateWeightAndPricing(
  props: ProduceDetailsStackRouteProps<'EditCrateWeightAndPricing'>
) {
  const { params } = props.route;

  const { t, zodResolver } = useTranslationUtils();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const currencySymbol = useMemo(
    () => currenciesDict().getSymbolByCode(params.companyCurrency),
    [params.companyCurrency]
  );

  const form = useForm<FormValues>({
    defaultValues: {
      isSellable: params.isSellable,
      weight: params.crateWeight.toString(),
      price: params.cratePrice.toString(),
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) => {
      const greaterThanEqual = z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0));
      return z.object({
        isSellable: z.boolean(),
        weight: greaterThanEqual,
        price: greaterThanEqual,
      });
    }),
  });

  function onSubmit(values: FormValues<number>): void {
    useMarketplaceSettingsStore.getState().overwrite({
      isSellable: values.isSellable,
      crateId: params.crateId,
      crateWeight: values.weight,
      cratePrice: values.price,
    });
    props.navigation.goBack();
  }

  const isSellable = form.watch('isSellable');

  const [weight, price] = form.watch(['weight', 'price']).map((v) => {
    const int = Number(v);
    return isNaN(int) ? 0 : int;
  });

  const potentialPrice = (weight * price).toFixed(2);

  return (
    <React.Fragment>
      <SellInMarketplaceModal visible={isModalVisible} onChangeVisible={setIsModalVisible} />

      <KeyboardAwareScrollView tw="px-3 pt-3 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-36">
          <View tw="flex-col">
            <List.Item
              tw="p-0 m-0 py-1"
              title={undefined}
              left={() => (
                <View tw="flex-row items-center space-x-2">
                  <IconButton
                    tw="p-0 m-0"
                    icon="information-outline"
                    size={20}
                    iconColor={colors.gray[600]}
                    containerColor={colors.white}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setIsModalVisible(true);
                    }}
                  />
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

          <View tw="flex-row items-center justify-around my-3">
            <View tw="flex-col self-end px-2">
              <Icon name="basket-outline" size={30} color={paperTheme.colors.onSurface} />
              <Text tw="text-base self-center">1</Text>
            </View>

            <_InputWrapper adjust={isSellable}>
              <View tw="flex-row mb-1">
                <Text tw="text-base self-center">Weight</Text>
                <Sup>({t('Dashboard.ProduceDetails.kilogram').toUpperCase()})</Sup>
              </View>
              <Controller
                control={form.control}
                name="weight"
                render={({ field: { value, onChange } }) => (
                  <Input
                    tw="bg-white border rounded-sm h-14 text-center"
                    keyboardType="numeric"
                    value={value}
                    defaultValue="0"
                    placeholder="0"
                    onChangeText={onChange}
                    left={
                      <TextInput.Icon
                        icon="minus"
                        color={paperTheme.colors.primary}
                        onPress={(evt) => {
                          evt.stopPropagation();
                          const int = Number(value);
                          if (isNaN(int)) return; // safe guard
                          onChange((int - 1).toString());
                        }}
                      />
                    }
                    right={
                      <TextInput.Icon
                        icon="plus"
                        color={paperTheme.colors.primary}
                        onPress={(evt) => {
                          evt.stopPropagation();
                          const int = Number(value);
                          if (isNaN(int)) return; // safe guard
                          onChange((int + 1).toString());
                        }}
                      />
                    }
                  />
                )}
              />
            </_InputWrapper>
            <_InputWrapper renderChildren={isSellable}>
              <View tw="flex-row mb-1">
                <Text tw="text-base self-center">
                  Price/{t('Dashboard.ProduceDetails.kilogram').toUpperCase()}
                </Text>
                <Sup>({params.companyCurrency})</Sup>
              </View>
              <Controller
                control={form.control}
                name="price"
                render={({ field: { value, onChange } }) => (
                  <Input
                    tw="bg-white border rounded-sm h-14"
                    keyboardType="numeric"
                    value={value}
                    defaultValue="0"
                    onChangeText={onChange}
                  />
                )}
              />
            </_InputWrapper>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="absolute bottom-0 left-0 w-full">
        {isSellable ? (
          <View tw="flex flex-row items-center justify-between bg-teal-50 p-4 rounded-sm">
            <Text tw="text-lg">Potential selling value</Text>
            <Text tw="text-lg text-green-primary">
              {currencySymbol} {potentialPrice}
            </Text>
          </View>
        ) : null}
        <View tw="w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
          <Button
            tw="w-5/6 my-4"
            mode="contained"
            uppercase
            disabled={form.formState.isSubmitting}
            // eslint-disable-next-line
            onPress={form.handleSubmit(onSubmit as any)}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </HideWithKeyboardView>
    </React.Fragment>
  );
}

function _InputWrapper(props: PropsWithChildren<{ renderChildren: boolean; adjust: boolean }>) {
  const { renderChildren, adjust, children } = props;
  if (!renderChildren) return null;
  return <View tw={cn('flex-col', adjust ? 'w-2/5' : 'w-4/5')}>{children}</View>;
}
_InputWrapper.defaultProps = {
  adjust: true,
  renderChildren: true,
};

export default withSafeArea(EditCrateWeightAndPricing);
