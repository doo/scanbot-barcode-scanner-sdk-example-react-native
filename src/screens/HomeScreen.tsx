import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PrimaryRouteNavigationProp, Screens } from '@utils';
import {
  useCleanupStorage,
  useFindAndPickScanning,
  useLicenseInfo,
  useMultiScanning,
  useMultiScanningAR,
  useScanAndCount,
  useScanBarcodesOnImage,
  useScanBarcodesOnPDF,
  useSingleScanning,
  useSingleScanningWithImageResults,
} from '@hooks';
import { FeatureHeader, FeatureItem, ScanbotLearnMore } from '@components';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const onSingleScanPress = useSingleScanning();
  const onSingleScanWithImageResultPress = useSingleScanningWithImageResults();
  const onMultiScanPress = useMultiScanning();
  const onScanAndCountPress = useScanAndCount();
  const onMultiScanARPress = useMultiScanningAR();
  const onFindAndPickScanPress = useFindAndPickScanning();
  const onScanBarcodesOnImage = useScanBarcodesOnImage();
  const onScanBarcodesOnPDF = useScanBarcodesOnPDF();
  const onViewLicenseInfo = useLicenseInfo();
  const onClearStorage = useCleanupStorage();

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container]}>
        <View style={styles.featureContainer}>
          <FeatureHeader title={'Barcode Scanner'} />
          <FeatureItem title={'RTU UI Single Scanning'} onPress={onSingleScanPress} />
          <FeatureItem
            title={'RTU UI Single Scanning With Image Result'}
            onPress={onSingleScanWithImageResultPress}
          />
          <FeatureItem title={'RTU UI Multi Scanning'} onPress={onMultiScanPress} />
          <FeatureItem title={'RTU UI Multi AR Scanning'} onPress={onMultiScanARPress} />
          <FeatureItem title={'RTU UI Scan And Count'} onPress={onScanAndCountPress} />
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
            title={'Barcode Camera View (Classic UI)'}
            onPress={() => navigation.navigate(Screens.BARCODE_CAMERA_VIEW)}
          />
          <FeatureItem title={'Scan Barcodes on Image'} onPress={onScanBarcodesOnImage} />
          <FeatureItem title={'Scan Barcodes on PDF'} onPress={onScanBarcodesOnPDF} />

          <FeatureHeader title={'MISCELLANEOUS'} />
          <FeatureItem title={'ScanbotSDK license info'} onPress={onViewLicenseInfo} />
          <FeatureItem title={'Cleanup SDK storage'} onPress={onClearStorage} />
          <ScanbotLearnMore />
        </View>
      </ScrollView>
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} Scanbot SDK GmbH. All rights reserved.
      </Text>
    </View>
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
