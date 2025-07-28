import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarcodeDocumentFormatField, BarcodeFieldRow } from '@components';
import { BarcodeResultsScreenRouteProp } from '@utils';
import { COLORS } from '@theme';
import { PreviewImage } from '../components/PreviewImage.tsx';
import {
  BarcodeItem,
  BarcodeScannerResult,
  BarcodeScannerUiResult,
} from 'react-native-scanbot-barcode-scanner-sdk';

type ResultsListItem = {
  barcode: BarcodeItem;
  count: number;
};

function BarcodeItemResult({ item, index }: { item: ResultsListItem; index: number }) {
  const dimen = useWindowDimensions();

  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.titleText}>{`Result ${index + 1}`}</Text>
      <View>
        {item.barcode.sourceImage && (
          <PreviewImage
            style={[{ width: dimen.width, height: dimen.height / 3 }, { objectFit: 'contain' }]}
            imageSource={`data:image/jpeg;base64,${item.barcode.sourceImage.buffer}`}
          />
        )}
        <BarcodeFieldRow title={'Count:'} value={item.count} />
        <BarcodeFieldRow title={'Format:'} value={item.barcode.format} />
        <BarcodeFieldRow title={'Text:'} value={item.barcode.text} />
        <BarcodeFieldRow title={'Extension:'} value={item.barcode.upcEanExtension} />
        <BarcodeFieldRow title={'Raw bytes:'} value={item.barcode.rawBytes} />
      </View>
      {item.barcode.extractedDocument && (
        <BarcodeDocumentFormatField document={item.barcode.extractedDocument} />
      )}
    </View>
  );
}

export function BarcodeResultsScreen() {
  const { params } = useRoute<BarcodeResultsScreenRouteProp>();

  const results: ResultsListItem[] = useMemo(() => {
    if (params instanceof BarcodeScannerUiResult) {
      return params.items.map(item => ({
        barcode: item.barcode,
        count: item.count,
      }));
    } else if (params instanceof BarcodeScannerResult) {
      return params.barcodes.map(item => ({
        barcode: item,
        count: 1,
      }));
    } else {
      return [];
    }
  }, [params]);

  if (results.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noBarcode}>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.barcode.format}${index}`}
        renderItem={({ item, index }) => {
          return <BarcodeItemResult item={item} index={index} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderBottomColor: COLORS.SCANBOT_RED,
    borderBottomWidth: 4,
  },
  noBarcode: {
    top: '50%',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
    margin: 10,
    flex: 3,
  },
});
