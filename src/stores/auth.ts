import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { jwtDecode } from 'jwt-decode';
import moize from 'moize';
import ms from 'ms';
import { useEffect } from 'react';

import { useInterval } from '#ui/hooks/useInterval';
import storage from './lib/storage';

// TODO: define the correct object
export type JwtPayload = {
  iss: string;
  iat: number;
  exp: number;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type State = {
  tokens: Tokens | null;
  isAuthenticated: boolean;
};

type Actions = {
  setSession: (tokens: Tokens | null) => void;
  verifySession: (bufferInMs?: number) => boolean;
  renewSession: () => Promise<void>;
  revokeSession: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => ({
      tokens: null,
      isAuthenticated: false,
      setSession: (tokens) => {
        const isAuthenticated = !!tokens?.accessToken && !!tokens?.refreshToken;
        set({ tokens, isAuthenticated });
      },
      verifySession: (bufferInMs = 0) => {
        const accessToken = get().tokens?.accessToken;
        if (!accessToken) {
          throw new Error('No session initialized');
        }
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const tokenExpiration = decoded.exp * 1000;
        const currentTime = new Date().getTime() + bufferInMs;
        return currentTime > tokenExpiration;
      },
      renewSession: moize.promise(
        async () => {
          // TODO:
        },
        { maxAge: ms('15 seconds') }
      ),
      revokeSession: () => set({ tokens: null, isAuthenticated: false }),
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
        // silent error
      }
    },
    isAuthenticated ? TOKEN_RENEWAL_TIMER : undefined
  );

  return isAuthenticated;
}
