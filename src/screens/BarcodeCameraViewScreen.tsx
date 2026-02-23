import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarcodeCameraViewResult } from '@components';

import {
  BarcodeItem,
  SBError,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function BarcodeCameraViewScreen() {
  const [lastDetectedBarcode, setLastDetectedBarcode] = useState('');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [finderEnabled, setFinderEnabled] = useState(false);

  const onBarcodeScan = useCallback((result: BarcodeItem[]) => {
    if (result.length > 0) {
      const text = result.map(barcode => `${barcode.text} (${barcode.format})`).join('\n');
      setLastDetectedBarcode(text);
    }
  }, []);

  const onError = useCallback((error: SBError) => {
    console.error(error.type, error.message);
  }, []);

  return (
    <View style={styles.container}>
      <ScanbotBarcodeCameraView
        style={styles.cameraViewContainer}
        finderConfig={{
          viewFinderEnabled: finderEnabled,
          overlayColor: '#000000A9',
        }}
        flashEnabled={flashEnabled}
        onBarcodeScannerResult={onBarcodeScan}
        onError={onError}
      />
      <BarcodeCameraViewResult
        style={styles.resultContainer}
        lastDetectedBarcode={lastDetectedBarcode}
        flashEnabled={flashEnabled}
        onFinderToggle={() => setFinderEnabled(!finderEnabled)}
        onFlashToggle={() => setFlashEnabled(!flashEnabled)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraViewContainer: {
    justifyContent: 'flex-end',
  },
  resultContainer: {
    flex: 0.75,
  },
});
