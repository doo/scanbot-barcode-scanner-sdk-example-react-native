import React, {useCallback, useEffect, useState} from 'react';
import {
  BarcodeResultField,
  ScanbotBarcodeCameraView,
  ScanbotBarcodeCameraViewConfiguration,
  BarcodeScannerResult,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../theme';

export function BarcodeCameraViewScreen() {
  const [config, setConfig] = useState<ScanbotBarcodeCameraViewConfiguration>({
    flashEnabled: false,
    barcodeFormats: [],
    finderBackgroundColor: '#ff0000',
  });
  const [lastDetectedBarcode, setLastDetectedBarcode] = useState('');

  useEffect(() => {
    return () => {
      console.log('IZLAZI');
    };
  }, []);

  const toggleFinderView = useCallback(() => {
    setConfig({...config, shouldUseFinderView: !config.shouldUseFinderView});
  }, [config]);

  const toggleFlashLight = useCallback(() => {
    setConfig({...config, flashEnabled: !config.flashEnabled});
  }, [config]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScanbotBarcodeCameraView
          style={styles.cameraView}
          configuration={config}
          onBarcodeScannerResult={(result: BarcodeScannerResult) => {
            console.log(result);
            if (result.barcodes && result.barcodes.length > 0) {
              const count = result.barcodes.length;
              const optionalText = count > 4 ? `\n(and ${count - 4} more)` : '';
              const text = result.barcodes
                .map(
                  (barcode: BarcodeResultField) =>
                    `${barcode.textWithExtension} (${barcode.type})`,
                )
                .join('\n');
              setLastDetectedBarcode(text + optionalText);
            }
          }}
        />
        <View style={styles.resultsView}>
          <Text style={styles.resultsViewHeader}>Results</Text>
          <Text style={styles.resultsText}>{lastDetectedBarcode}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={toggleFinderView}>
              <Image source={require('../assets/ic_finder_view.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={toggleFlashLight}>
              <Image
                source={
                  config.flashEnabled
                    ? require('../assets/ic_flash_on.png')
                    : require('../assets/ic_flash_off.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    flexDirection: 'column',
  },

  overlayView: {
    borderRadius: 16,
    margin: 24,
    backgroundColor: 'white',
    opacity: 0.5,
  },

  overlayText: {
    fontSize: 16,
    padding: 16,
  },

  buttonsContainer: {
    borderRadius: 12,
    margin: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  button: {
    backgroundColor: COLORS.SCANBOT_RED,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 1,
    marginVertical: 8,
  },

  buttonsText: {
    color: 'white',
  },

  containerView: {
    width: '100%',
    height: '100%',
  },

  resultsView: {
    flex: 1,
    backgroundColor: COLORS.SCANBOT_RED,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    alignContent: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // marginTop: -RESULT_VIEW_VERTICAL_OFFSET,
    marginBottom: -36,
  },

  resultsViewHeader: {
    margin: 24,
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },

  resultsText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
