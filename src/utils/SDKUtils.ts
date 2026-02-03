import { errorMessageAlert } from './Alerts';

import ScanbotSDK from 'react-native-scanbot-barcode-scanner-sdk';

export const FILE_ENCRYPTION_ENABLED: boolean = false;

export async function checkLicense(): Promise<boolean> {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.isValid) {
    return true;
  }

  errorMessageAlert(info.licenseStatusMessage);

  return false;
}
