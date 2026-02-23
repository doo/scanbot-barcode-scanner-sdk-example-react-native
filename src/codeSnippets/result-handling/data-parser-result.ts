import {
  AAMVA,
  BarcodeScannerScreenConfiguration,
  BoardingPass,
  BritishColumbiaDriverLicense,
  GS1,
  HIBC,
  IDCardPDF417,
  MedicalCertificate,
  ScanbotBarcode,
  SEPA,
  SwissQR,
  VCard,
} from 'react-native-scanbot-barcode-scanner-sdk';

async function handleScanningResultWithDataParsers() {
  // Start the barcode RTU UI with default configuration
  const scanningResult = await ScanbotBarcode.startScanner(new BarcodeScannerScreenConfiguration());

  // Check if the status returned is ok and that the data is present
  if (scanningResult.status == 'OK') {
    // Loop through the scanned barcode items and extract the desired barcode data
    const requiredBarcodeInfo = scanningResult.data.items.map(({ barcode }) => {
      if (barcode.extractedDocument) {
        switch (barcode.extractedDocument.type.name) {
          case AAMVA.DOCUMENT_TYPE:
            const aamvaDocument = new AAMVA(barcode.extractedDocument);
            return {
              issuerID: aamvaDocument.issuerIdentificationNumber,
              driverLicense: aamvaDocument.driverLicense,
            };
          case BoardingPass.DOCUMENT_TYPE:
            const boardingPassDocument = new BoardingPass(barcode.extractedDocument);
            return {
              name: boardingPassDocument.passengerName,
              securityData: boardingPassDocument.securityData,
            };
          case GS1.DOCUMENT_TYPE:
            const gs1DocumentType = new GS1(barcode.extractedDocument);
            return {
              elements: gs1DocumentType.elements,
            };
          case IDCardPDF417.DOCUMENT_TYPE:
            const idCardPDF417Document = new IDCardPDF417(barcode.extractedDocument);
            return {
              firstName: idCardPDF417Document.firstName,
              documentCode: idCardPDF417Document.documentCode,
            };
          case MedicalCertificate.DOCUMENT_TYPE:
            const medicalCertificateDocument = new MedicalCertificate(barcode.extractedDocument);
            return {
              firstName: medicalCertificateDocument.firstName,
              diagnosedOn: medicalCertificateDocument.diagnosedOn,
            };
          case SEPA.DOCUMENT_TYPE:
            const sepaDocument = new SEPA(barcode.extractedDocument);
            return {
              id: sepaDocument.identification,
              amount: sepaDocument.amount,
            };
          case SwissQR.DOCUMENT_TYPE:
            const swissQRDocument = new SwissQR(barcode.extractedDocument);
            return {
              name: swissQRDocument.payeeName,
              amount: swissQRDocument.amount,
            };
          case VCard.DOCUMENT_TYPE:
            const vCardDocument = new VCard(barcode.extractedDocument);
            return {
              name: vCardDocument.name,
              number: vCardDocument.telephoneNumbers,
            };
          case HIBC.DOCUMENT_TYPE:
            const hibcDocument = new HIBC(barcode.extractedDocument);
            return {
              dateOfManufacture: hibcDocument.dateOfManufacture,
              primaryData: hibcDocument.hasPrimaryData,
            };
          case BritishColumbiaDriverLicense.DOCUMENT_TYPE:
            const britishColumbiaDriverLicenseDocument = new BritishColumbiaDriverLicense(
              barcode.extractedDocument,
            );
            return {
              address: britishColumbiaDriverLicenseDocument.address,
              cardExpiry: britishColumbiaDriverLicenseDocument.cardExpiry,
            };
        }
      }
    });
  }
}
