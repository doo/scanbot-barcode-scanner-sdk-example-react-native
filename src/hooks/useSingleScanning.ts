import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkLicense, errorMessageAlert, PrimaryRouteNavigationProp, Screens} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';

import ScanbotBarcodeSDK, {
  BarcodeScannerScreenConfiguration,
  SingleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function useSingleScanning() {
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

      // Configure other parameters as needed.

      const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data) {
        navigation.navigate(Screens.BARCODE_RESULTS, result.data);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
