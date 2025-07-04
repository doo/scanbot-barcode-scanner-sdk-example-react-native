import {
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk';

function rtuUiPreviewModeConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Initialize the use case for multiple scanning.
  config.useCase = new MultipleScanningMode();

  // Set the sheet mode for the barcodes preview.
  config.useCase.sheet.mode = 'COLLAPSED_SHEET';

  // Set the height for the collapsed sheet.
  config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

  // Configure the submit button on the sheet.
  config.useCase.sheetContent.submitButton.text = 'Submit';
  config.useCase.sheetContent.submitButton.foreground.color = '#000000';

  // Configure other parameters, pertaining to multiple-scanning mode as needed.

  // Configure other parameters as needed.
}
