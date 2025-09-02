import { BarcodeScannerScreenConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

function rtuUiPaletteConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Simply alter one color and keep the other default.
  config.palette.sbColorPrimary = 'c86e19';

  // ... or set an entirely new palette.
  config.palette.sbColorPrimary = '#C8193C';
  config.palette.sbColorPrimaryDisabled = '#F5F5F5';
  config.palette.sbColorNegative = '#FF3737';
  config.palette.sbColorPositive = '#4EFFB4';
  config.palette.sbColorWarning = '#FFCE5C';
  config.palette.sbColorSecondary = '#FFEDEE';
  config.palette.sbColorSecondaryDisabled = '#F5F5F5';
  config.palette.sbColorOnPrimary = '#FFFFFF';
  config.palette.sbColorOnSecondary = '#C8193C';
  config.palette.sbColorSurface = '#FFFFFF';
  config.palette.sbColorOutline = '#EFEFEF';
  config.palette.sbColorOnSurfaceVariant = '#707070';
  config.palette.sbColorOnSurface = '#000000';
  config.palette.sbColorSurfaceLow = '#00000026';
  config.palette.sbColorSurfaceHigh = '#0000007A';
  config.palette.sbColorModalOverlay = '#000000A3';
}
