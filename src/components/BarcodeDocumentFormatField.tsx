import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarcodeFieldRow} from './BarcodeFieldRow.tsx';

import {
  AAMVA,
  BoardingPass,
  Field,
  GenericDocument,
  GS1,
  IDCardPDF417,
  MedicalCertificate,
  RootTypeName,
  SEPA,
  SwissQR,
  VCard,
} from 'react-native-scanbot-barcode-scanner-sdk';

function AAMVADocumentFields({document}: {document: AAMVA}) {
  return (
    <View>
      <BarcodeFieldRow title={'File type:'} value={document.issuerIdentificationNumber} />
      <BarcodeFieldRow title={'Aamva version number'} value={document.version} />
      <BarcodeFieldRow
        title={'Issuer identification number'}
        value={document.issuerIdentificationNumber}
      />
      <BarcodeFieldRow
        title={'Jurisdiction version number'}
        value={document.jurisdictionVersionNumber}
      />
      <BarcodeFieldRow title={'Version'} value={document.version} />
    </View>
  );
}

function BoardingPassFields({document}: {document: BoardingPass}) {
  return (
    <View>
      <BarcodeFieldRow title={'Name'} value={document.name} />
      <BarcodeFieldRow title={'Security Data'} value={document.securityData} />
      <BarcodeFieldRow title={'Electronic ticket'} value={document.electronicTicket} />
      <BarcodeFieldRow title={'Number of legs'} value={document.numberOfLegs} />
    </View>
  );
}

function GS1Fields({document}: {document: GS1}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.elements.map((field, index) => (
        <View key={index}>
          <BarcodeFieldRow title={'Description'} value={field.elementDescription} />
          <BarcodeFieldRow title={'Raw field'} value={field.rawValue} />
          <BarcodeFieldRow title={'Data Title'} value={field.dataTitle} />
          <BarcodeFieldRow title={'Application ID'} value={field.applicationIdentifier} />
          <BarcodeFieldRow title={'Validation Errors'} value={field.validationErrors.length > 0} />
        </View>
      ))}
    </View>
  );
}

function IDCardPDF417Fields({document}: {document: IDCardPDF417}) {
  return (
    <View>
      <BarcodeFieldRow title={'Document code'} value={document.documentCode} />
      <BarcodeFieldRow title={'Date issued'} value={document.dateIssued} />
      <BarcodeFieldRow title={'Date expired'} value={document.dateExpired} />
      <BarcodeFieldRow title={'First Name'} value={document.firstName} />
      <BarcodeFieldRow title={'Last Name'} value={document.lastName} />
      <BarcodeFieldRow title={'Birth Date'} value={document.birthDate} />
      <BarcodeFieldRow title={'Optional'} value={document.optional} />
    </View>
  );
}

function MedicalCertificateFields({document}: {document: MedicalCertificate}) {
  return (
    <View>
      <BarcodeFieldRow title={'First name'} value={document.firstName} />
      <BarcodeFieldRow title={'Last name'} value={document.lastName} />
      <BarcodeFieldRow title={'Birthdate'} value={document.birthDate} />
      <BarcodeFieldRow title={'Doctor number'} value={document.doctorNumber} />
      <BarcodeFieldRow title={'Health insurance number'} value={document.healthInsuranceNumber} />
    </View>
  );
}

function SepaFields({document}: {document: SEPA}) {
  return (
    <View>
      <BarcodeFieldRow title={'Version'} value={document.version} />
      <BarcodeFieldRow title={'Amount'} value={document.amount} />
      <BarcodeFieldRow title={'Character Set'} value={document.characterSet} />
      <BarcodeFieldRow title={'Purpose'} value={document.purpose} />
      <BarcodeFieldRow title={'Identification'} value={document.identification} />
      <BarcodeFieldRow title={'Information'} value={document.information} />
      <BarcodeFieldRow title={'Receiver BIC'} value={document.receiverBIC} />
      <BarcodeFieldRow title={'Receiver IBAN'} value={document.receiverIBAN} />
      <BarcodeFieldRow title={'Receiver Name'} value={document.receiverName} />
      <BarcodeFieldRow title={'Remittance'} value={document.remittance} />
    </View>
  );
}

function SwissQRFields({document}: {document: SwissQR}) {
  return (
    <View>
      <BarcodeFieldRow title={'Version'} value={document.version} />
      <BarcodeFieldRow title={'Ammount'} value={document.amount} />
      <BarcodeFieldRow title={'Due date'} value={document.dueDate} />
      <BarcodeFieldRow title={'Currency'} value={document.currency} />
      <BarcodeFieldRow title={'Debtor Name'} value={document.debtorName} />
      <BarcodeFieldRow title={'IBAN'} value={document.iban} />
    </View>
  );
}

function VCardFields({document}: {document: VCard}) {
  return (
    <View>
      <BarcodeFieldRow title={'Name'} value={document.name?.rawValue} />
      <BarcodeFieldRow title={'Title'} value={document.title?.rawValue} />
      <BarcodeFieldRow title={'First Name'} value={document.firstName?.rawValue} />
      <BarcodeFieldRow title={'Birthday'} value={document.birthday?.rawValue} />
      <BarcodeFieldRow title={'Email'} value={document.email?.rawValue} />
      <BarcodeFieldRow title={'Role'} value={document.role?.rawValue} />
    </View>
  );
}

function extractGenericDocumentFields(document: GenericDocument) {
  let fields: Field[] = [];

  if (document.fields.length > 0) {
    fields = fields.concat(document.fields);
  }

  if (document.children.length > 0) {
    document.children.forEach(child => {
      fields = fields.concat(extractGenericDocumentFields(child));
    });
  }

  return fields;
}

export function BarcodeDocumentFormatField({
  document,
  staticFields = false,
}: {
  document: GenericDocument;
  staticFields?: boolean;
}) {
  if (!document) {
    return null;
  }

  /**
   * Fields from Generic Document could be managed in the following ways:
   *
   * 1. Extract all the fields from the Generic Document itself
   * 2. Use the wrappers provided by ScanbotSDK and use the desired properties directly
   *
   */
  let Document;

  if (!staticFields) {
    Document = (
      <View>
        {extractGenericDocumentFields(document).map((field, index) => (
          <BarcodeFieldRow
            key={field.type.name + index}
            title={field.type.name.trim()}
            value={field.value?.text}
          />
        ))}
      </View>
    );
  } else {
    switch (document.type.name as RootTypeName) {
      case 'AAMVA':
        Document = <AAMVADocumentFields document={new AAMVA(document)} />;
        break;
      case 'BoardingPass':
        Document = <BoardingPassFields document={new BoardingPass(document)} />;
        break;
      case 'GS1':
        Document = <GS1Fields document={new GS1(document)} />;
        break;
      case 'IDCardPDF417':
        Document = <IDCardPDF417Fields document={new IDCardPDF417(document)} />;
        break;
      case 'MedicalCertificate':
        Document = <MedicalCertificateFields document={new MedicalCertificate(document)} />;
        break;
      case 'SEPA':
        Document = <SepaFields document={new SEPA(document)} />;
        break;
      case 'SwissQR':
        Document = <SwissQRFields document={new SwissQR(document)} />;
        break;
      case 'VCard':
        Document = <VCardFields document={new VCard(document)} />;
        break;
      default: {
        Document = <View />;
      }
    }
  }

  return (
    <View>
      <BarcodeFieldRow title={'Parsed Document'} value={document.type.name} />
      {Document}
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    backgroundColor: '#00000026',
  },
});
