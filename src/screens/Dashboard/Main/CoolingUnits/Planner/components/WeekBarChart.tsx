import React, { memo, useCallback, type SetStateAction } from 'react';
import { FlatList, type ListRenderItem, Platform, TouchableOpacity, View } from 'react-native';
import Svg, { Rect, type RectProps } from 'react-native-svg';

import { Text } from '#ui/components/Text';

import { useControlledState } from '#ui/hooks/useControlledState';
import { paperTheme } from '#ui/lib/theme';
import { dateFmt } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import { getCapacityColor } from './SemiCircleChart';

export type WeekBarChartDatum = {
  amount: number;
  timestamp: string;
};

export type WeekBarChartProps = {
  maxCapacity: number;
  datums: Array<WeekBarChartDatum>;
  selectedDatum: WeekBarChartDatum;
  onSelect: (datum: SetStateAction<WeekBarChartDatum>) => void;
};

const CHART_MAX_HEIGHT = 160;
const BAR_WIDTH = 12;
const CORNER_RADIUS = 5;
const COLUMN_GAP = Platform.select({ android: 10, ios: 4, default: 8 });

export default function WeekBarChart(props: WeekBarChartProps) {
  const { maxCapacity, datums, selectedDatum, onSelect } = props;

  const [_selection, _setSelection] = useControlledState<WeekBarChartDatum>(
    selectedDatum,
    onSelect
  );

  const renderItem: ListRenderItem<WeekBarChartDatum> = useCallback(
    ({ item }) => {
      const barHeight = (item.amount / maxCapacity) * CHART_MAX_HEIGHT;
      const hasExceeded = barHeight >= CHART_MAX_HEIGHT;
      const yPosition = hasExceeded ? 0 : CHART_MAX_HEIGHT - barHeight;
      const isSelected = _selection.timestamp === item.timestamp;

      return (
        <TouchableOpacity
          onPress={(evt) => {
            evt.stopPropagation();
            _setSelection(item);
          }}
        >
          <_SVGColumn
            isSelected={isSelected}
            timestamp={item.timestamp}
            yPosition={yPosition}
            barHeight={hasExceeded ? CHART_MAX_HEIGHT : barHeight}
            fill={getCapacityColor(item.amount)}
          />
          <_SelectionIndicator isSelected={isSelected} />
        </TouchableOpacity>
      );
    },
    [maxCapacity, _selection.timestamp]
  );

  return (
    <FlatList
      horizontal
      data={datums}
      keyExtractor={(_, itemIdx) => `week-bar-chart-${itemIdx}`}
      renderItem={renderItem}
      contentContainerStyle={{ gap: COLUMN_GAP }}
    />
  );
}

const _SVGColumn = memo(function Component(props: {
  isSelected: boolean;
  timestamp: string;
  yPosition: number;
  barHeight: number;
  fill: string;
}) {
  const baseProps = {
    x: 0,
    width: BAR_WIDTH,
    rx: CORNER_RADIUS,
    ry: CORNER_RADIUS,
  } satisfies RectProps;

  return (
    <View
      tw={cn(
        'items-center space-y-2.5 w-12 py-3 rounded-md',
        props.isSelected ? 'bg-zinc-200' : 'bg-transparent'
      )}
    >
      <Svg height={CHART_MAX_HEIGHT} width={BAR_WIDTH}>
        <Rect
          y={0}
          height={CHART_MAX_HEIGHT}
          fill={paperTheme.colors.secondaryContainer}
          opacity={0.3}
          {...baseProps}
        />
        <Rect y={props.yPosition} height={props.barHeight} fill={props.fill} {...baseProps} />
      </Svg>
      <Text>{dateFmt(props.timestamp, 'eee').toUpperCase()}</Text>
    </View>
  );
});

const _SelectionIndicator = memo(function Component(props: { isSelected: boolean }) {
  return (
    <View
      tw={cn(
        'h-2 w-2 rounded-full self-center mt-3',
        props.isSelected ? 'bg-green-primary' : 'bg-transparent'
      )}
    />
  );
});
