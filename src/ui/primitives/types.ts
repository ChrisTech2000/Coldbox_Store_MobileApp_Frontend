import type { Text } from 'react-native';

type ComponentPropsWithAsChild<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  asChild?: boolean;
};

export type TextRef = React.ElementRef<typeof Text>;

export type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;
