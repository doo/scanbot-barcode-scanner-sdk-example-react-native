import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  deleteConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  resultMessageAlert,
  Screens,
} from '@utils';
import {
  useDetectBarcodesOnStillImage,
  useExtractImagesFromPDF,
  useLegacyBarcodeScanner,
  useLegacyBatchBarcodesScanner,
  useSingleScanning,
  useMultiScanning,
  useMultiScanningAR,
  useFindAndPickScanning,
} from '@hooks';
import {HomeItem, SupportSection} from '@components';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const onSingleScanPress = useSingleScanning();
  const onMultiScanPress = useMultiScanning();
  const onMultiScanARPress = useMultiScanningAR();
  const onFindAndPickScanPress = useFindAndPickScanning();
  const onLegacyBarcodeScannerPress = useLegacyBarcodeScanner();
  const onLegacyBatchBarcodeScannerPress = useLegacyBatchBarcodesScanner();
  const onDetectBarcodesOnImage = useDetectBarcodesOnStillImage();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();

  const onClearStorage = useCallback(() => {
    ScanbotBarcodeSDK.cleanup()
      .then(result => resultMessageAlert(result.data))
      .catch(error => errorMessageAlert(error.message));
  }, []);

  const onViewLicenseInfo = useCallback(() => {
    ScanbotBarcodeSDK.getLicenseInfo()
      .then(licenseInfo => {
        infoMessageAlert(
          `Licence is ${licenseInfo.data?.isLicenseValid === true ? 'VALID' : 'NOT VALID'} \n` +
            `Licence status: ${licenseInfo.data?.licenseStatus} \n` +
            `Expiration date: ${
              licenseInfo.data?.licenseExpirationDate
                ? new Date(licenseInfo.data.licenseExpirationDate).toLocaleDateString()
                : 'N/A'
            } \n`,
        );
      })
      .catch(error => errorMessageAlert(error.message));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.container]}>
        <View style={styles.featureContainer}>
          <Text style={styles.headerText}>Barcode Scanner</Text>
          <HomeItem title={'RTU UI Single Scanning'} onPress={onSingleScanPress} />
          <HomeItem title={'RTU UI Multi Scanning'} onPress={onMultiScanPress} />
          <HomeItem title={'RTU UI Multi AR Scanning'} onPress={onMultiScanARPress} />
          <HomeItem title={'RTU UI Find And Pick Scanning'} onPress={onFindAndPickScanPress} />
          <Text style={styles.headerText}>Other Features</Text>
          <HomeItem
            title={'Barcode Camera View ( Classic Component )'}
            onPress={() => navigation.navigate(Screens.BARCODE_CAMERA_VIEW)}
          />
          <HomeItem title={'Detect Barcodes on Image'} onPress={onDetectBarcodesOnImage} />
          <HomeItem title={'Extract images from PDF'} onPress={onExtractImagesFromPDF} />
          <HomeItem
            title={'Barcode formats'}
            onPress={() => navigation.navigate(Screens.BARCODE_FORMATS)}
          />
          <HomeItem
            title={'Barcode document formats'}
            onPress={() => navigation.navigate(Screens.BARCODE_DOCUMENTS)}
          />
          <HomeItem title={'ScanbotSDK license info'} onPress={onViewLicenseInfo} />
          <HomeItem
            title={'Cleanup SDK storage'}
            onPress={() =>
              deleteConfirmationAlert(
                'Deleting storage',
                'Are you sure you want to proceed?',
                onClearStorage,
              )
            }
          />
          <View>
            <Text style={styles.headerText}>Legacy Barcode Scanner</Text>
            <HomeItem title={'RTU UI Barcode Scanner'} onPress={onLegacyBarcodeScannerPress} />
            <HomeItem
              title={'RTU UI Batch Barcode Scanner'}
              onPress={onLegacyBatchBarcodeScannerPress}
            />
          </View>
        </View>
      </ScrollView>
      <SupportSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featureContainer: {
    flex: 1,
    padding: '4%',
  },
  headerText: {
    marginTop: '4%',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
