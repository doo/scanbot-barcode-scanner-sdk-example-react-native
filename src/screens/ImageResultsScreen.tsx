import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FILE_ENCRYPTION_ENABLED, ImageResultsScreenRouteProp } from '@utils';
import { PreviewImage } from '../components/PreviewImage.tsx';
import ScanbotSDK from 'react-native-scanbot-barcode-scanner-sdk';

export function ImageResultsScreen() {
  const { params } = useRoute<ImageResultsScreenRouteProp>();
  const [imageUris, setImageUri] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dimen = useWindowDimensions();

  useEffect(() => {
    async function loadDecryptedImageData() {
      try {
        setLoading(true);
        if (params.length > 0) {
          setImageUri(
            await Promise.all(
              params.map(
                async imageUrl =>
                  `data:image/jpeg;base64,${await ScanbotSDK.getImageData(imageUrl)}`,
              ),
            ),
          );
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
      loadDecryptedImageData();
    } else {
      setImageUri([...params]);
    }
  }, [params, setLoading]);

  const onRenderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <PreviewImage
          imageSource={item}
          style={[{ width: dimen.width, height: dimen.height / 2 }, styles.imageContainer]}
        />
      );
    },
    [dimen.height, dimen.width],
  );

  if (loading) {
    return (
      <View style={[styles.activityIndicator]}>
        <ActivityIndicator animating={loading} size={'small'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={imageUris} renderItem={onRenderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: '12%',
    resizeMode: 'contain',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
