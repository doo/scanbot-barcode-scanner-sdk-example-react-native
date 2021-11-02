import React from 'react';
import { FlatList, StyleSheet, Text, View, Switch, TouchableWithoutFeedback } from 'react-native';
import BarcodeTypes from './model/BarcodeTypes';
import BarcodeType from './model/BarcodeType';

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

interface ListItemParameters {
  item: BarcodeType;
  index: number;
}
class BarcodeList extends React.Component {
  state = {
    listKeys: [],
  };

  constructor(props: any) {
    super(props);

    this.state = {
      listKeys: BarcodeTypes.list,
    };
  }

  setSwitchValue = (val: boolean, ind: number) => {
    const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
    tempData[ind].isAccepted = val;
    BarcodeTypes.list[ind].isAccepted = val;
    this.setState({ listKeys: tempData });
  };

  listItem = ({ item, index }: ListItemParameters) => (
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

export default BarcodeList;
