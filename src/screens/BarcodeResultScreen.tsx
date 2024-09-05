import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BarcodeResultsLegacyScreenRouteProp} from '@utils';
import {BarcodeDocumentFormatField, BarcodeFieldRow} from '@components';
import {COLORS} from '@theme';

import {BarcodeResultField} from 'react-native-scanbot-barcode-scanner-sdk';

function BarcodeItemResult({item, index}: {item: BarcodeResultField; index: number}) {
  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.titleText}>{`Result ${index + 1}`}</Text>
      <View>
        <BarcodeFieldRow title={'Type:'} value={item.type} />
        <BarcodeFieldRow title={'Text:'} value={item.text} />
        <BarcodeFieldRow title={'With extension:'} value={item.textWithExtension} />
        <BarcodeFieldRow
          title={'Raw bytes:'}
          value={`[ ${item.rawBytes.map(b => b.toString(10)).join(', ')} ]`}
        />
      </View>
      {item.formattedResult && <BarcodeDocumentFormatField document={item.formattedResult} />}
    </View>
  );
}

export function BarcodeResultScreen() {
  const {params} = useRoute<BarcodeResultsLegacyScreenRouteProp>();

  if (!params.barcodes || params.barcodes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noBarcode}>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={params.barcodes}
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
