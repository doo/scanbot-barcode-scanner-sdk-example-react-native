import BarcodeType from './BarcodeType';
import { BarcodeFormat } from 'react-native-scanbot-barcode-scanner-sdk';

class BarcodeTypesSettings {
  public static list: BarcodeType[] = [];

  public static getAcceptedFormats(): BarcodeFormat[] {
    const result: BarcodeFormat[] = [];

    for (let i = 0; i < BarcodeTypesSettings.list.length; i++) {
      const type = BarcodeTypesSettings.list[i];
      if (type.isAccepted) {
        result.push(type.name as BarcodeFormat);
      }
    }
    return result;
  }

  static initialize() {
    const list = [
      'AZTEC',
      'CODABAR',
      'CODE_25',
      'CODE_39',
      'CODE_93',
      'CODE_128',
      'DATA_MATRIX',
      'EAN_8',
      'EAN_13',
      'ITF',
      'PDF_417',
      'QR_CODE',
      'RSS_14',
      'RSS_EXPANDED',
      'UPC_A',
      'UPC_E',
      'MSI_PLESSEY',
      "IATA_2_OF_5",
      "INDUSTRIAL_2_OF_5" 
    ];

    for (let i = 0; i < list.length; i++) {
      const id = '' + i;
      const name = list[i];
      BarcodeTypesSettings.list.push(new BarcodeType(id, name, true));
    }
  }
}

export default BarcodeTypesSettings;
