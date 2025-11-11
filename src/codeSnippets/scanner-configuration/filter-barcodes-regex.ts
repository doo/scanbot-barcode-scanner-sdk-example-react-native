import {
  BarcodeFormatCommonConfiguration,
  BarcodeFormatConfigurationBase,
  BarcodeFormats,
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function filterBarcodesRegex() {
  const configs: BarcodeFormatConfigurationBase[] = [];
  const baseFormatConfig = new BarcodeFormatCommonConfiguration({
    // You can set a regex filter here to limit the barcodes that will be scanned
    // Here is an example of a regex that matches only barcodes that contain numbers from 0 to 5
    regexFilter: '\\b[0-5]+\\b',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    gs1Handling: 'PARSE',
    strictMode: true,
    formats: BarcodeFormats.common,
    addAdditionalQuietZone: false,
  });

  configs.push(baseFormatConfig);

  const barcodeScannerConfiguration = new BarcodeScannerConfiguration({
    barcodeFormatConfigurations: configs,
    engineMode: 'NEXT_GEN',
  });
}
