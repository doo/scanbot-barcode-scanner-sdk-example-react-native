import ScanbotBarcodeSDK, {
  BarcodeScannerScreenConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function scanTinyBarcodes() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Enable locking the focus at the minimum possible distance.
  config.cameraConfiguration.minFocusDistanceLock = true;

  // Configure other parameters as needed.

  try {
    const barcodeScanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(config);
  } catch (e) {
    console.error(e);
  }
}
