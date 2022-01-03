import React from 'react'
import { View, Text, Alert } from 'react-native'


const AlertDialog = (dialogTitle : string, dialogSubTitle : string, buttonYesText : string, buttonNoText : string, nextFunctionCall : Function) => {
    return (
        Alert.alert(
            dialogTitle,
            dialogSubTitle,
            [
                {
                    text : buttonYesText,
                    onPress : () => {
                        nextFunctionCall();
                        //handleShowDialog((prev : boolean) => {return !prev});
                    }
                },
                {
                    text : buttonNoText
                }
            ]
        )
    )
}

export default AlertDialog;
