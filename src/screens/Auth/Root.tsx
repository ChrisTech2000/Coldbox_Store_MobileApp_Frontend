import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import RootHero from '#assets/images/root_hero.svg';

import type { AuthRouteProps } from '#navigation/Auth';

const HERO_IMG_SIZE = Dimensions.get('screen').width / 1.1;

export default function AuthRoot(props: AuthRouteProps<'Root'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 items-center justify-center space-y-4 mx-4">
      <Text>Auth Root Screen</Text>
      <RootHero width={HERO_IMG_SIZE} height={HERO_IMG_SIZE} />
      <Button
        tw="w-full"
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignIn');
        }}
      >
        Sign In
      </Button>
      <Button
        tw="w-full"
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCompany');
        }}
      >
        Sign up as Company
      </Button>
      <Button
        tw="w-full"
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCoolingUser');
        }}
      >
        Sign up as Cooling User
      </Button>
      <Button
        mode="text"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('AppInfo');
        }}
      >
        App Info
      </Button>
    </View>
  );
}
