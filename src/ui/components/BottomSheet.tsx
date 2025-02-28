import React, { useMemo, type PropsWithChildren, forwardRef } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Modalize, useModalize, type ModalizeProps } from 'react-native-modalize';
import type { TStyle } from 'react-native-modalize/lib/options';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { styled } from 'nativewind';

import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

export type BottomSheetBaseProps = ReturnType<typeof useModalize>;

const Wrapper = ({ usePortal, children }: PropsWithChildren<{ usePortal: boolean }>) => {
  return usePortal ? <Portal>{children}</Portal> : <React.Fragment>{children}</React.Fragment>;
};

const Slot = ({ isLoading, children }: PropsWithChildren<{ isLoading: boolean }>) => {
  if (!isLoading) return <React.Fragment>{children}</React.Fragment>;
  return (
    <View tw="h-52 items-center justify-center">
      <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
    </View>
  );
};

type RootProps = {
  // whether to use a Portal for rendering the bottom sheet
  usePortal?: boolean;
  // show loading spinner instead of content
  isLoading?: boolean;
  // custom styles for the modal
  modalStyle?: ModalizeProps['modalStyle'];
  // fixed height of the modal
  modalHeight?: ModalizeProps['modalHeight'];
  // match iOS keyboard behavior on Android
  avoidKeyboardLikeIOS?: ModalizeProps['avoidKeyboardLikeIOS'];
  // callback fired when modal closes
  onClose?: ModalizeProps['onClose'];
  // allow modal to adjust height based on content
  adjustToContentHeight?: ModalizeProps['adjustToContentHeight'];
} & PropsWithChildren;

const Root = forwardRef<Modalize, RootProps>(function BottomSheet(props, ref) {
  const {
    adjustToContentHeight = true,
    onClose,
    modalStyle,
    usePortal = true,
    isLoading = false,
    children,
    ...rest
  } = props;

  const styles = useMemo<TStyle>(
    () => [{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }, modalStyle],
    [modalStyle]
  );

  return (
    <Wrapper usePortal={usePortal}>
      <Modalize
        ref={ref}
        modalStyle={styles}
        withHandle={false}
        onClose={onClose}
        adjustToContentHeight={adjustToContentHeight}
        {...rest}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>
        <Slot isLoading={isLoading}>{children}</Slot>
      </Modalize>
    </Wrapper>
  );
});

const useBottomSheet = () => {
  const { ref, ...actions } = useModalize();
  return [ref, actions] as const;
};

const Content = styled(
  ({ style, children }: PropsWithChildren<{ style?: ViewStyle }>) => (
    <View tw={cn('px-4 pb-6', style)}>{children}</View>
  ),
  { props: { style: true } }
);

const Footer = styled(
  ({ style, children }: PropsWithChildren<{ style?: ViewStyle }>) => (
    <View tw="w-full border-t border-solid border-zinc-300">
      <View tw={cn('flex flex-row justify-evenly px-4 py-5', style)}>{children}</View>
    </View>
  ),
  { props: { style: true } }
);

export { Root, useBottomSheet, Content, Footer };
