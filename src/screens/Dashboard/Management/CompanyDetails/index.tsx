import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues } from './components/FormManager';
import CountryField from './modules/CountryField';
import CommodityField from './modules/CommodityField';
import CurrencyField from './modules/CurrencyField';

import { derivedSubjects } from './utils';

function CompanyDetails() {
  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const company = useManagementStore(useShallow((store) => store.company));

  const { data: companyDetails, isLoading: isLoadingCompanyDetails } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: undefined,
    }
  );

  const { data: allCrops, isLoading: isLoadingAllCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const subjects = useMemo(() => derivedSubjects(companyDetails), [companyDetails]);

  if (isLoadingCompanyDetails || isLoadingAllCrops) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!formInitialValues.current) {
    const values = {} as FormValues;
    values.country = subjects.countryCode ?? '';
    values.currency = subjects.currencyCode ?? '';
    values.commodities = subjects.commodities ?? [];
    formInitialValues.current = values;
  }

  return (
    <FormManager
      onSubmit={async (values) => console.log(values)}
      initialValues={formInitialValues.current}
    >
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          tw="h-full pt-5 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            tw="w-full bg-transparent mb-3"
            label="Name"
            mode="outlined"
            value={companyDetails.name}
            disabled
            dense
          />
          <CountryField />
          <CommodityField crops={allCrops} />
          <CurrencyField />
          <Button
            tw="w-full mt-6"
            mode="contained"
            onPress={submitHandler}
            icon={isSubmitting ? undefined : 'plus-circle'}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : 'Save Changes'}
          </Button>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(CompanyDetails);
