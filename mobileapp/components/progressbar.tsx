import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { LinearProgress, LinearProgressProps } from 'react-native-elements'
import { colors } from '../styles/global';

interface ProgressBarInterface {
    dynamicBarColor? : boolean
}

const ProgressBarComponent = (props : LinearProgressProps & ProgressBarInterface) => {
    const [isReady, setIsReady] = useState(true);
    const dynamicBarColor : boolean = props?.dynamicBarColor || false;
    const variant                   = props.variant || 'determinate';
    const value                     = props.value || 0;
    let color                       = props.color;
    let trackColor                  = props.trackColor || '';

    const calculateColor = (value : number) => {
        let colorCalc;
        let trackColorCalc; 
        if(value < 0.4){
            colorCalc = colors.dangerColor.color;
            trackColorCalc = colors.dangerColorBg.color;
        }else if(value >=0.4 && value <=0.75){
            colorCalc = colors.warningColor.color;
            trackColorCalc = colors.warningColorBg.color;
        }else{
            colorCalc = colors.successColor.color;
            trackColorCalc = colors.successColorBg.color;
        }
        return [colorCalc, trackColorCalc]
    }

    (function(){
        [color,trackColor] = calculateColor(value);
    })()
    
 /*    useEffect(() => {
        setIsReady(false)
        if(dynamicBarColor){
            color = calculateColor(value);
            setIsReady(true);
        }
    }, []) */

    return (
        <>
        <LinearProgress {...props} color={color} trackColor={trackColor} variant={variant} value={value}/>
    </>
    )
}

export default ProgressBarComponent
