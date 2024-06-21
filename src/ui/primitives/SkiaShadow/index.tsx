import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Canvas, Color, Path, Shadow, Skia } from '@shopify/react-native-skia';

export type SkiaShadowProps = {
  blur: number;
  dx: number;
  dy: number;
  color?: Color;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  children: React.ReactNode;
};

export const SkiaShadow = (props: SkiaShadowProps) => {
  const { blur, dx, dy, borderRadius = 0, color = 'black', children } = props;
  const { borderTopLeftRadius = borderRadius } = props;
  const { borderTopRightRadius = borderRadius } = props;
  const { borderBottomLeftRadius = borderRadius } = props;
  const { borderBottomRightRadius = borderRadius } = props;

  const [shadowHeight, setShadowHeight] = useState(0);
  const [shadowWidth, setShadowWidth] = useState(0);

  const { top, bottom, left, right } = useShadowDimensions({ blur, dx, dy });
  const path = usePath({
    top,
    left,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    shadowWidth,
    shadowHeight,
  });

  const canvasStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.canvas,
      {
        height: shadowHeight + top + bottom,
        width: shadowWidth + left + right,
        top: -top,
        left: -left,
      },
    ]);
  }, [top, bottom, left, right, shadowHeight, shadowWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setShadowHeight(height);
    setShadowWidth(width);
  };

  return (
    <View onLayout={handleLayout}>
      <Canvas style={canvasStyle}>
        <Path path={path} color={color}>
          <Shadow dx={dx} dy={dy} blur={blur} color={color} shadowOnly />
        </Path>
      </Canvas>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
  },
});

//
// Internals
//

type Args = {
  top: number;
  left: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  shadowWidth: number;
  shadowHeight: number;
};

const usePath = (args: Args) => {
  const { top, left, shadowHeight, shadowWidth } = args;
  const { borderTopLeftRadius, borderTopRightRadius } = args;
  const { borderBottomLeftRadius, borderBottomRightRadius } = args;

  return useMemo(() => {
    const width = shadowWidth / 2;
    const height = shadowHeight / 2;
    const brTopRight = Math.min(borderTopRightRadius, width);
    const brTopLeft = Math.min(borderTopLeftRadius, height);
    const brBottomLeft = Math.min(borderBottomLeftRadius, width);
    const brBottomRight = Math.min(borderBottomRightRadius, height);

    const path = Skia.Path.Make();
    path.moveTo(brTopLeft + left, top);
    path.arcToTangent(shadowWidth + left, top, shadowWidth + left, top + brTopRight, brTopRight);
    path.arcToTangent(
      shadowWidth + left,
      shadowHeight + top,
      shadowWidth + left - brBottomRight,
      shadowHeight + top,
      brBottomRight
    );
    path.arcToTangent(
      left,
      top + shadowHeight,
      left,
      top + shadowHeight - brBottomLeft,
      brBottomLeft
    );
    path.arcToTangent(left, top, left + brTopLeft, top, brTopLeft);
    path.close();

    return path;
  }, [
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    shadowHeight,
    shadowWidth,
    left,
    top,
  ]);
};

type ShadowDimensionsArgs = Pick<SkiaShadowProps, 'blur' | 'dx' | 'dy'>;
const useShadowDimensions = (args: ShadowDimensionsArgs) => {
  const { blur, dx, dy } = args;

  const blurRadius = blur * 3;

  const top = useMemo(() => {
    return blurRadius + (dy < 0 ? -dy : 0);
  }, [blurRadius, dy]);
  const bottom = useMemo(() => {
    return blurRadius + (dy > 0 ? dy : 0);
  }, [blurRadius, dy]);
  const left = useMemo(() => {
    return blurRadius + (dx < 0 ? -dx : 0);
  }, [blurRadius, dx]);
  const right = useMemo(() => {
    return blurRadius + (dx > 0 ? dx : 0);
  }, [blurRadius, dx]);

  return { top, bottom, left, right };
};
