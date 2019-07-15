import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

const tabBarIcon = name => ({ tintColor }) => (
  <Ionicons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

export default tabBarIcon;
