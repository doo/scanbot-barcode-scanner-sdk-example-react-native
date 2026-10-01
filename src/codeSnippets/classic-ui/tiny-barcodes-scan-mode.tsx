import React, { useState } from 'react';
import {
  BarcodeItem,
  BarcodeScannerConfiguration,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export default function BarcodeScanner() {
  const [barcodeScannerConfiguration] = useState(
    new BarcodeScannerConfiguration({
      engineMode: 'NEXT_GEN_FAR_DISTANCE',
    }),
  );

  return (
    <ScanbotBarcodeCameraView
      finderConfig={{
        viewFinderEnabled: true,
      }}
      cameraConfig={{
        minFocusDistanceLock: true,
      }}
      barcodeScannerConfiguration={barcodeScannerConfiguration}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
