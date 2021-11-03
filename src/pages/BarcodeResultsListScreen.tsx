import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import BarcodeResultList from "../BarcodeResultList";
import { BaseScreen } from "../components/BaseScreen";

export class BarcodeResultsListScreen extends BaseScreen {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
    }

    render() {
        return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <BarcodeResultList/>
            </SafeAreaView>
        </>
        );
    }
}