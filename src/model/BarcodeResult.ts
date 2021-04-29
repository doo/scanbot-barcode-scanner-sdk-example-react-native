import { BarcodeScannerResult } from "react-native-scanbot-barcode-scanner-sdk/result";

class BarcodeResult {

    public static imageUri = null;

    public static list = [];

    static clear() {
        BarcodeResult.list = [];
    }

    static update(barcodeResult: BarcodeScannerResult) {

        BarcodeResult.imageUri = null;
        if (barcodeResult.imageFileUri == undefined) {
            BarcodeResult.imageUri = undefined;
        } else {
            BarcodeResult.imageUri = barcodeResult.imageFileUri;
        }

        BarcodeResult.clear();

        for (let i = 0; i < barcodeResult.barcodes.length; i++) {
            const barcode: any = barcodeResult.barcodes[i];
            barcode.id = i.toString();
            BarcodeResult.list.push(barcode);
        }
    }
}

export default BarcodeResult
