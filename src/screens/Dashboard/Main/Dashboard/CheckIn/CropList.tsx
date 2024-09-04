import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';

import { API_BASE_URL } from '#constants/environment';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useCheckInStore } from '#stores/checkIn';

import { Input } from '#ui/components/Input';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function CropList({ route, navigation }: CheckInStackRouteProps<'CropList'>) {
  const { type } = route.params;

  const { t } = useTranslationUtils();
  const { coolingUnit } = useCheckInStore();

  const additionalInfoRef = useRef<string>('');

  const { data, isLoading } = useApiCall(
    'getCoolingUnitCrops',
    ColdtivateService.getCoolingUnitCrops,
    {
      crop: type,
      coolingUnitId: coolingUnit?.id as number,
    },
    {
      skip: !coolingUnit?.id || !type,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
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
              <Text
                variant="TextMedium"
                tw={cn(
                  'text-base text-wrap',
                  deviceHeight > SMALL_SCREEN_THRESHOLD ? 'w-[32%]' : 'w-[28%]'
                )}
                numberOfLines={2}
              >
                {item.fullCrop.name}
              </Text>
              <Input
                tw="w-32 text-sm bg-transparent rounded-sm h-12 truncate"
                onChangeText={(text) => (additionalInfoRef.current = text)}
                placeholder={t('Dashboard.CrateManagement.CheckIn.SelectCrop.additionalInfo')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CrateSetup', {
                    crop: item.fullCrop,
                    additionalInfo: additionalInfoRef.current,
                  });
                }}
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
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(CropList);
