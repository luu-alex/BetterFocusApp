import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTime from './DatePicker'

export default class DialogNewEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: '',
          date: '',
          title: ''
        }
      }

      componentDidUpdate(prevProps) {
        if (this.props.visible === true && prevProps.visible === false) {
            this.setState({text: this.props.item ? (this.props.item.todo ? this.props.item.todo: this.props.item.task) : '', date: this.props.item ? this.props.item.deadLine : '', title: this.props.title, inputMessage: this.props.inputMessage})
        }
    }

    dateHandler = (date) => {
        this.setState({date: date})
    }

      onAddItem = () => {
        // this.props.handler(this.state.text);
        this.props.handler(this.props.item ? this.props.item._id: '',this.state);
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
                <Dialog.Title>{this.state.title}</Dialog.Title>
                <Dialog.ScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                    <TextInput 
                        mode="Flat input"
                        style={styles.inputContainerStyle}
                        label={this.state.inputMessage}
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })}
                        onSubmitEditing={this.onAddItem}
                    />
                    <DateTime dateAvailable={this.state.inputMessage=="Reminder" ? false: true} dateHandler={this.dateHandler} dateGiven={this.state.date} />
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