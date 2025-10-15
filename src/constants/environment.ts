import { Config } from 'react-native-config';

export const API_BASE_URL = `${Config.BASE_API_BASE_URL}`;
export const AIR_PROD_BASE_URL = `${Config.AIR_PROD_BASE_URL}`;
export const MAPBOX_ACCESS_TOKEN = `${Config.MAPBOX_ACCESS_TOKEN}`;
export const IMPACT_BACKUP_BASE_URL = `${Config.IMPACT_BACKUP_BASE_URL}`;
export const FARMER_IMPACT_BASE_URL = `${Config.FARMER_IMPACT_BASE_URL}`;
export const KNOWLEDGE_HUB_URL = `${Config.KNOWLEDGE_HUB_URL}`;
export const YOUR_VCCA_PDF_LINK = `${Config.YOUR_VCCA_PDF_LINK}`;
export const SENTRY_DSN = `${Config.SENTRY_DSN}`;
export const ENVIRONMENT = `${Config.ENVIRONMENT}`;
export const DEEP_LINK_DOMAIN = `${Config.DEEP_LINK_DOMAIN}`;

// reCAPTCHA Configuration
export const RECAPTCHA_ENABLED = Config.RECAPTCHA_ENABLED === 'true';
export const RECAPTCHA_SITE_KEY = `${Config.RECAPTCHA_SITE_KEY}`;
export const RECAPTCHA_BASE_URL = `${Config.RECAPTCHA_BASE_URL}`;
