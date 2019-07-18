import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import TodoInput from './InputBar';

import tabBarIcon from '../tabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar'
import Tasklist from './Tasklist'
import API from '../api'

import {
    Provider as PaperProvider,
    FAB,
    Snackbar
  } from 'react-native-paper';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [
          ],
          isFetching: false,
          visible: false,
          visible1: false,
          message:''
        };
    }

    inputHandler = (text) => {
        let data = {
            task: text,
            username: "alir128",
            deadLine: "2019-07-21T02:01:00.000Z"
        }

        return API.post('addTask', data)
                .then(res => {
                    // console.log(res.data)
                    this.setState(state => {
                        const data= [...state.data, res.data];
                        return {
                            data
                        };
                    });
                })
    };

    componentDidMount() {
        API.get(`task/all/alir128`)
          .then(res => {
            const notCompleteTodos = res.data;
            const newData = notCompleteTodos
                .filter(todo => !todo.isItDone);
                // .map(notcomp => ({ key: notcomp.todo}));
            this.setState(state => {
                return{
                    data: newData,
                    isFetching: false
                }
            })
          })
      }

    static navigationOptions = {
        tabBarIcon: tabBarIcon('md-calendar'),
      };
    render() {
        const { navigate } = this.props.navigation;
        return (
          
            
            // <LinearGradient style={styles.container} colors={colors}>
            <PaperProvider>
                <AppBar title="Tasks" />
                {/* <TodoInput label="Task" placeholder="Enter new Task" handler={this.inputHandler} /> */}
                <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <FAB
                        style={styles.fab}
                        icon="add"
                        onPress={() => console.log('Pressed')}
                        // color="white"
                    />
                    <Tasklist data={this.state.data}  onRefresh={this.onRefresh} isFetch={this.state.isFetching} delete={this.deleteHandler}  edit={this.editHandler}/>
                </LinearGradient>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false, message: '' })}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            this.setState({ visible: false, message: '' })
                        },
                    }}
                    duration={Snackbar.DURATION_SHORT}
                    >
                    {this.state.message}
                </Snackbar>
            </PaperProvider>        
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: 8,
    },
    text: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff'
      },
  });