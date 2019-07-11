import React, { Component, createRef } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Keyboard, View, StyleSheet } from 'react-native';
import { Text, TextInput, TouchableRipple } from 'react-native-paper';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      open: false
    };
    this._textInput = createRef();
  }

  handleFocus = () => {
    this._textInput.current._root._handleFocus();
  };

  handleBlur = () => {
    setTimeout(this._textInput.current._root._handleBlur, 100);
  };

  handleChange = date => {
    this.handleClose();
    this.setState({ date });
  };

  handleClose = () => {
    this.setState({ open: false }, this.handleBlur);
  };

  handleOpen = () => {
    Keyboard.dismiss();
    this.handleFocus();
    this.setState({ open: true });
  };

  renderTouchText = props => {
    const { style, value } = props;

    return (
      <TouchableRipple onPress={this.handleOpen}>
        <Text style={style}>{value}</Text>
      </TouchableRipple>
    );
  };

  render() {
    const { date, open } = this.state;
    const value = date ? date.toLocaleString() : '';

    return (
      <View style={{ flex: 1, justifyContent:'center' , backgroundColor: '#fff'}}>
        <TextInput
          label='Completion date'
          ref={this._textInput}
          render={this.renderTouchText}
          value={value}
          style={styles.inputContainerStyle}
          
        />
        <DateTimePicker
          date={date}
          isVisible={open}
          onConfirm={this.handleChange}
          onCancel={this.handleClose}
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
      backgroundColor: '#fff'
    },
  });

export default DatePicker;