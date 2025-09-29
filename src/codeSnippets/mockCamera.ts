import ScanbotBarcodeSDK, { MockCameraParams } from 'react-native-scanbot-barcode-scanner-sdk';

async function mockCamera() {
  const config: MockCameraParams = {
    imageFileUri: '{path to your image file}',
  };

  try {
    /**
     * For Android:
     *  API >= 33, READ_MEDIA_IMAGES and READ_MEDIA_VIDEO permissions are required.
     *  API < 33, READ_EXTERNAL_STORAGE permission is required.
     *  The image must have even values for both width and height.
     */
    await ScanbotBarcodeSDK.mockCamera(config);
  } catch (error: any) {
    console.error(error);
  }
}
