import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HomeScreen from './app/screens/HomeScreen';
import axios from 'axios';
axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

interface QouteProps {
  contents: string;
  author: string;
}

function App(): React.JSX.Element {
  const [qoutes, setQoutes] = useState<QouteProps | null>(null);
  const itemlist: QouteProps[] = [];

  function refresh() {
    fetch('http://10.0.2.2:8080/getlq')
      .then(res => res.json())
      .then(data => {
        if (data) {
          data.forEach((item: QouteProps) => {
            itemlist.push(item);
          });
          setQoutes(itemlist[Math.floor(Math.random() * itemlist.length)]);
        } else {
          console.log('data is empty');
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    refresh();
  }, []);

  // return <HomeScreen />;
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
      <Button title="새로고침" onPress={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  titleSize: {
    fontSize: 50,
    textAlign: 'center',
  },
  authorSize: {
    fontSize: 25,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 200,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
