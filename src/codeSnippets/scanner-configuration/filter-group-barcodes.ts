import {
  BarcodeFormatCommonConfiguration,
  BarcodeFormats,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function filterGroupBarcodes() {
  const baseConfig = new BarcodeFormatCommonConfiguration({
    regexFilter: '',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    gs1Handling: 'PARSE',
    strictMode: true,
    formats: BarcodeFormats.common,
    addAdditionalQuietZone: false,
  });
}
