import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

async function mockCamera() {
  try {
    /**
     * For Android:
     *  API >= 33, READ_MEDIA_IMAGES and READ_MEDIA_VIDEO permissions are required.
     *  API < 33, READ_EXTERNAL_STORAGE permission is required.
     *  The image must have even values for both width and height.
     */
    await ScanbotBarcodeSDK.mockCamera({
      imageFileUri: '{path to your image file}',
    });
  } catch (error: any) {
    console.error(error);
  }
}
