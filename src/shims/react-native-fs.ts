import { NativeModules, Platform } from 'react-native';

interface CldtFSNativeModule {
  DocumentDirectoryPath?: string;
  ExternalStorageDirectoryPath?: string;
  exists(path: string): Promise<boolean>;
  writeFile(path: string, data: string, encoding?: string): Promise<void>;
  unlink(path: string): Promise<void>;
  downloadFile(
    url: string,
    destPath: string,
    headers?: Record<string, string>
  ): Promise<{ status?: number }>;
}

const Native: CldtFSNativeModule = NativeModules.CldtFS || {};

export const DocumentDirectoryPath: string = Native.DocumentDirectoryPath || '';
export const ExternalStorageDirectoryPath: string =
  Platform.OS === 'android' ? Native.ExternalStorageDirectoryPath || DocumentDirectoryPath : '';

export const exists = (p: string): Promise<boolean> => Native.exists(p);
export const writeFile = (p: string, data: string, enc: 'utf8' | 'base64' = 'utf8') =>
  Native.writeFile(p, data, enc);
export const unlink = (p: string) => Native.unlink(p);
export const downloadFile = (url: string, dest: string, headers?: Record<string, string>) =>
  Native.downloadFile(url, dest, headers);

// keep a default export too, if someone does `import RNFS from 'react-native-fs'`
export default {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  exists,
  writeFile,
  unlink,
  downloadFile,
};
