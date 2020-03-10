// @ts-ignore
import React, {Component} from "react";
import {FlatList, StyleSheet, Switch, Text, TouchableWithoutFeedback, View} from "react-native";
import BarcodeResult from './model/BarcodeResult'

class BarcodeResultList extends Component {

    state = {
        listKeys: []
    };

    constructor(props) {
        super(props);

        console.log("BarcodeResults.list in BarcodeResultList:", JSON.stringify(BarcodeResult.list));
    }
    listItem = ({item, index}) => (
        <TouchableWithoutFeedback onPress={()=>{}}>
            <View style={styles.listItemContainer}>
                <Text style={styles.item}>{item.text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={BarcodeResult.list}
                    keyExtractor={item => item.text}
                    renderItem={this.listItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        height: "85%",
        width: "100%"
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

export default BarcodeResultList;
