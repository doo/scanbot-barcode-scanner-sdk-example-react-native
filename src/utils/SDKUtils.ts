import ScanbotSDK, {
  LicenseStatus,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {errorMessageAlert} from './Alerts';

export async function checkLicense(): Promise<boolean> {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.data?.isLicenseValid) {
    return true;
  }

  errorMessageAlert(errorStringFromLicenseStatus(info.data!!.licenseStatus));
  return false;
}

function errorStringFromLicenseStatus(status: LicenseStatus) {
  switch (status) {
    case 'AppIDMismatch':
      return 'The App ID does not match the license key App ID';
    case 'Corrupted':
      return 'The license key seems to be corrupted';
    case 'Expired':
      return 'The license key has expired!';
    case 'NotSet':
      return 'The license key has not been set';
    case 'Trial':
      return 'The trial period has ended';
    case 'WrongOS':
      return 'The license key does not support the current platform';
    default:
      return "Scanbot SDK: there's a problem with the license";
  }
}
