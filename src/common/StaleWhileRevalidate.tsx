import React, { type PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useToast } from 'react-native-toast-notifications';
import { SWRConfig, type SWRConfiguration } from 'swr';

enum ToastType {
  SUCCESS = 'success',
  DANGER = 'danger',
}

const TOAST_MESSAGE: Record<ToastType, string> = {
  [ToastType.SUCCESS]: 'Online',
  [ToastType.DANGER]: 'Offline',
};

export default function StaleWhileRevalidate(props: PropsWithChildren) {
  const [cache] = useState(new Map());
  const toastTypeRef = useRef<ToastType | undefined>(undefined);

  const { isConnected } = useNetInfo();
  const toast = useToast();
  const isToastLoaded = useMemo(() => Object.entries(toast).length > 0, []);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      const previousToast = toastTypeRef.current;

      const toastType = isConnected ? ToastType.SUCCESS : ToastType.DANGER;
      if (previousToast !== toastType) {
        toastTypeRef.current = toastType;

        // TODO: maybe we should show a different message based on the network type and it's changes (cellular ↔ wifi)
        if (isToastLoaded) toast.show(TOAST_MESSAGE[toastType], { type: toastType });
      }
    });
  }, [toastTypeRef.current, toast, isToastLoaded]);

  const config = useMemo(
    () =>
      ({
        // Global SWR config; can be overwritten when using useApiCall()
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30000,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        provider: () => cache,
        isOnline: () => isConnected ?? false,
        initFocus: (callback) => {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback();
            }
            appState = nextAppState;
          };

          const subscription = AppState.addEventListener('change', onAppStateChange);
          return () => subscription.remove();
        },
      }) satisfies SWRConfiguration,
    [cache, isConnected]
  );

  return <SWRConfig value={config}>{props.children}</SWRConfig>;
}
