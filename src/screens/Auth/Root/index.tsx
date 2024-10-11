import React from 'react';
import { Dimensions, View } from 'react-native';

import RootHero from '#assets/images/root_hero.svg';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { AuthRouteProps } from '#navigation/Auth';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';

import { SelectLanguage } from './components/SelectLanguage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const HERO_IMG_SIZE = screenHeight > SMALL_SCREEN_THRESHOLD ? screenWidth / 1.1 : screenWidth / 1.4;

function AuthRoot(props: AuthRouteProps<'Root'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="space-y-4 mx-4 flex-col items-center justify-center">
      <RootHero width={HERO_IMG_SIZE} height={HERO_IMG_SIZE} />
      <Text tw="mb-3 text-xl font-bold">{t('Auth.Root.welcome')}</Text>
      <Button
        tw="w-full border-2"
        mode="contained"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignIn');
        }}
      >
        {t('Auth.Root.signIn')}
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
        {t('Auth.Root.signUpCompany')}
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
        {t('Auth.Root.signUpCoolingUser')}
      </Button>

      <SelectLanguage />

      <Button
        mode="text"
        tw="w-full"
        rippleColor="white"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('AppInfo');
        }}
      >
        {t('Auth.Root.appInfo')}
      </Button>
    </View>
  );
}

export default withSafeArea(AuthRoot, ['top', 'bottom'], true);
