import React from 'react';
import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  return (
    <ScanbotBarcodeCameraView
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
