import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import BarcodeResultList from '../components/BarcodeResultList';
import {BaseScreen} from '../components/BaseScreen';

export class BarcodeResultsListScreen extends BaseScreen {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <BarcodeResultList />
        </SafeAreaView>
      </>
    );
  }
}
