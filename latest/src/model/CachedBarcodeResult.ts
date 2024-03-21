import {BarcodeResultField, BarcodeScannerResult} from 'react-native-scanbot-barcode-scanner-sdk';

export type CachedBarcode = {id: string} & BarcodeResultField;

class CachedBarcodeResult {
  public static list: CachedBarcode[] = [];

  static clear() {
    CachedBarcodeResult.list = [];
  }

  static update(barcodeResult: BarcodeScannerResult) {
    CachedBarcodeResult.clear();
    
    if (barcodeResult.barcodes) {
      for (let i = 0; i < barcodeResult.barcodes.length; i++) {
        const barcode = barcodeResult.barcodes[i];
        const cachedBarcode: CachedBarcode = {id: i.toString(), ...barcode};
        CachedBarcodeResult.list.push(cachedBarcode);
      }
    }
  }
}

export default CachedBarcodeResult;
