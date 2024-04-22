import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

interface QouteProps {
  contents: string;
  author: string;
}

function App(): React.JSX.Element {
  const [qoutes, setQoutes] = useState<QouteProps | null>(null);

  function getQouteRandomOne() {
    fetch('http://10.0.2.2:8080/getRandomOne')
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data);
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
