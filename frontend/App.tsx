import React, { Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ClockContainer from './src/components/clockScreen/ClockContainer';

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <ClockContainer/>
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
