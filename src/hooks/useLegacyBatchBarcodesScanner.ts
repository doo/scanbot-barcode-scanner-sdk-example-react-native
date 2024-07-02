import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';
import {checkLicense, errorMessageAlert, PrimaryRouteNavigationProp, Screens} from '@utils';

import ScanbotBarcodeSDK, {
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function useLegacyBatchBarcodesScanner() {
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
       * Create the batch barcode scanner configuration object and
       * start the batch barcode scanner with the configuration
       */
      const config: BatchBarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 2, height: 1},
        useButtonsAllCaps: false,
      };
      const result = await ScanbotBarcodeSDK.startBatchBarcodeScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data) {
        navigation.navigate(Screens.BARCODE_RESULTS_LEGACY, result.data);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
