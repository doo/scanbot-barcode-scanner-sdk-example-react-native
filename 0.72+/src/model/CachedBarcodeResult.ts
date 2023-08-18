import {BarcodeScannerResult} from 'react-native-scanbot-barcode-scanner-sdk';
import {BarcodeResultField} from 'react-native-scanbot-barcode-scanner-sdk/src/result';

export type CachedBarcode = {id: string} & BarcodeResultField;

class CachedBarcodeResult {
  public static imageUri?: string;

  public static list: CachedBarcode[] = [];

  static clear() {
    CachedBarcodeResult.list = [];
  }

  static update(barcodeResult: BarcodeScannerResult) {
    CachedBarcodeResult.imageUri = undefined;
    if (barcodeResult.imageFileUri == undefined) {
      CachedBarcodeResult.imageUri = undefined;
    } else {
      CachedBarcodeResult.imageUri = 'file://' + barcodeResult.imageFileUri;
    }

    CachedBarcodeResult.clear();
    for (let i = 0; i < barcodeResult.barcodes.length; i++) {
      const barcode = barcodeResult.barcodes[i];
      const cachedBarcode: CachedBarcode = {id: i.toString(), ...barcode};
      CachedBarcodeResult.list.push(cachedBarcode);
    }
  }
}

export default CachedBarcodeResult;
