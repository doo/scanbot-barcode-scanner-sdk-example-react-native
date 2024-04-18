import {Platform} from 'react-native';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';

class Utils {
  /**
     !! Please note !!
     It is strongly recommended to use the default (secure) storage location of the Scanbot Barcode SDK.
     However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot Barcode SDK by a custom storage directory.

     On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
     All image files created by the Scanbot Barcode SDK in this demo app will be stored
     in this public storage directory and will be accessible for every(!) app having external storage permissions!
     Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
     via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.

     On iOS we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.

     For more details about the storage system of the Scanbot SDK RN Module please see our docs:
     - https://docs.scanbot.io/barcode-scanner-sdk/react-native

     For more details about the file system on Android and iOS we also recommend to check out:
     - https://developer.android.com/guide/topics/data/data-storage
     - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
     tslint:enable:max-line-length
     */
  public static getCustomStoragePath(): string | undefined {
    if (Platform.OS === 'ios') {
      return DocumentDirectoryPath + '/my-custom-storage';
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath + '/my-custom-storage';
    }
    return undefined;
  }
}

export default Utils;
