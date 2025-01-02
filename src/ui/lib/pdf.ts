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

import { dateFmt } from '#i18n/utils';

const IS_ANDROID = Platform.OS === 'android';
const IS_ANDROID_PERMISSION_REQUIRED = Number(Platform.Version) < 33;

const BASE_PATH = IS_ANDROID ? `${ExternalStorageDirectoryPath}/Download` : DocumentDirectoryPath;

/**
 * Note on Android MediaStore Caching:
 *
 * Android's MediaStore keeps a cache of file metadata that can persist
 * even after files are deleted. This creates two issues:
 *
 * 1. The cache may not update immediately when files are deleted
 *    through Android File Manager
 *
 * 2. This can lead to "file already exists" errors when saving new
 *    files with the same name as previously deleted ones
 *
 * The cache will only refresh after the app is fully terminated and
 * restarted.
 */
function _buildPDFFilePath(fileName: string) {
  const creationDate = dateFmt(new Date().toISOString(), 'dMyy_kms');
  return `${BASE_PATH}/${fileName.toLowerCase()}-${creationDate}.pdf`;
}

export async function savePDF(html: string, fileName: string): Promise<void> {
  if (IS_ANDROID && IS_ANDROID_PERMISSION_REQUIRED) {
    const outcome = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (outcome !== RESULTS.GRANTED) {
      throw new Error('Permission to write PDF to external storage was denied');
    }
  }

  const result = await RNHTMLtoPDF.convert({ html, base64: true });
  if (!result.base64) throw new Error('Failed to convert HTML to PDF');

  const filePath = _buildPDFFilePath(fileName);
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
