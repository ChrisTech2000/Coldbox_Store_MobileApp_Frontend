import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';

import { FAQ_CONTENT } from '#constants/faq';
import { APP_LOCALES, TranslationLocales } from '#i18n/constants';
import { ERoles } from '#types/global';

function AppInfo() {
  const { t } = useTranslationUtils();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const language = LanguageManager.read();

  const datums = useMemo(() => {
    const currentLanguage = language ?? APP_LOCALES.ENGLISH;
    const _searchTerm = searchTerm.toLowerCase().trim();

    return FAQ_CONTENT[currentLanguage as TranslationLocales].filter((faqItem) => {
      if (!faqItem.role.includes(ERoles.AUTH)) return false;
      return (
        faqItem.title.toLowerCase().includes(_searchTerm) ||
        faqItem.text.toLowerCase().includes(_searchTerm)
      );
    });
  }, [language, searchTerm]);

  return (
    <View tw="w-full h-full">
      <TextInput
        tw="m-4 bg-transparent"
        label={t('actions.search')}
        mode="flat"
        value={searchTerm}
        onChangeText={(value) => setSearchTerm(value)}
        left={<TextInput.Icon icon="magnify" />}
      />

      <List.AccordionGroup>
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          data={datums}
          keyExtractor={(item, itemIdx) => `faq-${item.id}-#${itemIdx}`}
          renderItem={({ item }) => (
            <React.Fragment>
              <List.Accordion title={item.title} id={item.id} titleNumberOfLines={4}>
                <Text tw="text-wrap mx-8 mt-2 mb-8">{item.text}</Text>
              </List.Accordion>
              <Divider tw="w-full bg-gray-700 my-[1.5px]" />
            </React.Fragment>
          )}
        />
      </List.AccordionGroup>
    </View>
  );
}

export default withSafeArea(AppInfo, ['bottom'], true);
