import {Platform} from "react-native";
import {
    DocumentDirectoryPath,
    ExternalDirectoryPath
} from "react-native-fs";
import ScanbotBarcodeSDK from "react-native-scanbot-barcode-scanner-sdk";

class Utils {
    /**
     !! Please note !!
     It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
     However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.

     On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
     All image files and export files (PDF, TIFF, etc) created by the Scanbot SDK in this demo app will be stored
     in this public storage directory and will be accessible for every(!) app having external storage permissions!
     Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
     via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.

     On iOS we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.

     For more details about the storage system of the Scanbot SDK RN Module please see our docs:
     - https://scanbotsdk.github.io/documentation/react-native/

     For more details about the file system on Android and iOS we also recommend to check out:
     - https://developer.android.com/guide/topics/data/data-storage
     - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
     tslint:enable:max-line-length
     */
    public static getCustomStoragePath(): string | null {
        if (Platform.OS === 'ios') {
            return DocumentDirectoryPath + '/my-custom-storage';
        } else if (Platform.OS === 'android') {
            return ExternalDirectoryPath + '/my-custom-storage';
        }
        return null;
    }

    public static async checkLicense(): Promise<boolean> {
        const info = await ScanbotBarcodeSDK.getLicenseInfo();
        if (info.isLicenseValid) {
          // OK - we have a trial session, a valid trial license or valid production license.
          return true;
        }
        // @ts-ignore
        // eslint-disable-next-line no-alert
        alert('Scanbot Barcode SDK trial period or license has expired!', 500);
        return false;
      }
}

export default Utils
