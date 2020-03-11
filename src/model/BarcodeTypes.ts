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
}

export default BarcodeTypes
