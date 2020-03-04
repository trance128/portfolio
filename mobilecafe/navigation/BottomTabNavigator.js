import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import HomeScreen from '../screens/HomeScreen';
import SelectMenuType from '../screens/SelectMenuType';
import SelectItemType from '../screens/SelectItemType';
import SelectItem from '../screens/SelectItem';
import SelectOptions from '../screens/SelectOptions';
import SelectBread from '../screens/SelectBread';
import SummaryScreen from '../screens/SummaryScreen';
import UploadResult from '../screens/UploadResult';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';


// contains order stack, which is initial route for Tab Nav
// use this stack to go through the order process
const OrderStack = createStackNavigator();

function OrderStackNavigator({navigation, route}){
  return(
    <OrderStack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="Home" component={HomeScreen} />
      <OrderStack.Screen name="SelectMenuType" component={SelectMenuType} />
      <OrderStack.Screen name="SelectItemType" component={SelectItemType} />
      <OrderStack.Screen name="SelectItem" component={SelectItem} />
      <OrderStack.Screen name="SelectOptions" component={SelectOptions} />
      <OrderStack.Screen name="SelectBread" component={SelectBread} />
      <OrderStack.Screen name="UploadResult" component={UploadResult} />
    </OrderStack.Navigator>
  )
}

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({headerShown: false});

  return (
    <BottomTab.Navigator initialRouteName={"Order"}>
      <BottomTab.Screen
        name="Order"
        component={OrderStackNavigator}
        options={{
          title: 'Order',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle-outline" />,
        }}
      />
      <BottomTab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
        />
    </BottomTab.Navigator>
  );
}
