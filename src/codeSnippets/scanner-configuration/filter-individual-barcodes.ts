import {
  BarcodeFormatAustraliaPostConfiguration,
  BarcodeFormatCode11Configuration,
  BarcodeFormatCode2Of5Configuration,
  BarcodeFormatCommonConfiguration,
  BarcodeFormatConfigurationBase,
  BarcodeFormatMsiPlesseyConfiguration,
  BarcodeFormats,
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-barcode-scanner-sdk';

export default function filterIndividualBarcodes() {
  const configs: BarcodeFormatConfigurationBase[] = [];
  const baseConfig = new BarcodeFormatCommonConfiguration({
    regexFilter: '',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    gs1Handling: 'PARSE',
    strictMode: true,
    formats: BarcodeFormats.common,
    addAdditionalQuietZone: false,
  });
  configs.push(baseConfig);

  // Add individual configurations for specific barcode formats
  const australiaPostConfig = new BarcodeFormatAustraliaPostConfiguration({
    regexFilter: '',
    australiaPostCustomerFormat: 'ALPHA_NUMERIC',
  });
  configs.push(australiaPostConfig);

  const msiPlesseyConfig = new BarcodeFormatMsiPlesseyConfiguration({
    regexFilter: '',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    checksumAlgorithms: ['MOD_10'],
  });
  configs.push(msiPlesseyConfig);

  const code11Config = new BarcodeFormatCode11Configuration({
    regexFilter: '',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    checksum: true,
  });
  configs.push(code11Config);

  const code2Of5Config = new BarcodeFormatCode2Of5Configuration({
    regexFilter: '',
    minimum1DQuietZoneSize: 10,
    stripCheckDigits: false,
    minimumTextLength: 0,
    maximumTextLength: 0,
    iata2of5: true,
    code25: false,
    industrial2of5: false,
    useIATA2OF5Checksum: true,
  });
  configs.push(code2Of5Config);

  // Set the configurations to the barcode scanner
  const barcodeScannerConfiguration = new BarcodeScannerConfiguration({
    barcodeFormatConfigurations: configs,
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
    onlyAcceptDocuments: false,
    engineMode: 'NEXT_GEN',
    returnBarcodeImage: true,
  });
}
