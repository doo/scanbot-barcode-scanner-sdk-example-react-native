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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, FlatList, TouchableWithoutFeedback,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ScanbotBarcodeSdk, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-sdk';
import {BarcodeFormat} from "react-native-scanbot-barcode-sdk/enums";

const LICENSE_KEY = "";

const ListSource = [
  {
    id: "1",
    label: "RTU-UI"
  }
];

function onItemClick(item) {
  console.log("what");
}

function ListItem({ item }) {
  return (
      <TouchableWithoutFeedback onPress={ () => onItemClick(item)}>
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
  );
}
function startBarcodeScanner() {
  ScanbotBarcodeSdk.barcodeImageGenerationType = 5;

  const config: BarcodeScannerConfiguration = {
    topBarBackgroundColor: '#ffffff',
    barcodeImageGenerationType: 'FROM_VIDEO_FRAME',
    barcodeFormats: ['AZTEC', 'DATA_MATRIX'],
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
    // console.log("asdf");
    // const formats = Object.keys(BarcodeFormat);
    // console.log(formats);

    startBarcodeScanner();
  }

  render() {
    return (
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Text>asdf</Text>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
              <Text style={styles.title}>REACT-NATIVE INTERNAL DEV APP</Text>
              <FlatList
                  data={ListSource}
                  renderItem={({ item }) => <ListItem item={item}/>}
                  keyExtractor={item => item.id}
              />
            </ScrollView>
          </SafeAreaView>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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
});

export default App;
