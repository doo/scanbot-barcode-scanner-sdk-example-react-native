import {errorMessageAlert} from './Alerts';

import ScanbotSDK from 'react-native-scanbot-barcode-scanner-sdk';

export async function checkLicense(): Promise<boolean> {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.data?.isLicenseValid) {
    return true;
  }

  errorMessageAlert(
    info.data?.licenseStatusMessage ?? 'There is a problem with the license of the Scanbot SDK',
  );

  return false;
}
