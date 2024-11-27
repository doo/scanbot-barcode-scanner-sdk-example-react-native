/* eslint @typescript-eslint/no-unused-vars: 0 */

import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function initScanbotBarcodeScannerSdkWithEncryption() {
  const config: ScanbotBarcodeSdkConfiguration = {
    fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
    fileEncryptionMode: 'AES256',
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}
