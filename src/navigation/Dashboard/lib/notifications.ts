import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '#stores/auth';
import { type IApiQueryOptions, useApiCall } from '#services/hooks/useAPiCall';
import NotificationService from '#services/NotificationService';

async function _fetchNotifications(userId: number) {
  const result = await NotificationService.getNotifications(userId);
  return {
    notifications: result ?? [],
    newNotificationsCount: (result ?? []).filter((item) => !item.seen).length,
  };
}

export function useNotifications(
  opts?: IApiQueryOptions<Awaited<ReturnType<typeof _fetchNotifications>>>
) {
  const user = useAuthStore(useShallow((store) => store.user));

  return useApiCall('getNotifications', _fetchNotifications, user!.id, {
    skip: !user?.id,
    defaultData: { notifications: [], newNotificationsCount: 0 },
    ...opts,
  });
}
