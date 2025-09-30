declare module 'react-native-fs' {
  export const DocumentDirectoryPath: string;
  export const ExternalStorageDirectoryPath: string;
  export function exists(path: string): Promise<boolean>;
  export function writeFile(
    path: string,
    data: string,
    encoding?: 'utf8' | 'base64'
  ): Promise<void>;
  export function unlink(path: string): Promise<void>;
  export function downloadFile(
    url: string,
    destPath: string,
    headers?: Record<string, string>
  ): Promise<{ status?: number }>;
  const _default: {
    DocumentDirectoryPath: string;
    ExternalStorageDirectoryPath: string;
    exists(path: string): Promise<boolean>;
    writeFile(path: string, data: string, encoding?: 'utf8' | 'base64'): Promise<void>;
    unlink(path: string): Promise<void>;
    downloadFile(
      url: string,
      destPath: string,
      headers?: Record<string, string>
    ): Promise<{ status?: number }>;
  };
  export default _default;
}
