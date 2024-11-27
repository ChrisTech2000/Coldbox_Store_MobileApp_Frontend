import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import type { ListedCratesBaseParams } from '#types/api.params';
import { ERoles, Farmer } from '#types/global';

import { formatFloat } from '../../components/FarmerSurveyModal/schema';
import RBAC from '#common/RBAC';
import { formatCurrencyWithSymbol } from '../CheckIn/utils';

type FormValues<T = string> = {
  applyToAll: boolean;
  crates: Array<{
    id: number;
    weight: T;
    isSellable: boolean;
  }>;
  price: T;
  previous: {
    sellableCrates: Array<number>;
    price: number;
  };
};

function EditCrateWeightAndPricing(
  props: ProduceDetailsStackRouteProps<'EditCrateWeightAndPricing'>
) {
  const { params } = props.route;

  const user = useAuthStore((store) => store.user);
  const refreshData = useDashboardStore((store) => store.refreshData);
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isSettingUp, toggleIsSettingUp] = useToggle(true);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const { data: farmer, isLoading: isLoadingFarmer } = useApiCall(
    'getFarmerById',
    ColdtivateService.getFarmerById,
    params.farmerId,
    {
      skip: !params.farmerId,
    }
  );

  const {
    data: eligibility,
    isLoading: isLoadingEligibility,
    refetch,
  } = useApiCall(
    'checkMarketplaceEligibility',
    MarketplaceService.checkMarketplaceEligibility,
    {
      userIds: farmer?.user?.id ? [farmer.user.id] : [user?.id as number],
      companyIds: [params.companyId],
    },
    {
      skip: !params.companyId || (!farmer?.user?.id && !user?.id),
    }
  );

  const form = useForm<FormValues>({
    defaultValues: { applyToAll: false, crates: [], price: '0' },
    resolver: zodResolver((z) => {
      const greaterThanEqual = z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0));
      return z.object({
        applyToAll: z.boolean(),
        price: z.string(),
        crates: z
          .array(
            z.object({
              id: z.number(),
              weight: greaterThanEqual,
              isSellable: z.boolean(),
            })
          )
          .min(1),
        previous: z.object({
          sellableCrates: z.array(z.number()),
          price: z.number(),
        }),
      });
    }),
    reValidateMode: 'onSubmit',
  });

  const crateFields = useFieldArray({ control: form.control, name: 'crates' });

  const applyToAll = form.watch('applyToAll');
  const price = form.watch('price');
  const crates = form.watch('crates');

  const totalWeight = crates.reduce((acc, curr) => {
    if (!curr.isSellable) return acc;
    const wInt = Number(curr.weight);
    if (isNaN(wInt)) return acc;
    return (acc += wInt);
  }, 0);

  const parsedPrice = Number(formatFloat(price ?? '0'));
  const potentialPrice = isNaN(parsedPrice) ? 0 : totalWeight * parsedPrice;

  async function onSubmit(values: FormValues<number>): Promise<void> {
    try {
      const _produce = cloneDeep(params.produce);
      const { previous, crates, price } = values;

      const cratesToList: Array<number> = [];
      const cratesToDelist: Array<number> = [];
      const currentPrice = Number(price);

      for (const crate of crates) {
        const wasSellable = previous.sellableCrates.includes(crate.id);
        if (crate.isSellable && !wasSellable) cratesToList.push(crate.id);
        if (!crate.isSellable && wasSellable) cratesToDelist.push(crate.id);
      }

      const promises: Array<Promise<unknown>> = [];

      const operatorParams =
        user?.role === ERoles.OPERATOR && params.farmerId
          ? ({ operatorOnBehalfOfSellerFarmerId: params.farmerId } satisfies ListedCratesBaseParams)
          : {};

      if (cratesToList.length > 0) {
        _produce.checkedInCrates.forEach((crate) => {
          if (cratesToList.includes(crate.id)) {
            crate.listedInTheMarketplace = true;
          }
        });

        promises.push(
          MarketplaceService.upsertListedCrate({
            crateIds: cratesToList,
            producePricePerKg: currentPrice,
            ...operatorParams,
          })
        );
      }

      if (
        promises.length === 0 &&
        currentPrice !== previous.price &&
        previous.sellableCrates.length > 0
      ) {
        promises.push(
          MarketplaceService.upsertListedCrate({
            crateIds: previous.sellableCrates,
            producePricePerKg: currentPrice,
            ...operatorParams,
          })
        );
      }

      _produce.checkedInCrates.forEach((crate) => {
        if (cratesToDelist.includes(crate.id)) {
          crate.listedInTheMarketplace = false;
        }
      });

      promises.push(
        ...cratesToDelist.map((crateId) =>
          MarketplaceService.delistCratesByCrateId({
            crateId,
            ...operatorParams,
          })
        )
      );

      const results = await Promise.allSettled(promises);

      const allFulfilled = results.every((result) => result.status === 'fulfilled');

      if (allFulfilled) {
        toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.updateSuccess'), {
          type: 'md_success',
        });

        refreshData.forEach((fn) => fn());
        props.navigation.navigate('Root', {
          produce: _produce,
          currency: params.companyCurrency,
          coolingUnit: params.coolingUnit,
          companyId: params.companyId,
        });
      } else {
        toast.show(
          user?.role === ERoles.OPERATOR
            ? t('Dashboard.ProduceDetails.preSaleErrorOperator')
            : t('Dashboard.ProduceDetails.preSaleErrorUser'),
          { type: 'md_danger' }
        );
      }
    } catch (exception) {
      console.error(exception);
    }
  }

  const debouncedInitialSetup = useDebouncedCallback(async (): Promise<void> => {
    try {
      const result = await MarketplaceService.getSellerListedCrates(
        user?.role === ERoles.OPERATOR
          ? { operatorOnBehalfOfSellerFarmerId: params.farmerId }
          : undefined
      );

      const initialCrates: FormValues['crates'] = params.produce.checkedInCrates.map((crate) => ({
        id: crate.id,
        weight: crate.weight.toString(),
        isSellable: false,
      }));

      let price: undefined | string;

      for (const item of result.nodes) {
        const crateIdx = initialCrates.findIndex((crate) => crate.id === item.crateId);
        if (crateIdx === -1) continue;
        initialCrates[crateIdx].isSellable = true;
        if (typeof price === 'undefined') price = item?.producePricePerKg?.toString();
      }

      const applyToAll = initialCrates.every(
        (crate, _, array) => crate.isSellable && crate.weight === array[0].weight
      );

      form.reset({
        applyToAll,
        crates: initialCrates,
        price: price ?? '0',
        previous: {
          sellableCrates: initialCrates
            .filter((crate) => crate.isSellable)
            .map((crate) => crate.id),
          price: typeof price !== 'undefined' ? Number(price) : 0,
        },
      });
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleIsSettingUp();
    }
  }, 700);

  useEffect(() => {
    void debouncedInitialSetup();
  }, [params.produce.checkedInCrates]);

  const hasChanges = _isDirty(
    crates,
    Number(price),
    form.getValues('previous.price'),
    form.getValues('previous.sellableCrates')
  );

  const companyEligible = eligibility.companies?.[params.companyId ?? ''];
  const farmerEligible = eligibility.users?.[farmer?.user?.id ?? user?.id ?? ''];

  if (isSettingUp || isLoadingEligibility || isLoadingFarmer) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <RBAC.ProtectedResource action="SET" subject="MarketplaceListForSale">
        {!companyEligible ? (
          <Text tw="mx-4">{t('Dashboard.ProduceDetails.operatorNoCompanyBankAccount')}</Text>
        ) : !farmerEligible ? (
          user?.role === ERoles.COOLING_USER ? (
            <View tw="mx-4">
              <Text>{t('Dashboard.ProduceDetails.farmerNoBankAccountWarning')}</Text>
              <Button
                tw="self-end mt-2"
                onPress={() => props.navigation.navigate('AddFarmerBankAccount')}
              >
                {t('Dashboard.ProduceDetails.addBankAccountButton')}
              </Button>
            </View>
          ) : (
            <View tw="mx-4">
              <Text>
                {t('Dashboard.ProduceDetails.operatorNoBankAccountWarning', {
                  name: `${farmer?.user?.firstName ?? ''} ${farmer?.user?.lastName ?? ''}`,
                })}
              </Text>
              <Button
                tw="self-end mt-2"
                onPress={() =>
                  props.navigation.navigate('AddFarmerBankAccount', {
                    farmer: farmer as Farmer,
                    recheckEligibility: refetch,
                  })
                }
              >
                {t('Dashboard.ProduceDetails.addBankAccountButton')}
              </Button>
            </View>
          )
        ) : null}
      </RBAC.ProtectedResource>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        tw="px-3 pt-3 bg-white mb-20"
        showsVerticalScrollIndicator={false}
      >
        <View tw="flex-1">
          <View tw="flex-col">
            <Controller
              control={form.control}
              name="applyToAll"
              render={({ field: { value, onChange } }) => (
                <TouchableOpacity
                  tw="pb-2 px-2 flex flex-row items-center justify-between"
                  disabled={!farmerEligible || !companyEligible}
                  onPress={() => {
                    for (let i = 0; i < crateFields.fields.length; i++) {
                      form.setValue(`crates.${i}.isSellable`, crates[0].isSellable);
                    }
                    onChange(!value);
                  }}
                >
                  <Text
                    tw={cn('text-base', !farmerEligible || !companyEligible ? 'text-gray-400' : '')}
                  >
                    {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.applyAll')}
                  </Text>
                  <Checkbox
                    disabled={!farmerEligible || !companyEligible}
                    status={value ? 'checked' : 'unchecked'}
                  />
                </TouchableOpacity>
              )}
            />
            <Divider tw="bg-gray-400" />
          </View>

          <FlatList
            tw="py-3"
            data={crateFields.fields}
            keyExtractor={(field) => `crate-weight-and-pricing-list-item-#${field.id}`}
            scrollEnabled={false}
            renderItem={({ index }) => {
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
                      #{index + 1}
                    </Text>
                  </View>

                  <View tw="flex-col">
                    <View tw="flex-row mb-1">
                      <Text tw={cn('text-base self-center', isDisabled && 'text-gray-400')}>
                        {t('Dashboard.CoolingUnitsCratesInfo.weight')}
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
                          disabled
                          left={
                            <TextInput.Icon
                              disabled
                              icon="minus"
                              color={paperTheme.colors.primary}
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
                              disabled
                              icon="plus"
                              color={paperTheme.colors.primary}
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
                  </View>

                  <Controller
                    control={form.control}
                    name={`crates.${index}.isSellable`}
                    render={({ field: { value, onChange } }) => (
                      <TouchableOpacity
                        tw="flex flex-row items-center justify-between self-center mt-5 pr-3 space-x-1"
                        onPress={() => {
                          if (!applyToAll) {
                            onChange(!value);
                          } else {
                            for (let i = 0; i < crateFields.fields.length; i++) {
                              form.setValue(`crates.${i}.isSellable`, !value);
                            }
                          }
                        }}
                        disabled={isDisabled || !farmerEligible || !companyEligible}
                      >
                        <Checkbox
                          status={value ? 'checked' : 'unchecked'}
                          disabled={isDisabled || !farmerEligible || !companyEligible}
                        />
                        <Text
                          tw={cn(
                            'text-base',
                            (isDisabled || !farmerEligible || !companyEligible) && 'text-gray-300'
                          )}
                        >
                          {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.list')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              );
            }}
          />
        </View>

        <Divider tw="bg-gray-400" />

        {crates.some((crate) => crate.isSellable) ? (
          <View tw="pb-20">
            <View tw="flex flex-row space-x-1 mt-6 mb-2">
              <Text tw="text-base">
                {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.sellingPrice')}
              </Text>
              <Sup>
                ({params.companyCurrency}/{t('Dashboard.ProduceDetails.kilogram').toUpperCase()})
              </Sup>
            </View>

            <Controller
              control={form.control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <View>
                  <Input
                    tw="bg-white border rounded-sm h-14"
                    keyboardType="numeric"
                    value={value}
                    placeholder="0.00"
                    onChangeText={(text) => onChange(text)}
                  />
                </View>
              )}
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="absolute bottom-0 left-0 w-full">
        {crates.some((crate) => crate.isSellable) ? (
          <View tw="flex flex-row items-center justify-between bg-teal-50 p-4 rounded-sm">
            <View tw="flex flex-row items-center space-x-1">
              <Text tw="text-lg">
                {t(
                  'Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.potentialSellingPrice'
                )}
              </Text>
            </View>

            <Text tw="text-lg text-green-primary">
              {formatCurrencyWithSymbol(params.companyCurrency, potentialPrice.toFixed(2))}
            </Text>
          </View>
        ) : null}
        <View tw="w-full mb-2 items-center bg-white border-t-0.5 border-gray-600 border-solid">
          <Button
            tw="w-5/6 my-4"
            mode="contained"
            uppercase
            // eslint-disable-next-line
            onPress={form.handleSubmit(onSubmit as any)}
            disabled={
              typeof form.formState.errors.crates !== 'undefined' ||
              !hasChanges ||
              form.formState.isSubmitting ||
              (crates.some((crate) => crate.isSellable) && !(potentialPrice >= 1))
            }
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </HideWithKeyboardView>
    </React.Fragment>
  );
}

function _isDirty(
  crates: FormValues['crates'] = [],
  price: number = 0,
  previousPrice: number = 0,
  previousSellableCrates: Array<number> = []
) {
  const currentSellableCrates = new Set(
    crates.filter((crate) => crate.isSellable).map((crate) => crate.id)
  );

  const previousSellableSet = new Set(previousSellableCrates);
  const isPriceChanged = price !== previousPrice;

  const isSellableChanged =
    currentSellableCrates.size !== previousSellableSet.size ||
    [...currentSellableCrates].some((id) => !previousSellableSet.has(id));

  return isSellableChanged || isPriceChanged;
}

export default withSafeArea(
  withErrorBoundary(EditCrateWeightAndPricing, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
