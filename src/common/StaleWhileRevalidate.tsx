import React, { type PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { SWRConfig, type SWRConfiguration } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import InAppNotifications, { type ToastType } from './InAppNotifications';
import { useAuthStore } from '#stores/auth';

type BinaryToastTypes = Exclude<ToastType, 'md_default' | 'md_warning'>;

const TOAST_MESSAGE = {
  md_success: 'Online',
  md_danger: 'Offline',
} satisfies Readonly<Record<BinaryToastTypes, string>>;

export default function StaleWhileRevalidate(props: PropsWithChildren) {
  const [cache] = useState(new Map());
  const toastTypeRef = useRef<BinaryToastTypes | undefined>(undefined);
  const isAuthenticated = useAuthStore(useShallow((store) => store.isAuthenticated));

  const { isConnected } = useNetInfo();
  const toast = InAppNotifications.useToast();
  const isToastLoaded = useMemo(() => Object.entries(toast).length > 0, []);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      const previousToast = toastTypeRef.current;

      const toastType: BinaryToastTypes = isConnected ? 'md_success' : 'md_danger';
      if (previousToast !== toastType) {
        toastTypeRef.current = toastType;

        // TODO: maybe we should show a different message based on the network type and it's changes (cellular ↔ wifi)
        if (isToastLoaded)
          toast.show(TOAST_MESSAGE[toastType], {
            type: toastType,
            style: {
              marginBottom: isAuthenticated ? 50 : 20,
            },
          });
      }
    });
  }, [toastTypeRef.current, toast, isToastLoaded, isAuthenticated]);

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
