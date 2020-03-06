/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

// @ts-ignore
import React, {Fragment} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';

import ScanbotBarcodeSdk from 'react-native-scanbot-barcode-sdk';
import {BarcodeScannerConfiguration} from "react-native-scanbot-barcode-sdk/configuration";
import ScanbotStatusBarColor from './src/components/ScanbotStatusBarColor';

const LICENSE_KEY = "";

const ListSource = [
  {
    id: "1",
    label: "RTU-UI"
  }
];

function onItemClick(item) {
  startBarcodeScanner();
  console.log("what");
}

function ListItem({ item }) {
  return (
      <TouchableWithoutFeedback onPress={ () => onItemClick(item)}>
        <View>
          <Text style={styles.button}>{item.label}</Text>
        </View>
      </TouchableWithoutFeedback>
  );
}

function startBarcodeScanner() {
  ScanbotBarcodeSdk.barcodeImageGenerationType = 5;

  const config: BarcodeScannerConfiguration = {
    topBarBackgroundColor: '#ffffff',
    barcodeImageGenerationType: "FROM_VIDEO_FRAME",
    barcodeFormats: [ "AZTEC" ],
  };

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

  constructor(props) {
    super(props);
    console.log("lol1");
    ScanbotBarcodeSdk.initializeSdk({
      loggingEnabled: true,
      licenseKey: LICENSE_KEY,
    }).then(() => {
      console.log('Scanbot Barcode SDK Initialized');
    }).catch((error) => {
      console.log("Initialization error: ", error)

    });
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <ScanbotStatusBarColor backgroundColor="#c8193c" barStyle="light-content"/>
          <Text style={styles.title}>REACT NATIVE EXAMPLE</Text>
          <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>

              <FlatList
                  data={ListSource}
                  renderItem={({ item }) => <ListItem item={item}/>}
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
    // marginTop: 32,
    paddingHorizontal: 24,
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
    height: 30,
    fontSize: 18,
    fontWeight: '500',
    color: "#007AFF"
  }
});

export default App;
