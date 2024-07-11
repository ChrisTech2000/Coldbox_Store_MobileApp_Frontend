import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

import { useAuthStore } from '#stores/auth';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { FAQ_CONTENT } from '#constants/faq';
import { ERoles } from '#types/global';

function FAQ() {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();

  const [search, setSearch] = useState<string>('');

  const faq = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return FAQ_CONTENT[LanguageStorage.read()].filter(
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
        mode="outlined"
        value={search}
        onChangeText={(value) => setSearch(value)}
        left={<TextInput.Icon icon="magnify" />}
      />

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

export default withSafeArea(FAQ);
