import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BaseScreen} from '../components/BaseScreen';

import {Styles} from '../model/Styles';

import {
  BarcodeScannerResult,
  ScanbotBarcodeCameraView,
  ScanbotBarcodeCameraViewConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';
import BarcodeTypes from '../model/BarcodeTypesSettings';
import {BarcodeResultField} from 'react-native-scanbot-barcode-scanner-sdk';
import {Colors} from '../model/Colors';

const RESULT_VIEW_VERTICAL_OFFSET = 32;

const defaultBarcodeCameraViewConfiguration: () => ScanbotBarcodeCameraViewConfiguration =
  () => ({
    shouldUseFinderView: true,
    finderAspectRatio: {
      width: 1,
      height: 1,
    },
    finderLineWidth: 4,
    finderBackgroundOpacity: 0.7,
    barcodeFormats: BarcodeTypes.getAcceptedFormats(),
    acceptedDocumentFormats: [],
    msiPlesseyChecksumAlgorithm: 'MOD_10',
    engineMode: 'NEXT_GEN',
    finderInset: {
      left: 48,
      top: 48,
      right: 48,
      bottom: 48 + RESULT_VIEW_VERTICAL_OFFSET,
    },
    finderLineColor: Colors.SCANBOT_RED,
    flashEnabled: false,
  });

export class BarcodeCameraViewScreen extends BaseScreen {
  get styles() {
    return StyleSheet.create({
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
        backgroundColor: Styles.SCANBOT_RED,
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
        backgroundColor: Styles.SCANBOT_RED,
        shadowRadius: 4,
        shadowOpacity: 0.4,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -RESULT_VIEW_VERTICAL_OFFSET,
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
  }

  state = {
    lastDetectedBarcode: '',
    barcodeCameraViewConfiguration: defaultBarcodeCameraViewConfiguration(),
    isOverlayVisible: true,
  };

  toggleFinderView() {
    const {barcodeCameraViewConfiguration} = this.state;
    const config = {...barcodeCameraViewConfiguration};
    config.shouldUseFinderView = !config.shouldUseFinderView;
    this.setState({
      barcodeCameraViewConfiguration: config,
    });
  }

  toggleFlashLight() {
    const {barcodeCameraViewConfiguration} = this.state;
    const config = {...barcodeCameraViewConfiguration};
    config.flashEnabled = !barcodeCameraViewConfiguration.flashEnabled;
    this.setState({barcodeCameraViewConfiguration: config});
  }

  render() {
    const {lastDetectedBarcode} = this.state;
    const {barcodeCameraViewConfiguration} = this.state;

    return (
      <>
        <SafeAreaView>
          <View style={this.styles.containerView}>
            <ScanbotBarcodeCameraView
              style={this.styles.cameraView}
              configuration={barcodeCameraViewConfiguration}
              onBarcodeScannerResult={(result: BarcodeScannerResult) => {
                if (result.barcodes && result.barcodes.length > 0) {
                  const count = result.barcodes.length;
                  const optionalText =
                    count > 4 ? `\n(and ${count - 4} more)` : '';
                  const text = result.barcodes
                    .map(
                      (barcode: BarcodeResultField) =>
                        `${barcode.textWithExtension} (${barcode.type})`,
                    )
                    .join('\n');
                  this.setState({
                    lastDetectedBarcode: text + optionalText,
                  });
                }
              }}
            />
            <View style={this.styles.resultsView}>
              <Text style={this.styles.resultsViewHeader}>Results</Text>
              <Text style={this.styles.resultsText}>{lastDetectedBarcode}</Text>
              <View style={this.styles.buttonsContainer}>
                <TouchableOpacity
                  style={this.styles.button}
                  activeOpacity={0.6}
                  onPress={this.toggleFinderView.bind(this)}>
                  <Image source={require('../assets/ic_finder_view.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={this.styles.button}
                  activeOpacity={0.6}
                  onPress={this.toggleFlashLight.bind(this)}>
                  <Image
                    source={
                      barcodeCameraViewConfiguration.flashEnabled
                        ? require('../assets/ic_flash_on.png')
                        : require('../assets/ic_flash_off.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
