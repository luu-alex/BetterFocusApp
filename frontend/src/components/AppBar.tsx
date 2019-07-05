import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Appbar } from 'react-native-paper';
export const DEFAULT_APPBAR_HEIGHT = 56;
export default class MyComponent extends React.Component {
  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
      
    return (
      <Appbar.Header style={styles.bottom}>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title="Todo list"
        />
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
    appbar: {
        height: DEFAULT_APPBAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        elevation: 4,
      },
      spacing: {
        width: 48,
      },
  });