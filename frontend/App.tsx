import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import Navigator from './src/navigator';


const App = createAppContainer(Navigator);


export default () => (
  <View style={{ flex: 1, marginTop: 0 }}>
    <App />
  </View>
);
