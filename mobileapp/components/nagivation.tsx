import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import { Link } from 'react-router-native';
import tw from 'tailwind-react-native-classnames';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';
import SongsComponent from './songs';
import { SearchBar } from 'react-native-elements';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';

const Tab = createBottomTabNavigator();

const FooterComponent = () => {
    const navigation = useNavigation();


    return (
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          unmountOnBlur: true,
          tabBarShowLabel: false,
          tabBarStyle: { height: 55 },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              style={tw.style("ml-5 text-gray-600")}
              name="arrow-left"
              size={25}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => <Icon name="user" size={35} color={color} />,
          }}
          name="Home"
          component={() => <Text>HOME</Text>}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => <Icon name="music" size={35} color={color} />,
          }}
          name="Songs"
          component={SongsComponent}
        />
      </Tab.Navigator>
    );
}

export default FooterComponent
