import { isToday } from 'date-fns/isToday';
import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, type CircleProps } from 'react-native-svg';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

export type SemiCircleChartProps = {
  currentAmount: number;
  currentDate: string;
  maxCapacity: number;
};

const RADIUS = 65;

function SemiCircleChart(props: SemiCircleChartProps) {
  const { currentAmount, maxCapacity, currentDate } = props;

  const { t } = useTranslationUtils();

  const circleCircumference = 2 * Math.PI * RADIUS;
  const semiCircleCircumference = circleCircumference / 2;

  const percentage = (currentAmount / maxCapacity) * 100;
  const hasExceeded = percentage >= 100;

  const threshold = hasExceeded ? 100 : percentage;
  const strokeDashoffset = semiCircleCircumference - (semiCircleCircumference * threshold) / 100;

  const circleProps = {
    cx: '50%',
    cy: '50%',
    r: RADIUS,
    strokeWidth: 9,
    fill: 'transparent',
    strokeDasharray: [semiCircleCircumference, circleCircumference].join(' '),
  } satisfies CircleProps;

  return (
    <View tw="items-center justify-center relative">
      <Svg height="180" width="350" viewBox="50 63 150 50">
        <G rotation={180} originX="100" originY="100">
          <Circle {...circleProps} stroke={paperTheme.colors.secondaryContainer} />
          <Circle
            {...circleProps}
            stroke={getCapacityColor(currentAmount)}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View tw="absolute bottom-0 items-center space-y-2">
        <Text variant="HeadingRegular">{percentage.toFixed(2)}%</Text>
        <Text variant="TitleRegular">
          {!isToday(currentDate)
            ? dateFmt(currentDate, 'eeee')
            : t('Dashboard.CoolingUnitsPlanner.today')}
        </Text>
      </View>
    </View>
  );
}

export function getCapacityColor(amount: number): string {
  if (amount < 60) {
    return colors.green[400];
  } else if (amount >= 60 && amount < 80) {
    return colors.yellow[400];
  } else {
    return colors.red[700];
  }
}

export default memo(SemiCircleChart);
