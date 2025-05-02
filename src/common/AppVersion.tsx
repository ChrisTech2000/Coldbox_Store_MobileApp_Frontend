import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { getBuildNumber } from 'react-native-device-info';
import { Dialog, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { launchBrowserUrl } from '#ui/lib/launchBrowserUrl';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';

import { ENVIRONMENT } from '#constants/environment';
import launchArgs from '#constants/launch.args';
import { useTranslationUtils } from '#i18n/utils';
import AuthService from '#services/AuthService';

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
      reportCrash(exception as Error);
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
    if (IS_DEV_ENV || launchArgs.isE2E) return;
    return setState({
      isDismissable: !needsUpdate,
      isVisible: needsUpdate,
    });
  });

  return (
    <Portal>
      <Dialog
        dismissable={state.isDismissable}
        visible={state.isVisible}
        onDismiss={() => {
          setState((state) => ({
            ...state,
            isVisible: false,
          }));
        }}
        style={{ backgroundColor: 'white' }}
      >
        <Dialog.Icon icon="cloud-download" size={50} color={paperTheme.colors.primary} />
        <Dialog.Content>
          <Text variant="TextMedium" tw="text-base mt-2 mb-0.5">
            {t('appVersion.newVersion')}
          </Text>
          <Text tw="text-base">{t('appVersion.pleaseUpdate')}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async (evt) => {
              evt.stopPropagation();

              const APP_STORE_URLS = {
                android:
                  'https://play.google.com/store/apps/details?id=com.base.coldtivate&hl=en&gl=US&pli=1',
                ios: 'https://apps.apple.com/sg/app/coldtivate/id1613730873',
              };

              const storeUrl =
                Platform.OS === 'android' ? APP_STORE_URLS.android : APP_STORE_URLS.ios;

              try {
                await launchBrowserUrl(storeUrl);
              } catch (exception) {
                reportCrash(exception as Error);
              }
            }}
          >
            {t('actions.update')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
