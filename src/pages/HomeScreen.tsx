import React from "react";
import { ActivityIndicator, Linking, SafeAreaView, SectionList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import ScanbotBarcodeSDK, { BarcodeScannerConfiguration, BatchBarcodeScannerConfiguration } from "react-native-scanbot-barcode-scanner-sdk";
import { BaseScreen } from "../components/BaseScreen";
import BarcodeResult from "../model/BarcodeResult";
import BarcodeTypes from "../model/BarcodeTypes";
import { Examples, ExamplesListItem, ExamplesListItemData, FeatureId } from "../model/Examples";
import { Styles } from "../model/Styles";
import { Navigation } from "../utils/Navigation";
import Utils from "../utils/Utils";
import { ViewUtils } from "../utils/ViewUtils";
import ImagePicker from "react-native-image-picker";

export class HomeScreen extends BaseScreen {
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
              <ActivityIndicator
                size="large"
                color={Styles.SCANBOT_RED}
                style={Styles.INSTANCE.common.progress}
                animating={this.progressVisible}
              />
              <SectionList
                style={Styles.INSTANCE.home.list}
                sections={Examples.list}
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

      async checkLicense() {
        const info = await ScanbotBarcodeSDK.getLicenseInfo();
        if (!info.isLicenseValid) {
          ViewUtils.showAlert("Your license is corrupted or expired, Scanbot features are disabled");
        }
        return info.isLicenseValid;
      }

      async onListItemClick(item: ExamplesListItemData) {
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
    
        switch(item.id) {
          case FeatureId.BarcodeScanner:
            if (!await this.checkLicense()) {
              return;
            }
            this.startBarcodeScanner(false);
            break;

          case FeatureId.BarcodeScannerWithImage:
            if (!await this.checkLicense()) {
              return;
            }
            this.startBarcodeScanner(true);
            break;

          case FeatureId.BatchBarcodeScanner:
            if (!await this.checkLicense()) {
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
          topBarBackgroundColor: "#c8193c",
          barcodeImageGenerationType: (withImage ? "FROM_VIDEO_FRAME" : "NONE"),
          barcodeFormats: BarcodeTypes.getAcceptedFormats(),
        };
      
        try {
          let result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
          if (result.status === 'OK') {
            BarcodeResult.update(result);
            BarcodeResult.imageUri = result.imageFileUri;
            this.pushPage(Navigation.BARCODE_RESULTS);
          }
        } catch(error) {
          console.log("error:", JSON.stringify(error));
        }
      }

      async startBatchBarcodeScanner() {
        const config: BatchBarcodeScannerConfiguration = {
          topBarBackgroundColor: "#c8193c",
          barcodeFormats: BarcodeTypes.getAcceptedFormats(),
          //barcodeFormats: ["MSI_PLESSEY"],
          //engineMode: "NEXT_GEN"
        }

        try {
          let result = await ScanbotBarcodeSDK.startBatchBarcodeScanner(config);
          if (result.status === 'OK') {
            BarcodeResult.update(result);
            this.pushPage(Navigation.BARCODE_RESULTS);
          }
        } catch(error) {
          console.log("error:", JSON.stringify(error));
        }
      }

      async importImageAndDetectBarcodes() {
        if (!await this.checkLicense()) {
          return;
        }
        const response: any = await new Promise((resolve, reject) => {
          ImagePicker.launchImageLibrary({}, resolve);
        });
  
        if (response.didCancel) {
          console.log('Image picker canceled');
          return;
        } else if (response.error) {
          ViewUtils.showAlert('ImagePicker Error: ' + response.error);
          return;
        }

        const detectOptions = {
          storeImages: true,
          imageFileUri: response.uri,
          barcodeFormats: BarcodeTypes.getAcceptedFormats(),
        };

        this.showProgress();
        const barcodeResult = await ScanbotBarcodeSDK.detectBarcodesOnImage(detectOptions);
        this.hideProgress();

        if (barcodeResult.status === "OK") {
          BarcodeResult.update(barcodeResult);
          BarcodeResult.imageUri = "data:image/png;base64," + response.data;
          this.pushPage(Navigation.BARCODE_RESULTS);
        } else {
          ViewUtils.showAlert("Something went wrong. Please try again");
        }
      }

      async clearImageStorage() {
        if (!await this.checkLicense()) {
          return;
        }
        const result = await ScanbotBarcodeSDK.cleanup();
        ViewUtils.showAlert(JSON.stringify(result));
      }
}