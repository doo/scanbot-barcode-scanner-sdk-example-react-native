import { BarcodeScannerScreenConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

function rtuUiViewfinderConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Enable locking the focus at the minimum possible distance.
  config.cameraConfiguration.minFocusDistanceLock = true;

  // Configure other parameters as needed.
}
