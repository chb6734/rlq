import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 30,
    fontStyle: 'italic',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
