import {
  AAMVADocumentFormat,
  BarcodeResultField,
  BoardingPassDocumentFormat,
  GS1DocumentFormat,
  IDCardPDF417DocumentFormat,
  MedicalCertificateDocumentFormat,
  SEPADocumentFormat,
  SwissQRCodeDocumentFormat,
  VCardDocumentFormat,
} from 'react-native-scanbot-barcode-scanner-sdk';
import {StyleSheet, View} from 'react-native';
import {BarcodeFieldRow} from './BarcodeFieldRow.tsx';
import React from 'react';

function AAMVADocumentFields({document}: {document: AAMVADocumentFormat}) {
  return (
    <View>
      <BarcodeFieldRow title={'File type:'} value={document.fileType} />
      <BarcodeFieldRow
        title={'Aamva version number'}
        value={document.aamvaVersionNumber}
      />
      <BarcodeFieldRow
        title={'Issuer identification number'}
        value={document.issuerIdentificationNumber}
      />
      <BarcodeFieldRow
        title={'Jurisdiction version number'}
        value={document.jurisdictionVersionNumber}
      />
      <BarcodeFieldRow
        title={'Number of entries'}
        value={document.numberOfEntries}
      />
      {document.subfiles.length > 0 && (
        <>
          <BarcodeFieldRow
            title={'Subfiles'}
            value={''}
            style={styles.titleRow}
          />
          {document.subfiles.map((subfile, index) => (
            <View style={styles.fieldsContainer} key={index}>
              <BarcodeFieldRow
                title={'Subfile Type'}
                value={subfile.subFileType}
              />
              <BarcodeFieldRow
                title={'Raw Header'}
                value={subfile.subFileRawHeader}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
}

function BoardingPassFields({
  document,
}: {
  document: BoardingPassDocumentFormat;
}) {
  return (
    <View>
      <BarcodeFieldRow title={'Security Data'} value={document.securityData} />
      <BarcodeFieldRow
        title={'Electronic ticket'}
        value={document.electronicTicket}
      />
      <BarcodeFieldRow title={'Number of legs'} value={document.numberOfLegs} />
    </View>
  );
}

function GS1Fields({document}: {document: GS1DocumentFormat}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.fields.map((field, index) => (
        <View style={styles.fieldsContainer} key={index}>
          <BarcodeFieldRow
            title={'Description'}
            value={field.fieldDescription}
          />
          <BarcodeFieldRow title={'Raw Value'} value={field.rawValue} />
          <BarcodeFieldRow title={'Data Title'} value={field.dataTitle} />
          <BarcodeFieldRow
            title={'Application ID'}
            value={field.applicationIdentifier}
          />
          <BarcodeFieldRow title={'Standard'} value={field.standard} />
          <BarcodeFieldRow
            title={'Validation Status'}
            value={field.validationStatus}
          />
        </View>
      ))}
    </View>
  );
}

function IDCardPDF417Fields({
  document,
}: {
  document: IDCardPDF417DocumentFormat;
}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.fields.map((field, index) => (
        <View style={styles.fieldsContainer} key={index}>
          <BarcodeFieldRow title={field.type ?? 'Type'} value={field.value} />
        </View>
      ))}
    </View>
  );
}

function MedicalCertificateFields({
  document,
}: {
  document: MedicalCertificateDocumentFormat;
}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.fields.map((field, index) => (
        <View style={styles.fieldsContainer} key={index}>
          <BarcodeFieldRow title={field.type ?? 'Type'} value={field.value} />
        </View>
      ))}
    </View>
  );
}

function SepaFields({document}: {document: SEPADocumentFormat}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.fields.map((field, index) => (
        <View style={styles.fieldsContainer} key={index}>
          <BarcodeFieldRow title={field.type} value={field.value} />
        </View>
      ))}
    </View>
  );
}

function SwissQRFields({document}: {document: SwissQRCodeDocumentFormat}) {
  return (
    <View>
      <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.fields.map((field, index) => (
        <View style={styles.fieldsContainer} key={index}>
          <BarcodeFieldRow title={field.type} value={field.value} />
        </View>
      ))}
    </View>
  );
}

function VCardFields({document}: {document: VCardDocumentFormat}) {
  return (
    <View>
      <View>
        <BarcodeFieldRow title={'Fields'} value={''} style={styles.titleRow} />
        {document.fields.map((field, index) => (
          <View style={styles.fieldsContainer} key={index}>
            <BarcodeFieldRow title={'Raw Text'} value={field.rawText ?? ''} />
            <BarcodeFieldRow title={'Type'} value={field.type} />
            <BarcodeFieldRow
              title={'Type Modifiers'}
              value={field.typeModifiers.join(', ')}
            />
            <BarcodeFieldRow title={'Values'} value={field.values.join(', ')} />
          </View>
        ))}
      </View>
    </View>
  );
}

export function BarcodeDocumentFormatField({
  document,
}: {
  document: BarcodeResultField['formattedResult'];
}) {
  if (!document || !document.parsedSuccessful) {
    return null;
  }

  let Document;
  switch (document.documentFormat) {
    case 'AAMVA':
      Document = (
        <AAMVADocumentFields document={document as AAMVADocumentFormat} />
      );
      break;
    case 'BOARDING_PASS':
      Document = (
        <BoardingPassFields document={document as BoardingPassDocumentFormat} />
      );
      break;
    case 'GS1':
      Document = <GS1Fields document={document as GS1DocumentFormat} />;
      break;
    case 'ID_CARD_PDF_417':
      Document = (
        <IDCardPDF417Fields document={document as IDCardPDF417DocumentFormat} />
      );
      break;
    case 'MEDICAL_CERTIFICATE':
      Document = (
        <MedicalCertificateFields
          document={document as MedicalCertificateDocumentFormat}
        />
      );
      break;
    case 'SEPA':
      Document = <SepaFields document={document as SEPADocumentFormat} />;
      break;
    case 'SWISS_QR':
      Document = (
        <SwissQRFields document={document as SwissQRCodeDocumentFormat} />
      );
      break;
    case 'VCARD':
      Document = <VCardFields document={document as VCardDocumentFormat} />;
      break;
    default: {
      Document = <View />;
    }
  }

  return (
    <View>
      <BarcodeFieldRow
        title={'Parsed Document'}
        value={document.documentFormat}
      />
      {Document}
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    backgroundColor: '#00000026',
  },
  fieldsContainer: {
    backgroundColor: '#00000026',
  },
});
