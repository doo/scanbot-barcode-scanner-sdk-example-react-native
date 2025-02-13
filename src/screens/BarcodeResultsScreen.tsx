import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BarcodeDocumentFormatField, BarcodeFieldRow} from '@components';
import {BarcodeItemResultContainer, BarcodeResultsScreenRouteProp} from '@utils';
import {COLORS} from '@theme';
import {PreviewImage} from '../components/PreviewImage.tsx';

function BarcodeItemResult({item, index}: {item: BarcodeItemResultContainer; index: number}) {
  const dimen = useWindowDimensions();

  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.titleText}>{`Result ${index + 1}`}</Text>
      <View>
        <BarcodeFieldRow title={'Format:'} value={item.format} />
        <BarcodeFieldRow title={'Text:'} value={item.text} />
        <BarcodeFieldRow title={'Extension:'} value={item.upcEanExtension} />
        <BarcodeFieldRow title={'Raw bytes:'} value={`${item.rawBytes}`} />
        {item.base64!! && (
          <PreviewImage
            style={[{width: dimen.width, height: dimen.height / 2}, {resizeMode: 'contain'}]}
            imageSource={`data:image/jpeg;base64,${item.base64}`}
          />
        )}
      </View>
      {item.extractedDocument && <BarcodeDocumentFormatField document={item.extractedDocument} />}
    </View>
  );
}

export function BarcodeResultsScreen() {
  const {params} = useRoute<BarcodeResultsScreenRouteProp>();

  if (!params || params.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noBarcode}>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={params}
        keyExtractor={(item, index) => `${item.format}${index}`}
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
