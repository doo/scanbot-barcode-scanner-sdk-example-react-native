import ScanbotBarcodeSDK, {
  ScanbotBarcodeSdkConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function customStorage() {
  const config: ScanbotBarcodeSdkConfiguration = {
    storageBaseDirectory: 'file:///some/custom/storage-dir/',
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result);
  } catch (error: any) {
    console.error(error);
  }
}
