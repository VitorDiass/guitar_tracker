import React from 'react'
import { View, Text, ButtonProps } from 'react-native';
import { FAB, FABProps } from 'react-native-elements';


const FABComponent = (props : FABProps & ButtonProps) => {
    const placement = props.placement || 'right';
    const size      = props.size || 'small';
    const title     = props.title || '';
    
    return (
      <FAB {...props} placement={placement} size={size} title={title}/>
    )
}

export default FABComponent
