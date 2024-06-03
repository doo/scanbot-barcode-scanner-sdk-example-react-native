import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  HOME = 'home',
  BARCODE_FORMATS = 'barcode_formats',
  BARCODE_DOCUMENTS = 'barcode_documents',
  BARCODE_CAMERA_VIEW = 'barcode_camera_view',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot Barcode SDK',
  [Screens.BARCODE_FORMATS]: 'Barcode Formats',
  [Screens.BARCODE_DOCUMENTS]: 'Barcode Documents',
  [Screens.BARCODE_CAMERA_VIEW]: 'Barcode Camera View',
};

export type PrimaryRouteParamList = {
  [Screens.HOME]: undefined;
  [Screens.BARCODE_FORMATS]: undefined;
  [Screens.BARCODE_DOCUMENTS]: undefined;
  [Screens.BARCODE_CAMERA_VIEW]: undefined;
};

export type PrimaryRouteNavigationProp = NativeStackNavigationProp<
  PrimaryRouteParamList,
  keyof PrimaryRouteParamList
>;
