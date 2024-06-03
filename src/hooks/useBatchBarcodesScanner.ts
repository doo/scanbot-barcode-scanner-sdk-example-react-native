import {useCallback, useContext} from 'react';
import ScanbotBarcodeSDK, {
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp} from '../utils/Navigation.ts';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '../context';
import {checkLicense} from '../utils/SDKUtils.ts';
import {logBarcodeDocument} from '../utils/BarcodeUtils.ts';
import {errorMessageAlert} from '../utils/Alerts.ts';

export function useBatchBarcodesScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

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
      if (
        result.status === 'OK' &&
        result.data &&
        result.data.barcodes &&
        result.data.barcodes.length > 0
      ) {
        result.data.barcodes.forEach(barcodeItem =>
          logBarcodeDocument(barcodeItem),
        );
        // navigation.navigate(Screens.BARCODE_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats]);
}
