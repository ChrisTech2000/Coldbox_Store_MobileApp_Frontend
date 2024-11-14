import React from 'react';
import { Platform, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, type PermissionStatus, RESULTS } from 'react-native-permissions';

import { Button } from '#ui/components/Button';
import { Image } from '#ui/components/Image';
import { Text } from '#ui/components/Text';

import DefaultLogo from '#assets/images/coldtivate_logo.svg';
import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';

import FormManager from '../components/FormManager';

const PERMISSION = Platform.select({
  android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
})!;

const PERMISSION_OUTCOMES: Array<PermissionStatus> = [RESULTS.GRANTED, RESULTS.LIMITED];

export default function LogoField() {
  const { watch, setValue } = FormManager.useFormManager();
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const currentLogo = watch('logo');

  return (
    <React.Fragment>
      <View tw="flex-row items-center justify-between px-4 flex-wrap">
        <Text tw="text-gray-600 text-base">
          {t('Dashboard.Management.CompanyDetails.labels.logo')}
        </Text>
        <View tw="flex-row items-center space-x-2">
          {!currentLogo.uri ? (
            <DefaultLogo width={56} height={56} />
          ) : (
            <Image
              tw="h-14 w-14"
              source={{
                uri: currentLogo.uri.replace(
                  'http:',
                  'https:'
                ) /** TODO: maybe handle this in the BE */,
              }}
              resizeMode="contain"
            />
          )}
          <Button
            uppercase
            mode="contained-tonal"
            tw="flex-shrink-0"
            onPress={async (evt) => {
              evt.stopPropagation();

              const outcome = await request(PERMISSION);
              if (!PERMISSION_OUTCOMES.includes(outcome)) {
                toast.show(t('Dashboard.Management.CompanyDetails.toasts.photoLibrary'), {
                  type: 'md_danger',
                });
                return;
              }

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
                  if (typeof file === 'undefined') return; // safe guard
                  if (typeof file.fileSize !== 'undefined' && file.fileSize > 50_000) return; // file size upload limit
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
