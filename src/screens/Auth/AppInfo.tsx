import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { TextRegular } from '#ui/components/Text';

import { LanguageStorage } from '#i18n/utils';
import { FAQ_CONTENT } from '#constants/faq';
import { ERoles } from '#types/global';

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
              <TextRegular tw="text-wrap mx-8 mt-2 mb-8">{item.text}</TextRegular>
            </List.Accordion>
            <Divider />
          </View>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
}

export default withSafeArea(AppInfo);
