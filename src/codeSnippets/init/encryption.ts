import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

const config: ScanbotBarcodeSdkConfiguration = {
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
  fileEncryptionMode: 'AES256',
};

const result = await ScanbotBarcodeSDK.initializeSdk(config);
