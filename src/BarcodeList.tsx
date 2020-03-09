// @ts-ignore
import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View, Switch, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {BarcodeFormats} from "react-native-scanbot-barcode-sdk/enum";

class BarcodeFormat {
    id: string;
    name: string;
    isAccepted: boolean;

    constructor(id: string, name: string, isAccepted: boolean) {
        this.id = id;
        this.name = name;
        this.isAccepted = isAccepted;
    }
}

const barcodeFormats = [];

class BarcodeList extends Component {

    state = {
        listKeys: []
    };

    constructor(props) {
        super(props);

        if (barcodeFormats.length == 0) {
            const list = BarcodeFormats.List();

            for (let i = 0; i < list.length; i++) {
                const id = "" + i;
                const name = list[i];
                barcodeFormats.push(new BarcodeFormat(id, name, true));
            }
        }

        this.state = {
            listKeys: barcodeFormats
        }
    }

    setSwitchValue = (val, ind) => {
        const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
        tempData[ind].isAccepted = val;
        barcodeFormats[ind].isAccepted = val;
        this.setState({ listKeys: tempData });
    };

    listItem = ({item, index}) => (
        <TouchableWithoutFeedback onPress={()=>{}}>
            <View style={styles.listItemContainer}>
                <Text style={styles.item}>{item.name}</Text>
                <Switch
                    onValueChange={(value) => this.setSwitchValue(value, index)}
                    value={item.isAccepted}
                />
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.listKeys}
                    keyExtractor={item => item.id}
                    renderItem={this.listItem}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        height: "80%"
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        padding: 10,
        fontSize: 16,
        height: 44,
    },
});

export default BarcodeList;
