import {
  usePayoutAccountTypeStore,
  usePayoutBankStore,
} from '#screens/Dashboard/AccountDetails/PayoutSettings';
import { useAggregatedData } from '#screens/Dashboard/Main/Analytics/Aggregated/store';
import { useCompanyData } from '#screens/Dashboard/Main/Analytics/Company/store';
import { useComparisonData } from '#screens/Dashboard/Main/Analytics/Comparison/store';
import {
  useAnalyticsConfigCoolingUnitStore,
  useAnalyticsDateRangeStore,
} from '#screens/Dashboard/Main/Analytics/components/Configuration';
import { farmerSurveyStores } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import {
  useCompanyStore,
  useCoolingUnitStore,
} from '#screens/Dashboard/Main/CoolingUnits/components/GenericFilter';
import {
  useDashboardCompanyStore,
  useDashboardCoolingUnitStore,
} from '#screens/Dashboard/Main/Dashboard';
import { usePaymentTypeStore } from '#screens/Dashboard/Main/Dashboard/Checkout/BillingInfo';
import { useCrateSelectionCoolingUnitStore } from '#screens/Dashboard/Main/Dashboard/Checkout/CrateSelection';
import { historyStores } from '#screens/Dashboard/Main/History';
import {
  useMeasurementStore,
  useSpoilageReasonsStore,
} from '#screens/Dashboard/Main/History/MarketSurvey/MarketSurvey';
import { rankingStores } from '#screens/Dashboard/Main/MarketPrice/Ranking';
import {
  useTrendCommodityStore,
  useTrendStateStore,
} from '#screens/Dashboard/Main/MarketPrice/Trend';
import { downloadAnalysisStores } from '#screens/Dashboard/Management/Analysis/components/DownloadDataModal';
import { revenueAnalysisStores } from '#screens/Dashboard/Management/Analysis/RevenueAnalysis';
import { usageAnalysisStores } from '#screens/Dashboard/Management/Analysis/UsageAnalysis';
import { useManagementStore } from '#stores/management';
import {
  useMarketplaceFilters,
  useMarketplaceQueryParams,
} from '#screens/Dashboard/Main/Marketplace/store';
import useCartStore from '#stores/shoppingCart';

const storesToReset = [
  usePayoutBankStore,
  usePayoutAccountTypeStore,
  useCoolingUnitStore,
  useCompanyStore,
  useDashboardCompanyStore,
  useDashboardCoolingUnitStore,
  useTrendCommodityStore,
  useTrendStateStore,
  usePaymentTypeStore,
  useCrateSelectionCoolingUnitStore,
  useMeasurementStore,
  useSpoilageReasonsStore,
  useAnalyticsConfigCoolingUnitStore,
  useAnalyticsDateRangeStore,
  useAggregatedData,
  useComparisonData,
  useCompanyData,
  useManagementStore,
  ...historyStores,
  ...rankingStores,
  ...farmerSurveyStores,
  ...revenueAnalysisStores,
  ...usageAnalysisStores,
  ...downloadAnalysisStores,
  useMarketplaceFilters,
  useMarketplaceQueryParams,
  useCartStore,
];

export function resetAllStores() {
  storesToReset.forEach((store) => store.getState().reset());
}
