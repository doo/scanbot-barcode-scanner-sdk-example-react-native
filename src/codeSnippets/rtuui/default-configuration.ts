import ScanbotBarcodeSDK, {
  BarcodeScannerScreenConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function startBarcodeScanner() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();
  // See further customization configs...

  const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
}
