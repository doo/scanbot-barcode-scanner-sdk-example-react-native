/* eslint @typescript-eslint/no-unused-vars: 0 */

import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function initScanbotBarcodeScannerSdkWithCustomStorage() {
  const config: ScanbotBarcodeSdkConfiguration = {
    storageBaseDirectory: 'file:///some/custom/storage-dir/',
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}
