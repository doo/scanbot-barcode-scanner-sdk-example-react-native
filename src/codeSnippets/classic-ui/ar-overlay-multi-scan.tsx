import React from 'react';
import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
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
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
