import React from 'react';
import { View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { DashboardProduce } from 'types/global';

type PaginationProps = {
  data: Array<DashboardProduce>;
  currentIndex: SharedValue<number>;
};
export function Pagination({ data, currentIndex }: PaginationProps) {
  return (
    <View tw="flex flex-row items-center justify-center mt-2">
      {data.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            opacity: withTiming(currentIndex.value === index ? 1 : 0.5, { duration: 100 }),
            transform: [
              { scale: withTiming(currentIndex.value === index ? 1.2 : 1, { duration: 100 }) },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            tw="w-3 h-3 rounded-2xl bg-green-primary mx-1"
            style={[animatedStyle]}
          />
        );
      })}
    </View>
  );
}
