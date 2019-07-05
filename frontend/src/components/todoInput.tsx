import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, TextInput } from 'react-native-paper';

export default class todoInput extends React.Component {
  state = {
    text: ''
  };

  render(){
    return (
    <View>
        <TextInput 
        mode="outlined"
        style={styles.inputContainerStyle}
        label='To Do'
        placeholder="Enter new To Do"
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    wrapper: {
      flex: 1,
    },
    inputContainerStyle: {
      margin: 8,
    },
  });