import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScanbotBarcodeSDK, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {
  checkLicense,
  errorMessageAlert,
  logBarcodeDocument,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';

export function useBarcodeScanner() {
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
       * Create the barcode scanner configuration object and
       * start the barcode scanner with the configuration
       */
      const config: BarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 1, height: 1},
        useButtonsAllCaps: false,
      };
      const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (
        result.status === 'OK' &&
        result.data &&
        result.data.barcodes &&
        result.data.barcodes?.length > 0
      ) {
        result.data.barcodes.forEach(barcodeItem =>
          logBarcodeDocument(barcodeItem),
        );
        navigation.navigate(Screens.BARCODE_RESULTS, result.data);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
