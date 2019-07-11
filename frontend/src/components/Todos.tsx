import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacityBase } from 'react-native';
import TodoInput from './InputBar';
import tabBarIcon from '../tabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider as PaperProvider } from 'react-native-paper';
import AppBar from './AppBar'
import Todoslist from './todolist'

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [
          ],
          
        };
      }

      onAddItem = () => {
        //   console.log(this.props.data.data)
        this.setState(state => {
          const dataList = [...state.dataList, {key : state.text}];
    
          return {
            dataList,
            text: '',
          };
        }, () => this.props.data.handler(this.state.dataList));
        
      };

      handler = (text) => {
        this.setState(state => {
            const data= [...state.data, {key : text}];
      
            return {
              data
            };
          });
      };

    
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

                <Todoslist data={this.state.data}/>
                </LinearGradient>
                
                
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