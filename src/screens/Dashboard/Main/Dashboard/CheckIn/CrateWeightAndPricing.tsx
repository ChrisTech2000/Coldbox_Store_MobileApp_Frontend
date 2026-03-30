import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import { USER_WITHOUT_PHONE } from '#constants/general';
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

type CrateData = {
  weight: number;
  isSellable: boolean;
  tag: string | undefined;
};

type FormValues = {
  kgToList: string;
  price: string;
};

type StoreState = { crates: CrateData[]; price: number | undefined; totalListedWeight: number | undefined; picture?: { uri: string; type: string; name: string } | null; };
type StoreActions = { mutate: (values: StoreState) => void };

const useCrateWeightPricingStore = create<StoreState & StoreActions>((set) => ({
  crates: [],
  price: undefined,
  totalListedWeight: undefined,
  picture: undefined,
  mutate: (values: StoreState) => set(values),
}));

export function useCrateWeightPricingBridge(cb: (values: StoreState) => void) {
  const [crates, price, totalListedWeight, picture] = useCrateWeightPricingStore(
    useShallow((store) => [store.crates, store.price, store.totalListedWeight, store.picture])
  );

  useEffect(() => {
    if (crates.length < 1) return;
    cb({ crates, price, totalListedWeight, picture });
  }, [crates, price, totalListedWeight, picture]);
}

export function resetCrateWeightPricingBridge() {
  useCrateWeightPricingStore.getState().mutate({ crates: [], price: undefined, totalListedWeight: undefined, picture: undefined });
}

/**
 * Greedy crate selection: picks crates (largest first) until targetKg is reached.
 * Returns a copy of all crates with isSellable set appropriately.
 */
function selectCratesForKg(
  crates: Array<{ weight: number; isSellable: boolean; tag: string | undefined }>,
  targetKg: number
): CrateData[] {
  const indexed = crates.map((c, i) => ({ ...c, _i: i }));
  const sorted = [...indexed].sort((a, b) => b.weight - a.weight);
  let remaining = targetKg;
  const selected = new Set<number>();
  for (const c of sorted) {
    if (remaining <= 0) break;
    selected.add(c._i);
    remaining -= c.weight;
  }
  return crates.map((c, i) => ({ ...c, isSellable: selected.has(i) }));
}

function CrateWeightAndPricing(props: CheckInStackRouteProps<'CrateWeightAndPricing'>) {
  const { params } = props.route;

  const { t, zodResolver } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const user = useCheckInStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  const [infoVisible, setInfoVisible] = React.useState(false);
  const [picture, setPicture] = React.useState<{ uri: string; type: string; name: string } | null>(null);
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

  // Total kg available from all crates passed in
  const totalAvailableKg = Math.round(params.crates.reduce((sum, c) => sum + (c.weight ?? 0), 0));

  const form = useForm<FormValues>({
    defaultValues: {
      kgToList: '',
      price: params.sellingPrice?.toString() ?? '0',
    },
    resolver: zodResolver((z) => {
      const max = totalAvailableKg;
      return z.object({
        kgToList: z
          .string()
          .transform((v) => v.replaceAll(',', '.'))
          .pipe(z.coerce.number().gte(0).lte(max)),
        price: z
          .string()
          .transform((v) => v.replaceAll(',', '.'))
          .pipe(z.coerce.number().gte(0)),
      });
    }),
    reValidateMode: 'onSubmit',
  });

  const kgToList = form.watch('kgToList');
  const price = form.watch('price');

  const parsedKg = Number(formatFloat(kgToList ?? '0'));
  const parsedPrice = Number(formatFloat(price ?? '0'));
  const isListingForSale = !isNaN(parsedKg) && parsedKg > 0;
  const potentialPrice = isListingForSale && !isNaN(parsedPrice) ? parsedKg * parsedPrice : 0;

  function onSubmit(values: FormValues): void {
    try {
      const kg = Number(formatFloat(values.kgToList));
      const parsedPriceVal = Number(formatFloat(values.price));
      const rawCrates = params.crates.map((c) => ({
        weight: c.weight,
        isSellable: false,
        tag: c.tag,
      }));
      const selectedCrates = kg > 0 ? selectCratesForKg(rawCrates, kg) : rawCrates;

      // Compute price from ACTUAL selected crate weight so processMarketplaceCrateListing
      // gets the exact pricePerKg back: (actualWeight * pricePerKg) / actualWeight = pricePerKg
      const actualSellableKg = selectedCrates
        .filter((c) => c.isSellable)
        .reduce((sum, c) => sum + c.weight, 0);
      const correctTotalPrice = actualSellableKg > 0 ? actualSellableKg * parsedPriceVal : 0;

      useCrateWeightPricingStore.getState().mutate({
        crates: selectedCrates,
        price: correctTotalPrice,
        totalListedWeight: kg > 0 ? kg : undefined,
        picture,
      });
      props.navigation.goBack();
    } catch (e) {
      console.error('Submit error', e);
    }
  }

  const companyEligible = eligibility.companies?.[company?.id ?? ''];
  const farmerEligible = eligibility.users?.[user?.user.id ?? ''];
  const allowedToSetPricing =
    guard('SET', 'MarketplaceListForSale') && companyEligible && farmerEligible;

  const hasErrors = Object.keys(form.formState.errors).length > 0;
  const isSubmitDisabled =
    hasErrors ||
    form.formState.isSubmitting ||
    (isListingForSale && allowedToSetPricing && (!parsedPrice || parsedPrice <= 0));

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      {/* Bank account / eligibility warnings */}
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
        tw="px-4 pt-6 bg-white mb-20"
        showsVerticalScrollIndicator={false}
      >
        <View tw="flex-1 space-y-6">

          {/* Total available kg badge */}
          <View tw="bg-green-50 border border-green-100 rounded-2xl p-5">
            <Text tw="text-xs text-green-700 font-bold uppercase tracking-widest mb-1">
              {t('Dashboard.ProduceDetails.combinedWeight')}
            </Text>
            <Text tw="text-3xl text-green-900 font-black">
              {totalAvailableKg}{' '}
              <Text tw="text-xl text-green-700 font-semibold">
                {t('Dashboard.ProduceDetails.kilogram')}
              </Text>
            </Text>
          </View>

          {/* Market listing section */}
          <RBAC.ProtectedResource action="SET" subject="MarketplaceListForSale">
            {allowedToSetPricing ? (
              <View tw="space-y-5">
                {/* KG to list */}
                <View tw="space-y-2">
                  <Text tw="text-base font-semibold text-gray-800">
                    How many kg do you want to list for the market?
                  </Text>
                  <View tw="flex-row items-center space-x-1 mb-1">
                    <Text tw="text-xs text-gray-500">
                      Max available:
                    </Text>
                    <Text tw="text-xs text-green-700 font-semibold">
                      {totalAvailableKg} {t('Dashboard.ProduceDetails.kilogram').toLowerCase()}
                    </Text>
                  </View>
                  <Controller
                    control={form.control}
                    name="kgToList"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <View>
                        <Input
                          tw="bg-white border border-gray-200 rounded-xl h-14 text-lg"
                          keyboardType="numeric"
                          value={value}
                          placeholder="e.g. 25"
                          onChangeText={onChange}
                        />
                        {!!error && (
                          <Text tw="text-red-500 text-sm mt-1">
                            {`Please enter a value between 1 and ${totalAvailableKg} ${t('Dashboard.ProduceDetails.kilogram').toLowerCase()}`}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>

                {/* Price per kg — only appears once they enter a kg value */}
                {isListingForSale && (
                  <View tw="space-y-2 pb-20">
                    <View tw="flex-row items-center space-x-1">
                      <Text tw="text-base font-semibold text-gray-800">
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
                        <Input
                          tw="bg-white border border-gray-200 rounded-xl h-14 text-lg"
                          keyboardType="numeric"
                          value={value}
                          placeholder="0.00"
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </View>
                )}

                {/* Image Picker */}
                {isListingForSale && (
                  <View tw="space-y-2 pb-20 pt-4">
                    <Text tw="text-base font-semibold text-gray-800">
                      Add a picture of the produce (Optional)
                    </Text>
                    <View tw="flex-row items-center space-x-3">
                      <Button
                        onPress={() => {
                          const { launchImageLibrary } = require('react-native-image-picker');
                          launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (res: any) => {
                            if (res.assets?.[0]) {
                              const { uri, type, fileName } = res.assets[0];
                              setPicture({ uri, type, name: fileName });
                            }
                          });
                        }}
                      >
                        {picture ? 'Change Picture' : 'Select Picture'}
                      </Button>
                      {picture ? (
                        <Text tw="text-green-600 font-medium">Image selected ✓</Text>
                      ) : null}
                    </View>
                  </View>
                )}
              </View>
            ) : null}
          </RBAC.ProtectedResource>

        </View>
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="absolute bottom-0 left-0 w-full">
        {potentialPrice > 0 ? (
          <View tw="flex flex-row items-center justify-between bg-teal-50 p-4">
            <Text tw="text-lg">
              {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.potentialSellingPrice')}
            </Text>
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
