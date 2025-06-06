import {BarcodeScannerScreenConfiguration} from 'react-native-scanbot-barcode-scanner-sdk';

function rtuUiActionBarConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Configure the action bar.

  // Hide/show the flash button.
  config.actionBar.flashButton.visible = true;

  // Configure the inactive state of the flash button.
  config.actionBar.flashButton.backgroundColor = '#0000007A';
  config.actionBar.flashButton.foregroundColor = '#FFFFFF';

  // Configure the active state of the flash button.
  config.actionBar.flashButton.activeBackgroundColor = '#FFCE5C';
  config.actionBar.flashButton.activeForegroundColor = '#000000';

  // Hide/show the zoom button.
  config.actionBar.zoomButton.visible = true;

  // Configure the inactive state of the zoom button.
  config.actionBar.zoomButton.backgroundColor = '#0000007A';
  config.actionBar.zoomButton.foregroundColor = '#FFFFFF';
  // Zoom button has no active state - it only switches between zoom levels (for configuring those please refer to camera configuring).

  // Hide/show the flip camera button.
  config.actionBar.flipCameraButton.visible = true;

  // Configure the inactive state of the flip camera button.
  config.actionBar.flipCameraButton.backgroundColor = '#0000007A';
  config.actionBar.flipCameraButton.foregroundColor = '#FFFFFF';
  // Flip camera button has no active state - it only switches between front and back camera.

  // Configure other parameters as needed.
}
