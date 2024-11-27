import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ImageStyle, StyleProp, StyleSheet, View} from 'react-native';
import {FILE_ENCRYPTION_ENABLED} from '@utils';
import ScanbotSDK from 'react-native-scanbot-barcode-scanner-sdk';

type PreviewImageProps = {
  imageUri?: string;
  style?: StyleProp<ImageStyle>;
};

export function PreviewImage({imageUri, style}: PreviewImageProps) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDecryptedImageData() {
      try {
        setLoading(true);
        if (imageUri != null) {
          const result = await ScanbotSDK.getImageData(imageUri);
          setUri(`data:image/jpeg;base64,${result.data}`);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    if (FILE_ENCRYPTION_ENABLED) {
      // File encryption is enabled, so we need to load the decrypted image data
      // as base64 from SDK. The SDK decrypts the image data under the hood.
      console.log('Decyption needed', imageUri);
      loadDecryptedImageData();
    } else {
      console.log('not needed', imageUri);
      setUri(imageUri!);
    }
  }, [imageUri, setLoading]);

  if (!imageUri || !uri) {
    return null;
  }

  if (loading) {
    return (
      <View style={[style && style, styles.activityIndicator]}>
        <ActivityIndicator animating={loading} size={'small'} />
      </View>
    );
  }

  return <Image source={{uri: uri}} style={style} />;
}

const styles = StyleSheet.create({
  activityIndicator: {alignItems: 'center', justifyContent: 'center'},
});
