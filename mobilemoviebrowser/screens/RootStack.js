import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home';
import { SearchResult } from './SearchResult';
import { Details } from './Details';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
      />
      <Stack.Screen
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  );
}
