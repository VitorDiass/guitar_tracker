/* import { StatusBar } from 'expo-status-bar'; */
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import tw from 'tailwind-react-native-classnames';
import FooterComponent from './components/footer';

const Home = () => {return <View><Text>HOME SCREEEEN</Text></View>};

const About = () => {return <View><Text>ABOUT SCREEN <Button title="CLICK ME" onPress={() => console.log("clicked")}>CLICK ME</Button></Text></View>};

export default function App() {
  /* const statusBarHeight = StatusBar.currentHeight || 0; */
  return (
    <NativeRouter>
      <View style={tw.style("flex-1", /* {marginTop : Math.round(statusBarHeight)} */)}>
        <StatusBar/>
        <Text>HELLO</Text>

         <FooterComponent/>
        
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </View>
    </NativeRouter>
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