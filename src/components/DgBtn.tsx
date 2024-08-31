import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type DgBtnProps={
        txt:string,
        onPress?: ((event: GestureResponderEvent) => void) | undefined
    }
const DgBtn = ({txt, onPress}:DgBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{color:"#fff", fontSize:20}}>{txt}</Text>
    </TouchableOpacity>
  )
}

export default DgBtn

const styles = StyleSheet.create({
    container:{
        height:40,
        width:120,
        backgroundColor:'blue',
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
})