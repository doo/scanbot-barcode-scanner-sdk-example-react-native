import { launchImageLibrary } from 'react-native-image-picker';
import { errorMessageAlert } from './Alerts';
import { errorCodes, isErrorWithCode, pick, types } from '@react-native-documents/picker';

/**
 * Select single or multiple images form the Image Library.
 *
 * @return {Promise<string[]|undefined>} An array of image URI if the operation is successful or undefined otherwise
 */

export async function selectImageFromLibrary(): Promise<string | undefined> {
  const imageResponse = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 1,
  });

  if (imageResponse.didCancel || !imageResponse.assets) {
    return undefined;
  }

  const imageUri =
    imageResponse.assets.length > 0 && imageResponse.assets.every(image => image.uri !== undefined);

  if (!imageUri) {
    errorMessageAlert('Error picking image from gallery!');
    return undefined;
  } else {
    return imageResponse.assets[0].uri as string;
  }
}

/**
 * Select a local PDF file and retrieve the file's URI.
 * @return {Promise<string|undefined>} URI of the selected PDF if the operation is successful or undefined otherwise
 */

export async function selectPDFFileUri(): Promise<string | undefined> {
  try {
    const [pdfFile] = await pick({
      mode: 'import',
      type: types.pdf,
      allowedExtensions: false,
      allowMultiSelection: false,
    });

    return pdfFile.uri;
  } catch (e) {
    if (isErrorWithCode(e)) {
      switch (e.code) {
        case errorCodes.UNABLE_TO_OPEN_FILE_TYPE: {
          errorMessageAlert('Unable to open file');
          break;
        }
        case errorCodes.IN_PROGRESS: {
          errorMessageAlert(e.message);
          break;
        }
      }
    }

    return undefined;
  }
}
