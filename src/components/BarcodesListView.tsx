import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Switch, TouchableWithoutFeedback } from 'react-native';
import BarcodeType from '../model/BarcodeType';
import BarcodeTypesSettings from '../model/BarcodeTypesSettings';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
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

class BarcodesListView extends Component {
  state: {
    listKeys: BarcodeType[];
  } = {
    listKeys: [],
  };

  constructor(props: Record<string, unknown>) {
    super(props);

    this.state = {
      listKeys: BarcodeTypesSettings.list,
    };
  }

  setSwitchValue = (val: boolean, ind: number) => {
    const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
    tempData[ind].isAccepted = val;
    BarcodeTypesSettings.list[ind].isAccepted = val;
    this.setState({ listKeys: tempData });
  };

  listItem = ({ item, index }: { item: BarcodeType; index: number }) => (
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.listKeys}
          keyExtractor={item => item.id}
          renderItem={this.listItem}
        />
      </View>
    );
  }
}

export default BarcodesListView;
