import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon } from 'react-native-paper';

import { API_BASE_URL } from '#constants/environment';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Input } from '#ui/components/Input';
import { useTranslationUtils } from '#i18n/utils';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function CropList({ route, navigation }: CheckInStackRouteProps<'CropList'>) {
  const { type, coolingUnit, user } = route.params;
  const { t } = useTranslationUtils();

  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const { data } = useApiCall(
    'getCoolingUnitCrops',
    ColdtivateService.getCoolingUnitCrops,
    {
      crop: type,
      coolingUnitId: coolingUnit.id,
    },
    {
      skip: !coolingUnit.id || !type,
    }
  );

  return (
    <View>
      <ScrollView>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <View key={`${item}-${index}`} tw="w-full px-2">
              <View tw="flex flex-row w-full space-x-2 items-center">
                <FastImage
                  tw="w-20 h-20 my-1"
                  source={{
                    uri: `${API_BASE_URL}media/${item.fullCrop.image}`,
                    priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text variant="TextMedium" tw="text-base w-[32%] text-wrap">
                  {item.fullCrop.name}
                </Text>
                <Input
                  tw="w-32 text-base bg-transparent rounded-sm h-12 truncate"
                  onChangeText={(val) => setAdditionalInfo(val)}
                  value={additionalInfo}
                  placeholder={t('Dashboard.CrateManagement.CheckIn.SelectCrop.additionalInfo')}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CrateSetup', {
                      crop: item.fullCrop,
                      additionalInfo,
                      coolingUnit,
                      user,
                    })
                  }
                >
                  <Icon source="plus-circle-outline" size={20} />
                </TouchableOpacity>
              </View>
              <Divider tw="bg-grey-400" />
            </View>
          )}
          estimatedItemSize={40}
          estimatedListSize={{
            height: deviceHeight,
            width: deviceWidth / 2,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default withSafeArea(CropList);
