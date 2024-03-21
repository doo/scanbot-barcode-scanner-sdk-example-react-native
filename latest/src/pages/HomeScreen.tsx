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
  ExtractImagesFromPdfArguments,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {BaseScreen} from '../components/BaseScreen';
import CachedBarcodeResult from '../model/CachedBarcodeResult';
import BarcodeTypesSettings from '../model/BarcodeTypesSettings';
import {
  FeaturesListDataSource,
  FeaturesListItemData,
  FeatureId,
} from '../model/FeaturesListDataSource';
import {Styles} from '../model/Styles';
import {Navigation} from '../utils/Navigation';
import {ViewUtils} from '../utils/ViewUtils';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {DetectBarcodesOnImageArguments} from 'react-native-scanbot-barcode-scanner-sdk';
import ImageResultsList from '../components/ImageResultsList';

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
            renderItem={({item}) => (
              <View style={Styles.INSTANCE.home.sectionItemContainer}>
                <TouchableOpacity onPress={() => this.onListItemClick(item)}>
                  <Text
                    style={
                      item.customStyle
                        ? item.customStyle.content
                        : Styles.INSTANCE.home.sectionItem
                    }>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
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

  async checkLicense(): Promise<boolean> {
    try {
      const info = await ScanbotBarcodeSDK.getLicenseInfo();

      if (info.data?.isLicenseValid === true) {
        return true;
      } else {
        ViewUtils.showAlert(
          'Your license is corrupted or expired, Scanbot features are disabled',
        );
      }
    } catch (error: any) {
      console.log('Error: ', error.message);
    }

    return false;
  }

  async onListItemClick(item: FeaturesListItemData) {
    if (item.id === FeatureId.LearnMore) {
      await Linking.openURL('https://scanbot.io');
      return;
    }

    if (item.id === FeatureId.ShowLicenseInfo) {
      try {
        const info = await ScanbotBarcodeSDK.getLicenseInfo();

        const fields = [
          info.data?.licenseStatusMessage ??
            `License is ${
              info.data?.isLicenseValid === true ? 'valid' : 'NOT VALID'
            }`,
        ];

        if (info.data?.licenseExpirationDate) {
          fields.push(
            `The license expires on ${new Date(
              Number(info.data?.licenseExpirationDate),
            ).toUTCString()}`,
          );

          ViewUtils.showAlert(fields.join('\n'));
        }
      } catch (error: any) {
        console.log('Error: ', error.message);
      }

      return;
    }

    if (!(await this.checkLicense())) {
      return;
    }

    switch (item.id) {
      case FeatureId.BarcodeScanner:
        this.startBarcodeScanner();
        break;

      case FeatureId.BatchBarcodeScanner:
        this.startBatchBarcodeScanner();
        break;

      case FeatureId.BarcodeCameraView:
        this.pushPage(Navigation.BARCODE_CAMERA_VIEW);
        break;

      case FeatureId.PickImageFromGallery:
        this.importImageAndDetectBarcodes();
        break;

      case FeatureId.ExtractImagesFromPDF:
        this.importPdfAndExtractImages();
        break;

      case FeatureId.AcceptedBarcodeTypesFilter:
        this.pushPage(Navigation.BARCODE_TYPES);
        break;

      case FeatureId.ClearImageStorage:
        this.clearImageStorage();
        break;
    }
  }

  async startBarcodeScanner() {
    const config: BarcodeScannerConfiguration = {
      topBarBackgroundColor: '#c8193c',
      barcodeFormats: BarcodeTypesSettings.getAcceptedFormats(),
      msiPlesseyChecksumAlgorithm: 'MOD_10',
      orientationLockMode: 'NONE',
      successBeepEnabled: true,
      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: false,
        textFormat: 'CODE_AND_TYPE',
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
      const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
      if (result.status === 'OK' && result.data) {
        CachedBarcodeResult.update(result.data);
        this.pushPage(Navigation.BARCODE_RESULTS);
      }
    } catch (error: any) {
      console.log('Error: ', error.message);
    }
  }

  async startBatchBarcodeScanner() {
    const config: BatchBarcodeScannerConfiguration = {
      topBarBackgroundColor: '#c8193c',
      barcodeFormats: BarcodeTypesSettings.getAcceptedFormats(),
      msiPlesseyChecksumAlgorithm: 'MOD_10',
      detailsActionColor: '#00ff00',
      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: true,
        textFormat: 'CODE_AND_TYPE',
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
      if (result.status === 'OK' && result.data) {
        CachedBarcodeResult.update(result.data);
        this.pushPage(Navigation.BARCODE_RESULTS);
      }
    } catch (error: any) {
      console.log('Error: ', error.message);
    }
  }

  async importImageAndDetectBarcodes() {
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

    try {
      const barcodeResult = await ScanbotBarcodeSDK.detectBarcodesOnImage(
        detectOptions,
      );
      this.hideProgress();

      if (barcodeResult.status === 'OK' && barcodeResult.data) {
        CachedBarcodeResult.update(barcodeResult.data);
        this.pushPage(Navigation.BARCODE_RESULTS);
      } else {
        ViewUtils.showAlert('Something went wrong. Please try again');
      }
    } catch (error: any) {
      this.hideProgress();

      ViewUtils.showAlert('Something went wrong. ' + error.message);
    }
  }

  async importPdfAndExtractImages() {
    try {
      const pdfFileUri = (
        await DocumentPicker.pickSingle({type: [DocumentPicker.types.pdf]})
      ).uri;
      if (!pdfFileUri) {
        ViewUtils.showAlert('PDF file is not selected');
        return;
      }

      this.showProgress();

      const extractArguments: ExtractImagesFromPdfArguments = {
        pdfFilePath: pdfFileUri,
      };

      const result = await ScanbotBarcodeSDK.extractImagesFromPDF(
        extractArguments,
      );
      this.hideProgress();

      if (result.status === 'OK' && result.data) {
        ImageResultsList.imageUrls = result.data;
        this.pushPage(Navigation.IMAGE_RESULTS);
      }
    } catch (error: any) {
      this.hideProgress();

      ViewUtils.showAlert('Something went wrong. ' + error.message);
      return;
    }
  }

  async clearImageStorage() {
    const result = await ScanbotBarcodeSDK.cleanup();
    ViewUtils.showAlert(JSON.stringify(result));
  }
}
