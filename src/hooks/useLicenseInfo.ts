import { useCallback } from 'react';
import { errorMessageAlert, infoMessageAlert } from '@utils';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function useLicenseInfo() {
  return useCallback(async () => {
    const licenseInfo = await ScanbotBarcodeSDK.getLicenseInfo();

    infoMessageAlert(
      `Licence is ${licenseInfo.isValid ? 'VALID' : 'NOT VALID'} \n` +
        `Licence status: ${licenseInfo.licenseStatusMessage} \n` +
        `Expiration date: ${
          licenseInfo.expirationTimestamp
            ? new Date(licenseInfo.expirationTimestamp).toLocaleDateString()
            : 'N/A'
        }\n` +
        `Message: ${licenseInfo.licenseStatusMessage}`,
    );
    try {
    } catch (error: any) {
      errorMessageAlert(error.message);
    }
  }, []);
}
