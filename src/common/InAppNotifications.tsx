import React, { useCallback, useMemo, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast-notifications';
import type {
  ToastOptions,
  ToastProps,
} from 'react-native-toast-notifications/lib/typescript/toast';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

export type ToastType = 'md_success' | 'md_danger' | 'md_default' | 'md_warning';

export type CustomToastOptions = {
  type?: ToastType;
} & ToastOptions;

type ToastContentProps = {
  message: string | JSX.Element;
  backgroundColor: string;
  textColor: string;
  style: ToastProps['style'];
};

function _ToastContent(props: ToastContentProps) {
  const { message, backgroundColor, textColor, style } = props;
  return (
    <View tw="w-auto max-w-5/6 rounded-md p-3 my-2" style={[style, { backgroundColor }]}>
      <Text variant="TextMedium" tw="text-sm" style={{ color: textColor }}>
        {message}
      </Text>
    </View>
  );
}

function ToastFactory(props: { kind: ToastType } & ToastProps) {
  const { kind, style, message } = props;
  switch (kind) {
    case 'md_success':
      return (
        <_ToastContent
          style={style}
          message={message}
          backgroundColor={paperTheme.colors.secondaryContainer}
          textColor={paperTheme.colors.onSecondaryContainer}
        />
      );
    case 'md_danger':
      return (
        <_ToastContent
          style={style}
          message={message}
          backgroundColor={paperTheme.colors.errorContainer}
          textColor={paperTheme.colors.onErrorContainer}
        />
      );
    case 'md_warning':
      return (
        <_ToastContent
          style={style}
          message={message}
          backgroundColor={colors.yellow[100]}
          textColor={colors.yellow[800]}
        />
      );
    case 'md_default':
    default:
      return (
        <_ToastContent
          style={style}
          message={message}
          backgroundColor={paperTheme.colors.surfaceVariant}
          textColor={paperTheme.colors.onSurfaceVariant}
        />
      );
  }
}

export default function InAppNotifications({ children }: PropsWithChildren) {
  const renderType = useMemo(
    () =>
      ({
        md_default: (props: ToastProps) => <ToastFactory {...props} kind="md_default" />,
        md_success: (props: ToastProps) => <ToastFactory {...props} kind="md_success" />,
        md_danger: (props: ToastProps) => <ToastFactory {...props} kind="md_danger" />,
        md_warning: (props: ToastProps) => <ToastFactory {...props} kind="md_warning" />,
      }) satisfies ToastProps['renderType'],
    []
  );
  return <ToastProvider renderType={renderType}>{children}</ToastProvider>;
}

InAppNotifications.useToast = function _useToast() {
  const toastCtx = useToast();
  const showFunc = useCallback(
    (message: string | JSX.Element, opts?: CustomToastOptions): string => {
      const type = opts?.type ?? 'md_default';
      return toastCtx?.show?.(message, { ...opts, type });
    },
    [toastCtx]
  );
  return useMemo(() => ({ ...toastCtx, show: showFunc }), [showFunc]);
};
