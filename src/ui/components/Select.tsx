import React, { useMemo, createContext, useContext, type PropsWithChildren } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { useControlledState } from '#ui/hooks/useControlledState';
import { cn } from '#ui/lib/cn';

// Dialog default (FlashList) width list size
export const VIRTUAL_LIST_SIZE_WIDTH = 52;

type Variant = 'sm' | 'md' | 'lg';
const DEFAULT_VARIANT: Variant = 'sm';

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  variant?: Variant;
  error?: boolean;
  disabled?: boolean;
  onDismiss?: () => void;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error('Select components must be used within a Select provider');
  }
  return useMemo(() => ({ ...ctx }), [ctx]);
}

export function Select(
  props: PropsWithChildren<{
    isOpen?: boolean;
    onOpenChange?: (isOpen: React.SetStateAction<boolean>) => void;
    variant?: Variant;
    error?: boolean;
    disabled?: boolean;
    onDismiss?: () => void;
  }>
) {
  const {
    isOpen = false,
    onOpenChange,
    variant = DEFAULT_VARIANT,
    error,
    disabled,
    children,
    onDismiss,
  } = props;

  const [isVisible, setVisibility] = useControlledState<boolean>(isOpen, onOpenChange);

  return (
    <SelectContext.Provider
      value={{
        isOpen: isVisible,
        setIsOpen: setVisibility,
        variant,
        error,
        disabled,
        onDismiss,
      }}
    >
      <View>{children}</View>
    </SelectContext.Provider>
  );
}

Select.Touchable = function SelectTouchable(props: {
  label: string;
  displayValue?: string;
  minifyLabel?: boolean;
  testID?: string;
}) {
  const { label, minifyLabel, displayValue } = props;

  const { isOpen, setIsOpen, variant, error, disabled } = useSelectContext();
  const colors = useTailwindColors();

  const arrowColor = useMemo(() => {
    const colorMap = {
      disabled: colors.gray[400],
      error: colors.red[700],
      default: variant === DEFAULT_VARIANT ? colors.green.primary : colors.gray[600],
    };
    return disabled ? colorMap.disabled : error ? colorMap.error : colorMap.default;
  }, [error, disabled, variant, colors]);

  return (
    <TouchableOpacity disabled={disabled} onPress={() => setIsOpen(true)} testID={props.testID}>
      <View
        tw={cn(
          'flex flex-row items-center space-x-0.75',
          variant !== DEFAULT_VARIANT && 'justify-between',
          minifyLabel && displayValue && 'flex flex-col items-start',
          variant === 'lg' && minifyLabel ? 'px-2' : variant === 'lg' ? 'px-4' : undefined // TODO -> review this
        )}
      >
        <Text
          tw={cn(
            variant === DEFAULT_VARIANT ? 'text-green-primary' : 'text-gray-600 text-base',
            minifyLabel && displayValue && 'text-xs',
            error && 'text-red-700',
            disabled && 'text-gray-400',
            'flex-shrink'
          )}
          numberOfLines={1}
        >
          {label}
        </Text>
        {displayValue ? (
          <Text
            tw={cn('text-base ml-2 flex-1 text-right', disabled && 'text-gray-400')}
            numberOfLines={1}
          >
            {displayValue}
          </Text>
        ) : null}
        <Icon
          name={
            variant !== 'lg' || (variant === 'lg' && minifyLabel)
              ? 'arrow-drop-down'
              : 'keyboard-arrow-down'
          }
          size={variant !== 'lg' || (variant === 'lg' && minifyLabel) ? 20 : 30}
          style={{
            color: arrowColor,
            ...(isOpen && { transform: [{ rotate: '180deg' }] }),
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

Select.Dialog = function _SelectDialog(
  props: PropsWithChildren<{
    header?: string;
    StickyHeaderElement?: React.ReactElement;
    FooterElement?: React.ReactElement;
    enableScroll?: boolean;
  }>
) {
  const { header, StickyHeaderElement, FooterElement, children, enableScroll = false } = props;

  const { isOpen, setIsOpen, onDismiss, variant = DEFAULT_VARIANT } = useSelectContext();

  function renderBody() {
    if (!enableScroll) return children;

    const size = {
      sm: 'max-h-44',
      md: 'max-h-56',
      lg: 'max-h-96',
    }[variant];

    const hasStickyHeader = typeof StickyHeaderElement !== 'undefined';

    return (
      <ScrollView tw={cn('flex-col', size)} stickyHeaderIndices={hasStickyHeader ? [0] : undefined}>
        {hasStickyHeader ? <View tw="bg-white">{StickyHeaderElement}</View> : null}
        {children}
      </ScrollView>
    );
  }

  const Container = enableScroll ? Dialog.ScrollArea : Dialog.Content;

  const hasFooter = typeof FooterElement !== 'undefined';

  return (
    <Portal>
      <Dialog
        visible={isOpen}
        onDismiss={() => {
          setIsOpen(false);
          onDismiss?.();
        }}
        style={{ backgroundColor: 'white' }}
      >
        {header ? <Dialog.Title>{header}</Dialog.Title> : null}
        <Container tw={cn('px-0', !header && 'pt-0 mt-0 border-t-0')}>{renderBody()}</Container>
        {hasFooter ? <Dialog.Actions>{FooterElement}</Dialog.Actions> : null}
      </Dialog>
    </Portal>
  );
};
