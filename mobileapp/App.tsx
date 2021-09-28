/* import { StatusBar } from 'expo-status-bar'; */
import React, {useState} from "react";
import { Button, SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import tw from "tailwind-react-native-classnames";
import FooterComponent from "./components/footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";


export const Home = () => {
  return (
    <View>
      <Text>HOME SCREEEEN</Text>
    </View>
  );
};

export const About = () => {
  return (
    <View>
      <Text>
        ABOUT SCREEN{" "}
        <Button title="CLICK ME" onPress={() => console.log("clicked")}>
          CLICK ME
        </Button>
      </Text>
    </View>
  );
};

const client = new ApolloClient({
  uri: "http://192.168.221.238:4000/",
  cache: new InMemoryCache(),
});

export default function App() {
 
  /* const statusBarHeight = StatusBar.currentHeight || 0; */
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
     
          <View style={tw.style("flex-1" /* {marginTop : Math.round(statusBarHeight)} */)}>
            <StatusBar />
            <FooterComponent/>
          </View>
       
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

/* const styles = StyleSheet.create({
  container: {
    ...tailwind("flex-1 justify-center ")
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
