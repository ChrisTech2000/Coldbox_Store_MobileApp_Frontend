import React from 'react';
import { View } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import SemiCircleChart from './components/SemiCircleChart';
import WeekBarChart from './components/WeekBarChart';

// TODO: make both chart components controllable

function CoolingUnitsPlanner() {
  return (
    <View tw="mt-6 items-center">
      <SemiCircleChart maxCapacity={80} currentAmount={50} currentDate="2024-06-27T16:14:08.564Z" />

      <View tw="mt-20">
        <WeekBarChart
          maxCapacity={80}
          datums={[
            { amount: 60, timestamp: '2024-06-24T16:14:08.564Z' },
            { amount: 50, timestamp: '2024-06-25T16:14:08.564Z' },
            { amount: 85, timestamp: '2024-06-26T16:14:08.564Z' },
            { amount: 21, timestamp: '2024-06-27T16:14:08.564Z' },
            { amount: 30, timestamp: '2024-06-28T16:14:08.564Z' },
            { amount: 12, timestamp: '2024-06-29T16:14:08.564Z' },
            { amount: 33, timestamp: '2024-06-30T16:14:08.564Z' },
          ]}
        />
      </View>
    </View>
  );
}

export default withSafeArea(CoolingUnitsPlanner, ['bottom']);
