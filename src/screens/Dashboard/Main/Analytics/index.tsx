import React from 'react';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

import Analytics from '../Analytics';
import { FarmerAnalytics } from './FarmerAnalytics';

function AnalyticsBase() {
  const { user } = useAuthStore();
  return user?.role === ERoles.COOLING_USER ? <FarmerAnalytics /> : <Analytics />;
}

export default withSafeArea(AnalyticsBase);
