import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { BarcodeItem, ScanbotBarcodeCameraView } from 'react-native-scanbot-barcode-scanner-sdk';
import { BarcodeCameraViewResult } from '@components';

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

  return (
    <SafeAreaView style={styles.container}>
      <ScanbotBarcodeCameraView
        style={styles.cameraViewContainer}
        finderConfig={{
          viewFinderEnabled: finderEnabled,
          overlayColor: '#000000A9',
        }}
        flashEnabled={flashEnabled}
        onBarcodeScannerResult={onBarcodeScan}
      />
      <BarcodeCameraViewResult
        style={styles.resultContainer}
        lastDetectedBarcode={lastDetectedBarcode}
        flashEnabled={flashEnabled}
        onFinderToggle={() => setFinderEnabled(!finderEnabled)}
        onFlashToggle={() => setFlashEnabled(!flashEnabled)}
      />
    </SafeAreaView>
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
