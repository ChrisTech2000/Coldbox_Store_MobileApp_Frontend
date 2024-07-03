import { useMemo } from 'react';

import type { SkiaShadowProps } from '../index';

type Args = Pick<SkiaShadowProps, 'blur' | 'dx' | 'dy'>;

export default function useShadowDimensions(args: Args) {
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
}
