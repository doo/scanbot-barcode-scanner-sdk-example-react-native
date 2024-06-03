import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '../theme';

export function SupportSection() {
  const onContactSupportPress = useCallback(() => {
    const supportUrl = 'https://docs.scanbot.io/support/';
    Linking.canOpenURL(supportUrl)
      .then(() => Linking.openURL(supportUrl))
      .catch(error => console.log(error));
  }, []);

  const onGetTrialLicense = useCallback(() => {
    const trialUrl = 'https://scanbot.io/trial/';
    Linking.canOpenURL(trialUrl)
      .then(() => Linking.openURL(trialUrl))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Having trouble with integrating ?</Text>
      <Button title={'Contact support'} onPress={onContactSupportPress} />
      <Text onPress={onGetTrialLicense} style={styles.trialText}>
        Get your trial license now -&gt;
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: '#fceeed',
    paddingHorizontal: '4%',
    paddingVertical: 16,
    gap: 16,
  },
  questionText: {
    fontWeight: 'bold',
    letterSpacing: 0.4,
    fontSize: 18,
  },
  trialText: {
    fontSize: 14,
    color: COLORS.SCANBOT_RED,
  },
});
