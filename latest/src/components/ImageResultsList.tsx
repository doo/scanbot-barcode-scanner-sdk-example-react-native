import React, {Component} from 'react';

import {
  FlatList,
  StyleSheet,
  Image,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    height: '100%',
    width: '100%',
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
  image: {
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#DCDCDC',
    margin: 16,
  },
});

class ImageResultsList extends Component {

  static imageUrls: string[]

  imageItem = ({item} : {item: string}) => (
      <View style={styles.verticalContainer}>
        <Image style={styles.image} source={{uri: item, scale: 1}} />
        <View style={styles.listSeparator} />
      </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={ImageResultsList.imageUrls}
          renderItem={this.imageItem}
        />
      </View>
    );
  }
}

export default ImageResultsList;
