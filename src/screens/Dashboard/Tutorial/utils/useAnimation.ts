import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useBlinkAnimation(initialValue = 1, duration1 = 2000, duration2 = 1500) {
  const blinkAnim = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: duration1,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: duration2,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [blinkAnim, duration1, duration2]);

  return blinkAnim;
};
