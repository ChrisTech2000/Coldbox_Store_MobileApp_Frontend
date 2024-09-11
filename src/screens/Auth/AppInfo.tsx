import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { FAQ_CONTENT } from '#constants/faq';
import { APP_LOCALES, TranslationLocales } from '#i18n/constants';
import { mmkv } from '#stores/lib/storage';
import { ERoles } from '#types/global';

function AppInfo() {
  const language = mmkv.getString('i18n-locale');
  const faq = useMemo(
    () =>
      FAQ_CONTENT[(language ?? APP_LOCALES.ENGLISH) as TranslationLocales].filter((faq) =>
        faq.role.includes(ERoles.AUTH)
      ),
    [language]
  );

  return (
    <View tw="w-full h-full space-y-4">
      <List.AccordionGroup>
        <FlatList
          showsHorizontalScrollIndicator={false}
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
