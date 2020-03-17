import BarcodeType from "./BarcodeType";
import { BarcodeFormat } from "react-native-scanbot-barcode-scanner-sdk/enum";

class BarcodeTypes {
    public static list: BarcodeType[] = [];

    public static getAcceptedFormats() : BarcodeFormat[] {
        const result = [];

        for (let i = 0; i < BarcodeTypes.list.length; i++) {
            const type = BarcodeTypes.list[i];
            if (type.isAccepted) {
                result.push(type.name);
            }
        }
        return result;
    }

    static initialize() {
        const list = [ "AZTEC", "CODABAR", "CODE_39", "CODE_93", "CODE_128", "DATA_MATRIX", "EAN_8",
            "EAN_13", "ITF", "PDF_417", "QR_CODE", "RSS_14", "RSS_EXPANDED", "UPC_A", "UPC_E", "UNKNOWN"
        ];

        for (let i = 0; i < list.length; i++) {
            const id = "" + i;
            const name = list[i];
            BarcodeTypes.list.push(new BarcodeType(id, name, true));
        }
    }
}

export default BarcodeTypes
