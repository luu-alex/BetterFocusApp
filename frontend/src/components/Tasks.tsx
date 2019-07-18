import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import tabBarIcon from '../tabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from './AppBar'
import Tasklist from './Tasklist'
import API from '../api'
import NewTask from './DialogNewEdit'

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
          _SnackbarVisible: false,
          message:'',
          NewDialogVisible: false
        };
    }

    _NewTaskHandler = (id, task) => {
        let data = {
            task: task.text,
            username: "alir128",
            deadLine: task.date
        }

        return API.post('addTask', data)
                .then(res => {
                    // console.log(res.data)
                    this.setState(state => {
                        const data= [...state.data, res.data];
                        return {
                            data,
                            NewDialogVisible: false
                        };
                    });
                })
    };

    _deleteHandler = (item_id) => {
        // console.log(item_id)
        API.delete('task/delete/'+item_id)
            .then(res => {
                this.setState(state => ({ _SnackbarVisible: !state._SnackbarVisible, message: 'Deleted successfully' }), this._onRefresh())
            })
        
    }

    _editHandler = (item_id, task) => {
        let data = {
            task: task.text,
            username: "alir128",
            deadLine: task.date
        }
        return API.put('task/edit/'+item_id, data)
                 .then(res => {
                    this._onRefresh();
                    this.setState(state => ({ _SnackbarVisible: !state._SnackbarVisible, message: 'Edited successfully' }))
                 })

    }

    componentDidMount() {
        API.get(`task/all/alir128`)
          .then(res => {
            const notCompleteTasks = res.data;
            const newData = notCompleteTasks
                .filter(task => !task.isItDone);
            this.setState(state => {
                return{
                    data: newData,
                    isFetching: false
                }
            })
          })
    }

    _onRefresh = () => {
        this.setState({ isFetching: true }, () => { this.refreshTasks() });
     }

    refreshTasks = () => {   
        API.get(`task/all/alir128`)
        .then(res => {
          
          const notCompleteTask = res.data;
          const newData = notCompleteTask
              .filter(task => !task.isItDone);
            //   .map(notcomp => ({ key: notcomp.todo}));
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
      _closeNewDialog = () => {this.setState({NewDialogVisible:false})}
    render() {
        const { navigate } = this.props.navigation;
        return (
            <PaperProvider>
                <AppBar title="Tasks" />
                <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <Tasklist data={this.state.data}  onRefresh={this._onRefresh} isFetch={this.state.isFetching} delete={this._deleteHandler}  edit={this._editHandler}/>
                </LinearGradient>
                <FAB
                        style={styles.fab}
                        icon="add"
                        onPress={() => this.setState({ NewDialogVisible: true})}
                        // color="white"
                    />
                <NewTask dateAvailable={true} title="New" inputMessage="Task Description" visible={this.state.NewDialogVisible} close={this._closeNewDialog} handler={this._NewTaskHandler}/>
                <Snackbar
                    visible={this.state._SnackbarVisible}
                    onDismiss={() => this.setState({ _SnackbarVisible: false, message: '' })}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            this.setState({ _SnackbarVisible: false, message: '' })
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