/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert, Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet, Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import Overlay from 'react-native-modal-overlay';

import ScanbotBarcodeSdk from 'react-native-scanbot-barcode-sdk';
import {BarcodeScannerConfiguration} from "react-native-scanbot-barcode-sdk/configuration";

import ScanbotStatusBarColor from './src/components/ScanbotStatusBarColor';
import ImagePicker from 'react-native-image-picker';
import BarcodeList from './src/BarcodeList'

const LICENSE_KEY = "";

const ListSource = [
  {
    id: "1", label: "RTU-UI",
    action: async function(context) {

      if (!await checkLicense()) {
        return;
      }
      startBarcodeScanner(false);
    }
  },
  {
    id: "2", label: "RTU-UI With Image",
    action: async function(context) {

      if (!await checkLicense()) {
        return;
      }
      startBarcodeScanner(true);
    }
  },
  {
    id: "3", label: "Pick image from Gallery",
    action: async function(context) {
      const response = await new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary({}, resolve);
      });

      if (!await checkLicense()) {
        return;
      }
      if (response.didCancel) {
        console.log('Image picker canceled');
        return;
      } else if (response.error) {
        setError('ImagePicker Error: ' + response.error);
        return;
      }
      const detectOptions = {
        storeImages: true,
        uri: response.uri,
      };

      const barcodeResult = await ScanbotBarcodeSdk.detectBarcodesOnImage(
          detectOptions,
      );
    }
  },
  {
    id: "4", label: "Set accepted barcode types",
    action: async function(context) {
      context.setState({ barcodeModalVisible: true});
    }
  },
  {
    id: "5", label: "View license info",
    action: async function(context) {

      if (!await checkLicense()) {
        return;
      }
      const result = await ScanbotBarcodeSdk.getLicenseInfo();
      alert("License info", JSON.stringify(result));
    }
  },
  {
    id: "6", label: "Clear image storage",
    action: async function(context) {

      if (!await checkLicense()) {
        return;
      }
      const result = await ScanbotBarcodeSdk.cleanup();
      alert("Operation result", JSON.stringify(result));
    }
  }
];

async function checkLicense() {
  const info = await ScanbotBarcodeSdk.getLicenseInfo();
  if (!info.isLicenseValid) {
    const message = "Your license is corrupted or expired, Scanbot features are disabled";
    alert("Invalid license", message);
  }
  return info.isLicenseValid;
}

function onItemClick(context, item) {
  item.action(context);
}

function ListItem({ context, item }) {
  return (
      <TouchableWithoutFeedback onPress={ () => onItemClick(context, item)}>
        <View>
          <Text style={styles.button}>{item.label}</Text>
        </View>
      </TouchableWithoutFeedback>
  );
}

function startBarcodeScanner(withImage: boolean) {

  ScanbotBarcodeSdk.barcodeImageGenerationType = 5;

  const config: BarcodeScannerConfiguration = {
    topBarBackgroundColor: "#c8193c",
    barcodeFormats: [ "AZTEC" ],
  };

  if (withImage) {
    config.barcodeImageGenerationType = "FROM_VIDEO_FRAME";
  }

  ScanbotBarcodeSdk.startBarcodeScanner(config)
      .then(result => {
        if (result.status === 'OK') {
          console.log(`${result.barcodes.length} barcode(s) found`);
          console.log(JSON.stringify(result));
        } else {
          console.log('Scanner canceled');
        }
      })
      .catch(error => {
        console.log("error");
      });
}

export class App extends React.Component {

  state = {
    barcodeModalVisible: false
  };

  constructor(props) {
    super(props);

    ScanbotBarcodeSdk.initializeSdk({
      loggingEnabled: true,
      licenseKey: LICENSE_KEY,
    }).then(() => {
      console.log('Scanbot Barcode SDK Initialized');
    }).catch((error) => {
      console.log("Initialization error: ", error)
    });
  }

  onClose = () => this.setState({ barcodeModalVisible: false});

  render() {
    return (
        <View style={{ flex: 1 }}>
          <ScanbotStatusBarColor backgroundColor="#c8193c" barStyle="light-content"/>
          <Text style={styles.title}>REACT NATIVE EXAMPLE</Text>
          <Overlay visible={this.state.barcodeModalVisible} style={styles.overlay} onClose={this.onClose} closeOnTouchOutside>
            <Text style={styles.subtitle}>ACCEPTED BARCODE TYPES</Text>

            <BarcodeList/>
            <Button title={"SAVE"} style={styles.overlaySaveButton} onPress={this.onClose}/>
          </Overlay>
          <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>

              <FlatList
                  data={ListSource}
                  renderItem={({item}) => <ListItem context={this} item={item}/>}
                  keyExtractor={item => item.id}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#c8193c",
    height: 60,
    lineHeight: 70
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: "center",
    marginBottom: 10,
    height: 50,
    lineHeight: 50,
    alignSelf: "stretch"
  },
  scrollView: {

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    textAlign: "center",
    width: "100%",
    height: 50,
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '500',
    color: "#007AFF"
  },

  overlay: {
    maxHeight: "90% !important"
  },

  overlaySaveButton: {
    borderTopColor: "#c8193c"
  }
});

function alert(title: string, body: string) {
    Alert.alert(title, body, [ {text: 'OK', onPress: () => console.log('OK Pressed')} ]);
}

export default App;
