import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

import { Text } from '#ui/components/Text';
import { Image } from '#ui/components/Image';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import DefaultLogo from '#assets/images/coldtivate_logo.svg';

import FormManager from '../components/FormManager';

export default function LogoField() {
  const { watch, setValue } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const currentLogo = watch('logo');

  return (
    <React.Fragment>
      <View tw="flex-row items-center justify-between px-4">
        <Text tw="text-gray-600 text-base truncate">
          {t('Dashboard.Management.CompanyDetails.labels.uploadLogo')}
        </Text>
        <View tw="flex-row items-center space-x-2">
          {!currentLogo.uri ? (
            <DefaultLogo width={56} height={56} />
          ) : (
            <Image tw="h-14 w-14" source={{ uri: currentLogo.uri }} resizeMode="contain" />
          )}
          <Button
            uppercase
            mode="contained-tonal"
            onPress={async (evt) => {
              evt.stopPropagation();
              await launchImageLibrary(
                {
                  maxWidth: 200,
                  maxHeight: 200,
                  mediaType: 'photo',
                  selectionLimit: 1,
                  quality: 1,
                },
                (result) => {
                  const file = result.assets?.at(0);
                  if (typeof file === 'undefined') return;
                  if (typeof file.fileSize !== 'undefined' && file.fileSize > 50_000) return;
                  setValue('logo', {
                    uri: file.uri as string,
                    name: file.fileName,
                    type: file.type,
                  });
                }
              );
            }}
          >
            {t('Dashboard.Management.CompanyDetails.labels.uploadLogo')}
          </Button>
        </View>
      </View>
      <Divider tw="w-full bg-gray-700 my-3" />
    </React.Fragment>
  );
}
