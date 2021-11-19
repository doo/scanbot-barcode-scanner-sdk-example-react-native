import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from './Colors';

export enum FeatureId {
  BarcodeScanner = 1,
  BarcodeScannerWithImage,
  BatchBarcodeScanner,
  BarcodeCameraView,
  PickImageFromGallery,
  AcceptedBarcodeTypesFilter,
  ShowLicenseInfo,
  ClearImageStorage,
  LearnMore,
}

export interface FeaturesListItem {
  title: string;
  data: FeaturesListItemData[];
}

export interface FeaturesListItemData {
  id: FeatureId;
  title: string;
  customStyle?: StyleSheet.NamedStyles<{ content: ViewStyle }>;
}

export class FeaturesListDataSource {
  public static items: FeaturesListItem[] = [
    {
      title: 'DEMO',
      data: [
        {
          id: FeatureId.BarcodeScanner,
          title: 'RTU-UI',
        },
        {
          id: FeatureId.BarcodeScannerWithImage,
          title: 'RTU-UI With Image',
        },
        {
          id: FeatureId.BatchBarcodeScanner,
          title: 'RTU-UI: Batch Barcode Scanner',
        },
        {
          id: FeatureId.BarcodeCameraView,
          title: 'Barcode Camera View (EXPERIMENTAL)',
        },
        {
          id: FeatureId.PickImageFromGallery,
          title: 'Pick image from Gallery',
        },
        {
          id: FeatureId.AcceptedBarcodeTypesFilter,
          title: 'Set accepted barcode types',
        },
        {
          id: FeatureId.ShowLicenseInfo,
          title: 'View license info',
        },
        {
          id: FeatureId.ClearImageStorage,
          title: 'Clear image storage',
        },
        {
          id: FeatureId.LearnMore,
          title: 'Learn More About Scanbot SDK',
          customStyle: StyleSheet.create({
            content: {
              textAlign: 'center',
              fontSize: 14,
              marginTop: 25,
              marginBottom: 10,
              color: Colors.SCANBOT_RED,
            },
          }),
        },
      ],
    },
  ];
}
