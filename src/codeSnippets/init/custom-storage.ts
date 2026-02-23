import ScanbotBarcodeSDK, { SdkConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  storageBaseDirectory: 'file:///some/custom/storage-dir/',
});

const result = await ScanbotBarcodeSDK.initialize(config);
