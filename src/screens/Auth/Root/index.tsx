import RootHero from '#assets/images/root_hero.svg';
import { Button } from '#ui/components/Button';

import type { AuthRouteProps } from '#navigation/Auth';

import React from 'react';
import { Dimensions, View } from 'react-native';
import { SelectLanguage } from './components/SelectLanguage';

const HERO_IMG_SIZE = Dimensions.get('screen').width / 1.1;

export default function AuthRoot(props: AuthRouteProps<'Root'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 items-center justify-center space-y-4 mx-4">
      <RootHero width={HERO_IMG_SIZE} height={HERO_IMG_SIZE} />
      <Button
        tw="w-full border-2"
        mode="contained"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignIn');
        }}
      >
        Sign In
      </Button>
      <Button
        tw="w-full border-2 border-green-primary"
        mode="outlined"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCompany');
        }}
      >
        Sign up as Company
      </Button>
      <Button
        tw="w-full border-2 border-green-primary"
        mode="outlined"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCoolingUser');
        }}
      >
        Sign up as Cooling User
      </Button>
      <SelectLanguage />
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
