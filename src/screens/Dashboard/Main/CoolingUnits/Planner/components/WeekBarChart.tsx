import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Text } from 'react-native-paper';

import { paperTheme } from '#ui/lib/theme';
import { dateFmt } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

type Datum = {
  amount: number;
  timestamp: string;
};

export type BarChartProps = {
  maxCapacity: number;
  datums: Array<Datum>;
};

const CHART_MAX_WIDTH = Dimensions.get('screen').width - 30;
const CHART_MAX_HEIGHT = 160;
const BAR_WIDTH = 12;
const CORNER_RADIUS = 5;

// TODO: find a way to increase the tapping area

export default function WeekBarChart(props: BarChartProps) {
  const { maxCapacity, datums } = props;

  return (
    <View style={{ flexDirection: 'row', width: CHART_MAX_WIDTH - 45 }}>
      {datums.map((datum, datumIdx) => {
        const barHeight = (datum.amount / maxCapacity) * CHART_MAX_HEIGHT;
        const hasExceeded = barHeight >= CHART_MAX_HEIGHT;
        const xPosition = Math.floor(CHART_MAX_WIDTH / 7) * datumIdx;
        const yPosition = hasExceeded ? 0 : CHART_MAX_HEIGHT - barHeight;

        return (
          <TouchableOpacity
            key={`svg-${datumIdx}`}
            style={{ alignItems: 'center', position: 'relative', height: CHART_MAX_HEIGHT + 50 }}
          >
            <Svg
              height={CHART_MAX_HEIGHT}
              width={BAR_WIDTH}
              style={{ position: 'absolute', left: xPosition }}
            >
              <Rect
                key={`backdrop-${datumIdx}`}
                x={0}
                y={0}
                width={BAR_WIDTH}
                height={CHART_MAX_HEIGHT}
                fill={paperTheme.colors.secondaryContainer}
                opacity={0.3}
                rx={CORNER_RADIUS}
                ry={CORNER_RADIUS}
              />
              <Rect
                key={`bar-${datumIdx}`}
                x={0}
                y={yPosition}
                width={BAR_WIDTH}
                height={hasExceeded ? CHART_MAX_HEIGHT : barHeight}
                fill={hasExceeded ? paperTheme.colors.error : paperTheme.colors.primary}
                rx={CORNER_RADIUS}
                ry={CORNER_RADIUS}
              />
            </Svg>

            <View style={{ left: xPosition - BAR_WIDTH / 2, position: 'absolute', bottom: 0 }}>
              <Text>{dateFmt(datum.timestamp, 'eee').toUpperCase()}</Text>
              <View
                tw={cn(
                  'h-2 w-2 rounded-full self-center mt-3',
                  datumIdx === 1 ? 'bg-green-primary' : 'bg-transparent'
                )}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
