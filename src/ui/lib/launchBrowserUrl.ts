import { Linking } from 'react-native';

/**
 * Opens a URL in the device's external browser, with optional fallback URL.
 *
 * @param url URL to open
 * @param fallbackUrl Backup URL to try if main URL fails
 * @returns Promise resolving when URL opens successfully
 * @throws Error if neither URL can be opened
 */
export async function launchBrowserUrl(url: string, fallbackUrl?: string): Promise<void> {
  try {
    const urlToOpen = url.trim();
    if (!urlToOpen) {
      throw new Error('URL cannot be empty');
    }

    const canOpenMainUrl = await Linking.canOpenURL(urlToOpen);
    if (canOpenMainUrl) {
      await Linking.openURL(urlToOpen);
      return;
    }

    if (fallbackUrl) {
      const canOpenFallback = await Linking.canOpenURL(fallbackUrl);
      if (canOpenFallback) {
        await Linking.openURL(fallbackUrl);
        return;
      }
      throw new Error(`Cannot open URL or fallback: ${urlToOpen}, ${fallbackUrl}`);
    }

    throw new Error(`Cannot open URL: ${urlToOpen}`);
  } catch (exception) {
    const errorMessage = exception instanceof Error ? exception.message : 'Unknown error';
    throw new Error(`Failed to launch browser URL: ${errorMessage}`);
  }
}
