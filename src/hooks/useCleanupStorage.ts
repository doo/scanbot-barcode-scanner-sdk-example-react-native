import { useCallback } from 'react';
import { deleteConfirmationAlert, errorMessageAlert, resultMessageAlert } from '@utils';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function useCleanupStorage() {
  return useCallback(() => {
    deleteConfirmationAlert('Cleanup SDK storage ?', 'Cleanup', () => {
      ScanbotBarcodeSDK.cleanupStorage()
        .then(_ => resultMessageAlert('Storage cleaned up successfully'))
        .catch(error => errorMessageAlert(error.message));
    });
  }, []);
}
