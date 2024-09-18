import React, { PropsWithChildren } from 'react';
import { View, Text, Button } from 'react-native';

export default function MarketplaceHeroSection(props: PropsWithChildren) {
  const [count, setCount] = React.useState<number>(0);

  return (
    <React.Fragment>
      <View tw="h-1/4 items-center justify-center">
        <Text>Marketplace Hero Section ({count})</Text>
        <Button
          title="inc"
          onPress={(evt) => {
            evt.stopPropagation();
            setCount((state) => state + 1);
          }}
        />
      </View>

      {props.children}
    </React.Fragment>
  );
}
