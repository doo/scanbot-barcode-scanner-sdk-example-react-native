import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {
  ActivityIndicatorContext,
  BarcodeDocumentFormatContext,
  BarcodeFormatsContext,
} from '@context';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function useDetectBarcodesOnStillImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {acceptedBarcodeDocumentFormats} = useContext(BarcodeDocumentFormatContext);
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Select an image from the Image Library
       * Return early if no image is selected or there is an issue selecting an image
       **/
      setLoading(true);
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Detect the barcodes on the selected image
       */
      const [imageFileUri] = selectedImage;

      const result = await ScanbotBarcodeSDK.detectBarcodesOnImage({
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        imageFileUri: imageFileUri,
        stripCheckDigits: true,
        gs1HandlingMode: 'NONE',
      });
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data) {
        navigation.navigate(Screens.BARCODE_RESULTS_LEGACY, result.data);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation, setLoading]);
}
