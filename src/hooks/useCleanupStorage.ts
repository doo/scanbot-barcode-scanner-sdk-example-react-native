import { useCallback } from 'react';
import { deleteConfirmationAlert, errorMessageAlert, resultMessageAlert } from '@utils';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function useCleanupStorage() {
  return useCallback(() => {
    deleteConfirmationAlert('Deleting storage', 'Are you sure you want to proceed?', () => {
      ScanbotBarcodeSDK.cleanupStorage()
        .then(_ => resultMessageAlert('Cleared storage'))
        .catch(error => errorMessageAlert(error.message));
    });
  }, []);
}
