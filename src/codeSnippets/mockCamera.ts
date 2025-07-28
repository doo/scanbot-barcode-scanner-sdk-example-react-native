import ScanbotBarcodeSDK, { MockCameraParams } from 'react-native-scanbot-barcode-scanner-sdk';

async function mockCamera() {
  const config: MockCameraParams = {
    imageFileUri: '{path to your image file}',
  };

  try {
    /**
     * On Android, the MANAGE_EXTERNAL_STORAGE permission is required, and the image must have even values for both width and height.
     */
    await ScanbotBarcodeSDK.mockCamera(config);
  } catch (error: any) {
    console.error(error);
  }
}
