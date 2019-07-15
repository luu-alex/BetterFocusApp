import React, { Component } from 'react';
import { Button, View } from 'react-native';
import MyButton from '../MyButton';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home Screen'
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <MyButton / >
        )
    }
}

export default HomeScreen;
