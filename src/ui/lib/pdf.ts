import { PermissionsAndroid, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  unlink,
  writeFile,
} from '@dr.pogodin/react-native-fs';
import Share from 'react-native-share';

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

  const filePath = `${BASE_PATH}/${fileName.toLowerCase()}.pdf`;
  await writeFile(filePath, result.base64, 'base64');

  if (!IS_ANDROID) {
    await Share.open({
      url: `file://${filePath}`,
      type: 'application/pdf',
    });
    await unlink(filePath);
  }
}
