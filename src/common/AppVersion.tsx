import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBuildNumber } from 'react-native-device-info';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import AuthService from '#services/AuthService';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { ENVIRONMENT } from '#constants/environment';

const IS_DEV_ENV = typeof ENVIRONMENT === 'string' && ENVIRONMENT === 'development';

function useAppVersionCheck(cb: (needsUpdate: boolean) => void) {
  const hasRun = useRef<boolean>(false);

  const checkVersion = useCallback(async () => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function _getBackendVersion(): Promise<number> {
      if (Platform.OS === 'ios') return AuthService.getBackendIOSVersion();
      return AuthService.getBackendAndroidVersion();
    }

    const result = await _getBackendVersion();

    const backendVersionCode =
      Platform.OS === 'android' ? result.toString().replace(/\./g, '0') : result.toString();
    const appVersionCode = getBuildNumber();

    cb(appVersionCode < backendVersionCode);
  }, []);

  useEffect(() => {
    try {
      void checkVersion();
    } catch (exception) {
      console.error(exception);
    }
  }, []);
}

export default function AppVersionModal() {
  const { t } = useTranslationUtils();

  const [state, setState] = useState<{ isVisible: boolean; isDismissable: boolean }>({
    isVisible: false,
    isDismissable: true,
  });

  useAppVersionCheck((needsUpdate) => {
    if (IS_DEV_ENV) return;
    return setState({
      isDismissable: !needsUpdate,
      isVisible: needsUpdate,
    });
  });

  return (
    <Portal>
      <Modal
        dismissable={state.isDismissable}
        visible={state.isVisible}
        onDismiss={() => {
          setState((state) => ({
            ...state,
            isVisible: false,
          }));
        }}
      >
        <View tw="w-full items-center bg-white rounded-3xl w-4/5 max-w-4/5 h-auto py-4 px-5 self-center space-y-2">
          <View tw="space-y-3">
            <View tw="self-center">
              <MaterialCommunityIcon
                name="cloud-download"
                size={50}
                color={paperTheme.colors.primary}
              />
            </View>
            <View>
              <Text variant="TextMedium">{t('appVersion.newVersion')}</Text>
              <Text variant="TextMedium">{t('appVersion.pleaseUpdate')}</Text>
            </View>
          </View>
          <View tw="flex-row self-end space-x-2">
            <Button
              mode="text"
              onPress={async (evt) => {
                try {
                  evt.stopPropagation();
                  if (Platform.OS === 'android') {
                    await Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.base.coldtivate&hl=en&gl=US&pli=1'
                    );
                    return;
                  }
                  await Linking.openURL('https://apps.apple.com/sg/app/coldtivate/id1613730873');
                } catch (exception) {
                  console.error(exception);
                }
              }}
            >
              {t('actions.update')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
