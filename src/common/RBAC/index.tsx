import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '#stores/auth';

import permissionsFactory, { type PermissionKinds } from './abilities';

type Context = {
  guard: (action: PermissionKinds, subject: string) => boolean;
};

const RBACContext = createContext<Context>({
  guard: () => false,
});

export default function RBAC(props: PropsWithChildren) {
  const [user] = useAuthStore(useShallow((store) => [store.user]));
  const abilities = useMemo(() => permissionsFactory(user?.role), [user?.role]);
  const guard: Context['guard'] = useCallback(
    (action, subject) => abilities.can(action, subject),
    [abilities]
  );
  return <RBACContext.Provider value={{ guard }}>{props.children}</RBACContext.Provider>;
}

function useRBAC(): Context {
  const ctx = useContext(RBACContext);
  if (!ctx) throw new Error('useRBAC must be within RBAC Provider');
  return useMemo(() => ({ ...ctx }), [ctx]);
}

function ProtectedResource(
  props: PropsWithChildren<{
    action: PermissionKinds;
    subject: string;
  }>
) {
  const { guard } = useRBAC();
  if (guard(props.action, props.subject)) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
}

RBAC.ProtectedResource = ProtectedResource;
