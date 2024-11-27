import React, {useCallback} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ImageResultsScreenRouteProp} from '@utils';
import {PreviewImage} from '../components/PreviewImage.tsx';

export function ImageResultsScreen() {
  const {params} = useRoute<ImageResultsScreenRouteProp>();
  const dimen = useWindowDimensions();

  const onRenderItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <PreviewImage
          imageUri={item}
          style={[{width: dimen.width, height: dimen.height / 2}, styles.imageContainer]}
        />
      );
    },
    [dimen.height, dimen.width],
  );

  return (
    <View style={styles.container}>
      <FlatList data={[...params]} renderItem={onRenderItem} />
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
});
