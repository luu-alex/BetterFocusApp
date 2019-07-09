import React, { Component } from 'react';
import { View, Button } from 'react-native';

class ClockButton extends Component {
    // Component.propTypes = {
    //     handleTimerClick: PropTypes.function.isRequired
    // }

    render() {
        const handleTimerClick = this.props.handleTimerClick;

        return (
            <View>
                <Button
                    title="Press me" onPress={handleTimerClick}
                />
            </View>
        )
    }
}

export default ClockButton;
