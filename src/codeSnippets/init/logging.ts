import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

const config: ScanbotBarcodeSdkConfiguration = {
  licenseKey: '',
  loggingEnabled: true,
};

const result = await ScanbotBarcodeSDK.initializeSdk(config);
