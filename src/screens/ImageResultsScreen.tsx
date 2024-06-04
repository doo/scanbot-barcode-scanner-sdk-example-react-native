import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ImageResultsScreenRouteProp} from '../utils/Navigation.ts';
import {COLORS} from '../theme';

export function ImageResultsScreen() {
  const {params} = useRoute<ImageResultsScreenRouteProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={[...params, ...params]}
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item}} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    backgroundColor: COLORS.SCANBOT_RED,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 12,
    borderBottomColor: COLORS.SCANBOT_RED,
  },
  image: {
    width: '100%',
    height: 500,
  },
});
