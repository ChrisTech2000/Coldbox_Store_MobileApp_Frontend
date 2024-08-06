import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '#stores/auth';
import { type IApiQueryOptions, useApiCall } from '#services/hooks/useAPiCall';
import NotificationService from '#services/NotificationService';
import type { GetNotificationsResponse } from '#types/api.responses';

export function useNotifications(opts?: IApiQueryOptions<GetNotificationsResponse>) {
  const user = useAuthStore(useShallow((store) => store.user));

  return useApiCall('getNotifications', NotificationService.getNotifications, user!.id, {
    skip: !user?.id,
    defaultData: [],
    ...opts,
  });
}
