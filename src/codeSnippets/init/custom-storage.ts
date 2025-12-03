import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

const config: ScanbotBarcodeSdkConfiguration = {
  storageBaseDirectory: 'file:///some/custom/storage-dir/',
};

const result = await ScanbotBarcodeSDK.initializeSdk(config);
