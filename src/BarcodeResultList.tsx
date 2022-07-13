import React, { Component } from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  ImageSourcePropType,
} from 'react-native';

import CachedBarcodeResult, { CachedBarcode } from './model/CachedBarcodeResult';

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    height: '85%',
    width: '100%',
  },
  snappedImage: {
    marginBottom: 10,
    backgroundColor: '#DCDCDC',
    width: '100%',
    height: '30%',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  smallTextBold: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  smallText: {
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  image: {
    padding: 5,
    height: 50,
    width: 50,
  },
});

class BarcodeResultList extends Component {
  state = {
    listKeys: [],
  };

  listItem = ({ item }: { item: CachedBarcode }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItemContainer}>
        <Image
          style={styles.image}
          source={
            CachedBarcodeResult.imageUri !== undefined
              ? { uri: 'file://' + CachedBarcodeResult.imageUri, scale: 1 }
              : (undefined as unknown as ImageSourcePropType)
          }
        />
        <View style={styles.listItemTextContainer}>
          <Text style={styles.smallTextBold}>{item.type}</Text>
          <Text style={styles.smallText}>{item.textWithExtension}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={styles.container}>
        {CachedBarcodeResult.imageUri ? (
          <Image
            style={styles.snappedImage}
            source={{ uri: CachedBarcodeResult.imageUri, scale: 1 }}
          />
        ) : null}
        <FlatList
          data={CachedBarcodeResult.list}
          keyExtractor={item => item.id}
          renderItem={this.listItem}
        />
      </View>
    );
  }
}

export default BarcodeResultList;
