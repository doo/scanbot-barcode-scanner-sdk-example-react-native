import ScanbotBarcodeSDK, {
  AAMVA,
  AAMVADocumentType,
  BarcodeScannerScreenConfiguration,
  BoardingPass,
  BoardingPassDocumentType,
  GS1,
  GS1DocumentType,
  HIBC,
  HIBCDocumentType,
  IDCardPDF417,
  IDCardPDF417DocumentType,
  MedicalCertificate,
  MedicalCertificateDocumentType,
  SEPA,
  SEPADocumentType,
  SwissQR,
  SwissQRDocumentType,
  VCard,
  VCardDocumentType,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function handleScanningResultWithDataParsers() {
  // Start the barcode RTU UI with default configuration
  const scanningResult = await ScanbotBarcodeSDK.startBarcodeScanner(
    new BarcodeScannerScreenConfiguration(),
  );

  // Check if the status returned is ok and that the data is present
  if (scanningResult.status == 'OK' && scanningResult.data) {
    // Loop through the scanned barcode items and extract the desired barcode data
    const requiredBarcodeInfo = scanningResult.data.items.map(({barcode}) => {
      if (barcode.extractedDocument) {
        switch (barcode.extractedDocument.type.name) {
          case AAMVADocumentType:
            const aamvaDocument = new AAMVA(barcode.extractedDocument);
            return {
              issuerID: aamvaDocument.issuerIdentificationNumber,
              driverLicense: aamvaDocument.driverLicense,
            };
          case BoardingPassDocumentType:
            const boardingPassDocument = new BoardingPass(barcode.extractedDocument);
            return {
              name: boardingPassDocument.name,
              securityData: boardingPassDocument.securityData,
            };
          case GS1DocumentType:
            const gs1DocumentType = new GS1(barcode.extractedDocument);
            return {
              elements: gs1DocumentType.elements,
            };
          case IDCardPDF417DocumentType:
            const idCardPDF417Document = new IDCardPDF417(barcode.extractedDocument);
            return {
              firstName: idCardPDF417Document.firstName,
              documentCode: idCardPDF417Document.documentCode,
            };
          case MedicalCertificateDocumentType:
            const medicalCertificateDocument = new MedicalCertificate(barcode.extractedDocument);
            return {
              firstName: medicalCertificateDocument.firstName,
              diagnosedOn: medicalCertificateDocument.diagnosedOn,
            };
          case SEPADocumentType:
            const sepaDocument = new SEPA(barcode.extractedDocument);
            return {
              id: sepaDocument.identification,
              amount: sepaDocument.amount,
            };
          case SwissQRDocumentType:
            const swissQRDocument = new SwissQR(barcode.extractedDocument);
            return {
              name: swissQRDocument.payeeName,
              amount: swissQRDocument.amount,
            };
          case VCardDocumentType:
            const vCardDocument = new VCard(barcode.extractedDocument);
            return {
              name: vCardDocument.firstName,
              number: vCardDocument.telephoneNumber,
            };
          case HIBCDocumentType:
            const hibcDocument = new HIBC(barcode.extractedDocument);
            return {
              dateOfManufacture: hibcDocument.dateOfManufacture,
              primaryData: hibcDocument.hasPrimaryData,
            };
        }
      }
    });
  }
}
