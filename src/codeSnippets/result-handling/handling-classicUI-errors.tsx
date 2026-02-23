import React, { useCallback } from 'react';
import { View } from 'react-native';

import {
  BarcodeItem,
  ComponentUnavailableError,
  InvalidLicenseError,
  ProcessError,
  SBError,
  ScanbotBarcodeCameraView,
  UnknownError,
} from 'react-native-scanbot-barcode-scanner-sdk';

function ScanbotBarcodeScanner() {
  // Callback to handle barcode scanner results
  const onBarcodeScannerResult = useCallback((barcodeItems: BarcodeItem[]) => {
    console.log(barcodeItems);
  }, []);

  const onError = useCallback((error: any) => {
    // Handling errors using instanceof checks
    if (error instanceof SBError) {
      if (error instanceof UnknownError) {
        // An unknown or unexpected error occurred.
      } else if (error instanceof InvalidLicenseError) {
        // The SDK license is invalid or license requirements are not satisfied.
      } else if (error instanceof ComponentUnavailableError) {
        // A required SDK component is unavailable or not properly initialized.
      } else if (error instanceof ProcessError) {
        // A processing error occurred with additional context in error.code.
      }
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScanbotBarcodeCameraView onBarcodeScannerResult={onBarcodeScannerResult} onError={onError} />
    </View>
  );
}
