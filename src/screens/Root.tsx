import React, { type PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  return (
    <View tw="mt-8 px-2">
      <Text tw="text-2xl text-black dark:text-white">{title}</Text>
      <Text tw="mt-2 text-lg text-black dark:text-white">{children}</Text>
    </View>
  );
}

function RootScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView tw="bg-neutral-300 dark:bg-slate-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" tw="bg-neutral-300 dark:bg-slate-900">
        <Header />
        <View tw="bg-white dark:bg-black">
          <Section title="Step One">
            Edit <Text tw="font-bold">App.tsx</Text> to change this screen and then come back to see
            your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withSafeArea(RootScreen);
