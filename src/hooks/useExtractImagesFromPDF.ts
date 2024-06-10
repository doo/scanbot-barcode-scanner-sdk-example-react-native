import {useCallback, useContext} from 'react';
import ScanbotBarcodeSDK from 'react-native-scanbot-barcode-scanner-sdk';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectPDFFileUri,
} from '@utils';
import {ActivityIndicatorContext} from '@context';

export function useExtractImagesFromPDF() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

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
      const sdkResult = await ScanbotBarcodeSDK.extractImagesFromPDF({
        pdfFilePath: fileUrl,
      });
      const imageFilesUrls = sdkResult.data;
      if (sdkResult.status === 'CANCELED' || !imageFilesUrls) {
        return;
      }
      /**
       * Handle the result
       */
      navigation.navigate(Screens.IMAGE_RESULTS, imageFilesUrls);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
