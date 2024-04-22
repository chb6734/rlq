import React, {useEffect, useState} from 'react';
import {
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
  const send_param = {headers};
  const itemlist: QouteProps[] = [];
  var itemCnt: number = 0;

  useEffect(() => {
    fetch('http://10.0.2.2:8080/getlq')
      .then(res => res.json())
      .then(data => {
        if (data) {
          data.forEach((item: QouteProps) => {
            itemlist.push(item);
            console.log('console : ' + itemlist);
          });
          console.log('itemlist : ' + itemlist);
          itemCnt = itemlist.length;
          setQoutes(itemlist[Math.floor(Math.random() * itemCnt)]);
        } else {
          console.log('fail');
        }
        // console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   const getQoutes = async () => {
  //     try {
  //       const res: any = await fetch('http://10.0.2.2:8080/getlq');
  //       const qouteRes = res.json();
  //       console.log('res : ' + res.data);

  //       const itemlist: QouteProps[] = [];
  //       if (qouteRes.data) {
  //         qouteRes.forEach((item: QouteProps) => {
  //           itemlist.push(item);
  //           console.log('console : ' + itemlist);
  //         });
  //         setQoutes(itemlist[Math.random()]);
  //       }
  //     } catch (err) {
  //       console.log('err : ' + err);
  //     }
  //   };
  //   getQoutes();
  // }, []);

  console.log('test : ' + qoutes);

  // return <HomeScreen />;
  return (
    <View>
      <Text style={styles.titleSize}>
        {/* {qoutes?[Math.floor(Math.random() * qoutes.length)]} */}
        {qoutes?.contents}
      </Text>
      <Text style={styles.authorSize}>{'-' + qoutes?.author + '-'}</Text>
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
