import React, { useCallback, useMemo, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { type ToastOptions, ToastProvider, useToast } from 'react-native-toast-notifications';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { paperTheme } from '#ui/lib/theme';

export type ToastType = 'md_success' | 'md_danger' | 'md_default';

type CustomToastOptions = {
  type?: ToastType;
} & ToastOptions;

interface ToastContentProps {
  message: string | JSX.Element;
  backgroundColor: string;
  textColor: string;
  shadowColor: string;
}

function _ToastContent(props: ToastContentProps) {
  const { message, backgroundColor, textColor, shadowColor } = props;
  return (
    <SkiaShadow blur={30} dx={0} dy={10} color={shadowColor} borderRadius={20}>
      <View tw="w-5/6 rounded-md p-4 shadow-black/20 my-2" style={{ backgroundColor }}>
        <Text tw="text-md font-medium" style={{ color: textColor }}>
          {message}
        </Text>
      </View>
    </SkiaShadow>
  );
}

function _toastClosure(type: ToastType) {
  return function ToastFactory(toast: Pick<ToastContentProps, 'message'>) {
    switch (type) {
      case 'md_success':
        return (
          <_ToastContent
            message={toast.message}
            backgroundColor={paperTheme.colors.secondaryContainer}
            textColor={paperTheme.colors.onSecondaryContainer}
            shadowColor={paperTheme.colors.onSecondary}
          />
        );
      case 'md_danger':
        return (
          <_ToastContent
            message={toast.message}
            backgroundColor={paperTheme.colors.errorContainer}
            textColor={paperTheme.colors.onErrorContainer}
            shadowColor={paperTheme.colors.onError}
          />
        );
      case 'md_default':
      default:
        return (
          <_ToastContent
            message={toast.message}
            backgroundColor={paperTheme.colors.surfaceVariant}
            textColor={paperTheme.colors.onSurfaceVariant}
            shadowColor={paperTheme.colors.elevation.level1}
          />
        );
    }
  };
}

export default function InAppNotifications({ children }: PropsWithChildren) {
  const toastTypes = useMemo(
    () => ({
      md_default: _toastClosure('md_default'),
      md_success: _toastClosure('md_success'),
      md_danger: _toastClosure('md_danger'),
    }),
    []
  );

  return <ToastProvider renderType={toastTypes}>{children}</ToastProvider>;
}

InAppNotifications.useToast = function _useToast() {
  const toastCtx = useToast();

  const showFunc = useCallback(
    (message: string | JSX.Element, opts?: CustomToastOptions): string => {
      const type = opts?.type ?? 'md_default';
      return toastCtx.show(message, { ...opts, type });
    },
    [toastCtx]
  );

  return { ...toastCtx, show: showFunc };
};
