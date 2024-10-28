import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

import permissionsFactory, {
  DEFAULT_CUSTOMER_TYPE_COUNTRY,
  type PermissionKinds,
} from './abilities';

export type RBACGuardFunc = (action: PermissionKinds, subject: string) => boolean;

type Context = {
  guard: RBACGuardFunc;
};

const RBACContext = createContext<Context>({
  guard: () => false,
});

export default function RBAC(props: PropsWithChildren) {
  const [user] = useAuthStore(useShallow((store) => [store.user]));
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const contextualCountry = useMemo(() => {
    const datum = countriesDict().getByValue(companyCountry || farmerCountry || '');
    return datum?.name || DEFAULT_CUSTOMER_TYPE_COUNTRY;
  }, [companyCountry, farmerCountry]);

  const abilities = useMemo(
    () => permissionsFactory(user?.role, contextualCountry),
    [user?.role, contextualCountry]
  );

  const guard: Context['guard'] = useCallback(
    (action, subject) => abilities.can(action, subject),
    [abilities]
  );

  return <RBACContext.Provider value={{ guard }}>{props.children}</RBACContext.Provider>;
}

RBAC.useRBAC = function _useRBAC(): Context {
  const ctx = useContext(RBACContext);
  if (!ctx) throw new Error('useRBAC must be within RBAC Provider');
  return useMemo(() => ({ ...ctx }), [ctx]);
};

RBAC.ProtectedResource = function _ProtectedResource(
  props: PropsWithChildren<{
    action: PermissionKinds;
    subject: string;
  }>
) {
  const { guard } = RBAC.useRBAC();
  if (guard(props.action, props.subject)) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};
