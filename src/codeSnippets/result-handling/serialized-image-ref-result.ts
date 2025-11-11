import ScanbotBarcodeSDK, {
  autorelease,
  BarcodeScannerScreenConfiguration,
  BarcodeScannerUiResult,
  DeepPartial,
  EncodeImageOptions,
  SaveImageOptions,
} from 'react-native-scanbot-barcode-scanner-sdk';
import { DocumentDirectoryPath } from 'react-native-fs';

async function handleScanningResultWithSerializedImageRef() {
  // Start the barcode RTU UI with a configuration that returns image results
  const config = new BarcodeScannerScreenConfiguration();
  config.scannerConfiguration.returnBarcodeImage = true;
  const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(config);

  let serializedResult: DeepPartial<BarcodeScannerUiResult>;

  await autorelease(async () => {
    if (scanningResult.status == 'OK' && scanningResult.data) {
      // Serialized the scanned result in order to move the data outside the autorelease block
      serializedResult = await scanningResult.data.serialize();
    }
  });

  // In another part of the app utilize the serialized result
  await autorelease(() => {
    const barcodeResult = new BarcodeScannerUiResult(serializedResult);
    // Continue working with ImageRefs
    barcodeResult.items.forEach(async ({ barcode }) => {
      if (barcode.sourceImage) {
        // Saves the stored image at path with the given options
        const path = DocumentDirectoryPath + '/my_custom_path/my_file.jpg';
        await barcode.sourceImage.saveImage(path, new SaveImageOptions());
        // Returns the stored image as base64.
        const base64Image = await barcode.sourceImage.encodeImage(new EncodeImageOptions());
      }
    });
  });
}
