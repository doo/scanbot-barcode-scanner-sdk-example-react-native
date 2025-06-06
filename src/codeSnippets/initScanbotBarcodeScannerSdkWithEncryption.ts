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
    console.log(result);
  } catch (error: any) {
    console.error(error);
  }
}
