import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function HomeItem(props: {title: string; onPress: () => void}) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.sectionItemContainer}>
        <Text style={styles.sectionItem}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionItemContainer: {
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
  },
  sectionItem: {
    fontSize: 17,
    marginTop: 14,
    marginBottom: 5,
  },
});
