import {
  AspectRatio,
  BarcodeScannerScreenConfiguration,
  FinderCorneredStyle,
} from 'react-native-scanbot-barcode-scanner-sdk';

function rtuUiViewfinderConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Show the view finder
  config.viewFinder.visible = true;
  // Set the aspect ratio of the view finder
  config.viewFinder.aspectRatio = new AspectRatio({ width: 16.0, height: 9.0 });
  config.viewFinder.style = new FinderCorneredStyle({
    // Set the color of the view finder corners
    strokeColor: '#ff0005',
    // Set the width of the view finder corners
    strokeWidth: 10.0,
  });

  // Configure other parameters as needed.
}
