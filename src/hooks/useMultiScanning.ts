import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkLicense, errorMessageAlert, PrimaryRouteNavigationProp, Screens} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';

import ScanbotBarcodeSDK, {
  BarcodeMappedData,
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function useMultiScanning() {
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

      // Initialize the use case for multiple scanning.
      config.useCase = new MultipleScanningMode();

      // Set the counting mode.
      config.useCase.mode = 'COUNTING';

      // Set the sheet mode for the barcodes preview.
      config.useCase.sheet.mode = 'COLLAPSED_SHEET';

      // Set the height for the collapsed sheet.
      config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

      // Enable manual count change.
      config.useCase.sheetContent.manualCountChangeEnabled = true;

      // Set the delay before same barcode counting repeat.
      config.useCase.countingRepeatDelay = 1000;

      // Configure the submit button.
      config.useCase.sheetContent.submitButton.text = 'Submit';
      config.useCase.sheetContent.submitButton.foreground.color = '#000000';

      // Implement mapping for the barcode item information
      config.useCase.barcodeInfoMapping.barcodeItemMapper = (barcodeItem, onResult, onError) => {
        /** TODO: process scan result as needed to get your mapped data,
         * e.g. query your server to get product image, title and subtitle.
         *
         * Note: The built-in fetch API won't work properly in this case.
         * To request from the server, please use XMLHttpRequest API or another 3rd party library such as axios.
         *
         * See example below.
         */
        const title = `Some product ${barcodeItem.text}`;
        const subtitle = barcodeItem.format;

        // If image from URL is used, on Android platform INTERNET permission is required.
        const image = 'https://avatars.githubusercontent.com/u/1454920';
        // To show captured barcode image use BarcodeMappedData.barcodeImageKey
        // const image = BarcodeMappedData.barcodeImageKey;

        /** Call onError() in case of error during obtaining mapped data. */
        if (barcodeItem.text === 'Error occurred!') {
          onError();
        } else {
          onResult(new BarcodeMappedData({title: title, subtitle: subtitle, barcodeImage: image}));
        }
      };

      // Configure other parameters, pertaining to multiple-scanning mode as needed.

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
