import { PermissionsAndroid, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  writeFile,
} from '@dr.pogodin/react-native-fs';

const IS_ANDROID = Platform.OS === 'android';
const BASE_PATH = IS_ANDROID ? `${ExternalStorageDirectoryPath}/Download` : DocumentDirectoryPath;

export async function savePDF(html: string, fileName: string): Promise<void> {
  if (IS_ANDROID) {
    const outcome = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (outcome === PermissionsAndroid.RESULTS.DENIED) {
      throw new Error('DENIED "WRITE_EXTERNAL_STORAGE" PERMISSION');
    }
  }

  const result = await RNHTMLtoPDF.convert({ html, base64: true });
  if (!result.base64) {
    throw new Error('Failed to convert HTML to PDF');
  }

  await writeFile(`${BASE_PATH}/${fileName.toLowerCase()}.pdf`, result.base64, 'base64');
}
