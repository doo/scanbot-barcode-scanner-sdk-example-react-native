import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

class Styles {

    public static ITEMS = StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: '600',
            color: Colors.white,
            textAlign: "center",
            marginBottom: 10,
            backgroundColor: "#c8193c",
            height: 60,
            lineHeight: 70
        },
        subtitle: {
            fontSize: 16,
            fontWeight: '500',
            textAlign: "center",
            marginBottom: 10,
            height: 50,
            lineHeight: 50,
            alignSelf: "stretch"
        },
        list: {
            height: "100%"
        },
        buttonContainer: {
            marginLeft: 15,
            marginRight: 15,
            borderBottomColor: 'rgb(200, 200, 200)',
            borderBottomWidth: 1
        },
        button: {
            marginLeft: 5,
            marginTop: 10,
            width: "100%",
            height: 40,
            lineHeight: 40,
            fontSize: 16,
            fontWeight: '500',
            color: "#007AFF",
        },
        overlay: {
            maxHeight: "90% !important"
        },

        overlaySaveButton: {
            borderTopColor: "#c8193c"
        }
    });

}

export default Styles;
