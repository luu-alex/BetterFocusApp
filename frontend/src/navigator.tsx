import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { First, Second, Third} from './Screens';
import { StyleSheet } from 'react-native';
import todo from './components/Todos';
import tasks from './components/Tasks';
import ClockContainer from './components/clockScreen/ClockContainer';

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
    tabBarPosition: 'bottom',
    initialRouteName: 'todo',
    shifting: true,
    labeled: false,
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',

    barStyle: { backgroundColor: '#694fad' },
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#3b5998',
        },
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
        },
      },
};

export default createMaterialTopTabNavigator(
  {
    todo,
    tasks,
    ClockContainer,
    Third
  },
  // simpleStyledConfig
  shiftingConfig
);
