import { defineAbility } from '@casl/ability';

import { ERoles } from '#types/global';

export const DEFAULT_CUSTOMER_TYPE_COUNTRY = 'Nigeria';

export const PERMISSION_KINDS = {
  NAVIGATE: 'NAVIGATE',
  SET: 'SET',
  VIEW: 'VIEW',
  STORE: 'MUTATE',
} as const;

export type PermissionKinds = keyof typeof PERMISSION_KINDS;

export default function permissionsFactory(role = ERoles.AUTH, contextualCountry: string) {
  return defineAbility((can, cannot) => {
    const hasCustomerTypeFeatureFlag = contextualCountry === DEFAULT_CUSTOMER_TYPE_COUNTRY;

    ///
    // General Rules
    ///
    can(PERMISSION_KINDS.NAVIGATE, 'AccountDetails');
    can(PERMISSION_KINDS.NAVIGATE, 'KnowledgeHub');
    can(PERMISSION_KINDS.NAVIGATE, 'Tutorial');
    can(PERMISSION_KINDS.NAVIGATE, 'FAQ');
    can(PERMISSION_KINDS.NAVIGATE, 'About');
    // scope: customer-type
    if (hasCustomerTypeFeatureFlag) {
      can(PERMISSION_KINDS.VIEW, 'AccountSellerSettings');
      can(PERMISSION_KINDS.NAVIGATE, 'MarketplaceShoppingCart');
      can(PERMISSION_KINDS.VIEW, 'MarketplaceListing');
    }

    ///
    // Role Specific Rules
    ///
    switch (role) {
      case ERoles.EMPLOYEE: {
        //
        // navigation
        can(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CheckoutStack');
        // scope: management stack
        can(PERMISSION_KINDS.NAVIGATE, 'CompanyDetails');
        can(PERMISSION_KINDS.NAVIGATE, 'Locations');
        can(PERMISSION_KINDS.NAVIGATE, 'CoolingUnits');
        can(PERMISSION_KINDS.NAVIGATE, 'Operators');
        can(PERMISSION_KINDS.NAVIGATE, 'RegisteredEmployees');
        can(PERMISSION_KINDS.NAVIGATE, 'RevenueAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'UsageAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'DeliveryContacts');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CoolingUsers');
        cannot(PERMISSION_KINDS.NAVIGATE, 'EditSellingSettings');
        can(PERMISSION_KINDS.NAVIGATE, 'ManageCouponsSettings');
        //
        // actions
        // scope: account details
        can(PERMISSION_KINDS.SET, 'FormEmailField');
        can(PERMISSION_KINDS.SET, 'PayoutSettings');
        cannot(PERMISSION_KINDS.VIEW, 'FarmerFields');
        cannot(PERMISSION_KINDS.STORE, 'FarmerDetails');
        // scope: cooling units
        can(PERMISSION_KINDS.SET, 'Temperatures');
        can(PERMISSION_KINDS.NAVIGATE, 'CratesInfo');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Maps');
        cannot(PERMISSION_KINDS.VIEW, 'CompaniesFilter');
        // scope: check-in
        cannot(PERMISSION_KINDS.VIEW, 'TemperatureAlertModal');
        cannot(PERMISSION_KINDS.VIEW, 'OperatorActions');
        // scope: customer-type
        if (hasCustomerTypeFeatureFlag) {
          can(PERMISSION_KINDS.VIEW, 'ContactsSharingEmail');
          can(PERMISSION_KINDS.SET, 'MarketplaceBuyerOption');
          can(PERMISSION_KINDS.VIEW, 'CompanySellerSettings');
          cannot(PERMISSION_KINDS.SET, 'MarketplaceListForSale');
          cannot(PERMISSION_KINDS.SET, 'MarketplaceEditListedCrates');
        }
        break;
      }

      case ERoles.OPERATOR: {
        //
        // navigation
        can(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        can(PERMISSION_KINDS.NAVIGATE, 'CheckoutStack');
        can(PERMISSION_KINDS.NAVIGATE, 'EditSellingSettings');
        can(PERMISSION_KINDS.NAVIGATE, 'ManageCouponsSettings');
        // scope: management stack
        cannot(PERMISSION_KINDS.NAVIGATE, 'CompanyDetails');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Locations');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CoolingUnits');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Operators');
        cannot(PERMISSION_KINDS.NAVIGATE, 'RegisteredEmployees');
        cannot(PERMISSION_KINDS.NAVIGATE, 'DeliveryContacts');
        can(PERMISSION_KINDS.NAVIGATE, 'RevenueAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'UsageAnalysis');
        can(PERMISSION_KINDS.NAVIGATE, 'CoolingUsers');
        //
        // actions
        // scope: account details
        cannot(PERMISSION_KINDS.SET, 'FormEmailField');
        cannot(PERMISSION_KINDS.VIEW, 'FarmerFields');
        cannot(PERMISSION_KINDS.STORE, 'FarmerDetails');
        can(PERMISSION_KINDS.SET, 'PayoutSettings');
        // scope: cooling units
        can(PERMISSION_KINDS.SET, 'Temperatures');
        can(PERMISSION_KINDS.NAVIGATE, 'CratesInfo');
        cannot(PERMISSION_KINDS.NAVIGATE, 'Maps');
        cannot(PERMISSION_KINDS.VIEW, 'CompaniesFilter');
        // scope: check-in
        can(PERMISSION_KINDS.VIEW, 'TemperatureAlertModal');
        can(PERMISSION_KINDS.VIEW, 'OperatorActions');
        // scope: customer-type
        if (hasCustomerTypeFeatureFlag) {
          cannot(PERMISSION_KINDS.VIEW, 'ContactsSharingEmail');
          cannot(PERMISSION_KINDS.VIEW, 'CompanySellerSettings');
          can(PERMISSION_KINDS.SET, 'MarketplaceBuyerOption');
          can(PERMISSION_KINDS.SET, 'MarketplaceListForSale');
          can(PERMISSION_KINDS.SET, 'MarketplaceEditListedCrates');
        }
        break;
      }

      case ERoles.COOLING_USER: {
        //
        // navigation
        cannot(PERMISSION_KINDS.NAVIGATE, 'ManagementStack');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CheckoutStack');
        can(PERMISSION_KINDS.NAVIGATE, 'EditSellingSettings');
        can(PERMISSION_KINDS.NAVIGATE, 'ManageCouponsSettings');
        //
        // actions
        // scope: account details
        cannot(PERMISSION_KINDS.SET, 'FormEmailField');
        can(PERMISSION_KINDS.VIEW, 'FarmerFields');
        can(PERMISSION_KINDS.STORE, 'FarmerDetails');
        can(PERMISSION_KINDS.SET, 'PayoutSettings');
        cannot(PERMISSION_KINDS.NAVIGATE, 'DeliveryContacts');
        // scope: cooling units
        cannot(PERMISSION_KINDS.SET, 'Temperatures');
        cannot(PERMISSION_KINDS.NAVIGATE, 'CratesInfo');
        can(PERMISSION_KINDS.NAVIGATE, 'Maps');
        can(PERMISSION_KINDS.VIEW, 'CompaniesFilter');
        // scope: check-in
        cannot(PERMISSION_KINDS.VIEW, 'TemperatureAlertModal');
        cannot(PERMISSION_KINDS.VIEW, 'OperatorActions');
        // scope: customer-type
        if (hasCustomerTypeFeatureFlag) {
          cannot(PERMISSION_KINDS.VIEW, 'ContactsSharingEmail');
          cannot(PERMISSION_KINDS.VIEW, 'CompanySellerSettings');
          cannot(PERMISSION_KINDS.SET, 'MarketplaceBuyerOption');
          can(PERMISSION_KINDS.SET, 'MarketplaceListForSale');
          can(PERMISSION_KINDS.SET, 'MarketplaceEditListedCrates');
        }
        break;
      }

      default:
        break;
    }
  });
}
