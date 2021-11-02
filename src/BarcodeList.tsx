// @ts-ignore
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Switch, TouchableWithoutFeedback } from 'react-native';
import BarcodeType from './model/BarcodeType';
import BarcodeTypes from './model/BarcodeTypes';

class BarcodeList extends Component {
  state = {
    listKeys: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      listKeys: BarcodeTypes.list,
    };
  }

  setSwitchValue = (val, ind) => {
    const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
    tempData[ind].isAccepted = val;
    BarcodeTypes.list[ind].isAccepted = val;
    this.setState({ listKeys: tempData });
  };

  listItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItemContainer}>
        <Text style={styles.item}>{item.name}</Text>
        <Switch
          onValueChange={value => this.setSwitchValue(value, index)}
          value={item.isAccepted}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.listKeys}
          keyExtractor={item => item.id}
          renderItem={this.listItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    height: '85%',
    width: '100%',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
});

export default BarcodeList;
