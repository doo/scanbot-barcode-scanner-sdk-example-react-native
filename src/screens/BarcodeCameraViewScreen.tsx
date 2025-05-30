import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, useWindowDimensions, View} from 'react-native';

import {
  BarcodeScannerResult,
  ScanbotBarcodeCameraView,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function BarcodeCameraViewScreen() {
  const dimen = useWindowDimensions();

  const onBarcodeScan = useCallback((result: BarcodeScannerResult) => {
    if (result.barcodes && result.barcodes.length > 0) {
      const text = result.barcodes
        .map(barcode => `${barcode.textWithExtension} (${barcode.type})`)
        .join('\n');
      console.log(text);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScanbotBarcodeCameraView
        style={{
          width: dimen.width,
          height: dimen.width,
        }}
        onBarcodeScannerResult={onBarcodeScan}
      />
      <View style={{flex: 1}} />
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
});
