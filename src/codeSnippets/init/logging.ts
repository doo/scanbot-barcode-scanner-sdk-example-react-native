import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function logging() {
  const config: ScanbotBarcodeSdkConfiguration = {
    licenseKey: '',
    loggingEnabled: true,
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result);
  } catch (error: any) {
    console.error(error);
  }
}
