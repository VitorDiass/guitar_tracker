import React from 'react';
import {View, Text, Button} from 'react-native';
import { Link } from 'react-router-native';
import tw from 'tailwind-react-native-classnames';

const FooterComponent = () => {
    return (
        <View style={tw.style('flex-1 flex-row bottom-0 left-0 right-0 absolute h-16 justify-evenly items-center text-center bg-gray-200',{})}>
            <Link to="/home" style={{textAlign : "center", flexGrow : 1}}>
                <Text>HOME</Text>
            </Link>
            <Button title="ABOUT" onPress={() => {}}>
            <Link to="/about" >
                <Text>ABOUT</Text>
            </Link>
            </Button>
        </View>
    );
}

export default FooterComponent
