import * as React from 'react';
import {useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {SupportSection} from '../components/SupportSection.tsx';
import {HomeItem} from '../components/HomeItem.tsx';
import {
  useBarcodeScanner,
  useBatchBarcodesScanner,
  useDetectBarcodesOnStillImage,
  useExtractImagesFromPDF,
} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation.ts';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const onBarcodeScannerPress = useBarcodeScanner();
  const onBatchBarcodeScannerPress = useBatchBarcodesScanner();
  const onDetectBarcodeOnImage = useDetectBarcodesOnStillImage();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();

  const onClearImageStorage = useCallback(() => {
    ScanbotBarcodeSDK.cleanup();
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
            title={'Barcode Camera View'}
            onPress={() => navigation.navigate(Screens.BARCODE_CAMERA_VIEW)}
          />
          <HomeItem
            title={'Detect Barcode on Image'}
            onPress={onDetectBarcodeOnImage}
          />
          <HomeItem
            title={'Extract images From PDF'}
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
          <HomeItem title={'View license info'} onPress={() => {}} />
          <HomeItem title={'Clear image storage'} onPress={() => {}} />
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
