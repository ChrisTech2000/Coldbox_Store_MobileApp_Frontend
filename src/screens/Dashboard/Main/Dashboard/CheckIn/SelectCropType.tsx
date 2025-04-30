import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { GenericError } from '#ui/components/GenericError';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { ECropType } from '#types/global';
import { ListItemArrow } from '#screens/Dashboard/AccountDetails/components/ListItemArrow';

type Option = {
  id: ECropType;
  name: string;
};

function SelectCropType({ navigation }: CheckInStackRouteProps<'SelectCropType'>) {
  const { t } = useTranslationUtils();

  const options: Array<Option> = useMemo(() => {
    return [
      {
        id: ECropType.FRUITS,
        name: t('Dashboard.CrateManagement.CheckIn.SelectCropType.fruits'),
      },
      {
        id: ECropType.VEGETABLES,
        name: t('Dashboard.CrateManagement.CheckIn.SelectCropType.vegetables'),
      },
      {
        id: ECropType.ROOT_VEGETABLES,
        name: t('Dashboard.CrateManagement.CheckIn.SelectCropType.rootVegetables'),
      },
      {
        id: ECropType.OTHER,
        name: t('Dashboard.CrateManagement.CheckIn.SelectCropType.other'),
      },
    ];
  }, []);

  return (
    <View tw="mt-2">
      <FlatList
        tw="mt-2"
        data={options}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View tw="px-3">
            <List.Item
              testID={`crop-type-${item.name}`}
              title={item.name}
              onPress={() => {
                navigation.navigate('CropList', {
                  type: item.id,
                });
              }}
              right={ListItemArrow}
            />
            <Divider tw="bg-gray-400" />
          </View>
        )}
      />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(SelectCropType, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
