import {
  BarcodeItem,
  BarcodeItemOverlayViewConfig,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function BarcodeCameraViewWithOverlayViewBinder() {
  return (
    <ScanbotBarcodeCameraView
      finderConfig={{
        viewFinderEnabled: true,
        overlayColor: '#000000A9',
      }}
      selectionOverlayConfig={{
        overlayEnabled: true,
        loadingTextValue: 'Please wait...', // Optional property, useful if you query your server to check the barcode.
        barcodeItemOverlayViewBinder: (
          barcodeItem: BarcodeItem,
        ): Promise<BarcodeItemOverlayViewConfig> | BarcodeItemOverlayViewConfig => {
          /** TODO: process scan result as needed,
           * e.g. query your server to check the barcode.
           *
           * See example below.
           */
          const text = barcodeItem.format === 'DATA_MATRIX' ? 'Valid barcode' : 'Invalid barcode';
          const color = barcodeItem.format === 'DATA_MATRIX' ? '#00FF00' : '#FF0000';

          return {
            text: text,
            textColor: '#FFFFFF',
            textContainerColor: color,
            strokeColor: color,
            // Configure other parameters as needed.
          };
        },
      }}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {}}
    />
  );
}
