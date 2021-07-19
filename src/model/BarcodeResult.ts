
class BarcodeResult {

    public static imageUri?: string ;

    public static list: any[] = [];

    static clear() {
        BarcodeResult.list = [];
    }

    static update(barcodeResult: any) {

        BarcodeResult.imageUri = undefined;
        if (barcodeResult.imageUri == undefined) {
            BarcodeResult.imageUri = undefined;
        } else {
            BarcodeResult.imageUri = 'file://' + barcodeResult.imageUri;
        }

        BarcodeResult.clear();

        for (let i = 0; i < barcodeResult.barcodes.length; i++) {
            const barcode = barcodeResult.barcodes[i];
            barcode.id = i.toString();
            BarcodeResult.list.push(barcode);
        }
    }
}

export default BarcodeResult
