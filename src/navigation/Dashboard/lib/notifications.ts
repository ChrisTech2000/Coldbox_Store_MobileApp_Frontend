import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '#stores/auth';
import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import NotificationService from '#services/NotificationService';
import type { GetNotificationsResponse } from '#types/api.responses';

const SWR_CACHE_KEY = 'getNotifications';

export function useNotifications() {
  const user = useAuthStore(useShallow((store) => store.user));

  return useApiCall(SWR_CACHE_KEY, NotificationService.getNotifications, user!.id, {
    skip: !user?.id,
    defaultData: [],
  });
}

export function useNotificationsCache() {
  const user = useAuthStore(useShallow((store) => store.user));
  return useApiCache<number, GetNotificationsResponse>(SWR_CACHE_KEY, user?.id);
}
