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
  useFindAndPickScanning,
  useMultiScanning,
  useMultiScanningAR,
  useSingleScanning,
} from '@hooks';
import {FeatureHeader, FeatureItem, ScanbotLearnMore} from '@components';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const onSingleScanPress = useSingleScanning();
  const onMultiScanPress = useMultiScanning();
  const onMultiScanARPress = useMultiScanningAR();
  const onFindAndPickScanPress = useFindAndPickScanning();
  const onDetectBarcodesOnImage = useDetectBarcodesOnStillImage();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();

  const onClearStorage = useCallback(() => {
    deleteConfirmationAlert('Deleting storage', 'Are you sure you want to proceed?', () => {
      ScanbotBarcodeSDK.cleanup()
        .then(result => resultMessageAlert(result.data))
        .catch(error => errorMessageAlert(error.message));
    });
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
          <FeatureHeader title={'Barcode Scanner'} />
          <FeatureItem title={'RTU UI Single Scanning'} onPress={onSingleScanPress} />
          <FeatureItem title={'RTU UI Multi Scanning'} onPress={onMultiScanPress} />
          <FeatureItem title={'RTU UI Multi AR Scanning'} onPress={onMultiScanARPress} />
          <FeatureItem title={'RTU UI Find And Pick Scanning'} onPress={onFindAndPickScanPress} />

          <FeatureHeader title={'Barcode Formats'} />
          <FeatureItem
            title={'Barcode formats'}
            onPress={() => navigation.navigate(Screens.BARCODE_FORMATS)}
          />
          <FeatureItem
            title={'Barcode document formats'}
            onPress={() => navigation.navigate(Screens.BARCODE_DOCUMENTS)}
          />

          <FeatureHeader title={'Other Features'} />
          <FeatureItem
            title={'Barcode Camera View ( Classic Component )'}
            onPress={() => navigation.navigate(Screens.BARCODE_CAMERA_VIEW)}
          />
          <FeatureItem title={'Recognize Barcodes on Image'} onPress={onDetectBarcodesOnImage} />
          <FeatureItem title={'Extract images from PDF'} onPress={onExtractImagesFromPDF} />

          <FeatureHeader title={'MISCELLANEOUS'} />
          <FeatureItem title={'ScanbotSDK license info'} onPress={onViewLicenseInfo} />
          <FeatureItem title={'Cleanup SDK storage'} onPress={onClearStorage} />
          <ScanbotLearnMore />
        </View>
      </ScrollView>
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
      </Text>
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
  copyrightLabel: {
    textAlign: 'center',
    lineHeight: 40,
    width: '100%',
    height: 40,
    color: 'gray',
    fontSize: 12,
  },
});
