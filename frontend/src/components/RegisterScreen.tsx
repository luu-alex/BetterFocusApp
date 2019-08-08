
import React from 'react';
import {
    AsyncStorage,
    
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { TextInput } from 'react-native-paper';
  import { Provider as PaperProvider, Button, } from 'react-native-paper';
  import API from '../api'


export default class SignInScreen extends React.Component {
    state = {
        username: '',
        password: '',
        name: ''
      }
    render() {
      return (
        <PaperProvider>
            
            <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998']}>

            <Text style={styles.text}>Register</Text>
            <View style={styles.spacebetween}>
            <TextInput 
                mode="Flat input"
                style={styles.inputContainerStyle}
                // label={this.props.label}
                placeholder="Full Name"
                value={this.state.name}
                spellCheck={false}
                onChangeText={name => this.setState({ name })}
                textContentType={'name'}
                // onSubmitEditing={text => this.onAddItem(text)}
            />
            <TextInput 
                mode="Outlined input"
                style={styles.inputContainerStyle}
                // label={this.props.label}
                placeholder="Username"
                value={this.state.username}
                spellCheck={false}
                onChangeText={username => this.setState({ username })}
                textContentType={'username'}
                // onSubmitEditing={text => this.onAddItem(text)}
            />
            <TextInput 
                mode="Outlined input"
                style={styles.inputContainerStyle}
                // label={this.props.label}
                placeholder="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                spellCheck={false}
                textContentType={'newPassword'}
                onSubmitEditing={this._register}
            />
            
            <Button style={styles.button } mode="contained" onPress={this._register} color={'white'} compact={true} >Sign Up </Button>
            <Button style={styles.button } mode="contained" onPress={this._SignIn} color={'white'} compact={true} >Already have an account </Button>
            </View>
            </LinearGradient>
        </PaperProvider>
      );
    }
    _SignIn = () => {
        this.props.navigation.navigate('SignIn');
      };
  
    _register = async () => {
        let data = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        }
        if(data.username ==''|| data.password=='' || data.name==''){
            return
        }
        API.post("addUser", data)
            .then(async res => {
                // await AsyncStorage.multiSet([['userToken',res.data.token], ['username', res.data.username]]);
                this.props.navigation.navigate('SignIn')

            })
            .catch(err => console.log(err))
            this.setState(state => {
                return {
                  username: '',
                  password: '',
                  name: ''
                };
              });

    //   await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzljMzNiNDA2ZDk5N2JlNTM3YTUzMSIsInVzZXJuYW1lIjoiYWxpMTI4IiwiaWF0IjoxNTY1MTkxOTk5LCJleHAiOjE1NjUxOTU1OTl9.manw8UVdgXZb-g-YDk2pXPAuVR14Qeq8mHlJYqsJ9VE');
    //   this.props.navigation.navigate('AppStack')
    };
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
      },
      spacebetween: {
        paddingTop: 20,
      },
      button: {
        margin: 10
      },
    text: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
      },
      wrapper: {
        flex: 1,
      },
      inputContainerStyle: {
        margin: 10,
        paddingVertical: 0,
        padding: 10,
        backgroundColor: '#fff'
      },
  });