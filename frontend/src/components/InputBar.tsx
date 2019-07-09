import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export default class todoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: '',
        }
      }

      onAddItem = () => {
        this.props.handler(this.state.text);
        this.setState(state => {
          return {
            text: '',
          };
        });
        
      };
  render(){
    return (
    <View>
        <TextInput 
        mode="Flat input"
        style={styles.inputContainerStyle}
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
        onSubmitEditing={text => this.onAddItem(text)}
      />
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    wrapper: {
      flex: 1,
    },
    inputContainerStyle: {
      margin: 0,
      paddingVertical: 0,
      padding: 0,
      backgroundColor: '#4c669f'
    },
  });