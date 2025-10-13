// Configuration from environment variables
//const RECAPTCHA_ENABLED = process.env.RECAPTCHA_ENABLED === 'true';
const RECAPTCHA_ENABLED = true;
const RECAPTCHA_SITE_KEY =
  process.env.RECAPTCHA_SITE_KEY || '6Lc1mbsrAAAAAGktGNBJD85-0FrQJW2BPbHQL_xw';

export interface RecaptchaToken {
  token: string | null;
}

export interface RecaptchaComponentProps {
  onMessage: (event: { nativeEvent: { data: string } }) => void;
  siteKey: string;
  baseUrl: string;
  languageCode?: string;
}

class RecaptchaService {
  private isEnabled: boolean = RECAPTCHA_ENABLED;
  private siteKey: string = RECAPTCHA_SITE_KEY;

  /**
   * Check if reCAPTCHA is enabled
   */
  public isRecaptchaEnabled(): boolean {
    return this.isEnabled && !!this.siteKey;
  }

  /**
   * Get reCAPTCHA token - returns null if disabled
   * This method is a placeholder for backward compatibility.
   * The actual reCAPTCHA verification should happen at the component level.
   */
  public async getRecaptchaToken(): Promise<string | null> {
    if (!this.isEnabled || !this.siteKey) {
      return null;
    }

    // Return null for now - actual implementation should use the component
    console.log('[RecaptchaService] reCAPTCHA enabled but requires UI component integration');
    return null;
  }

  /**
   * Get the reCAPTCHA site key for component usage
   */
  public getSiteKey(): string {
    return this.siteKey;
  }

  /**
   * Get props for the reCAPTCHA component
   */
  public getRecaptchaProps(): RecaptchaComponentProps | null {
    if (!this.isEnabled || !this.siteKey) {
      return null;
    }

    return {
      siteKey: this.siteKey,
      baseUrl: 'http://localhost:8081', // For React Native development
      languageCode: 'en',
      onMessage: () => {}, // Will be overridden by the component
    };
  }

  /**
   * Prepare request data with optional reCAPTCHA token
   */
  public async prepareRequestWithRecaptcha<T extends Record<string, unknown>>(
    data: T
  ): Promise<T & { recaptcha_response?: string }> {
    const token = await this.getRecaptchaToken();

    if (token) {
      return {
        ...data,
        recaptcha_response: token,
      };
    }

    return data;
  }

  /**
   * Enable/disable reCAPTCHA (for testing or configuration)
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export default new RecaptchaService();
