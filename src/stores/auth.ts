import { jwtDecode } from 'jwt-decode';
import moize from 'moize';
import ms from 'ms';
import { useEffect } from 'react';
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
          set({ tokens: { accessToken: result.access, refreshToken } });
        },
        { maxAge: ms('15 seconds') }
      ),
      revokeSession: () => set({ tokens: null, isAuthenticated: false, user: null }),
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
    try {
      const isExpired = verifySession();
      if (isExpired) revokeSession();
    } catch {
      // silent error
    }
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

  return isAuthenticated;
}
