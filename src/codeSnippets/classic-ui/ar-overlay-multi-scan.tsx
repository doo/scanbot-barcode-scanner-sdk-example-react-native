import React, { useState } from 'react';
import {
  BarcodeItem,
  BarcodeScannerConfiguration,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  const [barcodeScannerConfiguration] = useState(
    new BarcodeScannerConfiguration({
      optimizedForOverlays: true,
    }),
  );

  return (
    <ScanbotBarcodeCameraView
      selectionOverlayConfig={{
        overlayEnabled: true,
        textFormat: 'CODE_AND_TYPE',
        polygonColor: '#0093ff',
        textColor: '#ffffff',
        textContainerColor: '#ff0000',
        strokeColor: '#0027ff',
      }}
      barcodeScannerConfiguration={barcodeScannerConfiguration}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
