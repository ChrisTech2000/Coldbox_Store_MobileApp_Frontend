import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Text } from '#ui/components/Text';
import { ListItemArrow } from '#screens/Dashboard/AccountDetails/components/ListItemArrow';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

export default function CropDetails(props: { cropName: string; additionalInfo: string }) {
  const { cropName, additionalInfo } = props;

  const navigation = useNavigation();
  const { t } = useTranslationUtils();

  return (
    <View tw="flex-col">
      <Text tw="text-base text-green-primary font-bold">Crop</Text>
      <List.Item
        tw="p-0 m-0"
        title={undefined}
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.goBack();
        }}
        left={() => (
          <Text tw="text-base self-center">
            {t('Dashboard.CrateManagement.CheckIn.Setup.selectedCrop')}
          </Text>
        )}
        right={(props) => (
          <View tw="flex-row items-center space-x-5">
            <View tw="flex-col items-end space-y-1">
              <Text tw="text-base">{cropName}</Text>
              {additionalInfo ? <Text tw="text-gray-500">{additionalInfo}</Text> : null}
            </View>
            <ListItemArrow {...props} />
          </View>
        )}
      />
      <Divider tw={cn('bg-gray-400', !additionalInfo && 'mt-2')} />
    </View>
  );
}
