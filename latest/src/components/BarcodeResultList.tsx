import React, {Component} from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CachedBarcodeResult, {CachedBarcode} from '../model/CachedBarcodeResult';
import {ByteArrayUtils} from '../utils/ByteArrayUtils';

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    height: '100%',
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
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listSeparator: {
    borderBottomColor: '#c2c2c2',
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  smallTextBold: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
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

  listItem = ({item}: {item: CachedBarcode}) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.verticalContainer}>
        <View style={styles.listItemContainer}>
          <View style={styles.listItemTextContainer}>
            <Text style={styles.smallTextBold}>{item.type}</Text>
            <Text style={styles.smallText}>{item.textWithExtension}</Text>
            <Text style={styles.smallTextBold}>rawBytes:</Text>
            <Text style={styles.smallText}>
              {ByteArrayUtils.toString(item.rawBytes)}
            </Text>
          </View>
        </View>
        <View style={styles.listSeparator} />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={styles.container}>
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
