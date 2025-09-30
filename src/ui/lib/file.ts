import {
  DocumentDirectoryPath,
  ExternalStorageDirectoryPath,
  unlink,
  writeFile,
  exists,
  downloadFile,
} from 'react-native-fs';
import { Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Share from 'react-native-share';

import { dateFmt } from '#i18n/utils';
import ErrorUtil, { PdfErrorType } from '#services/utils/ErrorUtil';

const IS_ANDROID = Platform.OS === 'android';
const IS_ANDROID_PERMISSION_REQUIRED = Number(Platform.Version) < 33;

const BASE_PATH = IS_ANDROID ? `${ExternalStorageDirectoryPath}/Download` : DocumentDirectoryPath;

const MIME_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  txt: 'text/plain',
  csv: 'text/csv',
} as const;

type FileExtensions = keyof typeof MIME_TYPES;

export class FileUtility {
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
  private static _buildFilePath(fileName: string, extension: FileExtensions) {
    const creationDate = dateFmt(new Date().toISOString(), 'dMyy_kms');
    return `${BASE_PATH}/${fileName.toLowerCase()}-${creationDate}.${extension}`;
  }

  private static async _deleteTempFile(filePath: string): Promise<void> {
    try {
      const fileStillExists = await exists(filePath);
      if (fileStillExists) await unlink(filePath);
    } catch {
      // silent error
    }
  }

  public static async createPdfFromHtml(html: string, fileName: string): Promise<void> {
    const filePath = FileUtility._buildFilePath(fileName, 'pdf');

    try {
      if (IS_ANDROID && IS_ANDROID_PERMISSION_REQUIRED) {
        const outcome = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (outcome !== RESULTS.GRANTED) throw new Error(PdfErrorType.PermissionsError);
      }

      const result = await RNHTMLtoPDF.convert({ html, base64: true });
      if (!result.base64) throw new Error(PdfErrorType.ConvertionError);

      await writeFile(filePath, result.base64, 'base64');

      if (!IS_ANDROID) {
        await Share.open({ url: `file://${filePath}`, type: MIME_TYPES.pdf });
        await FileUtility._deleteTempFile(filePath);
      }
    } catch (exception) {
      const customError = ErrorUtil.handlePdfErrors(exception);
      console.error(customError.toJSON());

      // use case: clear temp file if iOS user cancels the sharing options
      if (!IS_ANDROID && customError.type === PdfErrorType.GeneralError) {
        await FileUtility._deleteTempFile(filePath);
      }

      throw customError;
    }
  }

  public static async downloadFile(
    fromUrl: string,
    fileName: string,
    extension: FileExtensions
  ): Promise<void> {
    const filePath = FileUtility._buildFilePath(fileName, extension);

    try {
      if (IS_ANDROID && IS_ANDROID_PERMISSION_REQUIRED) {
        const outcome = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (outcome !== RESULTS.GRANTED) throw new Error(PdfErrorType.PermissionsError);
      }

      const result = await downloadFile(fromUrl, filePath);
      if (result.status !== 200) throw new Error(PdfErrorType.DownloadError);

      if (!IS_ANDROID) {
        await Share.open({ url: `file://${filePath}`, type: MIME_TYPES[extension] });
        await FileUtility._deleteTempFile(filePath);
      }
    } catch (exception) {
      const customError = ErrorUtil.handlePdfErrors(exception);
      console.error(customError.toJSON());

      // use case: clear temp file if iOS user cancels the sharing options
      if (!IS_ANDROID && customError.type === PdfErrorType.GeneralError) {
        await FileUtility._deleteTempFile(filePath);
      }

      throw customError;
    }
  }
}
