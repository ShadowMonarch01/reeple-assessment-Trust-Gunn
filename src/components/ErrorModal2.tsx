import { GestureResponderEvent, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorDialogue from './ErrorDialogue'

type ErrorModal1Props={
    onPressOk?: ((event: GestureResponderEvent) => void) | undefined,
    onPressRetry?: ((event: GestureResponderEvent) => void) | undefined,
    visible:boolean,
    notNetwork:boolean,
    errorTxt?:string
}

const ErrorModal2 = ({visible, notNetwork, onPressOk, onPressRetry, errorTxt}:ErrorModal1Props) => {
  return (
    <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            >
            <View style={styles.container}>
                
                <ErrorDialogue
                    notNetwork={notNetwork}
                    errorTxt={errorTxt}
                    onPressOk={onPressOk}
                    onPressRetry={onPressRetry}
                />
            </View>
      </Modal>
  )
}

export default ErrorModal2

const styles = StyleSheet.create({
    container:{
        flex:1, alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"#c0c0c0", 
        opacity:0.8
    }
})