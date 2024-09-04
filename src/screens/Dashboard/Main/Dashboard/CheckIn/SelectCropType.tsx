import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import { useTranslationUtils } from '#i18n/utils';
import { ECropType } from '#types/global';

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
    <FlatList
      data={options}
      keyExtractor={(item) => `select-crop-type-#${item.id}`}
      renderItem={({ item }) => (
        <React.Fragment>
          <List.Item
            title={item.name}
            onPress={() => {
              navigation.navigate('CropList', {
                type: item.id,
              });
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider tw="bg-gray-400" />
        </React.Fragment>
      )}
    />
  );
}

export default withSafeArea(SelectCropType);
