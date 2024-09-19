import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

import { useAuthStore } from '#stores/auth';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { METHODOLOGY_CONTENT } from '#constants/methodology';

function Methodology() {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();

  const [search, setSearch] = useState<string>('');

  const methodologyContent = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return METHODOLOGY_CONTENT[LanguageStorage.read()].filter(
      (entry) =>
        entry.title.toLowerCase().includes(searchTerm) ||
        entry.text.toLowerCase().includes(searchTerm)
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
          data={methodologyContent}
          keyExtractor={(item, itemIdx) => `methodology-${item.title}-#${itemIdx}`}
          renderItem={({ item }) => (
            <React.Fragment>
              <List.Accordion title={item.title} id={item.title}>
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

export default withSafeArea(Methodology);
