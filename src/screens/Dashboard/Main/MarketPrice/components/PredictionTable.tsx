import { FlashList } from '@shopify/flash-list';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionState, PredictionTableData } from '#types/global';
import { cn } from '#ui/lib/cn';

import { Month } from '../Ranking';
import type { AllowedCountry } from '../store';
import { MAP_ALLOWED_COUNTRY, QueryCountry } from '../Trend';
import { changePage, compareAsc, compareDesc, parseDateString } from '../utils';

enum ECurrency {
  NG = '₦',
  IN = 'Rs',
}

type Sorting = 'state' | 'date' | 'price';
type Direction = 'ascending' | 'descending';

type PredictionTableProps = {
  commodity: PredictionCrop;
  states: Array<PredictionState>;
  country: AllowedCountry;
  dates: Month[];
};

type TableHeaderProps = {
  isSortingActive: boolean;
  title: string;
  onSort: (direction: Direction) => void;
  alignEnd?: boolean;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ITEMS_PER_PAGE = 10;

export function PredictionTable({ commodity, states, country, dates }: PredictionTableProps) {
  const { t } = useTranslationUtils();
  const mappedCountry = MAP_ALLOWED_COUNTRY[country ?? ('' as AllowedCountry)] as QueryCountry;

  const { data: predictionData, isLoading: loadingPredictionData } = useApiCall(
    'getPredictionTable',
    ColdtivateService.getPredictionTable,
    {
      cropId: commodity.id,
      statesIds: states.map(({ id }) => id),
      days: dates.map(({ date }) => date),
      country: mappedCountry,
    }
  );

  const [sortingType, setSortingType] = useState<{ direction: Direction; sorting: Sorting }>({
    direction: 'ascending',
    sorting: 'state',
  });

  const [currentPage, setCurrentPage] = useState<number>(0);

  const sortedData = useMemo(() => {
    if (!predictionData || !predictionData.length) return [];

    const { direction, sorting } = sortingType;
    let data: PredictionTableData = [];

    const compare = direction === 'descending' ? compareDesc : compareAsc;

    switch (sorting) {
      case 'date':
        data = predictionData
          .slice()
          .sort((a, b) =>
            compare(
              new Date(parseDateString(a.date)).getTime(),
              new Date(parseDateString(b.date)).getTime()
            )
          );
        break;
      case 'state':
        data = predictionData.slice().sort((a, b) => compare(a.state, b.state));
        break;
      case 'price':
        data = predictionData
          .slice()
          .sort((a, b) => compare(a.price ?? Infinity, b.price ?? Infinity));
        break;
    }

    return data;
  }, [predictionData, sortingType?.direction, sortingType?.sorting]);

  const paginatedData = useMemo(() => {
    if (!sortedData || !sortedData.length) return [];

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const totalPages = useMemo(
    () => Math.floor((predictionData?.length ?? 0) / ITEMS_PER_PAGE),
    [predictionData]
  );

  const debouncedPageChange = useCallback(
    debounce((page) => {
      changePage(page, totalPages, setCurrentPage);
    }, 300),
    [totalPages]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [predictionData]);

  if (loadingPredictionData) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!predictionData || !predictionData?.length) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} tw="mb-20">
      <DataTable tw="py-4 px-2">
        <SkiaShadow blur={6} dx={2} dy={8} color={colors.zinc[300]} borderRadius={10}>
          <DataTable.Header tw="bg-gray-700 rounded-t-lg h-18 py-2">
            <Header
              title={t('Dashboard.MarketPrice.Ranking.table.column1')}
              onSort={(direction) =>
                setSortingType({
                  sorting: 'state',
                  direction,
                })
              }
              isSortingActive={sortingType.sorting === 'state'}
            />
            <Header
              title={t('Dashboard.MarketPrice.Ranking.table.column2')}
              onSort={(direction) =>
                setSortingType({
                  sorting: 'date',
                  direction,
                })
              }
              isSortingActive={sortingType.sorting === 'date'}
            />
            <Header
              title={t('Dashboard.MarketPrice.Ranking.table.column3', {
                currency:
                  mappedCountry === 'IN'
                    ? ECurrency.IN
                    : mappedCountry === 'NG'
                      ? ECurrency.NG
                      : '$',
              })}
              onSort={(direction) =>
                setSortingType({
                  sorting: 'price',
                  direction,
                })
              }
              isSortingActive={sortingType.sorting === 'price'}
              alignEnd
            />
          </DataTable.Header>
          <FlashList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={paginatedData}
            keyExtractor={(item, index) => `${item.date}-#${index}-${item.price}`}
            renderItem={({ item }) => (
              <DataTable.Row tw="bg-white">
                <DataTable.Cell tw="px-1">{item.state}</DataTable.Cell>
                <DataTable.Cell tw="px-1">{item.date}</DataTable.Cell>
                <DataTable.Cell numeric tw="px-1">
                  {item.price ?? t('Dashboard.MarketPrice.Ranking.table.emptyState')}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            nestedScrollEnabled
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth - 40,
            }}
          />
          <DataTable.Pagination
            tw="bg-gray-700 rounded-b-lg"
            page={currentPage}
            numberOfPages={totalPages}
            onPageChange={debouncedPageChange}
            showFastPaginationControls
            numberOfItemsPerPage={ITEMS_PER_PAGE}
            theme={{
              colors: {
                text: 'white',
                onSurface: 'white',
                surfaceDisabled: colors.gray[500],
                onSurfaceDisabled: colors.gray[500],
              },
            }}
          />
        </SkiaShadow>
      </DataTable>
    </ScrollView>
  );
}

function Header({ onSort, title, isSortingActive, ...props }: TableHeaderProps) {
  const [sortingDirection, setSortingDirection] = useState<Direction | undefined>('ascending');

  const onPress = useCallback(() => {
    const newSortingDirection =
      sortingDirection && sortingDirection === 'ascending' ? 'descending' : 'ascending';
    setSortingDirection(newSortingDirection);
    onSort(newSortingDirection);
  }, [sortingDirection]);

  const sortingIcon = useMemo(() => {
    if (!isSortingActive) {
      return 'arrow-up-down';
    }
    return sortingDirection === 'descending' ? 'arrow-down' : 'arrow-up';
  }, [sortingDirection, isSortingActive]);

  useEffect(() => {
    if (!isSortingActive) {
      setSortingDirection(undefined);
    }
  }, [isSortingActive]);

  return (
    <DataTable.Title numberOfLines={2} tw={cn('px-1', props.alignEnd && 'justify-end')}>
      <TouchableOpacity tw="flex flex-row items-center" onPress={onPress}>
        <Text variant="TextMedium" tw="text-white text-base" numberOfLines={2}>
          {title}
        </Text>
        <Icon source={sortingIcon} color={colors.white} size={14} />
      </TouchableOpacity>
    </DataTable.Title>
  );
}
