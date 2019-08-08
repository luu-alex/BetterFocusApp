import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { View, SafeAreaView } from 'react-native';
import AppNav from './src/navigator';
import AuthLoadingScreen from './src/AuthLoadingScreen'
import SignInScreen from './src/components/SignInScreen';
import RegisterScreen from './src/components/RegisterScreen'


const AuthStack = createStackNavigator({ SignIn: {screen: SignInScreen, navigationOptions: {
    header: null,
  }}, Register: {screen: RegisterScreen, navigationOptions: {
    header: null,
  }} });
const App = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        AppStack: AppNav,
        Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
));


export default () => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#3b5998'}}>
        <View style={{ flex: 1, marginBottom: 0 }}>
            <App />
        </View>
    </SafeAreaView>

);
