import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import DgBtn from './DgBtn'

type ErrorDialogueProps={
    onPressOk?: ((event: GestureResponderEvent) => void) | undefined,
    onPressRetry?: ((event: GestureResponderEvent) => void) | undefined,
    notNetwork:boolean,
    errorTxt?:string
}

const ErrorDialogue = ({onPressOk, onPressRetry, notNetwork, errorTxt}:ErrorDialogueProps) => {
  return (
    <View style={styles.conatiner}>
    {
      notNetwork?
      <Entypo name="emoji-sad" size={60} color="black" />
      :<MaterialCommunityIcons name="access-point-network-off" size={60} color="red" />
    }
      <Text style={{fontSize:16}}>{notNetwork? `${errorTxt}`:'Unstable Internet Connection'}</Text>

      <View style={styles.btnWrapper}>
        <DgBtn txt='Ok' onPress={onPressOk}/>
        <DgBtn txt='Retry' onPress={onPressRetry}/>
      </View>
    </View>
  )
}

export default ErrorDialogue

const styles = StyleSheet.create({
    conatiner:{
        width:300,
        // height:200,
        backgroundColor:"#fff",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        gap:10,
        paddingVertical:20
    },
    btnWrapper:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"center", gap:10
    }
})