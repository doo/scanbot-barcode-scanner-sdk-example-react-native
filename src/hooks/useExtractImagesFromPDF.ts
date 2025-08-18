import { useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectPDFFileUri,
} from '@utils';
import { ActivityIndicatorContext } from '@context';

import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function useExtractImagesFromPDF() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const { setLoading } = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Select a file
       * Return early if no file is selected or there is an issue selecting a file
       **/
      setLoading(true);
      const fileUrl = await selectPDFFileUri();
      if (!fileUrl) {
        return;
      }
      /**
       * Extract the images from the pdf with the desired configuration options
       */
      const imageFilesUrls = await ScanbotBarcodeSDK.extractImagesFromPDF({
        pdfFilePath: fileUrl,
      });
      /**
       * Handle the result
       */
      if (imageFilesUrls.length > 0) {
        navigation.navigate(Screens.IMAGE_RESULTS, imageFilesUrls);
      } else {
        infoMessageAlert('No images extracted');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
