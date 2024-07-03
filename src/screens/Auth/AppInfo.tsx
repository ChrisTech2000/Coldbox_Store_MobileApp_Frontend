import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

import { LanguageStorage } from '#i18n/utils';
import { FAQ_CONTENT } from '#constants/faq';
import { ERoles } from '#types/global';

function AppInfo() {
  const faq = useMemo(
    () => FAQ_CONTENT[LanguageStorage.read()].filter((faq) => faq.role.includes(ERoles.AUTH)),
    []
  );

  return (
    <View tw="w-full h-full space-y-4">
      <List.AccordionGroup>
        <FlatList
          data={faq}
          keyExtractor={(item, itemIdx) => `faq-${item.id}-#${itemIdx}`}
          renderItem={({ item }) => (
            <React.Fragment>
              <List.Accordion title={item.title} id={item.id}>
                <Text tw="text-wrap mx-8 mt-2 mb-8">{item.text}</Text>
              </List.Accordion>
              <Divider />
            </React.Fragment>
          )}
          nestedScrollEnabled
        />
      </List.AccordionGroup>
    </View>
  );
}

export default withSafeArea(AppInfo);
