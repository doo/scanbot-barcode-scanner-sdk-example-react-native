import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkLicense, errorMessageAlert, PrimaryRouteNavigationProp, Screens} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';

import ScanbotBarcodeSDK, {
  autorelease,
  BarcodeScannerScreenConfiguration,
  SingleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function useSingleScanningWithImageResults() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(BarcodeDocumentFormatContext);

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
       * Instantiate a configuration object of BarcodeScannerConfiguration and
       * start the barcode scanner with the configuration
       */
      const config = new BarcodeScannerScreenConfiguration();

      // Initialize the use case for single scanning.
      config.useCase = new SingleScanningMode();

      // Enable and configure the confirmation sheet.
      config.useCase.confirmationSheetEnabled = true;
      config.useCase.sheetColor = '#FFFFFF';

      // Hide/show the barcode image.
      config.useCase.barcodeImageVisible = true;

      // Configure the barcode title of the confirmation sheet.
      config.useCase.barcodeTitle.visible = true;
      config.useCase.barcodeTitle.color = '#000000';

      // Configure the barcode subtitle of the confirmation sheet.
      config.useCase.barcodeSubtitle.visible = true;
      config.useCase.barcodeSubtitle.color = '#000000';

      // Configure the cancel button of the confirmation sheet.
      config.useCase.cancelButton.text = 'Close';
      config.useCase.cancelButton.foreground.color = '#C8193C';
      config.useCase.cancelButton.background.fillColor = '#00000000';

      // Configure the submit button of the confirmation sheet.
      config.useCase.submitButton.text = 'Submit';
      config.useCase.submitButton.foreground.color = '#FFFFFF';
      config.useCase.submitButton.background.fillColor = '#C8193C';

      // Configure other parameters, pertaining to single-scanning mode as needed.

      // Set an array of accepted barcode types.
      config.scannerConfiguration.barcodeFormats = acceptedBarcodeFormats;
      config.scannerConfiguration.extractedDocumentFormats = acceptedBarcodeDocumentFormats;

      // Specify if the scanned barcode images should be included in the result.
      config.scannerConfiguration.returnBarcodeImage = true;

      // Configure other parameters as needed.

      // An autorelease pool is mandatory only if image results are enabled.
      await autorelease(async () => {
        const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK' && result.data) {
          /**
           * When the autorelease pool finishes, images are released if they are not encoded or serialized beforehand.
           * In this case, we encode the images so they can be displayed on the next screen.
           */
          await result.data.encodeImages();

          navigation.navigate(Screens.BARCODE_RESULTS, result.data);
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
