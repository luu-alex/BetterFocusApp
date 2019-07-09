import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { First, Second, Third} from './Screens';
import { StyleSheet } from 'react-native';
import todo from './components/Todos'
import tasks from './components/Tasks'

const simpleStyledConfig = {
  shifting: true,
  activeColor: '#6200ee',
  inactiveColor: '#828792',
  barStyle: {
    backgroundColor: '#f8f7f9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#d0cfd0',
  },
};

const shiftingConfig = {
    initialRouteName: 'todo',
    shifting: true,
    labeled: false,
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
};

export default createMaterialBottomTabNavigator(
  {
    todo,
    tasks,
    Second,
    Third
  },
  // simpleStyledConfig
  shiftingConfig
);
