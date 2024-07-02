import { defineAbility } from '@casl/ability';

import { ERoles } from '#types/global';

export const PERMISSION_KINDS = {
  NAVIGATE: 'NAVIGATE',
} as const;

export type PermissionKinds = keyof typeof PERMISSION_KINDS;

export default function permissionsFactory(role = ERoles.AUTH) {
  return defineAbility((can, cannot) => {
    ///
    // General Rules
    ///
    can(PERMISSION_KINDS.NAVIGATE, 'AccountDetails');
    can(PERMISSION_KINDS.NAVIGATE, 'KnowledgeHub');
    can(PERMISSION_KINDS.NAVIGATE, 'Tutorial');
    can(PERMISSION_KINDS.NAVIGATE, 'FAQ');
    can(PERMISSION_KINDS.NAVIGATE, 'About');

    ///
    // Role Specific Rules
    ///
    switch (role) {
      case ERoles.EMPLOYEE: {
        //
        // navigation
        can(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        // scope: management stack
        can(PERMISSION_KINDS.NAVIGATE, 'CompanyDetails');
        can(PERMISSION_KINDS.NAVIGATE, 'Locations');
        can(PERMISSION_KINDS.NAVIGATE, 'CoolingUnits');
        can(PERMISSION_KINDS.NAVIGATE, 'Operators');
        can(PERMISSION_KINDS.NAVIGATE, 'RegisteredEmployees');
        can(PERMISSION_KINDS.NAVIGATE, 'RevenueAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'UsageAnalysis');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CoolingUsers');
        break;
      }

      case ERoles.OPERATOR: {
        //
        // navigation
        can(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        // scope: management stack
        cannot(PERMISSION_KINDS.NAVIGATE, 'CompanyDetails');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Locations');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CoolingUnits');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Operators');
        cannot(PERMISSION_KINDS.NAVIGATE, 'RegisteredEmployees');
        can(PERMISSION_KINDS.NAVIGATE, 'RevenueAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'UsageAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'CoolingUsers');
        break;
      }

      case ERoles.COOLING_USER: {
        //
        // navigation
        cannot(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        break;
      }

      default:
        break;
    }
  });
}
