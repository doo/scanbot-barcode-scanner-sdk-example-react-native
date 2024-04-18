import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ImageResultsList from '../components/ImageResultsList';
import {BaseScreen} from '../components/BaseScreen';

export class ImageResultsListScreen extends BaseScreen {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ImageResultsList />
        </SafeAreaView>
      </>
    );
  }
}
