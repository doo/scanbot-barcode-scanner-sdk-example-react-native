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
  autorelease,
  BarcodeFormatCode128Configuration,
  BarcodeFormatCommonConfiguration,
  BarcodeScannerConfiguration,
  EncodeImageOptions,
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

      const configuration = new BarcodeScannerConfiguration({
        extractedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormatConfigurations: [
          new BarcodeFormatCommonConfiguration({
            formats: acceptedBarcodeFormats,
            stripCheckDigits: true,
            minimumTextLength: 5,
          }),

          // Configure different parameters for specific barcode format.
          new BarcodeFormatCode128Configuration({
            minimumTextLength: 10,
          }),
        ],

        // Configure other parameters as needed.
      });

      await autorelease(async () => {
        const result = await ScanbotBarcodeSDK.detectBarcodesOnImage({
          imageFileUri: imageFileUri,
          barcodeScannerConfiguration: configuration,
        });

        const barcodeContainers = await Promise.all(
          result.barcodes.map(async item => ({
            ...item,
            base64: await item.sourceImage?.encodeImage(new EncodeImageOptions({})),
          })),
        );

        navigation.navigate(Screens.BARCODE_RESULTS, barcodeContainers);
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation, setLoading]);
}
