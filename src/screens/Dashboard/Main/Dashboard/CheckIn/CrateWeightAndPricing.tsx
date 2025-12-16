import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import { USER_WITHOUT_PHONE } from '#constants/general';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import type { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useCheckInStore } from '#stores/checkIn';
import { useManagementStore } from '#stores/management';
import type { CheckMarketplaceEligibilityResponse } from '#types/api.responses';
import type { User } from '#types/global';

import { formatFloat } from '../../components/FarmerSurveyModal/schema';
import { InfoModal } from './CrateSetup/InfoModal';
import { formatCurrencyWithSymbol } from './utils';

type FormValues<T = string> = {
  applyToAll: boolean;
  crates: Array<{
    weight: T;
    isSellable: boolean;
    tag: string | undefined;
  }>;
  price: T | undefined;
};

type StoreState = Omit<FormValues<number>, 'applyToAll'>;
type StoreActions = { mutate: (values: StoreState) => void };

const useCrateWeightPricingStore = create<StoreState & StoreActions>((set) => ({
  crates: [],
  price: undefined,
  mutate: (values: StoreState) => set(values),
}));

export function useCrateWeightPricingBridge(cb: (values: StoreState) => void) {
  const [crates, price] = useCrateWeightPricingStore(
    useShallow((store) => [store.crates, store.price])
  );

  useEffect(() => {
    if (crates.length < 1) return;
    cb({ crates, price });
  }, [crates, price]);
}

export function resetCrateWeightPricingBridge() {
  useCrateWeightPricingStore.getState().mutate({ crates: [], price: undefined });
}

function CrateWeightAndPricing(props: CheckInStackRouteProps<'CrateWeightAndPricing'>) {
  const { params } = props.route;

  const { t, zodResolver } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const user = useCheckInStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  const [infoVisible, setInfoVisible] = useState(false);

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const isUserWithoutPhone = user?.user.firstName === USER_WITHOUT_PHONE && !user.user.phone;

  const {
    data: eligibility,
    isLoading,
    refetch,
  } = useApiCall(
    'checkMarketplaceEligibility',
    MarketplaceService.checkMarketplaceEligibility,
    {
      userIds: [user!.user.id],
      companyIds: [company!.id],
    },
    {
      skip: !user || !company || isUserWithoutPhone,
      defaultData: {} as CheckMarketplaceEligibilityResponse,
    }
  );

  const form = useForm<FormValues>({
    defaultValues: {
      applyToAll: params.applyToAll,
      crates: params.crates.map((crate) => ({
        weight: crate.weight.toString(),
        isSellable: crate.isSellable,
        tag: crate.tag,
      })),
      price: params.sellingPrice.toString(),
    },
    resolver: zodResolver((z) => {
      const coerseNumber = z.coerce.number();
      return z.object({
        applyToAll: z.boolean(),
        price: z
          .string()
          .transform((v) => v.replaceAll(',', '.'))
          .pipe(coerseNumber.gte(0))
          .optional(),
        crates: z
          .array(
            z.object({
              id: z.number().optional(),
              weight: z.preprocess((v) => (v ? Number(v) : 0), coerseNumber.gt(0)),
              isSellable: z.boolean(),
            })
          )
          .min(1),
      });
    }),
    reValidateMode: 'onSubmit',
  });

  const crateFields = useFieldArray({ control: form.control, name: 'crates' });

  const applyToAll = form.watch('applyToAll');
  const price = form.watch('price');
  const crates = form.watch('crates');
  const areTagsDefined = crates.filter((crate) => !!crate.tag).length > 0;

  const totalWeight = crates.reduce((acc, curr) => {
    if (!curr.isSellable) return acc;
    const wInt = Number(curr.weight);
    if (isNaN(wInt)) return acc;
    return (acc += wInt);
  }, 0);

  const parsedPrice = Number(formatFloat(price ?? '0'));
  const potentialPrice = isNaN(parsedPrice) ? 0 : totalWeight * parsedPrice;

  function onSubmit(values: FormValues<number>): void {
    useCrateWeightPricingStore.getState().mutate({ crates: values.crates, price: potentialPrice });
    props.navigation.goBack();
  }

  const companyEligible = eligibility.companies?.[company?.id ?? ''];
  const farmerEligible = eligibility.users?.[user?.user.id ?? ''];
  const allowedToSetPricing =
    guard('SET', 'MarketplaceListForSale') && companyEligible && farmerEligible;

  // check if any crates are marked for sale
  const hasAnyCrateForSale = crates.some((crate) => crate.isSellable);

  // determine if submit button should be disabled
  const isSubmitDisabled =
    hasAnyCrateForSale &&
    (!!form.formState.errors.crates ||
      !!form.formState.errors.price ||
      form.formState.isSubmitting ||
      !form.formState.isDirty ||
      (allowedToSetPricing && !parsedPrice));

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
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
          <View tw="mx-4">
            <Text>
              {t('Dashboard.ProduceDetails.operatorNoBankAccountWarning', {
                name: `${user?.user.firstName ?? ''} ${user?.user.lastName ?? ''}`,
              })}
            </Text>
            <Button
              tw="self-end mt-2"
              onPress={() =>
                props.navigation.navigate('AddFarmerBankAccount', {
                  farmer: user?.user as User,
                  recheckEligibility: refetch,
                })
              }
            >
              {t('Dashboard.ProduceDetails.addBankAccountButton')}
            </Button>
          </View>
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
                <Pressable
                  tw="pb-2 px-2 flex flex-row items-center justify-between"
                  disabled={!allowedToSetPricing}
                  onPress={() => {
                    const isSellable = form.getValues('crates.0.isSellable');
                    for (let i = 0; i < crateFields.fields.length; i++) {
                      form.setValue(`crates.${i}.isSellable`, isSellable);
                    }
                    onChange(!value);
                  }}
                >
                  <Text tw="text-base">
                    {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.applyAll')}
                  </Text>
                  <Checkbox status={value ? 'checked' : 'unchecked'} />
                </Pressable>
              )}
            />
            <Divider tw="bg-gray-400" />
          </View>

          <FlashList
            tw="py-3"
            data={crateFields.fields}
            keyExtractor={(field) => field.id}
            estimatedItemSize={120}
            renderItem={({ item, index }) => {
              const isDisabled = applyToAll && index > 0;
              return (
                <View tw="flex-row items-center my-3 justify-between">
                  <View tw="flex-col items-center px-3 mt-5 self-end">
                    <Icon
                      name="basket-outline"
                      size={30}
                      color={isDisabled ? colors.gray[400] : paperTheme.colors.onSurface}
                    />
                    <Text tw={cn('text-sm w-12 text-center', isDisabled && 'text-gray-400')}>
                      #&nbsp;
                      {areTagsDefined
                        ? (item.tag ??
                          t(
                            'Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.unavailableId'
                          ))
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
                            isDisabled ? 'border-gray-400' : undefined
                          )}
                          keyboardType="numeric"
                          value={value}
                          defaultValue="0"
                          placeholder="0"
                          editable={false}
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
                              disabled={isDisabled || value === '1'}
                              onPress={(evt) => {
                                evt.stopPropagation();
                                const int = Number(value);
                                if (isNaN(int)) return; // safe guard
                                const finalValue = (int > 0 ? int - 1 : 0).toString();
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
                  </View>

                  <RBAC.ProtectedResource action="SET" subject="MarketplaceListForSale">
                    <Controller
                      control={form.control}
                      name={`crates.${index}.isSellable`}
                      render={({ field: { value, onChange } }) => (
                        <Pressable
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
                          disabled={isDisabled || !allowedToSetPricing}
                        >
                          <Checkbox
                            status={value ? 'checked' : 'unchecked'}
                            disabled={isDisabled || !allowedToSetPricing}
                          />
                          <Text
                            tw={cn(
                              'text-base text-wrap',
                              Dimensions.get('window').height <= SMALL_SCREEN_THRESHOLD && 'w-20',
                              (isDisabled || !allowedToSetPricing) && 'text-gray-300'
                            )}
                          >
                            {t(
                              'Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.list'
                            )}
                          </Text>
                        </Pressable>
                      )}
                    />
                  </RBAC.ProtectedResource>
                </View>
              );
            }}
            ListFooterComponent={
              <View tw="w-full flex-row justify-start">
                <Button
                  tw="my-3"
                  mode="text"
                  disabled={applyToAll}
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    crateFields.append({
                      weight: '25',
                      isSellable: false,
                      tag: undefined,
                    });
                    scrollViewRef.current?.scrollToEnd(true);
                  }}
                >
                  {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.addMore')}
                </Button>
              </View>
            }
          />
        </View>

        <Divider tw="bg-gray-400" />

        <RBAC.ProtectedResource action="SET" subject="MarketplaceListForSale">
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
        </RBAC.ProtectedResource>
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
              <Pressable
                onPress={() => setInfoVisible(true)}
                disabled={form.formState.isSubmitting}
              >
                <Icon name="information-outline" size={20} />
              </Pressable>
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
            disabled={isSubmitDisabled}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </HideWithKeyboardView>

      <InfoModal visible={infoVisible} onDismiss={() => setInfoVisible(false)} />
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(CrateWeightAndPricing, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
