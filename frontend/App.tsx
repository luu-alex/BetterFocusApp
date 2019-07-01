import React, { Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyButton from './src/components/MyButton.tsx';

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text> working on your!</Text>
          <MyButton />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
