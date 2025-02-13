import { BarcodeScannerScreenConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

async function statRtuUiWithUserGuidanceConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Hide/unhide the user guidance.
  config.userGuidance.visible = true;

  // Configure the title.
  config.userGuidance.title.text = 'Move the finder over a barcode';
  config.userGuidance.title.color = '#FFFFFF';

  // Configure the background.
  config.userGuidance.background.fillColor = '#0000007A';

  // Configure other parameters as needed.
}
