import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { EImpactMode } from '#types/global';

import { CommonFooter } from '../components/Footer';
import { ImpactContent } from '../components/ImpactContent';
import { useAnalyticsData } from '../store';
import { generatePDFContent } from '../utils/downloadData';
import { GeneralContent } from './components/GeneralContent';
import { InnerTabs } from './components/InnerTabs';
import { UsersContent } from './components/UsersContent';
import { UtilizationContent } from './components/UtilizationContent';
import { useCompanyData } from './store';
import { BackArrowIcon } from '../components/GoBackArrow';

export type Tab = 'users' | 'utilization' | 'impact';

const TABS = {
  users: <UsersContent key="users-content-section" />,
  utilization: <UtilizationContent key="utilization-content-section" />,
  impact: <ImpactContent useStore={useCompanyData} key="impact-content-section" />,
};

const screenHeight = Dimensions.get('window').height;

export function CompanySection() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { company } = useManagementStore();
  const { setCompanyData, setImpactData } = useCompanyData();
  const { setCoolingUnits } = useAnalyticsData();

  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isCreatingPdf, setIsCreatingPdf] = useState<boolean>(false);

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
    setIsCreatingPdf(true);
    try {
      const html = generatePDFContent(
        t,
        coolingUnits,
        company,
        impactCompany,
        impactData,
        'company'
      );
      const fileName = `${t('Dashboard.Analytics.companyTab.downloadFileName')}-${t('Dashboard.Analytics.company')}`;
      await FileUtility.createPdfFromHtml(html, fileName);
      toast.show(`${t('actions.done')}!`, { type: 'md_success' });
    } catch (exception) {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error, {
        extras: {
          hasCoolingUnits: !!coolingUnits?.length,
          hasImpactCompany: !!impactCompany,
          hasImpactData: !!impactData,
          errorContext: 'PDF Generation',
        },
      });
    } finally {
      setIsCreatingPdf(false);
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
    <ScrollView tw="mt-4 h-full" showsVerticalScrollIndicator={false}>
      <View tw={screenHeight <= SMALL_SCREEN_THRESHOLD ? 'mb-20' : 'mb-12'}>
        {activeTab && (
          <TouchableOpacity
            tw="flex flex-row w-full items-center space-x-2 justify-start"
            onPress={() => setActiveTab(undefined)}
          >
            <BackArrowIcon />
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
          {activeTab ? (
            <Button
              mode="contained"
              uppercase
              onPress={onDownloadData}
              icon={isCreatingPdf ? undefined : 'check-circle-outline'}
              contentStyle="flex flex-row-reverse"
              tw="w-[50%] mt-2"
              disabled={isCreatingPdf}
            >
              {isCreatingPdf ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                t('Dashboard.Analytics.downloadDataButton')
              )}
            </Button>
          ) : null}
          {!activeTab ? (
            <View tw="w-full">
              {loadingCoolingUnits || loadingImpactCompany || loadingImpactData ? (
                <View tw="flex-1 items-center justify-center mt-2">
                  <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
                </View>
              ) : (
                <GeneralContent />
              )}
              <CommonFooter
                tabs={
                  <InnerTabs
                    activeTab={activeTab}
                    onTabSelection={(tab: Tab) => setActiveTab(tab)}
                  />
                }
              />
            </View>
          ) : (
            TABS[activeTab]
          )}
        </View>
      </View>
    </ScrollView>
  );
}
