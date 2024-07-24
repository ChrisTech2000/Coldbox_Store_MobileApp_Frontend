import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { EImpactMode } from '#types/global';

import { ImpactContent } from '../components/ImpactContent';
import { UsersContent } from '../components/UsersContent';
import { UtilizationContent } from '../components/UtilizationContent';
import { useAnalyticsData } from '../store';
import { GeneralContent } from './components/GeneralContent';
import { InnerTabs } from './components/InnerTabs';
import { generatePDFContent } from './utils';
import { useCompanyData } from './store';

export type Tab = 'users' | 'utilization' | 'impact';

const TABS = {
  users: <UsersContent key="users-content-section" />,
  utilization: <UtilizationContent key="utilization-content-section" />,
  impact: <ImpactContent key="impact-content-section" />,
};

export function CompanySection() {
  const { t } = useTranslationUtils();
  const toast = useToast();
  const { company } = useManagementStore();
  const { setCompanyData, setImpactData } = useCompanyData();
  const { setCoolingUnits } = useAnalyticsData();

  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  const { data: coolingUnits, isLoading: loadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: company?.id as number },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const { data: impactCompany, isLoading: loadingImpactCompany } = useApiCall(
    'getCompanyImpact',
    ImpactService.getCompanyImpact,
    company?.id as number,
    {
      skip: !company?.id,
    }
  );

  const { data: impactData, isLoading: loadingImpactData } = useApiCall(
    'getImpact',
    ImpactService.getImpact,
    {
      companyId: company?.id as number,
      coolingUnitId: coolingUnits?.map((unit) => unit.id) as number[],
      mode: EImpactMode.COMPANY,
    },
    {
      skip: !company?.id || !coolingUnits?.length,
    }
  );

  const onDownloadData = useCallback(async () => {
    const html = generatePDFContent(t, coolingUnits, company, impactCompany, impactData);

    const PDFOptions = {
      html,
      fileName: t('Dashboard.Analytics.companyTab.downloadFileName'),
      directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) throw new Error();
      toast.show(t('Dashboard.History.pdfModal.successMessage'), {
        type: 'success',
      });
    } catch {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'danger',
      });
    }
  }, [t, toast, coolingUnits, impactCompany, impactData, company]);

  useEffect(() => {
    if (impactCompany) {
      setCompanyData(impactCompany);
    }
  }, [impactCompany]);

  useEffect(() => {
    if (impactData) {
      setImpactData(impactData);
    }
  }, [impactData]);

  useEffect(() => {
    if (coolingUnits) {
      setCoolingUnits(coolingUnits);
    }
  }, [coolingUnits]);

  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      {activeTab && (
        <TouchableOpacity
          tw="flex flex-row w-full items-center space-x-2 justify-start"
          onPress={() => setActiveTab(undefined)}
        >
          <Icon source="arrow-left-circle-outline" size={15} />
          <Text variant="TextMedium" tw="text-base">
            {t(`Dashboard.Analytics.companyTab.goBackButton`)}
          </Text>
        </TouchableOpacity>
      )}

      <View tw="items-center mt-2 space-y-2">
        <InnerTabs
          activeTab={activeTab}
          onTabSelection={(tab: Tab) => setActiveTab(tab)}
          compactMode
        />
        {activeTab && (
          <Button
            mode="contained"
            uppercase
            onPress={onDownloadData}
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse"
            tw="w-[50%] mt-2"
          >
            {t('Dashboard.Analytics.downloadDataButton')}
          </Button>
        )}
        {!activeTab ? (
          <View tw="w-full">
            {loadingCoolingUnits || loadingImpactCompany || loadingImpactData ? (
              <View tw="flex-1 items-center justify-center mt-2">
                <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
              </View>
            ) : (
              <GeneralContent />
            )}
            <InnerTabs activeTab={activeTab} onTabSelection={(tab: Tab) => setActiveTab(tab)} />
            <Button
              mode="contained"
              onPress={() => null}
              tw="mt-2"
              contentStyle="bg-gray-300"
              labelStyle="text-black text-base"
            >
              {t('Dashboard.Analytics.companyTab.methodologyButton')}
            </Button>
          </View>
        ) : (
          TABS[activeTab]
        )}
      </View>
    </ScrollView>
  );
}
