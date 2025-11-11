import ScanbotBarcodeSDK, {
  autorelease,
  BarcodeScannerScreenConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function handleScanningResultWithEncodedImageRef() {
  // Start the barcode RTU UI with a configuration that returns image results
  const config = new BarcodeScannerScreenConfiguration();
  config.scannerConfiguration.returnBarcodeImage = true;
  const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(config);

  await autorelease(async () => {
    if (scanningResult.status == 'OK' && scanningResult.data) {
      // Encode all ImageRefs as base64
      await scanningResult.data.encodeImages();

      const base64Buffers = scanningResult.data.items.map(({ barcode }) => {
        // ImageRef.buffer contains the base64Representation of the image
        if (barcode.sourceImage?.buffer) {
          return barcode.sourceImage.buffer;
        }
      });
    }
  });
}
