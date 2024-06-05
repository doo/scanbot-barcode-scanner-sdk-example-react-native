import React, {useState} from 'react';
import {
  BarcodeScannerResult,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {SafeAreaView, StyleSheet} from 'react-native';
import {BarcodeCameraViewResult} from '../components/BarcodeCameraViewResult.tsx';

export function BarcodeCameraViewScreen() {
  const [lastDetectedBarcode, setLastDetectedBarcode] = useState('');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [finderEnabled, setFinderEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScanbotBarcodeCameraView
        style={styles.cameraViewContainer}
        configuration={{
          flashEnabled: flashEnabled,
          shouldUseFinderView: finderEnabled,
          finderBackgroundColor: '#000000',
          finderBackgroundOpacity: 0.5,
        }}
        onBarcodeScannerResult={(result: BarcodeScannerResult) => {
          console.log(JSON.stringify(result));
          if (result.barcodes && result.barcodes.length > 0) {
            const text = result.barcodes
              .map(barcode => `${barcode.textWithExtension} (${barcode.type})`)
              .join('\n');
            setLastDetectedBarcode(text);
          }
        }}
      />
      <BarcodeCameraViewResult
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
    flex: 1,
  },
});
