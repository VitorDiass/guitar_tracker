/* import { StatusBar } from 'expo-status-bar'; */
import React, {useState} from "react";
import { Button, SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import tw from "tailwind-react-native-classnames";
import NavigationComponent from "./components/nagivation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { client } from "./graphql/apollo/apollo";



export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <View style={tw.style("flex-1" /* {marginTop : Math.round(statusBarHeight)} */)}>
            <StatusBar />
            <NavigationComponent/>
          </View>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}