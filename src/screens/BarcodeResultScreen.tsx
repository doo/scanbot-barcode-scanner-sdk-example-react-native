import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BarcodeResultsScreenRouteProp} from '@utils';
import {BarcodeResultField} from 'react-native-scanbot-barcode-scanner-sdk';
import {COLORS} from '@theme';
import {BarcodeDocumentFormatField, BarcodeFieldRow} from '@components';

function BarcodeItem({item}: {item: BarcodeResultField}) {
  return (
    <View style={styles.barcodeContainer}>
      <View>
        <BarcodeFieldRow title={'Barcode type:'} value={item.type} />
        <BarcodeFieldRow title={'Text:'} value={item.text} />
        <BarcodeFieldRow
          title={'With extension:'}
          value={item.textWithExtension}
        />
        <BarcodeFieldRow
          title={'Raw bytes:'}
          value={`[ ${item.rawBytes.map(b => b.toString(10)).join(', ')} ]`}
        />
      </View>
      {item.parsedSuccessful && (
        <BarcodeDocumentFormatField document={item.formattedResult} />
      )}
    </View>
  );
}

export function BarcodeResultScreen() {
  const {params} = useRoute<BarcodeResultsScreenRouteProp>();

  if (!params.barcodes || params.barcodes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={params.barcodes}
        keyExtractor={(item, index) => `${item.type}${index}`}
        renderItem={({item}) => <BarcodeItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCANBOT_RED,
  },
  barcodeContainer: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#c2c2c2',
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
