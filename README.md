# Scanbot Barcode Scanner SDK React Native Examples
These example apps demonstrate how to integrate the [Scanbot Barcode Scanner SDK for React Native](https://scanbot.io/developer/react-native-barcode-scanner/) for Android and iOS.


## What is Scanbot Barcode Scanner SDK?
The Scanbot Barcode Scanner SDK brings barcode scanning capabilities to your mobile apps.
It provides functionality for scanning [1D](https://scanbot.io/products/barcode-software/1d-barcode-scanner/) and [2D](https://scanbot.io/products/barcode-software/2d-barcode-scanner/) barcodes, like [EAN](https://scanbot-sdk.com/products/barcode-software/1d-barcode-scanner/ean/), [UPC](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc/), [QR code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/qr-code/), [Data Matrix](https://scanbot.io/products/barcode-software/2d-barcode-scanner/data-matrix/), [PDF-417](https://scanbot.io/products/barcode-software/2d-barcode-scanner/pdf417/), etc.

For more details check out our blog post [Types of barcodes](https://scanbot.io/blog/types-of-barcodes-and-their-usage)

The SDK for React Native is available as an npm package:
- https://www.npmjs.com/package/react-native-scanbot-barcode-scanner-sdk

## Installation

* `npm install`
* `cd ios && pod install`
* `react-native run-ios --device` or `react-native run-android`

- Open the **workspace** file `ScanbotBarcodeExampleReact.xcworkspace` (not .xcodeproj) from the `ios` directory in Xcode.
- Adjust *Provisioning* and *Signing* settings.
- And run the app in Xcode or via `react-native run-ios`.

## Requirements

### Built using

* `react-native-cli` `latest`
* `node` v12.13.0
* `npm` v6.12.0

### What else can go wrong?

###### Pod not found

`pod repo update`

###### Still at a loss? It is probably a cache issue

* `npm cache clean --force`
* Restart metro server! (Yes, apparently that thing has its own cache as well)

## Documentation

For more details about the Scanbot Barcode Scanner SDK for React Native please see this
[documentation](https://docs.scanbot.io/barcode-scanner-sdk/react-native/introduction/).

## Please note

The Scanbot Barcode Scanner SDK will run without a license for one minute per session!

After the trial period has expired all SDK functions as well as the UI components (like Barcode Scanner UI) will stop working.
You have to restart the app to get another trial period.

To get a free "no-strings-attached" trial license, please submit the [Trial License Form](https://scanbot.io/trial/) on our website.
