import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import BarcodesListView from '../components/BarcodesListView';
import { BaseScreen } from '../components/BaseScreen';

export class BarcodeTypesScreen extends BaseScreen {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <BarcodesListView />
        </SafeAreaView>
      </>
    );
  }
}
