import ScanbotBarcodeSDK, {
  BarcodeScannerScreenConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function handleScanningResult() {
  // Start the barcode RTU UI with default configuration
  const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(
    new BarcodeScannerScreenConfiguration(),
  );

  // Check if the status returned is ok and that the data is present
  if (scanningResult.status == 'OK' && scanningResult.data) {
    // Loop through the scanned barcode items and extract the desired barcode data
    const requiredBarcodeInfo = scanningResult.data.items.map(({ barcode }) => ({
      format: barcode.format, // The format of the scanned barcode
      textValue: barcode.text, // The value of the barcode represented as a string
      rawValue: barcode.rawBytes, // The raw value of the barcode
      document: barcode.extractedDocument, // The embedded barcode document
    }));

    return requiredBarcodeInfo;
  }
}
