import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import tabBarIcon from './tabBarIcon';

const createScreen = ({ icon, colors, title }) => {
  return class SomeScreen extends React.Component {
    static navigationOptions = {
      tabBarIcon: tabBarIcon(icon),
    };

    render() {
      return (
          
            
            <LinearGradient style={styles.container} colors={colors}>
            
            <Text style={styles.text}>{title}</Text>
            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </LinearGradient>
        
      );
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
  };
};

export const First = createScreen({
  icon: 'note-add',
  colors: ['#4c669f', '#3b5998', '#192f6a'],
  title: 'Screen 1',
});

export const Second = createScreen({
  icon: 'playlist-add',
  colors: ['#4c669f', '#3b5998', '#192f6a'],
  title: 'Screen 2',
});

export const Third = createScreen({
  icon: 'md-stats',
  colors: ['#4c669f', '#3b5998', '#192f6a'],
  title: 'Screen 3',
});

// export const fourth = createScreen({
//     icon: 'shopping-cart',
//     colors: ['#4c669f', '#3b5998', '#192f6a'],
//     title: 'Screen 4',
//   });

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
