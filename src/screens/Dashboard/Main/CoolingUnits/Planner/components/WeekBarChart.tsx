import React, { memo, type SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
  selectedIndex: number;
  onSelect: (datum: SetStateAction<number>) => void;
};

const CHART_MAX_HEIGHT = 160;
const BAR_WIDTH = 12;
const CORNER_RADIUS = 5;

export default function WeekBarChart(props: WeekBarChartProps) {
  const { maxCapacity, datums, selectedIndex, onSelect } = props;

  const [_selection, _setSelection] = useControlledState<number>(selectedIndex, onSelect);

  return (
    <View tw="w-full flex flex-row items-center justify-between px-4">
      {datums.map((item, itemIdx) => {
        const barHeight = (item.amount / maxCapacity) * CHART_MAX_HEIGHT;
        const hasExceeded = barHeight >= CHART_MAX_HEIGHT;
        const yPosition = hasExceeded ? 0 : CHART_MAX_HEIGHT - barHeight;
        const isSelected = _selection === itemIdx;

        return (
          <TouchableOpacity
            key={`week-bar-chart-${itemIdx}`}
            onPress={(evt) => {
              evt.stopPropagation();
              _setSelection(itemIdx);
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
      })}
    </View>
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
        'items-center space-y-2.5 w-12 py-3 rounded-md mb-6',
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
        'h-2 w-2 rounded-full self-center',
        props.isSelected ? 'bg-green-primary' : 'bg-transparent'
      )}
    />
  );
});
