import {
  BarcodeScannerConfiguration,
  startBarcodeScanner,
} from 'react-native-scanbot-barcode-scanner-sdk/ui_v2';

async function statRtuUiV2WithDefaultConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // See further customization configs...

  const result = await startBarcodeScanner(config);
}
