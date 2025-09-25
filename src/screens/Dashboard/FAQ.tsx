import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Divider, List, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { FAQ_CONTENT } from '#constants/faq';
import { APP_LOCALES, TranslationLocales } from '#i18n/constants';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

function FAQ() {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();

  const [search, setSearch] = useState<string>('');

  const language = LanguageManager.read();

  const faq = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return FAQ_CONTENT[(language ?? APP_LOCALES.ENGLISH) as TranslationLocales].filter(
      (faq) =>
        faq.role.includes(user?.role ?? ERoles.COOLING_USER) &&
        (faq.title.toLowerCase().includes(searchTerm) ||
          faq.text.toLowerCase().includes(searchTerm))
    );
  }, [search, user?.role, language]);

  return (
    <View tw="w-full h-full">
      <TextInput
        tw="m-4 bg-transparent"
        label={t('actions.search')}
        mode="flat"
        value={search}
        onChangeText={(value) => setSearch(value)}
        left={<TextInput.Icon icon="magnify" />}
      />

      <List.AccordionGroup>
        <FlashList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          data={faq}
          keyExtractor={(item) => `faq-${item.id}`}
          estimatedItemSize={80}
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

export default withSafeArea(FAQ, ['bottom'], true);
