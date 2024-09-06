import React, { type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

export default function CrateSettingsStep(
  props: PropsWithChildren<{
    cropName: string;
    amountOfCrates: number;
    combinedWeight: number;
  }>
) {
  const { cropName, amountOfCrates, combinedWeight } = props;

  const { t } = useTranslationUtils();

  return (
    <React.Fragment>
      <List.Item
        tw="px-0"
        title={undefined}
        left={() => <Text tw="text-base">{t('Dashboard.ProduceDetails.cropType')}</Text>}
        right={() => <Text tw="text-base">{cropName}</Text>}
      />
      <Divider tw="bg-gray-400" />

      <List.Item
        tw="px-0"
        title={undefined}
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO
        }}
        left={() => <Text tw="text-base">{t('Dashboard.ProduceDetails.numberOfCrates')}</Text>}
        right={(props) => (
          <View tw="flex flex-row items-center space-x-5">
            <Text tw="text-base">{amountOfCrates}</Text>
            <List.Icon {...props} icon="chevron-right" />
          </View>
        )}
      />
      <Divider tw="bg-gray-400" />

      <List.Item
        tw="px-0"
        title={undefined}
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO
        }}
        left={() => <Text tw="text-base">{t('Dashboard.ProduceDetails.combinedWeight')}</Text>}
        right={(props) => (
          <View tw="flex flex-row items-center space-x-5">
            <Text tw="text-base">{combinedWeight}kg</Text>
            <List.Icon {...props} icon="chevron-right" />
          </View>
        )}
      />
      <Divider tw="bg-gray-400" />

      <List.Item
        tw="px-0"
        title={undefined}
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO
        }}
        left={() => <Text tw="text-base">Price per crate</Text>}
        right={(props) => (
          <View tw="flex flex-row items-center space-x-5">
            <Text tw="text-base">$300</Text>
            <List.Icon {...props} icon="chevron-right" />
          </View>
        )}
      />
      <Divider tw="bg-gray-400" />

      <List.Item
        tw="px-0"
        title={undefined}
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO
        }}
        left={() => <Text tw="text-base">Price per kg</Text>}
        right={(props) => (
          <View tw="flex flex-row items-center space-x-5">
            <Text tw="text-base">$2</Text>
            <List.Icon {...props} icon="chevron-right" />
          </View>
        )}
      />
      <Divider tw="bg-gray-400" />

      <React.Fragment>{props.children}</React.Fragment>
    </React.Fragment>
  );
}
