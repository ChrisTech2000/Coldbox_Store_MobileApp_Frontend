import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';

import { useSettingUpSurvey, type Notification, NOTIFICATION_EXCEPTIONS } from '../index';

export default function NotificationItem(props: {
  item: Notification;
  updateStatusHandler: () => Promise<void>;
}) {
  const { item, updateStatusHandler } = props;

  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();

  const isSurveyLoading = useSettingUpSurvey((store) => store.isLoading);
  const setIsSurveyLoading = useSettingUpSurvey((store) => store.toggle);

  return (
    <React.Fragment>
      <View tw="px-2 pt-2.5">
        <Text tw="text-zinc-400">{dateFmt(item.date, 'dd-MM-yyyy HH:mm')}</Text>
      </View>
      <TouchableOpacity
        tw="p-2"
        onPress={async (evt) => {
          evt.stopPropagation();
          try {
            setIsSurveyLoading(true);
            await updateStatusHandler();
          } catch (exception) {
            console.error(exception);
            let toastId: string | undefined = undefined;
            if (exception instanceof Error) {
              if (exception.message === NOTIFICATION_EXCEPTIONS.SURVEY_FILLED_IN) {
                toastId = toast.show(t('Dashboard.Notifications.surveyAlreadyFilled'), {
                  type: 'md_danger',
                });
              }
            }
            if (!toastId) toast.show(t('actions.error'), { type: 'md_danger' });
          } finally {
            setIsSurveyLoading(false);
          }
        }}
        disabled={isSurveyLoading}
      >
        <Text
          variant={item.seen ? undefined : 'TextMedium'}
          tw={cn(item.seen ? 'text-zinc-600' : 'text-black')}
        >
          {item.message}
          {item.link ? (
            <Text variant={item.seen ? undefined : 'TextMedium'} tw="text-blue-500">
              &nbsp;{item.link}
            </Text>
          ) : null}
        </Text>
      </TouchableOpacity>
      <Divider tw="w-full bg-zinc-500 mt-1.5" />
    </React.Fragment>
  );
}
