import ScanbotBarcodeSDK, {
  autorelease,
  BarcodeScannerScreenConfiguration,
  EncodeImageOptions,
  SaveImageOptions,
} from 'react-native-scanbot-barcode-scanner-sdk';
import { DocumentDirectoryPath } from 'react-native-fs';

async function handleScanningResultWithImageRef() {
  // Start the barcode RTU UI with a configuration that returns image results
  const config = new BarcodeScannerScreenConfiguration();
  config.scannerConfiguration.returnBarcodeImage = true;
  const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(config);

  // Autorelease executes the given block and releases native resources
  await autorelease(() => {
    if (scanningResult.status == 'OK' && scanningResult.data) {
      scanningResult.data.items.forEach(async ({ barcode }) => {
        // Check if sourceImage exists
        if (barcode.sourceImage) {
          // Saves the stored image at path with the given options
          const path = DocumentDirectoryPath + '/my_custom_path/my_file.jpg';
          await barcode.sourceImage.saveImage(path, new SaveImageOptions());
          // Returns the stored image as base64.
          const base64Image = await barcode.sourceImage.encodeImage(new EncodeImageOptions());
          // Information about stored image
          const imageInfo = await barcode.sourceImage.info();
          // Releases the strong reference to the image manually
          barcode.sourceImage.release();
        }
      });
    }
  });
}
