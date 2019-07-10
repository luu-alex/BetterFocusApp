import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacityBase } from 'react-native';
import TodoInput from './InputBar';
import tabBarIcon from '../tabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider as PaperProvider, Snackbar } from 'react-native-paper';
import AppBar from './AppBar'
import Todoslist from './todolist'

import API from '../api'


export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [
          ],
          isFetching: false,
          visible: false
        };
      }

      handler = (text) => {
        let data = {
            todo: text,
            username: "alir128",
            deadLine: "2019-07-12T02:01:00.000Z"
        }

        return API.post('addTodo', data)
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
        API.get(`todo/all/alir128`)
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

    deleteHandler = (item_id) => {
        API.delete('todo/delete/'+item_id)
            .then(res => {
                this.onRefresh();
                this.setState(state => ({ visible: !state.visible }))
            })
        
    }

    onRefresh = () => {
        this.setState({ isFetching: true }, function() { this.refreshTodos() });
     }

     refreshTodos = () => {   
        API.get(`todo/all/alir128`)
        .then(res => {
          const notCompleteTodos = res.data;
          const newData = notCompleteTodos
              .filter(todo => !todo.isItDone);
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
        tabBarIcon: tabBarIcon('note-add'),
      };
    render() {
        const { navigate } = this.props.navigation;

        return (
            <PaperProvider>
                <AppBar title="Reminders" />
                <TodoInput label="To Do" placeholder="Enter new To Do" handler={this.handler} />
                <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>

                <Todoslist data={this.state.data}  onRefresh={this.onRefresh} isFetch={this.state.isFetching} delete={this.deleteHandler} />
                
                </LinearGradient>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            this.setState({ visible: false })
                        },
                    }}
                    duration={Snackbar.DURATION_SHORT}
                    >
                    Todo Deleted
                </Snackbar>
                
            </PaperProvider>        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        padding: 8,
    },
    text: {
        fontSize: 36,
        // textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
});