import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BarcodeDocumentFormatField, BarcodeFieldRow} from '@components';
import {BarcodeResultsScreenRouteProp} from '@utils';
import {COLORS} from '@theme';

import {BarcodeItem} from 'react-native-scanbot-barcode-scanner-sdk/ui_v2';

function BarcodeItemResult({item, index}: {item: BarcodeItem; index: number}) {
  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.titleText}>{`Result ${index + 1}`}</Text>
      <View>
        <BarcodeFieldRow title={'Type:'} value={item.type as string} />
        <BarcodeFieldRow title={'Count:'} value={item.count} />
        <BarcodeFieldRow title={'Text:'} value={item.text} />
        <BarcodeFieldRow title={'With extension:'} value={item.textWithExtension} />
        <BarcodeFieldRow title={'Raw bytes:'} value={`${item.rawBytes}`} />
      </View>
      {item.parsedDocument && <BarcodeDocumentFormatField document={item.parsedDocument} />}
    </View>
  );
}

export function BarcodeV2ResultsScreen() {
  const {params} = useRoute<BarcodeResultsScreenRouteProp>();

  if (!params.items || params.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noBarcode}>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={params.items}
        keyExtractor={(item, index) => `${item.type}${index}`}
        renderItem={({item, index}) => <BarcodeItemResult item={item} index={index} />}
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
