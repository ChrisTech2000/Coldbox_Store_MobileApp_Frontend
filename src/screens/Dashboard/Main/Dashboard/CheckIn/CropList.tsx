import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, Icon, List, TextInput } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import unset from 'lodash/unset';

import { API_BASE_URL } from '#constants/environment';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useCheckInStore } from '#stores/checkIn';

import { GenericError } from '#ui/components/GenericError';
import { Input } from '#ui/components/Input';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH,
} as const;

function CropList({ route, navigation }: CheckInStackRouteProps<'CropList'>) {
  const { type } = route.params;

  const { t } = useTranslationUtils();
  const { coolingUnit } = useCheckInStore();

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));

  const locale = LanguageManager.read();

  const additionalInfoRef = useRef<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data, isLoading } = useApiCall(
    'getCoolingUnitCrops',
    ColdtivateService.getCoolingUnitCrops,
    {
      crop: type,
      coolingUnitId: coolingUnit?.id as number,
    },
    {
      skip: !coolingUnit?.id || !type,
      defaultData: [],
    }
  );

  const datums = useMemo(() => {
    if (!data) return [];
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();
    return cloneDeep(data).map((item) => ({
      ...item,
      fullCrop: {
        ...item.fullCrop,
        name: find(translationMap, {
          name: item.fullCrop.name,
          country: companyCountry || undefined,
          locale,
        }),
        originalName: item.fullCrop.name,
      },
    }));
  }, [data, companyCountry, locale]);

  const filteredData = useMemo(
    () =>
      datums.filter((item) => item.fullCrop.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [datums, searchTerm]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <_SearchInput onChange={setSearchTerm} />
      <FlashList
        contentContainerStyle={styles.list}
        data={filteredData}
        keyExtractor={(item) => `crop-list-item-#${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <React.Fragment>
            <List.Item
              title={item.fullCrop.name}
              onPress={(evt) => evt.stopPropagation()}
              tw="p-0"
              disabled
              left={() => (
                <FastImage
                  tw="w-20 h-20"
                  source={{
                    uri: `${API_BASE_URL}media/${item.fullCrop.image}`,
                    priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
              right={() => (
                <View tw="flex flex-row items-center space-x-4">
                  <Input
                    tw="w-32 text-base bg-transparent rounded-sm h-12 truncate"
                    onChangeText={(text) => (additionalInfoRef.current = text)}
                    placeholder={t('Dashboard.CrateManagement.CheckIn.SelectCrop.additionalInfo')}
                  />
                  <TouchableOpacity
                    onPress={(evt) => {
                      evt.stopPropagation();
                      const crop = cloneDeep(item.fullCrop);
                      set(crop, 'name', crop.originalName);
                      unset(crop, 'originalName');
                      navigation.navigate('CrateSetup', {
                        crop,
                        additionalInfo: additionalInfoRef.current,
                      });
                    }}
                  >
                    <Icon source="plus-circle-outline" size={28} />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Divider tw="bg-gray-400" />
          </React.Fragment>
        )}
        estimatedItemSize={40}
        estimatedListSize={ESTIMATED_LIST_SIZE}
        nestedScrollEnabled
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
});

function _SearchInput(props: { onChange: (v: string) => void }) {
  const { onChange } = props;

  const { t } = useTranslationUtils();
  const [value, setValue] = useState<string>('');

  const _debouncedOnChange = useDebouncedCallback((text: string) => onChange(text), 500);

  const onChangeTextHandler = useCallback((text: string) => {
    setValue(text);
    _debouncedOnChange(text);
  }, []);

  return (
    <View tw="pt-2.5 px-3 pb-1">
      <Input
        tw="border bg-white border-gray-700 rounded-sm my-2 h-14 w-full"
        label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
        onChangeText={onChangeTextHandler}
        value={value}
        left={<TextInput.Icon icon="magnify" />}
      />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(CropList, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
