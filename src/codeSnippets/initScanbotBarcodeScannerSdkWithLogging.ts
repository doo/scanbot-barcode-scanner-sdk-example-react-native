/* eslint @typescript-eslint/no-unused-vars: 0 */

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

async function initScanbotBarcodeScannerSdkWithLogging() {
  const config = {
    licenseKey: '',
    loggingEnabled: true,
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}
