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
                <Image style={styles.image} source={{uri: item.imageFileUri, scale:1}}/>
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
                {
                    BarcodeResult.imageUri ?
                    <Image style={styles.snappedImage} source={{uri: BarcodeResult.imageUri, scale:1}}/> :
                    null
                }
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
    snappedImage: {
        marginBottom: 10,
        backgroundColor: "#DCDCDC",
        width: "100%",
        height: "30%"
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItemTextContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    smallTextBold: {
        paddingLeft: 5,
        paddingBottom: 5,
        fontSize: 14,
        fontWeight: "600"
    },
    smallText: {
        paddingLeft: 5,
        fontSize: 14,
        fontWeight: "400"
    },
    image: {
        padding: 5,
        height: 50,
        width: 50
    }
});

export default BarcodeResultList;
