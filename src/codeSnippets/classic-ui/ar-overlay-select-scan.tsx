import React from 'react';
import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  return (
    <ScanbotBarcodeCameraView
      selectionOverlayConfig={{
        overlayEnabled: true,
        textColor: '#FFFFFF',
        polygonColor: '#ff0005',
      }}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
      onBarcodeTap={selectedBarcode => {
        console.log('Selected', selectedBarcode);
      }}
    />
  );
}
