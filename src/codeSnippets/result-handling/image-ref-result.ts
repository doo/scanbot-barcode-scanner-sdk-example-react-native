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

  // Autorelease executes the given block and releases native resources
  await autorelease(async () => {
    const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(config);

    if (scanningResult.status == 'OK' && scanningResult.data) {
      for (const { barcode } of scanningResult.data.items) {
        // Check if sourceImage exists
        if (barcode.sourceImage !== null) {
          // Saves the stored image at path with the given options
          const path = DocumentDirectoryPath + `/my_custom_path/my_file.jpg`;
          await barcode.sourceImage.saveImage(path, new SaveImageOptions());
          // Returns the stored image as base64.
          const base64Image = await barcode.sourceImage.encodeImage(new EncodeImageOptions());
          // Information about stored image
          const imageInfo = await barcode.sourceImage.info();
        }
      }
    }
  });
}
