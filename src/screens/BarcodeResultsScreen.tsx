import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BarcodeDocumentFormatField, BarcodeFieldRow} from '@components';
import {BarcodeItemResultContainer, BarcodeResultsScreenRouteProp} from '@utils';
import {COLORS} from '@theme';
import {PreviewImage} from '../components/PreviewImage.tsx';
import {BarcodeItem} from 'react-native-scanbot-barcode-scanner-sdk';

type ResultsListItem = {
  barcode: BarcodeItem;
  count: number;
  image?: string | undefined;
};

function BarcodeItemResult({item, index}: {item: ResultsListItem; index: number}) {
  const dimen = useWindowDimensions();

  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.titleText}>{`Result ${index + 1}`}</Text>
      <View>
        {item.image && (
          <PreviewImage
            style={[{width: dimen.width, height: dimen.height / 2}, {resizeMode: 'contain'}]}
            imageSource={`data:image/jpeg;base64,${item.image}`}
          />
        )}
        <BarcodeFieldRow title={'Count:'} value={item.count} />
        <BarcodeFieldRow title={'Format:'} value={item.barcode.format} />
        <BarcodeFieldRow title={'Text:'} value={item.barcode.text} />
        <BarcodeFieldRow title={'Extension:'} value={item.barcode.upcEanExtension} />
        <BarcodeFieldRow title={'Raw bytes:'} value={`${item.barcode.rawBytes}`} />
      </View>
      {item.barcode.extractedDocument && (
        <BarcodeDocumentFormatField document={item.barcode.extractedDocument} />
      )}
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

  const resultsList = params.map((resultContainer: BarcodeItemResultContainer) => {
    /**
     * Note: Creating a barcode item that contains the sourceImage
     * and using this image to generate a base64 string or save it to a path need to be inside an autorelease function.
     */
    const barcodeItem = new BarcodeItem(resultContainer);

    return {
      barcode: barcodeItem,
      count: resultContainer.count, //, image: await barcodeItem.sourceImage?.encodeImage()
    } as ResultsListItem;
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={resultsList}
        keyExtractor={(item, index) => `${item.barcode.format}${index}`}
        renderItem={({item, index}) => {
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
