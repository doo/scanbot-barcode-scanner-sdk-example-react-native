import ScanbotBarcodeSDK, { SdkConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
  fileEncryptionMode: 'AES256',
});

const result = await ScanbotBarcodeSDK.initialize(config);
