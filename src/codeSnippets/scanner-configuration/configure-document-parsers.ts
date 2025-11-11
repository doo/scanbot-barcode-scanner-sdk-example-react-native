import {
  BarcodeFormatCommonConfiguration,
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

export function configureDocumentParsers() {
  const barcodeScannerConfiguration = new BarcodeScannerConfiguration({
    barcodeFormatConfigurations: [new BarcodeFormatCommonConfiguration({})],
    // Example of adding a specific configuration for parsed documents
    extractedDocumentFormats: [
      'AAMVA',
      'BOARDING_PASS',
      'DE_MEDICAL_PLAN',
      'MEDICAL_CERTIFICATE',
      'ID_CARD_PDF_417',
      'SEPA',
      'SWISS_QR',
      'VCARD',
      'GS1',
      'HIBC',
    ],
    // Set to true if you want to only accept barcode with parsed documents
    onlyAcceptDocuments: true,
    engineMode: 'NEXT_GEN',
  });
}
