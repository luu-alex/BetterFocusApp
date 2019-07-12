import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import TodoInput from './InputBar';

import tabBarIcon from '../tabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar'

import {
    Provider as PaperProvider,
  } from 'react-native-paper';

export default class Todo extends React.Component {
    static navigationOptions = {
        tabBarIcon: tabBarIcon('md-calendar'),
      };
    render() {
        const { navigate } = this.props.navigation;
        return (
          
            
            // <LinearGradient style={styles.container} colors={colors}>
            <PaperProvider>
                <AppBar title="Tasks" />
                <TodoInput label="Task" placeholder="Enter new Task"/>
                <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <Text style={styles.text}>Tasks</Text>
                </LinearGradient>
                
            </PaperProvider>
            
            // </LinearGradient>
        
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: 8,
    },
    text: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
  });