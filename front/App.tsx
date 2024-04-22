import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import axios from 'axios';
axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

interface QouteProps {
  contents: string;
  author: string;
}

function App(): React.JSX.Element {
  const [qoutes, setQoutes] = useState<QouteProps | null>(null);

  const copyQoutesToClipboard = async (qoute: QouteProps | null) => {
    try {
      if (qoute) var text = qoute?.contents + '\n' + '-' + qoute?.author + '-';
      else {
        Alert.alert('복사할 명언이 없습니다.');
        return;
      }
      await Clipboard.setString(text);
      Alert.alert('복사되었습니다');
      console.log('success');
    } catch (err) {
      Alert.alert('복사 실패');
    }
  };

  function getQouteRandomOne() {
    fetch('http://10.0.2.2:8080/getRandomOne')
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log('data : ' + data);
          setQoutes(data);
        } else {
          console.log('data is empty');
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getQouteRandomOne();
  }, []);

  return (
    <View>
      {qoutes ? (
        <>
          <Text style={styles.titleSize}>{qoutes?.contents}</Text>
          <Text style={styles.authorSize}>{'-' + qoutes?.author + '-'}</Text>
        </>
      ) : (
        <Text style={styles.titleSize}>데이터가 없습니다.</Text>
      )}
      <Button title="새로고침" onPress={getQouteRandomOne} />
      <Button
        title="명언 공유"
        onPress={() => {
          copyQoutesToClipboard(qoutes);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleSize: {
    fontSize: 50,
    textAlign: 'center',
  },
  authorSize: {
    fontSize: 25,
    textAlign: 'right',
  },
});

export default App;
