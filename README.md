# Scanbot Barcode Scanner SDK Example Apps for React Native
These example apps demonstrate how to integrate the [Scanbot Barcode Scanner SDK for React Native](https://scanbot.io/developer/react-native-barcode-scanner/) for Android and iOS.


## What is the Scanbot Barcode Scanner SDK?

Scanbot Barcode Scanner SDK is a simple to use high level API, providing a collection of classes and functions for scanning and parsing 1D and 2D barcodes from your mobile device's camera or other image sources like your photo library.

The SDK for React Native is available as an npm package:
- https://www.npmjs.com/package/react-native-scanbot-barcode-scanner-sdk

## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To test the Scanbot SDK without crashing, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).


## Supported Barcode Types

- [1D Barcodes](https://scanbot.io/products/barcode-software/1d-barcode-scanner/): [Codabar](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/codabar), [Code 39](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/code-39), [Code 93](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-93/), [Code 128](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-128/), [IATA 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/standard-2-of-5/), [Industrial 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/industrial-2-of-5/), [ITF](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/itf), [EAN-8](https://scanbot.io/products/barcode-software/1d-barcode-scanner/ean-8), [EAN-13](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/ean-code), [MSI Plessey](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/msi-plessey), [RSS 14](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/), [RSS Expanded (Databar)](https://scanbot.io/products/barcode-software/1d-barcode-scanner/rss-expanded/), [UPC-A](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc/), [UPC-E](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc-e/), [Code 25](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-25/), [USPS Intelligent Mail](https://scanbot.io/products/barcode-software/1d-barcode-scanner/intelligent-mail-barcode/), [RM4SCC](https://scanbot.io/products/barcode-software/1d-barcode-scanner/rm4scc/), [Japan Post 4-State](https://scanbot.io/products/barcode-software/1d-barcode-scanner/japan-post-4-state-customer-code/), [Australia Post 4-State](https://scanbot.io/products/barcode-software/1d-barcode-scanner/australia-post-4-state-customer-code/), [KIX](https://scanbot.io/products/barcode-software/1d-barcode-scanner/kix/), RSS Limited (Databar), GS1 Composite.
- [2D Barcodes](https://scanbot.io/products/barcode-software/2d-barcode-scanner/): [Aztec](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/aztec), [Data Matrix](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/datamatrix), [PDF417](https://scanbot.io/products/barcode-software/2d-barcode-scanner/pdf417/), [QR Code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/qr-code/), [Micro QR Code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/micro-qr-code/).

💡 Also check out our blog post [Types of barcodes](https://scanbot.io/blog/types-of-barcodes/).


## Supported Data Parsers:

- [AAMVA](https://scanbot.io/blog/drivers-license-barcode-parser/): Parse the AAMVA data format from PDF-417 barcodes on US driver's licenses.
- Boarding pass data from PDF417 barcodes.
- Parser for German Medical Certificates (aka. Disability Certificate or AU-Bescheinigung) coded in a PDF-417 barcode.
- [GS1](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/) encoded data from barcodes.
- Data from PDF-417 barcodes on ID Cards.
- Parse and extract data from XML of Data Matrix barcodes on Medical Plans (German Medikationsplan).
- Data parser of QR-Code values printed on SEPA pay forms.
- vCard data from a QR-Code (e.g. on business cards).
- [Swiss QR](https://scanbot.io/products/barcode-software/2d-barcode-scanner/swiss-qr/) data from a QR-Code for easy, automatic and efficient payments.

For more details please refer to the SDK documentation.


## Documentation

For more details about the Scanbot Barcode Scanner SDK for React Native please see this
[documentation](https://docs.scanbot.io/barcode-scanner-sdk/react-native/introduction/).

# How to run this app

## Step 0: Install Command Line Tools

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

## Step 1: Install Dependencies

To install the project dependencies, run the following commands

```bash
# Install the required dependencies
yarn

# Install the iOS dependencies
cd ios 
bundle install
bundle exec pod install --repo-update
cd ..
```

## Step 2: Start your Application

Plugin in your physical device via USB and run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn run android
```
or 
```bash
npm run android
```

### For iOS

Setup Environment, Provisioning and Signing settings:

- Starting from React Native version 0.69, the [suggested approach](https://reactnative.dev/docs/set-up-your-environment?platform=ios#optional-configuring-your-environment) is to configure the Xcode environment using the `.xcode.env` file. The `.xcode.env` file contains an environment variable to export the path to the `node` executable in the `NODE_BINARY` variable. Please make sure that you've set the path correctly. You can also set the path from the terminal:
  
```bash
cd ios
echo export NODE_BINARY=$(command -v node) > .xcode.env.local
```

- Open the **workspace** file `ScanbotBarcodeExampleReact.xcworkspace` (not .xcodeproj) from the `ios` directory in Xcode.
- Adjust *Provisioning* and *Signing* settings.

Then run:

```bash
yarn run ios
```
or
```bash
npm run android
```

If everything is set up _correctly_, you should see your new app running on your device.

This is not the only way to run your app — you can also run it directly from within Android Studio and Xcode respectively:

## Using the new architecture

Scanbot Barcode SDK supports the [new architecture](https://reactnative.dev/docs/new-architecture-intro). Here's how you can enable it in this app.

**Android**

Set `newArchEnabled` your `android/gradle.properties` file as true:

*android/gradle.properties*

```properties
newArchEnabled=true
```

**iOS**

Re-install the iOS dependencies by running the following commands:

```bash
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install --repo-update
cd ..
```

### What else can go wrong?

###### Pod not found

`pod repo update`

###### Still at a loss? It is probably a cache issue

```bash
yarn run clean
```
* `npm cache clean --force && watchman watch-del-all`
* Restart metro server!
