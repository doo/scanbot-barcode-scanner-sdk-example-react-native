import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles/ScanbotStatusBarColorStyles';

const ScanbotStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default ScanbotStatusBarColor;
