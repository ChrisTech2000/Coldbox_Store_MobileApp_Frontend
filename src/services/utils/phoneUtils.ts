import { isValidPhoneNumber, parsePhoneNumber, type CountryCode } from 'libphonenumber-js';

/**
 * Validates a phone number, accepting local numbers by using the company's country code.
 * E.g. "08111111111" is valid when country is "NG".
 */
export function isValidPhone(value: string, country?: string): boolean {
    return isValidPhoneNumber(value, (country as CountryCode) || undefined);
}

/**
 * Normalizes a phone number to E.164 format using the company's country code.
 * E.g. "08111111111" with country "NG" → "+2348111111111"
 * Returns the original value if parsing fails.
 */
export function normalizePhone(value: string, country?: string): string {
    try {
        const parsed = parsePhoneNumber(value, (country as CountryCode) || undefined);
        if (parsed) {
            return parsed.format('E.164');
        }
    } catch {
        // If parsing fails, return as-is and let the backend handle it
    }
    return value;
}
