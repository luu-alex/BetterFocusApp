import React, { Component } from 'react';
import { Button, View } from 'react-native';

class MyButton extends Component {
    render() {
        return (
            <View>
                <Button
                    title="Press me"
                />
            </View>
        )
    }
}

export default MyButton;
