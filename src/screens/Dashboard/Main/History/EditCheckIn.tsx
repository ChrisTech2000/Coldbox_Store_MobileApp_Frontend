import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';

function EditCheckIn(props: HistoryTabStackRouteProps<'EditCheckIn'>) {
  const { movement } = props.route.params;

  const { t } = useTranslationUtils();
  const toast = useToast();
  const { user } = useAuthStore();

  const { data } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    {
      operator: user?.id as number,
    },
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const farmerContact = useMemo(() => {
    return (
      data?.find((farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === movement.farmer)
        ?.user.phone ?? ''
    );
  }, [data]);

  console.log(data);
  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'success' });
    },
    [toast]
  );

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <View>
        <Text variant="TextMedium" tw="text-gray-400 text-base">
          {t('Dashboard.History.editCheckIn.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-green-primary">
          {movement.farmer}
        </Text>

        <Text variant="TextMedium" tw="text-gray-400 text-base mt-2">
          {t('Dashboard.History.editCheckIn.contactLabel')}
        </Text>
        <View tw="flex flex-row items-center space-x-3">
          <Text variant="TextMedium">{farmerContact}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(farmerContact)}>
            <Icon source="content-copy" size={15} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default withSafeArea(EditCheckIn);
