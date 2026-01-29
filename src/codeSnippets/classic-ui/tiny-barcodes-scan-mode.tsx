import React from 'react';
import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  return (
    <ScanbotBarcodeCameraView
      finderConfig={{
        viewFinderEnabled: true,
      }}
      cameraConfig={{
        minFocusDistanceLock: true,
      }}
      barcodeScannerConfiguration={{
        engineMode: 'NEXT_GEN_FAR_DISTANCE',
      }}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
