import React, { useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { useTranslationUtils } from '#i18n/utils';
import { ECropType } from '#types/global';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Divider } from 'react-native-paper';
import { CheckInStackRouteProps } from 'navigation/Dashboard/Main/MainTabStack/CheckInTabStack';

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
        data={options}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={`${item.id}-${index}`}
            tw="mx-2"
            onPress={() => navigation.navigate('CropList', { type: item.id })}
          >
            <Text variant="TitleMedium">{item.name}</Text>
            <Divider tw="bg-gray-400 my-2" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default withSafeArea(SelectCropType);
