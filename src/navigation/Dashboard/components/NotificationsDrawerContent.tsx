import React, { useCallback } from 'react';
import { View, FlatList, type GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { getQueryKey } from '#services/hooks/useAPiCall';
import NotificationService from '#services/NotificationService';
import { dateFmt } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import type { ProcessedNotifications } from '../lib/notifications';

type Props = {
  notifications: ProcessedNotifications['notifications'];
};

function NotificationsDrawerContent(props: Props) {
  const { notifications } = props;

  const user = useAuthStore(useShallow((store) => store.user));
  const { mutate } = useSWRConfig();

  const revalidate = useCallback(async () => {
    await mutate(getQueryKey('getNotifications', user));
  }, [user]);

  return (
    <View tw="flex-1 justify-start">
      <View tw="p-4 bg-zinc-100 border-b-0.5 border-zinc-500">
        <Text variant="TitleRegular">Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => `notification-#${item.id}`}
        renderItem={({ item }) => <_NotificationItem item={item} revalidate={revalidate} />}
        nestedScrollEnabled
      />
    </View>
  );
}

function _NotificationItem({
  item,
  revalidate,
}: {
  item: Props['notifications'][0];
  revalidate: () => Promise<void>;
}) {
  async function updateStatusHandler(evt: GestureResponderEvent) {
    evt.stopPropagation();
    try {
      if (item.seen) return;
      const result = await NotificationService.updateNotificationStatus(item.id);
      if (result?.id) await revalidate();
      // TODO: implement openSurvey
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <React.Fragment>
      <View tw="px-2 pt-2.5">
        <Text tw="text-zinc-400">{dateFmt(item.date, 'dd-MM-yyyy HH:mm')}</Text>
      </View>
      <TouchableOpacity tw="p-2" onPress={updateStatusHandler}>
        <Text
          variant={item.seen ? undefined : 'TextMedium'}
          tw={cn(item.seen ? 'text-zinc-600' : 'text-black')}
        >
          {item.message}&nbsp;
          <Text variant={item.seen ? undefined : 'TextMedium'} tw="text-blue-500">
            {item.link}
          </Text>
        </Text>
      </TouchableOpacity>
      <Divider tw="w-full bg-zinc-500 mt-1.5" />
    </React.Fragment>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom']);
