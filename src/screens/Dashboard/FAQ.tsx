import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { FAQ_CONTENT } from '#constants/faq';
import { APP_LOCALES, TranslationLocales } from '#i18n/constants';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { mmkv } from '#stores/lib/storage';
import { ERoles } from '#types/global';

function FAQ() {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const language = mmkv.getString('i18n-locale');

  const [search, setSearch] = useState<string>('');

  const faq = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return FAQ_CONTENT[(language ?? APP_LOCALES.ENGLISH) as TranslationLocales].filter(
      (faq) =>
        faq.role.includes(user?.role ?? ERoles.COOLING_USER) &&
        (faq.title.toLowerCase().includes(searchTerm) ||
          faq.text.toLowerCase().includes(searchTerm))
    );
  }, [search, user?.role]);

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
        <FlatList
          showsVerticalScrollIndicator={false}
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

export default withSafeArea(FAQ);
