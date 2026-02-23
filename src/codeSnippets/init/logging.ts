import ScanbotBarcodeSDK, { SdkConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  loggingEnabled: true,
});

const result = await ScanbotBarcodeSDK.initialize(config);
