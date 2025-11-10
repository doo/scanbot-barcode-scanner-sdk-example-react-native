import React from 'react';
import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  return (
    <ScanbotBarcodeCameraView
      cameraConfig={{
        minFocusDistanceLock: true,
      }}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
