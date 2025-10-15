declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_API_BASE_URL?: string;
    AIR_PROD_BASE_URL?: string;
    MAPBOX_ACCESS_TOKEN?: string;
    IMPACT_BACKUP_BASE_URL?: string;
    FARMER_IMPACT_BASE_URL?: string;
    KNOWLEDGE_HUB_URL?: string;
    YOUR_VCCA_PDF_LINK?: string;
    SENTRY_DSN?: string;
    ENVIRONMENT?: string;
    DEEP_LINK_DOMAIN?: string;
    RECAPTCHA_ENABLED?: string;
    RECAPTCHA_SITE_KEY?: string;
    RECAPTCHA_BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
