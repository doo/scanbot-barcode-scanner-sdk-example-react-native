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
        textColor: '#FFFFFF',
        polygonColor: '#00FF00',
      }}
      barcodeScannerConfiguration={barcodeScannerConfiguration}
      onBarcodeScannerResult={(result: BarcodeItem[]) => {
        console.log(result);
      }}
    />
  );
}
