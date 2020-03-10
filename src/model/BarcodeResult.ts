
class BarcodeResult {

    public static imageUri = null;

    public static list = [];

    static clear() {
        BarcodeResult.list = [];
    }

    static update(barcodeResult) {

        BarcodeResult.imageUri = barcodeResult.imageUri;

        BarcodeResult.clear();

        for (let i = 0; i < barcodeResult.barcodes.length; i++) {
            const barcode = barcodeResult.barcodes[i];
            barcode.id = i.toString();
            BarcodeResult.list.push(barcode);
        }
    }
}

export default BarcodeResult
