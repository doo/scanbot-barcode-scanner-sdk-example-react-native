import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  ActivityIndicatorContext,
  BarcodeDocumentFormatContext,
  BarcodeFormatsContext,
  useBarcodeDocumentFormats,
  useBarcodeFormats,
  useLoading,
} from '@context';
import {COLORS, NavigationTheme} from '@theme';
import {FILE_ENCRYPTION_ENABLED, Screens, ScreenTitles} from '@utils';
import {BarcodeDocumentFormatsScreen} from './src/screens/BarcodeDocumentFormatsScreen.tsx';
import {BarcodeCameraViewScreen} from './src/screens/BarcodeCameraViewScreen.tsx';
import {BarcodeFormatsScreen} from './src/screens/BarcodeFormatsScreen.tsx';
import {HomeScreen} from './src/screens/HomeScreen.tsx';
import {ImageResultsScreen} from './src/screens/ImageResultsScreen.tsx';
import {BarcodeResultScreen} from './src/screens/BarcodeResultScreen.tsx';
import {BarcodeV2ResultsScreen} from './src/screens/BarcodeV2ResultsScreen.tsx';

import ScanbotBarcodeSDK, {ScanbotBarcodeSdkConfiguration} from 'react-native-scanbot-barcode-scanner-sdk';

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
    const configuration: ScanbotBarcodeSdkConfiguration = {
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
    };

    // Set the following properties to enable encryption.
    if (FILE_ENCRYPTION_ENABLED) {
      configuration.fileEncryptionMode = 'AES256';
      configuration.fileEncryptionPassword = 'SomeSecretPa$$w0rdForFileEncryption';
    }

    ScanbotBarcodeSDK.initializeSdk(configuration)
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log('Initialization error: ', error.message);
      });

    console.log(`Using ${(global as any)?.nativeFabricUIManager ? 'New' : 'Old'} Architecture`);
  }, []);

  return (
    <View style={styles.container}>
      <BarcodeDocumentFormatContext.Provider value={barcodeDocumentFormatsValues}>
        <BarcodeFormatsContext.Provider value={barcodeFormatsValues}>
          <ActivityIndicatorContext.Provider value={{setLoading}}>
            <NavigationContainer theme={NavigationTheme}>
              <Stack.Navigator
                screenOptions={navigation => ({
                  title: ScreenTitles[navigation.route.name as Screens],
                  headerBackTitleVisible: false,
                })}>
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
                <Stack.Screen name={Screens.IMAGE_RESULTS} component={ImageResultsScreen} />
                <Stack.Screen
                  name={Screens.BARCODE_RESULTS_LEGACY}
                  component={BarcodeResultScreen}
                />
                <Stack.Screen name={Screens.BARCODE_RESULTS} component={BarcodeV2ResultsScreen} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    elevation: 6,
    position: 'absolute',
    left: '47%',
    top: '40%',
    width: '6%',
  },
});
