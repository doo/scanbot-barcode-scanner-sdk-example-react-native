import React from 'react';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';
import BarcodeTypesSettings from './src/model/BarcodeTypesSettings';
import Utils from './src/utils/Utils';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/utils/Navigation';
import { HomeScreen } from './src/pages/HomeScreen';
import { Styles } from './src/model/Styles';
import { BarcodeCameraViewScreen } from './src/pages/BarcodeCameraViewScreen';
import { BarcodeResultsListScreen } from './src/pages/BarcodeResultsListScreen';
import { BarcodeTypesScreen } from './src/pages/BarcodeTypesScreen';

const Stack = createStackNavigator();

/**
 * TODO Add the license key here.
 * Please note: Scanbot Barcode Scanner SDK will run without a license key for one minute per session!
 * After the trial period has expired all SDK features as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
 * the app identifier "io.scanbot.example.sdk.barcode.reactnative" of this example app.
 */
const LICENSE_KEY = '';

export class App extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);

    if (BarcodeTypesSettings.list.length == 0) {
      BarcodeTypesSettings.initialize();
    }

    ScanbotBarcodeSDK.initializeSdk({
      // Consider switching logging OFF in production builds for security and performance reasons!
      loggingEnabled: true,
      licenseKey: LICENSE_KEY,
      // Optional storage path. See the method description!
      storageBaseDirectory: Utils.getCustomStoragePath(),
    })
      .then(() => {
        console.log('Scanbot Barcode SDK Initialized');
      })
      .catch(error => {
        console.log('Initialization error: ', error);
      });
  }

  render() {
    const sharedHeaderProps = {
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        shadowColor: 'transparent',
      },
    };

    return (
      <NavigationContainer theme={Styles.ScanbotTheme}>
        <Stack.Navigator initialRouteName={Navigation.HOME}>
          <Stack.Screen name={Navigation.HOME} component={HomeScreen} />
          <Stack.Screen
            name={Navigation.BARCODE_RESULTS}
            component={BarcodeResultsListScreen}
            options={{
              headerBackTitleVisible: false,
              title: 'Barcode Results',
              ...sharedHeaderProps,
            }}
          />
          <Stack.Screen
            name={Navigation.BARCODE_CAMERA_VIEW}
            component={BarcodeCameraViewScreen}
            options={{
              headerBackTitleVisible: false,
              title: 'Barcode Camera View',
              ...sharedHeaderProps,
            }}
          />
          <Stack.Screen
            name={Navigation.BARCODE_TYPES}
            component={BarcodeTypesScreen}
            options={{
              headerBackTitleVisible: false,
              title: 'Barcode Types',
              ...sharedHeaderProps,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
