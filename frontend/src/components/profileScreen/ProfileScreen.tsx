import React, { Component } from 'react';
import { Button, View } from 'react-native';


class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile Screen'
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <MyButton / >
        )
    }
}

export default ProfileScreen;
