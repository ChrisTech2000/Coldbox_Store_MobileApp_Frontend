import React from 'react';
import { useState, useCallback } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { Select } from '#ui/components/Select';

// TODO: get languages from BE
const LANGUAGES = ['English', 'Hindi', 'Oriya', 'Gujarati', 'French', 'Portuguese'];

export function SelectLanguage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<string>(LANGUAGES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(activeLanguage);

  // TODO: bind both actions to BE calls
  const doLanguageUpdate = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setActiveLanguage(selectedLanguage);
      setIsModalOpen(false);
    },
    [selectedLanguage]
  );

  const cancelLanguageUpdate = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setSelectedLanguage(activeLanguage);
      setIsModalOpen(false);
    },
    [activeLanguage]
  );

  return (
    <Select
      label={activeLanguage}
      isModalOpen={isModalOpen}
      onClick={() => setIsModalOpen(!isModalOpen)}
      content={{
        header: 'Language',
        options: (
          /** TODO: create styled radio button group */
          <RadioButton.Group
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
          >
            {LANGUAGES.map((lang, index) => (
              <RadioButton.Item
                key={`${lang}-${index}`}
                label={lang}
                value={lang}
                style={{ flexDirection: 'row-reverse', marginLeft: -10 }}
              />
            ))}
          </RadioButton.Group>
        ),
        footer: (
          <View tw="flex flex-row items-center justify-end">
            <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
              Cancel
            </Button>
            <Button mode="text" uppercase onPress={doLanguageUpdate}>
              OK
            </Button>
          </View>
        ),
      }}
    />
  );
}
