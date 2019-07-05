import React, { Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyButton from './src/components/MyButton';
import TodoInput from './src/components/todoInput';
import AppBar from './src/components/AppBar'
import BottomNav from './src/components/bottomNavbar'
import {
    Appbar,
    Provider as PaperProvider,
    DarkTheme,
    DefaultTheme,
  } from 'react-native-paper';


export default class App extends Component {
  render() {
    return (
        <PaperProvider>
            <AppBar />
            <TodoInput />
            <BottomNav />
        </PaperProvider>
        
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});