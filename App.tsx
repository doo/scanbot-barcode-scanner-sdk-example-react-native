import React from 'react';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Styles} from './src/model/Styles.ts';
import {Navigation} from './src/utils/Navigation.ts';
import {HomeScreen} from './src/pages/HomeScreen.tsx';
import {BarcodeResultsListScreen} from './src/pages/BarcodeResultsListScreen.tsx';
import {ImageResultsListScreen} from './src/pages/ImageResultsListScreen.tsx';
import {BarcodeCameraViewScreen} from './src/pages/BarcodeCameraViewScreen.tsx';
import {BarcodeTypesScreen} from './src/pages/BarcodeTypesScreen.tsx';

const Stack = createNativeStackNavigator();

/**
 * TODO Add the license key here.
 * Please note: Scanbot Barcode Scanner SDK will run without a license key for one minute per session!
 * After the trial period has expired all SDK features as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
 * the app identifier "io.scanbot.example.sdk.barcode.reactnative" of this example app.
 */
const LICENSE_KEY = '';

export default function App() {
  ScanbotBarcodeSDK.initializeSdk({
    // Consider switching logging OFF in production builds for security and performance reasons!
    loggingEnabled: true,
    enableNativeLogging: false,
    licenseKey: LICENSE_KEY,
    // Optional storage path. See the method description!
    // storageBaseDirectory: Utils.getCustomStoragePath(),
  })
    .then(result => {
      console.log(result.data);
    })
    .catch(error => {
      console.log('Initialization error: ', error.message);
    });

  console.log(
    `Using ${
      (global as any)?.nativeFabricUIManager
        ? 'New Architecture'
        : 'Old Architecture'
    }`,
  );

  return (
    <NavigationContainer theme={Styles.ScanbotTheme}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
        initialRouteName={Navigation.HOME}>
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
          }}
          name={Navigation.HOME}
          component={HomeScreen}
        />
        <Stack.Screen
          name={Navigation.BARCODE_RESULTS}
          component={BarcodeResultsListScreen}
          options={{
            title: 'Barcode Results',
          }}
        />
        <Stack.Screen
          name={Navigation.IMAGE_RESULTS}
          component={ImageResultsListScreen}
          options={{
            title: 'Image Results',
          }}
        />
        <Stack.Screen
          name={Navigation.BARCODE_CAMERA_VIEW}
          component={BarcodeCameraViewScreen}
          options={{
            title: 'Barcode Camera View',
          }}
        />
        <Stack.Screen
          name={Navigation.BARCODE_TYPES}
          component={BarcodeTypesScreen}
          options={{
            title: 'Barcode Types',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
