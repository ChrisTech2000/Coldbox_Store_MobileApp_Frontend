import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

import { FAQ_CONTENT } from '#constants/faq';
import { ERoles } from '#types/global';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { mmkv } from '#stores/lib/storage';
import { TranslationLocales } from 'i18n/constants';

function AppInfo() {
  const activeLanguage = mmkv.getString('i18n-locale');
  console.log(activeLanguage);

  const faq = useMemo(
    () =>
      activeLanguage
        ? FAQ_CONTENT[activeLanguage as TranslationLocales].filter((faq) =>
            faq.role.includes(ERoles.AUTH)
          )
        : [],
    [activeLanguage]
  );

  return (
    <ScrollView tw="w-full h-full space-y-4">
      <List.AccordionGroup>
        {faq.map((item, index) => (
          <View key={`${item.title}-${index}`}>
            <List.Accordion title={item.title} id={index}>
              <Text tw="text-xs text-gray-500 text-wrap mx-8 mt-2 mb-8">{item.text}</Text>
            </List.Accordion>
            <Divider />
          </View>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
}

export default withSafeArea(AppInfo);
