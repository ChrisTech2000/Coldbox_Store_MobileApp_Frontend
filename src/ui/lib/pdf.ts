import {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  unlink,
  writeFile,
  exists,
} from '@dr.pogodin/react-native-fs';
import { Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Share from 'react-native-share';

const IS_ANDROID = Platform.OS === 'android';
const IS_ANDROID_PERMISSION_REQUIRED = Number(Platform.Version) < 33;

const BASE_PATH = IS_ANDROID ? `${ExternalStorageDirectoryPath}/Download` : DocumentDirectoryPath;
const RETRY_COUNT = 100; // prevent infinite loop

export async function savePDF(html: string, fileName: string): Promise<void> {
  if (IS_ANDROID && IS_ANDROID_PERMISSION_REQUIRED) {
    const outcome = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (outcome !== RESULTS.GRANTED) {
      throw new Error('Permission to write PDF to external storage was denied');
    }
  }

  const result = await RNHTMLtoPDF.convert({ html, base64: true });
  if (!result.base64) throw new Error('Failed to convert HTML to PDF');

  let filePath = `${BASE_PATH}/${fileName.toLowerCase()}.pdf`;

  let fileExists = await exists(filePath);
  let retryCount = 0;
  while (fileExists && retryCount < RETRY_COUNT) {
    retryCount++;
    filePath = `${BASE_PATH}/${fileName.toLowerCase()}(${retryCount}).pdf`;
    fileExists = await exists(filePath);
  }

  if (retryCount >= RETRY_COUNT) throw new Error('Unable to create unique file path');

  await writeFile(filePath, result.base64, 'base64');

  async function _deleteTempFile(): Promise<void> {
    const fileStillExists = await exists(filePath);
    if (fileStillExists) await unlink(filePath);
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
