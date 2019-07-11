import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, SafeAreaView } from 'react-native';
import Navigator from './src/navigator';


const App = createAppContainer(Navigator);


export default () => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#3b5998'}}>
        <View style={{ flex: 1, marginBottom: 0 }}>
            <App />
        </View>
    </SafeAreaView>

);
