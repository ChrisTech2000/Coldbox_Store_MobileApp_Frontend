import { jwtDecode } from 'jwt-decode';
import moize from 'moize';
import ms from 'ms';
import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

import type { User } from '#types/global';
import AuthService from '#services/AuthService';
import { useInterval } from '#ui/hooks/useInterval';
import storage from './lib/storage';

export type JwtPayload = {
  exp: number;
  iat: number;
  jti: string;
  tokenType: string;
  userId: number;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type State = {
  tokens: Tokens | null;
  isAuthenticated: boolean;
  user: User | null;
};

type Actions = {
  setSession: (tokens: Tokens | null) => void;
  setUser: (user: User | null) => void;
  verifySession: (bufferInMs?: number) => boolean;
  renewSession: () => Promise<void>;
  revokeSession: () => void;
};

function _deserializeJWT(accessToken: string) {
  return mapKeys(jwtDecode<JwtPayload>(accessToken), (_, key) => camelCase(key)) as JwtPayload;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => ({
      tokens: null,
      isAuthenticated: false,
      user: null,
      setSession: (tokens) => {
        const isAuthenticated = !!tokens?.accessToken && !!tokens?.refreshToken;
        set({ tokens, isAuthenticated });
      },
      setUser: (user) => set({ user }),
      verifySession: (bufferInMs = 0) => {
        const accessToken = get().tokens?.accessToken;
        if (!accessToken) {
          throw new Error('No session initialized');
        }
        const decoded = _deserializeJWT(accessToken);
        const tokenExpiration = decoded.exp * 1000;
        const currentTime = new Date().getTime() + bufferInMs;
        return currentTime > tokenExpiration;
      },
      renewSession: moize.promise(
        async () => {
          const refreshToken = get().tokens?.refreshToken;
          if (!refreshToken) {
            throw new Error('Token not available');
          }
          const result = await AuthService.refreshToken(refreshToken);
          // Use the new refresh token from the response (token rotation)
          set({
            tokens: { accessToken: result.access, refreshToken: result.refresh || refreshToken },
          });
        },
        { maxAge: ms('15 seconds') }
      ),
      revokeSession: async () => {
        const refreshToken = get().tokens?.refreshToken;

        // Clear local state first to immediately revoke access
        set({ tokens: null, isAuthenticated: false, user: null });

        // Then notify backend to blacklist the token (fire and forget)
        // Even if this fails, the local session is already cleared
        if (refreshToken) {
          try {
            await AuthService.logout(refreshToken);
          } catch (error) {
            console.log('Failed to blacklist token on server:', error);
            // Don't throw - logout should succeed locally even if server call fails
          }
        }
      },
    }),
    { name: 'session', storage }
  )
);

const TOKEN_RENEWAL_TIMER = ms('7 minutes');

export function useAuthManager() {
  const verifySession = useAuthStore((store) => store.verifySession);
  const revokeSession = useAuthStore((store) => store.revokeSession);
  const renewSession = useAuthStore((store) => store.renewSession);

  const [accessToken, isAuthenticated] = useAuthStore(
    useShallow((store) => [store.tokens?.accessToken, store.isAuthenticated])
  );

  useEffect(() => {
    const checkAndRenewSession = async () => {
      try {
        const isExpired = verifySession();
        if (isExpired) {
          // Access token expired, try to refresh before logging out
          try {
            await renewSession();
            console.log('Session renewed successfully after detecting expired token');
          } catch (error) {
            // Refresh failed (refresh token also expired or invalid), log out
            console.log('Failed to renew session, logging out:', error);
            revokeSession();
          }
        }
      } catch {
        // No session initialized, silent error
      }
    };

    checkAndRenewSession();
  }, [accessToken]);

  useInterval(
    async () => {
      try {
        const isExpired = verifySession(TOKEN_RENEWAL_TIMER);
        if (isExpired) await renewSession();
      } catch {
        revokeSession();
      }
    },
    isAuthenticated ? TOKEN_RENEWAL_TIMER : undefined
  );

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        console.log('AppState changed to:', nextAppState);

        // App came to foreground
        if (nextAppState === 'active' && isAuthenticated) {
          console.log('App became active, checking token...');
          try {
            const isExpired = verifySession();
            console.log('Token expired?', isExpired);

            if (isExpired) {
              // Token expired while app was in background, try to refresh
              console.log('Attempting to renew session...');
              try {
                await renewSession();
                console.log('✅ Session renewed after app returned to foreground');
              } catch (error) {
                console.log('❌ Failed to renew session on foreground:', error);
                revokeSession();
              }
            } else {
              console.log('Token still valid, no refresh needed');
            }
          } catch (error) {
            console.log('Error checking session:', error);
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, verifySession, renewSession, revokeSession]);

  return isAuthenticated;
}
