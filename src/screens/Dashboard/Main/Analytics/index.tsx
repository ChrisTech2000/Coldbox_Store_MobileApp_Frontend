import React from 'react';

import { GenericError } from '#ui/components/GenericError';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

import { Analytics } from './Analytics';
import { FarmerAnalytics } from './FarmerAnalytics';

function AnalyticsBase() {
  const { user } = useAuthStore();
  return user?.role === ERoles.COOLING_USER ? <FarmerAnalytics /> : <Analytics />;
}

export default withSafeArea(
  withErrorBoundary(AnalyticsBase, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
