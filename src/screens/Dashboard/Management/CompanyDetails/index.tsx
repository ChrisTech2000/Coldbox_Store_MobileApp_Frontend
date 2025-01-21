import React, { useMemo, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSWRConfig } from 'swr';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { useTranslationUtils } from '#i18n/utils';
import reportCrash from '#ui/lib/reportCrash';

import FormManager, { type FormValues } from './components/FormManager';
import LogoField from './modules/LogoField';
import CountryField from './modules/CountryField';
import CommodityField from './modules/CommodityField';
import CurrencyField from './modules/CurrencyField';

import { derivedSubjects } from './utils';
import InAppNotifications from '#common/InAppNotifications';

const width = (Dimensions.get('window').width - 42) / 2;

function CompanyDetails(props: ManagementRouteProps<'CompanyDetails'>) {
  const { navigation } = props;

  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

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

  async function onSubmit(values: FormValues) {
    if (!company?.id) return; // safe guard
    try {
      await ColdtivateService.updateCompany({
        name: subjects.companyName,
        country: values.country,
        crop: values.commodities,
        currency: values.currency,
        models: subjects.models,
        accountName: subjects.accountName ?? '',
        accountNumber: subjects.accountNumber ?? '',
        bankName: subjects.bankName ?? '',
        companyId: company.id,
        logo: values.logo.uri && values.logo.uri !== subjects.companyLogo ? values.logo : null,
      });

      toast.show(t('Dashboard.Management.CompanyDetails.toasts.success'), { type: 'md_success' });
      await mutate(getQueryKey('getCompanyById', company.id));
      navigation.goBack();
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }

  if (isLoadingCompanyDetails || isLoadingAllCrops) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!formInitialValues.current) {
    const values = { logo: {} } as FormValues;
    values.country = subjects.countryCode ?? '';
    values.currency = subjects.currencyCode ?? '';
    values.commodities = subjects.commodities ?? [];
    values.logo.uri = subjects.companyLogo ?? '';
    formInitialValues.current = values;
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          tw="h-full pt-5 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            tw="w-full bg-transparent mb-3"
            label={t('Dashboard.Management.CompanyDetails.labels.name')}
            mode="flat"
            value={companyDetails.name}
            disabled
            dense
          />
          <LogoField />
          <CountryField />
          <CommodityField crops={allCrops} />
          <CurrencyField />
          <View tw="w-full flex-row items-center justify-between mt-5">
            <Button
              style={{ width }}
              mode="contained"
              onPress={navigation.goBack}
              icon="close-circle-outline"
              buttonColor={paperTheme.colors.error}
              uppercase
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              style={{ width }}
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle'}
              uppercase
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                t('Dashboard.Management.CompanyDetails.actions.save')
              )}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(CompanyDetails, ['bottom'], true);
