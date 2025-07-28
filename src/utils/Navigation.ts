import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import {
  BarcodeItem,
  BarcodeScannerResult,
  BarcodeScannerUiResult,
  DeepPartial,
} from 'react-native-scanbot-barcode-scanner-sdk';

export enum Screens {
  HOME = 'home',
  BARCODE_FORMATS = 'barcode_formats',
  BARCODE_DOCUMENTS = 'barcode_documents',
  BARCODE_CAMERA_VIEW = 'barcode_camera_view',
  IMAGE_RESULTS = 'image_results',
  BARCODE_RESULTS = 'barcode_results',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot Barcode SDK',
  [Screens.BARCODE_FORMATS]: 'Barcode Formats',
  [Screens.BARCODE_DOCUMENTS]: 'Barcode Documents',
  [Screens.BARCODE_CAMERA_VIEW]: 'Barcode Camera View',
  [Screens.IMAGE_RESULTS]: 'Image Results',
  [Screens.BARCODE_RESULTS]: 'Barcode Results',
};

export type PrimaryRouteParamList = {
  [Screens.HOME]: undefined;
  [Screens.BARCODE_FORMATS]: undefined;
  [Screens.BARCODE_DOCUMENTS]: undefined;
  [Screens.BARCODE_CAMERA_VIEW]: undefined;
  [Screens.IMAGE_RESULTS]: string[];
  [Screens.BARCODE_RESULTS]: BarcodeScannerUiResult | BarcodeScannerResult;
};

export type PrimaryRouteNavigationProp = NativeStackNavigationProp<
  PrimaryRouteParamList,
  keyof PrimaryRouteParamList
>;

export type ImageResultsScreenRouteProp = RouteProp<PrimaryRouteParamList, Screens.IMAGE_RESULTS>;

export type BarcodeResultsScreenRouteProp = RouteProp<
  PrimaryRouteParamList,
  Screens.BARCODE_RESULTS
>;
