import {launchImageLibrary} from 'react-native-image-picker';
import {errorMessageAlert} from './Alerts';
import DocumentPicker from 'react-native-document-picker';

/**
 * Select single or multiple images form the Image Library.
 *
 * @return {Promise<string[]|undefined>} An array of image URI if the operation is successful or undefined otherwise
 */

export async function selectImageFromLibrary(): Promise<string[] | undefined> {
  const imageResponse = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 1,
  });

  if (imageResponse.didCancel || !imageResponse.assets) {
    return undefined;
  }

  const imageUri = imageResponse.assets.every(image => image.uri !== undefined);

  if (!imageUri) {
    errorMessageAlert('Error picking image from gallery!');
    return undefined;
  } else {
    return imageResponse.assets.map(image => image.uri as string);
  }
}

/**
 * Select a local PDF file and retrieve the file's URI.
 * @return {Promise<string|undefined>} URI of the selected PDF if the operation is successful or undefined otherwise
 */

export async function selectPDFFileUri(): Promise<string | undefined> {
  return DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
  })
    .then(result => result.uri)
    .catch(err => {
      if (!DocumentPicker.isCancel(err as Error & {code?: string | undefined})) {
        errorMessageAlert(err.code ?? 'Error while using the document picker');
      }
      return undefined;
    });
}
