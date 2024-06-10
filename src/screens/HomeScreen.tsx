import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  resultMessageAlert,
  Screens,
} from '@utils';
import {
  useBarcodeScanner,
  useBatchBarcodesScanner,
  useDetectBarcodesOnStillImage,
  useExtractImagesFromPDF,
} from '@hooks';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';
import {HomeItem} from '@components';
import {SupportSection} from '@components';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const onBarcodeScannerPress = useBarcodeScanner();
  const onBatchBarcodeScannerPress = useBatchBarcodesScanner();
  const onDetectBarcodeOnImage = useDetectBarcodesOnStillImage();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();

  const onClearStorage = useCallback(() => {
    ScanbotBarcodeSDK.cleanup()
      .then(result => resultMessageAlert(result.data!!))
      .catch(error => errorMessageAlert(error.message));
  }, []);

  const onViewLicenseInfo = useCallback(() => {
    ScanbotBarcodeSDK.getLicenseInfo()
      .then(result =>
        infoMessageAlert(
          `Licence valid: ${result.data?.isLicenseValid} \n` +
            `Licence status: ${result.data?.licenseStatus} \n` +
            `Expiration date: ${
              result.data && result.data.licenseExpirationDate
                ? new Date(
                    parseInt(String(result.data.licenseExpirationDate), 10),
                  ).toLocaleDateString()
                : ''
            } \n`,
        ),
      )
      .catch(error => errorMessageAlert(error.message));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.container]}>
        <View style={styles.featureContainer}>
          <HomeItem
            title={'RTU UI Barcode Scanner'}
            onPress={onBarcodeScannerPress}
          />
          <HomeItem
            title={'RTU UI Batch Barcode Scanner'}
            onPress={onBatchBarcodeScannerPress}
          />
          <HomeItem
            title={'Barcode Camera View ( Classic Component )'}
            onPress={() => navigation.navigate(Screens.BARCODE_CAMERA_VIEW)}
          />
          <HomeItem
            title={'Detect Barcode on Image'}
            onPress={onDetectBarcodeOnImage}
          />
          <HomeItem
            title={'Extract images from PDF'}
            onPress={onExtractImagesFromPDF}
          />
          <HomeItem
            title={'Set barcode types'}
            onPress={() => navigation.navigate(Screens.BARCODE_FORMATS)}
          />
          <HomeItem
            title={'Set barcode document types'}
            onPress={() => navigation.navigate(Screens.BARCODE_DOCUMENTS)}
          />
          <HomeItem
            title={'ScanbotSDK license info'}
            onPress={onViewLicenseInfo}
          />
          <HomeItem
            title={'Clear image storage'}
            onPress={() => deleteAllConfirmationAlert(onClearStorage)}
          />
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
});
