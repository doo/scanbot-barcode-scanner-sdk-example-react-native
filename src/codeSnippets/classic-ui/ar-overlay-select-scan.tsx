import React, { useRef, useState } from 'react';
import {
  BarcodeItem,
  BarcodeItemOverlayViewConfig,
  BarcodeScannerConfiguration,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  const selectedBarcodes = useRef<BarcodeItem[]>([]);
  const [barcodeScannerConfiguration] = useState(
    new BarcodeScannerConfiguration({
      optimizedForOverlays: true,
    }),
  );

  return (
    <ScanbotBarcodeCameraView
      barcodeScannerConfiguration={barcodeScannerConfiguration}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
      onBarcodeTap={selectedBarcode => {
        selectedBarcodes.current = [...selectedBarcodes.current, selectedBarcode];
      }}
      selectionOverlayConfig={{
        overlayEnabled: true,
        barcodeItemOverlayViewBinder: (
          barcodeItem: BarcodeItem,
        ): Promise<BarcodeItemOverlayViewConfig> | BarcodeItemOverlayViewConfig => {
          const selected = selectedBarcodes.current.some(s => s.format === barcodeItem.format);
          const color = selected ? '#3dbb7c' : '#ff3838';

          return {
            textColor: '#FFFFFF',
            textContainerColor: color,
            strokeColor: color,
            refreshRate: 500,
          };
        },
      }}
    />
  );
}
