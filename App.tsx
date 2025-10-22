import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  ActivityIndicatorContext,
  BarcodeDocumentFormatContext,
  BarcodeFormatsContext,
  useBarcodeDocumentFormats,
  useBarcodeFormats,
  useLoading,
} from '@context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, NavigationTheme } from '@theme';
import { FILE_ENCRYPTION_ENABLED, Screens, ScreenTitles } from '@utils';

import { BarcodeDocumentFormatsScreen } from './src/screens/BarcodeDocumentFormatsScreen';
import { BarcodeCameraViewScreen } from './src/screens/BarcodeCameraViewScreen';
import { BarcodeFormatsScreen } from './src/screens/BarcodeFormatsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { BarcodeResultsScreen } from './src/screens/BarcodeResultsScreen';

import ScanbotBarcodeSDK, { SdkConfiguration } from 'react-native-scanbot-barcode-scanner-sdk';

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
  const barcodeDocumentFormatsValues = useBarcodeDocumentFormats();
  const barcodeFormatsValues = useBarcodeFormats();
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    const configuration = new SdkConfiguration({
      // Consider switching logging OFF in production builds for security and performance reasons!
      loggingEnabled: true,
      enableNativeLogging: false,
      licenseKey: LICENSE_KEY,
      // Optional custom storage directory
      // storageBaseDirectory: Platform.select({
      //   ios: DocumentDirectoryPath + '/my-custom-storage',
      //   android: ExternalDirectoryPath + '/my-custom-storage',
      //   default: undefined,
      // }),
    });

    // Set the following properties to enable encryption.
    if (FILE_ENCRYPTION_ENABLED) {
      configuration.fileEncryptionMode = 'AES256';
      configuration.fileEncryptionPassword = 'SomeSecretPa$$w0rdForFileEncryption';
    }

    ScanbotBarcodeSDK.initialize(configuration)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Initialization error: ', error.message);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <BarcodeDocumentFormatContext.Provider value={barcodeDocumentFormatsValues}>
        <BarcodeFormatsContext.Provider value={barcodeFormatsValues}>
          <ActivityIndicatorContext.Provider value={{ setLoading }}>
            <NavigationContainer theme={NavigationTheme}>
              <Stack.Navigator
                screenOptions={navigation => ({
                  title: ScreenTitles[navigation.route.name as Screens],
                  headerBackTitleVisible: false,
                })}
              >
                <Stack.Screen name={Screens.HOME} component={HomeScreen} />
                <Stack.Screen name={Screens.BARCODE_FORMATS} component={BarcodeFormatsScreen} />
                <Stack.Screen
                  name={Screens.BARCODE_DOCUMENTS}
                  component={BarcodeDocumentFormatsScreen}
                />
                <Stack.Screen
                  name={Screens.BARCODE_CAMERA_VIEW}
                  component={BarcodeCameraViewScreen}
                />
                <Stack.Screen name={Screens.BARCODE_RESULTS} component={BarcodeResultsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            <ActivityIndicator
              size="large"
              color={COLORS.SCANBOT_RED}
              style={styles.loadingIndicator}
              animating={loading}
            />
          </ActivityIndicatorContext.Provider>
        </BarcodeFormatsContext.Provider>
      </BarcodeDocumentFormatContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    elevation: 6,
    position: 'absolute',
    left: '47%',
    top: '40%',
    width: '6%',
  },
});
