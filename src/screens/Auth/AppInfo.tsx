import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

import { FAQ_CONTENT } from '#constants/faq';
import { ERoles } from '#types/global';
import { withSafeArea } from '#ui/primitives/withSafeArea';

const FAQ = FAQ_CONTENT.filter((faq) => faq.role.includes(ERoles.AUTH));

function AppInfo() {
  return (
    <ScrollView tw="w-full h-full space-y-4">
      <List.AccordionGroup>
        {FAQ.map((faq, index) => (
          <View key={`${faq.title}-${index}`}>
            <List.Accordion title={faq.title} id={index}>
              <Text tw="text-xs text-gray-500 text-wrap mx-8 mt-2 mb-8">{faq.text}</Text>
            </List.Accordion>
            <Divider />
          </View>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
}

export default withSafeArea(AppInfo);
