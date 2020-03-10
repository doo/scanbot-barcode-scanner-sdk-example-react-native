# Scanbot Barcode Scanner SDK React Native Examples
These example apps show how to integrate the Scanbot Barcode Scanner SDK for Android and iOS with React Native


## What is Scanbot Barcode Scanner SDK?
The Scanbot Barcode Scanner SDK brings barcode scanning capabilities to your mobile apps.
It provides functionality for scanning 1D and 2D barcodes, like EAN, UPC, QR code, Data Matrix, PDF 417, etc.
For more details visit our website https://scanbot.io/sdk

The SDK for React Native is available as an npm package:
- TODO

## Installation

* `npm install`
* `cd ios && pod install`
* `react-native run-ios --device` or `react-native run-android`

## Requirements

### Built using

* `react-native` v3.0.1
* `node` v12.13.0
* `npm` v6.12.0

### What else can go wrong?

###### Keystore file '../scanbot-barcode-scanner-sdk-example-react-native/android/app/debug.keystore' not found for signing config 'debug'.`

 `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey 
-keypass android -keyalg RSA -keysize 2048 -validity 10000`

###### Pod not found

`pod repo update`

###### Still at a loss? It's a probably a cache issue

* `npm cache clean --force`
* Restart metro server! (Yes, apparently that thing has its own cache as well)

## Documentation

For more details about the Scanbot Barcode Scanner SDK for Xamarin please see this 
[documentation](https://scanbotsdk.github.io/documentation/barcode-scanner-sdk/react-native/).

## Please note

The Scanbot Barcode Scanner SDK will run without a license for one minute per session!

After the trial period is over all SDK functions as well as the UI components (like Barcode Scanner UI) will stop working.
You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the [Trial License Form](https://scanbot.io/sdk/trial.html) on our website.

## Appendices

### Developer notes

If to download a local version of the pod, change pod source directory as such:

```
#s.source       = { :http => 'https://download.scanbot.io/sdk/react-native/react-native-scanbot-barcode-scanner-sdk-' + package['version'] + '.tgz' }
s.source = { :http => 'file:///<full-path-to-package>/react-native-scanbot-barcode-sdk-1.0.0-rc1.tgz' }
```

