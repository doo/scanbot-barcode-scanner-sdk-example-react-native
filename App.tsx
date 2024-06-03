import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Screens, ScreenTitles} from './src/utils/Navigation.ts';
import {
  BarcodeDocumentFormatsScreen,
  BarcodeFormatsScreen,
  HomeScreen,
} from './src/screens';
import {
  ActivityIndicatorContext,
  BarcodeDocumentFormatContext,
  BarcodeFormatsContext,
  useBarcodeDocumentFormats,
  useBarcodeFormats,
  useLoading,
} from './src/context';
import {COLORS} from './src/theme';
import {BarcodeCameraViewScreen} from './src/screens/BarcodeCameraViewScreen.tsx';

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

  const barcodeDocumentFormatsValues = useBarcodeDocumentFormats();
  const barcodeFormatsValues = useBarcodeFormats();
  const [loading, setLoading] = useLoading();

  return (
    <SafeAreaView style={styles.container}>
      <BarcodeDocumentFormatContext.Provider
        value={barcodeDocumentFormatsValues}>
        <BarcodeFormatsContext.Provider value={barcodeFormatsValues}>
          <ActivityIndicatorContext.Provider value={{setLoading}}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={navigation => ({
                  title: ScreenTitles[navigation.route.name as Screens],
                })}>
                <Stack.Screen name={Screens.HOME} component={HomeScreen} />
                <Stack.Screen
                  name={Screens.BARCODE_FORMATS}
                  component={BarcodeFormatsScreen}
                />
                <Stack.Screen
                  name={Screens.BARCODE_DOCUMENTS}
                  component={BarcodeDocumentFormatsScreen}
                />
                <Stack.Screen
                  name={Screens.BARCODE_CAMERA_VIEW}
                  component={BarcodeCameraViewScreen}
                />
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
    </SafeAreaView>
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
