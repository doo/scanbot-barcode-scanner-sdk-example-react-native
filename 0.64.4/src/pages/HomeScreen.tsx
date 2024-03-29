import * as React from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScanbotBarcodeSDK, {
  BarcodeScannerConfiguration,
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';
import { BaseScreen } from '../components/BaseScreen';
import CachedBarcodeResult from '../model/CachedBarcodeResult';
import BarcodeTypesSettings from '../model/BarcodeTypesSettings';
import {
  FeaturesListDataSource,
  FeaturesListItemData,
  FeatureId,
} from '../model/FeaturesListDataSource';
import { Styles } from '../model/Styles';
import { Navigation } from '../utils/Navigation';
import Utils from '../utils/Utils';
import { ViewUtils } from '../utils/ViewUtils';
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerResponse } from 'react-native-image-picker';
import { DetectBarcodesOnImageArguments } from 'react-native-scanbot-barcode-scanner-sdk/src/configuration';

export class HomeScreen extends BaseScreen {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
          <ActivityIndicator
            size="large"
            color={Styles.SCANBOT_RED}
            style={Styles.INSTANCE.common.progress}
            animating={this.progressVisible}
          />
          <SectionList
            style={Styles.INSTANCE.home.list}
            sections={FeaturesListDataSource.items}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item }) => (
              <View style={Styles.INSTANCE.home.sectionItemContainer}>
                <TouchableOpacity onPress={() => this.onListItemClick(item)}>
                  <Text
                    style={
                      item.customStyle ? item.customStyle.content : Styles.INSTANCE.home.sectionItem
                    }
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={Styles.INSTANCE.home.sectionHeader}>{title}</Text>
            )}
          />
        </SafeAreaView>
        <Text style={Styles.INSTANCE.common.copyrightLabel}>
          Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
        </Text>
      </>
    );
  }

  async checkLicense() {
    const info = await ScanbotBarcodeSDK.getLicenseInfo();
    if (!info.isLicenseValid) {
      ViewUtils.showAlert('Your license is corrupted or expired, Scanbot features are disabled');
    }
    return info.isLicenseValid;
  }

  async onListItemClick(item: FeaturesListItemData) {
    if (item.id === FeatureId.LearnMore) {
      await Linking.openURL('https://scanbot.io');
      return;
    }

    if (item.id === FeatureId.ShowLicenseInfo) {
      const info = await ScanbotBarcodeSDK.getLicenseInfo();
      ViewUtils.showAlert(JSON.stringify(info));
      return;
    }

    if (!(await Utils.checkLicense())) {
      return;
    }

    switch (item.id) {
      case FeatureId.BarcodeScanner:
        if (!(await this.checkLicense())) {
          return;
        }
        this.startBarcodeScanner(false);
        break;

      case FeatureId.BarcodeScannerWithImage:
        if (!(await this.checkLicense())) {
          return;
        }
        this.startBarcodeScanner(true);
        break;

      case FeatureId.BatchBarcodeScanner:
        if (!(await this.checkLicense())) {
          return;
        }
        this.startBatchBarcodeScanner();
        break;

      case FeatureId.BarcodeCameraView:
        this.pushPage(Navigation.BARCODE_CAMERA_VIEW);
        break;

      case FeatureId.PickImageFromGallery:
        this.importImageAndDetectBarcodes();
        break;

      case FeatureId.AcceptedBarcodeTypesFilter:
        this.pushPage(Navigation.BARCODE_TYPES);
        break;

      case FeatureId.ClearImageStorage:
        this.clearImageStorage();
        break;
    }
  }

  async startBarcodeScanner(withImage: boolean) {
    const config: BarcodeScannerConfiguration = {
      topBarBackgroundColor: '#c8193c',
      barcodeImageGenerationType: withImage ? 'CAPTURED_IMAGE' : 'NONE',
      barcodeFormats: BarcodeTypesSettings.getAcceptedFormats(),
      msiPlesseyChecksumAlgorithm: 'Mod10',
      allowedInterfaceOrientations: 'ALL',
      successBeepEnabled: true,
      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: false,
        overlayTextFormat: 'CODE_AND_TYPE',
        polygonColor: '#FFFC33',
        textColor: '#FFFC33',
        textContainerColor: '#000000',
      },
      replaceCancelButtonWithIcon: true,
      codeDensity: 'HIGH',
    };

    try {
      const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
      if (result.status === 'OK') {
        CachedBarcodeResult.update(result);
        CachedBarcodeResult.imageUri = result.imageFileUri;
        this.pushPage(Navigation.BARCODE_RESULTS);
      }
    } catch (error) {
      console.log('error:', JSON.stringify(error));
    }
  }

  async startBatchBarcodeScanner() {
    const config: BatchBarcodeScannerConfiguration = {
      topBarBackgroundColor: '#c8193c',
      barcodeFormats: BarcodeTypesSettings.getAcceptedFormats(),
      msiPlesseyChecksumAlgorithm: 'Mod10',
      clearButtonTitle: 'TEST',
      detailsActionColor: '#00ff00',
      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: true,
        polygonColor: '#FFFC33',
        textColor: '#FFFC33',
        textContainerColor: '#000000',
        highlightedPolygonColor: '#EA295B',
        highlightedTextColor: '#EA295B',
        highlightedTextContainerColor: '#FFFFFF',
      },
      replaceCancelButtonWithIcon: true,
      codeDensity: 'HIGH',
    };

    try {
      const result = await ScanbotBarcodeSDK.startBatchBarcodeScanner(config);
      if (result.status === 'OK') {
        CachedBarcodeResult.update(result);
        this.pushPage(Navigation.BARCODE_RESULTS);
      }
    } catch (error) {
      console.log('error:', JSON.stringify(error));
    }
  }

  async importImageAndDetectBarcodes() {
    if (!(await this.checkLicense())) {
      return;
    }
    const response: ImagePickerResponse = await new Promise(resolve => {
      const options: ImagePicker.ImageLibraryOptions = {
        selectionLimit: 1,
        mediaType: 'mixed',
      };
      ImagePicker.launchImageLibrary(options, resolve);
    });

    if (response.didCancel) {
      console.log('Image picker canceled');
      return;
    } else if (response.errorMessage) {
      ViewUtils.showAlert('ImagePicker Error: ' + response.errorMessage);
      return;
    }

    const selectedImageUri = response?.assets?.[0]?.uri;
    if (!selectedImageUri) {
      ViewUtils.showAlert('Something went wrong. Please try again');
      return;
    }

    const detectOptions: DetectBarcodesOnImageArguments = {
      imageFileUri: selectedImageUri,
      barcodeFormats: BarcodeTypesSettings.getAcceptedFormats(),
    };

    this.showProgress();
    const barcodeResult = await ScanbotBarcodeSDK.detectBarcodesOnImage(detectOptions);
    this.hideProgress();

    if (barcodeResult.status === 'OK') {
      CachedBarcodeResult.update(barcodeResult);
      CachedBarcodeResult.imageUri = selectedImageUri;
      this.pushPage(Navigation.BARCODE_RESULTS);
    } else {
      ViewUtils.showAlert('Something went wrong. Please try again');
    }
  }

  async clearImageStorage() {
    if (!(await this.checkLicense())) {
      return;
    }
    const result = await ScanbotBarcodeSDK.cleanup();
    ViewUtils.showAlert(JSON.stringify(result));
  }
}
