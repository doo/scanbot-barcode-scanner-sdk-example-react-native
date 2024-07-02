import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {BarcodeScannerResult} from 'react-native-scanbot-barcode-scanner-sdk';
import {BarcodeScannerResult as BarcodeScannerV2Result} from 'react-native-scanbot-barcode-scanner-sdk/ui_v2';

export enum Screens {
  HOME = 'home',
  BARCODE_FORMATS = 'barcode_formats',
  BARCODE_DOCUMENTS = 'barcode_documents',
  BARCODE_CAMERA_VIEW = 'barcode_camera_view',
  IMAGE_RESULTS = 'image_results',
  BARCODE_RESULTS_LEGACY = 'barcode_results_v1',
  BARCODE_RESULTS = 'barcode_results',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot Barcode SDK',
  [Screens.BARCODE_FORMATS]: 'Barcode Formats',
  [Screens.BARCODE_DOCUMENTS]: 'Barcode Documents',
  [Screens.BARCODE_CAMERA_VIEW]: 'Barcode Camera View',
  [Screens.IMAGE_RESULTS]: 'Image Results',
  [Screens.BARCODE_RESULTS_LEGACY]: 'Barcode Results',
  [Screens.BARCODE_RESULTS]: 'Barcode Results',
};

export type PrimaryRouteParamList = {
  [Screens.HOME]: undefined;
  [Screens.BARCODE_FORMATS]: undefined;
  [Screens.BARCODE_DOCUMENTS]: undefined;
  [Screens.BARCODE_CAMERA_VIEW]: undefined;
  [Screens.IMAGE_RESULTS]: string[];
  [Screens.BARCODE_RESULTS_LEGACY]: BarcodeScannerResult;
  [Screens.BARCODE_RESULTS]: BarcodeScannerV2Result;
};

export type PrimaryRouteNavigationProp = NativeStackNavigationProp<
  PrimaryRouteParamList,
  keyof PrimaryRouteParamList
>;

export type ImageResultsScreenRouteProp = RouteProp<PrimaryRouteParamList, Screens.IMAGE_RESULTS>;

export type BarcodeResultsLegacyScreenRouteProp = RouteProp<
  PrimaryRouteParamList,
  Screens.BARCODE_RESULTS_LEGACY
>;

export type BarcodeResultsScreenRouteProp = RouteProp<
  PrimaryRouteParamList,
  Screens.BARCODE_RESULTS
>;
