import React from 'react'
import { View, Text, TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const StyledInput = (props : any) => {
    return (
        <TextInput style={tw.style("border-b my-3")} {...props}/>
    )
}

export default StyledInput;
