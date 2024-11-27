import {
  deleteConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
} from './Alerts.ts';
import {selectImageFromLibrary, selectPDFFileUri} from './FileUtils.ts';
import {
  BarcodeResultsLegacyScreenRouteProp,
  BarcodeResultsScreenRouteProp,
  ImageResultsScreenRouteProp,
  PrimaryRouteNavigationProp,
  PrimaryRouteParamList,
  Screens,
  ScreenTitles,
} from './Navigation.ts';
import {checkLicense, FILE_ENCRYPTION_ENABLED} from './SDKUtils.ts';

export {
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
  deleteConfirmationAlert,
  selectPDFFileUri,
  selectImageFromLibrary,
  Screens,
  ScreenTitles,
  checkLicense,
  FILE_ENCRYPTION_ENABLED,
};

export type {
  ImageResultsScreenRouteProp,
  PrimaryRouteParamList,
  PrimaryRouteNavigationProp,
  BarcodeResultsLegacyScreenRouteProp,
  BarcodeResultsScreenRouteProp,
};
