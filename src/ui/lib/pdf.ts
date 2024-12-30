import {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  unlink,
  writeFile,
} from '@dr.pogodin/react-native-fs';
import { Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Share from 'react-native-share';

const IS_ANDROID = Platform.OS === 'android';
const IS_ANDROID_PERMISSION_REQUIRED = Number(Platform.Version) < 33;

const BASE_PATH = IS_ANDROID ? `${ExternalStorageDirectoryPath}/Download` : DocumentDirectoryPath;

export async function savePDF(html: string, fileName: string): Promise<void> {
  if (IS_ANDROID && IS_ANDROID_PERMISSION_REQUIRED) {
    const outcome = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (outcome !== RESULTS.GRANTED) {
      throw new Error('DENIED "WRITE_EXTERNAL_STORAGE" PERMISSION');
    }
  }

  const result = await RNHTMLtoPDF.convert({ html, base64: true });
  if (!result.base64) {
    throw new Error('Failed to convert HTML to PDF');
  }

  const timestamp = new Date().getTime();
  const filePath = `${BASE_PATH}/${fileName.toLowerCase()}_${timestamp}.pdf`;
  await writeFile(filePath, result.base64, 'base64');

  async function _deleteTempFile(): Promise<void> {
    await unlink(filePath);
  }

  if (!IS_ANDROID) {
    try {
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
      });
      await _deleteTempFile();
    } catch (exception) {
      if (exception instanceof Error) {
        if (exception.message === 'User did not share') {
          return await _deleteTempFile();
        }
      }
      throw exception; // let it bubble up
    }
  }
}
