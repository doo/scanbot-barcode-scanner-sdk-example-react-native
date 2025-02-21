import {
  BarcodeMappedData,
  BarcodeScannerConfiguration,
  SingleScanningMode,
} from 'react-native-scanbot-barcode-scanner-sdk/ui_v2';

function rtuUiV2MappingItemConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  config.useCase = new SingleScanningMode();

  config.useCase.barcodeInfoMapping.barcodeItemMapper = (barcodeItem, onResult, onError) => {
    /** TODO: process scan result as needed to get your mapped data,
     * e.g. query your server to get product image, title and subtitle.
     * 
     * Note: The built-in fetch API won't work properly in this case.
     * To request from the server, please use XMLHttpRequest API or another 3rd party library such as axios.
     * 
     * See example below.
     */
    const title = `Some product ${barcodeItem.textWithExtension}`;
    const subtitle = barcodeItem.type ?? 'Unknown';

    // If image from URL is used, on Android platform INTERNET permission is required.
    const image = 'https://avatars.githubusercontent.com/u/1454920';
    // To show captured barcode image use BarcodeMappedData.barcodeImageKey
    // const image = BarcodeMappedData.barcodeImageKey;

    /** Call onError() in case of error during obtaining mapped data. */
    if (barcodeItem.textWithExtension === 'Error occurred!') {
      onError();
    } else {
      onResult(
        new BarcodeMappedData({
          title: title,
          subtitle: subtitle,
          barcodeImage: image,
        }),
      );
    }
  };

  // Configure other parameters as needed.
}
