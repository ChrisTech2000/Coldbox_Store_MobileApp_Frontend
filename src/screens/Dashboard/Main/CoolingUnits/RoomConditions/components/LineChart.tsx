import React from 'react';
import { StyleSheet } from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { useDerivedValue } from 'react-native-reanimated';
import {
  Circle,
  Text as SkiaText,
  Line as SkiaLine,
  DashPathEffect,
  vec,
} from '@shopify/react-native-skia';

import useSkiaFont from '#ui/hooks/useSkiaFont';
import { paperTheme } from '#ui/lib/theme';
import { dateFmt } from '#i18n/utils';

export type LineChartEntry = {
  timestamp: string;
  temperature: number;
};

type LineChartProps = {
  datums: Array<LineChartEntry>;
};

export default function LineChart(props: LineChartProps) {
  const { datums } = props;
  //
  // skia canvas fonts load
  const font = useSkiaFont();
  const tooltipFont = useSkiaFont(18);
  //
  // victory native gestures
  const { state, isActive } = useChartPressState({ x: datums[0].timestamp, y: { temperature: 0 } });
  // temperature
  // scope: animated text
  const textValue = useDerivedValue(
    () => state.y.temperature.value.value.toFixed(1) + ' °C',
    [state]
  );
  // scope: animated position
  const textXPosition = useDerivedValue(() => {
    if (!tooltipFont) return 0;
    const textWidth = tooltipFont.measureText(textValue.value).width;
    return state.x.position.value - textWidth / 2;
  }, [tooltipFont, textValue]);
  const textYPosition = useDerivedValue(() => state.y.temperature.position.value - 25, [textValue]);
  //
  // dashed path vector position
  const p1 = useDerivedValue(
    () => vec(state.x.position.value, state.y.temperature.position.value),
    [textValue]
  );
  const p2 = useDerivedValue(
    () => vec(state.x.position.value, state.y.temperature.position.value * 8), // ← fyk: this multiplication by eight is made up :shurg:
    [textValue]
  );

  return (
    <CartesianChart
      data={datums}
      xKey="timestamp"
      yKeys={['temperature']}
      domainPadding={{ top: 35, left: 30, right: 30 }}
      axisOptions={{
        font,
        lineColor: paperTheme.colors.outlineVariant,
        labelColor: paperTheme.colors.tertiary,
        lineWidth: StyleSheet.hairlineWidth,
        labelOffset: 12,
        formatXLabel: (timestamp) => dateFmt(timestamp, 'eee'),
        formatYLabel: (temperature) => temperature + ' °C',
      }}
      chartPressState={state}
    >
      {({ points }) => (
        <React.Fragment>
          <Line
            points={points.temperature}
            color={paperTheme.colors.primary}
            strokeWidth={2}
            animate={{ type: 'timing', duration: 500 }}
            curveType="natural"
            connectMissingData
            antiAlias
          />
          {isActive ? (
            <React.Fragment>
              <SkiaText
                x={textXPosition}
                y={textYPosition}
                text={textValue}
                font={tooltipFont}
                color={paperTheme.colors.tertiary}
                style="fill"
              />
              <Circle
                cx={state.x.position}
                cy={state.y.temperature.position}
                r={8}
                color={paperTheme.colors.backdrop}
              />
              <SkiaLine
                p1={p1}
                p2={p2}
                color={paperTheme.colors.onPrimaryContainer}
                strokeWidth={StyleSheet.hairlineWidth}
              >
                <DashPathEffect intervals={[8, 4]} />
              </SkiaLine>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      )}
    </CartesianChart>
  );
}
