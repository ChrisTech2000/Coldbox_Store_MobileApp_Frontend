import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

import { FAQ_CONTENT } from '#constants/faq';
import { LanguageStorage } from '#i18n/utils';
import { ERoles } from '#types/global';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function AppInfo() {
  const faq = useMemo(
    () => FAQ_CONTENT[LanguageStorage.read()].filter((faq) => faq.role.includes(ERoles.AUTH)),
    []
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
