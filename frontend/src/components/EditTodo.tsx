import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';

import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import DateTime from './DatePicker'

export default class EditTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: ''
        }
      }

      componentDidUpdate(prevProps) {
        if (this.props.visible === true && prevProps.visible === false) {
            this.setState({text: this.props.item.todo})
        }
    }

      onAddItem = () => {
        // this.props.handler(this.state.text);
        this.props.handler(this.props.item._id,this.state.text);
        this.setState(state => {
          return {
            text: '',
          };
        });
      };
    render(){
        
        return (
            <Portal>
                <Dialog onDismiss={this.props.close} visible={this.props.visible}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.ScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                    <TextInput 
                        mode="Flat input"
                        style={styles.inputContainerStyle}
                        label={"Edit To do"}
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })}
                        onSubmitEditing={this.onAddItem}
                    />
                    <DateTime />
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                <Button onPress={this.onAddItem}>Save</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }
};

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
      backgroundColor: '#fff'
    },
  });