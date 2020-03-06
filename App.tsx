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
  StatusBar, FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ScanbotBarcodeSdk, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-sdk';

const LICENSE_KEY = "";

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
    console.log("asdf");
    // const formats = Object.keys(BarcodeFormat);
    // console.log(formats);
  }

  render() {
    return (
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Text>asdf</Text>
            {/*<ScrollView*/}
            {/*    contentInsetAdjustmentBehavior="automatic"*/}
            {/*    style={styles.scrollView}>*/}
            {/*  <Text style={styles.title}>REACT-NATIVE INTERNAL DEV APP</Text>*/}
            {/*  <Text style={styles.subtitle}>DOCUMENT SCANNER</Text>*/}
            {/*  <FlatList*/}
            {/*      data={Model.DocumentScannerItems}*/}
            {/*      renderItem={({ item }) => <ListItem item={item}/>}*/}
            {/*      keyExtractor={item => item.id}*/}
            {/*  />*/}
            {/*  <Text style={styles.subtitle}>DATA DETECTORS</Text>*/}
            {/*  <FlatList*/}
            {/*      data={Model.DataDetectorItems}*/}
            {/*      renderItem={({ item }) => <ListItem item={item}/>}*/}
            {/*      keyExtractor={item => item.id}*/}
            {/*  />*/}
            {/*</ScrollView>*/}
          </SafeAreaView>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
