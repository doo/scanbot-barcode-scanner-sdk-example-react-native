import { useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { checkLicense, errorMessageAlert, PrimaryRouteNavigationProp, Screens } from '@utils';
import { BarcodeDocumentFormatContext, BarcodeFormatsContext } from '@context';

import ScanbotBarcodeSDK, {
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function useMultiScanningAR() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const { acceptedBarcodeFormats } = useContext(BarcodeFormatsContext);
  const { acceptedBarcodeDocumentFormats } = useContext(BarcodeDocumentFormatContext);

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

      // Configure the usecase.
      config.useCase = new MultipleScanningMode();
      config.useCase.mode = 'UNIQUE';
      config.useCase.sheet.mode = 'COLLAPSED_SHEET';
      config.useCase.sheet.collapsedVisibleHeight = 'SMALL';
      // Configure AR Overlay.
      config.useCase.arOverlay.visible = true;
      config.useCase.arOverlay.automaticSelectionEnabled = false;
      // Configure other parameters, pertaining to use case as needed.

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
