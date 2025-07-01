import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { USER_WITHOUT_PHONE } from '#constants/general';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import {
  MarketplaceListing2ScreenOverlay,
  MarketplaceListing3ScreenOverlay,
} from '#screens/Dashboard/Tutorial/MarketplaceOverlay';
import { EMarketplaceTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useTutorialStore } from '#stores/tutorial';
import type { ListedCratesBaseParams } from '#types/api.params';
import { ERoles, User } from '#types/global';

import { formatFloat } from '../../components/FarmerSurveyModal/schema';
import { useMarketplaceListing } from '../../Marketplace/utils';
import { formatCurrencyWithSymbol } from '../CheckIn/utils';

type FormValues<T = string> = {
  applyToAll: boolean;
  crates: Array<{
    id: number;
    weight: T;
    tag: string | undefined;
    isSellable: boolean;
  }>;
  price: T;
  previous: {
    sellableCrates: Array<number>;
    price: number;
  };
};

const screenWidth = Dimensions.get('window').width;

function EditCrateWeightAndPricing(
  props: ProduceDetailsStackRouteProps<'EditCrateWeightAndPricing'>
) {
  const { params } = props.route;
  const ownedByCompanyId = params.produce.ownedOnBehalfOfCompanyId;

  const user = useAuthStore((store) => store.user);
  const refreshData = useDashboardStore((store) => store.refreshData);
  const isTutorialActive = useTutorialStore(useShallow((store) => store.isTutorialActive));
  const { refetch: refetchMarketplace } = useMarketplaceListing();
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isSettingUp, toggleIsSettingUp] = useToggle(true);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const { data: owner, isLoading: isLoadingFarmer } = useApiCall(
    'getUser',
    ColdtivateService.getUser,
    params.produce.ownedByUserId,
    {
      skip: !params.produce.ownedByUserId,
    }
  );

  const isUserWithoutPhone = owner?.firstName === USER_WITHOUT_PHONE && !owner?.phone;

  const {
    data: eligibility,
    isLoading: isLoadingEligibility,
    refetch,
  } = useApiCall(
    'checkMarketplaceEligibility',
    MarketplaceService.checkMarketplaceEligibility,
    {
      userIds: owner?.id ? [owner.id] : [user?.id as number],
      companyIds: [params.companyId, ...(ownedByCompanyId ? [ownedByCompanyId] : [])],
    },
    {
      skip:
        !params.companyId || (!owner?.id && !user?.id) || isUserWithoutPhone || isTutorialActive,
    }
  );

  const form = useForm<FormValues>({
    defaultValues: { applyToAll: false, crates: [], price: '0' },
    resolver: zodResolver((z) => {
      const coerseNumber = z.coerce.number().gte(0);
      return z.object({
        applyToAll: z.boolean(),
        price: z
          .string()
          .transform((v) => v.replaceAll(',', '.'))
          .pipe(coerseNumber),
        crates: z
          .array(
            z.object({
              id: z.number(),
              weight: z.preprocess((v) => (v ? Number(v) : 0), coerseNumber),
              tag: z.string().nullable(),
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
  const areCrateTagsSet = crates.filter((crate) => !!crate.tag).length > 0;

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
      const { previous, crates, price: currentPrice } = values;

      const cratesToList: Array<number> = [];
      const cratesToDelist: Array<number> = [];

      for (const crate of crates) {
        const wasSellable = previous.sellableCrates.includes(crate.id);
        if (crate.isSellable && !wasSellable) cratesToList.push(crate.id);
        if (!crate.isSellable && wasSellable) cratesToDelist.push(crate.id);
      }

      const promises: Array<Promise<unknown>> = [];

      const operatorParams =
        user?.role === ERoles.OPERATOR
          ? ({
              ...(_produce.ownedOnBehalfOfCompanyId
                ? { operatorOnBehalfOfSellerCompanyId: _produce.ownedOnBehalfOfCompanyId }
                : owner.role === ERoles.COOLING_USER
                  ? { operatorOnBehalfOfSellerFarmerId: _produce.ownedByUserId }
                  : { operatorOnBehalfOfSellerUserId: _produce.ownedByUserId }),
            } satisfies ListedCratesBaseParams)
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
        refetchMarketplace();
        props.navigation.navigate('Root', {
          produce: _produce,
          currency: params.companyCurrency,
          coolingUnit: params.coolingUnit,
          companyId: params.companyId,
        });
      } else {
        toast.show(t('Dashboard.ProduceDetails.preSaleError'), { type: 'md_danger' });
      }
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }

  const debouncedInitialSetup = useDebouncedCallback(async (): Promise<void> => {
    try {
      const ownerId = params.produce.ownedByUserId;
      const companyOwnerId = params.produce.ownedOnBehalfOfCompanyId;
      const result = isTutorialActive
        ? { nodes: [] }
        : await MarketplaceService.getSellerListedCrates(
            user?.role === ERoles.OPERATOR
              ? {
                  ...(companyOwnerId
                    ? { operatorOnBehalfOfSellerCompanyId: companyOwnerId }
                    : owner.role === ERoles.COOLING_USER
                      ? { operatorOnBehalfOfSellerFarmerId: ownerId }
                      : { operatorOnBehalfOfSellerUserId: ownerId }),
                }
              : undefined
          );

      const initialCrates: FormValues['crates'] = params.produce.checkedInCrates.map((crate) => ({
        id: crate.id,
        weight: crate.weight.toString(),
        tag: crate.tag,
        isSellable: crate.listedInTheMarketplace ?? false,
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
      reportCrash(exception as Error);
    } finally {
      if (isSettingUp) toggleIsSettingUp();
    }
  }, 700);

  useEffect(() => {
    void debouncedInitialSetup();
  }, [params.produce.checkedInCrates]);

  const { onLayout } = useWalkthroughStep({
    number: EMarketplaceTutorialSteps.COMMON_LIST_FOR_SALE_STEP,
    OverlayComponent: MarketplaceListing2ScreenOverlay,
    layoutAdjustments: { x: LanguageManager.isRTL ? (screenWidth * 2) / 3 : undefined },
    onPressMask: () => {
      form.setValue(`crates.${0}.isSellable`, true);
    },
  });

  useWalkthroughStep({
    number: EMarketplaceTutorialSteps.COMMON_LIST_FOR_SALE_PRICE_STEP,
    OverlayComponent: MarketplaceListing3ScreenOverlay,
    fullScreen: true,
  });

  const hasChanges = _isDirty(
    crates,
    Number(formatFloat(price ?? '0')),
    form.getValues('previous.price'),
    form.getValues('previous.sellableCrates')
  );

  const companyEligible = eligibility?.companies?.[params.companyId ?? ''] || isTutorialActive;
  const farmerEligible =
    eligibility?.users?.[owner?.id ?? user?.id ?? ''] ||
    (ownedByCompanyId && eligibility?.companies?.[ownedByCompanyId]) ||
    isTutorialActive;

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
        {isUserWithoutPhone ? (
          <Text tw="mx-4">{t('Dashboard.ProduceDetails.userWithoutPhone')}</Text>
        ) : !companyEligible ? (
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
                  name: `${params.produce.owner ?? ''}`,
                })}
              </Text>
              <Button
                tw="self-end mt-2"
                onPress={() =>
                  props.navigation.navigate('AddFarmerBankAccount', {
                    farmer: owner as User,
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
            renderItem={({ item, index }) => {
              const isDisabled = applyToAll && index > 0;
              return (
                <View tw="flex-row items-center justify-between my-3">
                  <View tw="flex-col items-center justify-center px-3 self-end">
                    <Icon
                      name="basket-outline"
                      size={30}
                      color={isDisabled ? colors.gray[400] : paperTheme.colors.onSurface}
                    />
                    <Text
                      tw={cn('text-sm text-center w-12 text-wrap', isDisabled && 'text-gray-400')}
                    >
                      #&nbsp;
                      {areCrateTagsSet
                        ? item.tag ||
                          t(
                            'Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.unavailableId'
                          )
                        : index + 1}
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
                        tw="flex flex-row items-center justify-between self-center mt-5 pr-3 space-x-1 w-30"
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
                        onLayout={index === 0 ? onLayout : undefined}
                      >
                        <Checkbox
                          status={value ? 'checked' : 'unchecked'}
                          disabled={isDisabled || !farmerEligible || !companyEligible}
                        />
                        <Text
                          tw={cn(
                            'text-base',
                            Dimensions.get('window').height <= SMALL_SCREEN_THRESHOLD && 'w-20',
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
        <View tw="w-full items-center bg-white border-t-0.5 border-gray-600 border-solid pt-4 pb-5 px-4">
          <Button
            tw="w-full"
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
