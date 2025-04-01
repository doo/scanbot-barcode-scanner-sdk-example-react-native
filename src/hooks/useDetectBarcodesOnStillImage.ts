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

import ScanbotBarcodeSDK, {
  BarcodeFormatCode128Configuration,
  BarcodeFormatCommonConfiguration,
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

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

      const scannerConfiguration = new BarcodeScannerConfiguration();
      scannerConfiguration.extractedDocumentFormats = acceptedBarcodeDocumentFormats;

      const barcodeFormatCommonConfiguration = new BarcodeFormatCommonConfiguration();
      barcodeFormatCommonConfiguration.formats = acceptedBarcodeFormats;
      barcodeFormatCommonConfiguration.stripCheckDigits = true;
      barcodeFormatCommonConfiguration.minimumTextLength = 5;

      // Configure different parameters for specific barcode format.
      const barcodeFormatCode128Configuration = new BarcodeFormatCode128Configuration();
      barcodeFormatCode128Configuration.minimumTextLength = 10;

      scannerConfiguration.barcodeFormatConfigurations = [
        barcodeFormatCommonConfiguration,
        barcodeFormatCode128Configuration,
      ];

      // Configure other parameters as needed.

      const result = await ScanbotBarcodeSDK.detectBarcodesOnImage({
        imageFileUri: imageFileUri,
        configuration: scannerConfiguration,
      });
      /**
       * Handle the result if result status is OK
       */
      if (result.success) {
        navigation.navigate(Screens.BARCODE_RESULTS, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation, setLoading]);
}
