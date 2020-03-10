// @ts-ignore
import React, {Component} from "react";
import {FlatList, StyleSheet, Switch, Text, Image, TouchableWithoutFeedback, View} from "react-native";
import BarcodeResult from './model/BarcodeResult'

class BarcodeResultList extends Component {

    state = {
        listKeys: []
    };

    constructor(props) {
        super(props);
    }
    listItem = ({item, index}) => (
        <TouchableWithoutFeedback onPress={()=>{}}>
            <View style={styles.listItemContainer}>
                <Image style={styles.image} source={{uri: 'file://' + item.sourceImageUri, scale:1}}/>
                <View style={styles.listItemTextContainer}>
                    <Text style={styles.smallTextBold}>{item.type}</Text>
                    <Text style={styles.smallText}>{item.text}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={BarcodeResult.list}
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
        height: "85%",
        width: "100%"
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItemTextContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    smallText: {
        padding: 5,
        fontSize: 14,
        height: 20,
        fontWeight: "400"
    },
    smallTextBold: {
        paddingLeft: 5,
        paddingBottom: 5,
        fontSize: 14,
        height: 20,
        fontWeight: "600"
    },
    image: {
        padding: 5,
        height: 50,
        width: 50
    }
});

export default BarcodeResultList;
