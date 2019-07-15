import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import ClockButton from './ClockButton';
import { Button, Card, Text } from 'react-native-elements';
import tabBarIcon from '../../tabBarIcon';

class ClockContainer extends Component {
    state = {
        timer: 60,
        intervalHandle: null,
        countingDown: false
    }
    tick = () => {
        this.setState((prevState, props) => {
            return {timer: prevState.timer-1};
        });
    };
    handleTimerClick = () => {
        const countingDown = this.state.countingDown;
        const tick = this.tick;
        if (!countingDown) {
            const interval = setInterval(tick, 1000);
            this.setState({
                intervalHandle: interval,
                countingDown: true
            });
        } else {
            const interval = this.state.intervalHandle;
            clearInterval(interval);
            this.setState({
                intervalHandle: null,
                countingDown: false
            });
        }
    }

    resetTimer = () => {
        this.setState({
            timer:60
        })
    }

    static navigationOptions = {
        tabBarIcon: tabBarIcon('md-alarm'),
      };
    render() {
        const {countingDown, timer} = this.state;
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);

        return (
            <Card>
                <Card containerStyle={{flex:4, width: screenWidth}}>
                    <Text h1> {timer}</Text>
                </Card>
                <Card containerStyle={{flex:2}} wrapperStyle={{
                    flexDirection:'row',
                    flex:1,
                    justifyContent:'space-around'
                }}>
                    {countingDown ?
                        <Button title="Stop Timer" onPress={this.handleTimerClick}/>
                        :
                        <Button title="Start Timer" onPress={this.handleTimerClick}/>}
                    <Button title="Reset Timer" onPress={this.resetTimer}/>
                </Card>
                <Card containerStyle={{flex:1}} wrapperStyle={{
                    flexDirection:'row',
                    flex:1,
                    justifyContent:'space-around'
                }}>
                </Card>
            </Card>
        )
    }
}

export default ClockContainer;
