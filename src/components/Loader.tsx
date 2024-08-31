import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type LoaderProps={
    visible:boolean
}

const Loader = ({visible}:LoaderProps) => {
  return (
    <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={{fontSize:24}}>Updating exchane rates...</Text>
            </View>
      </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        flex:1, alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"#c0c0c0", 
        opacity:0.9
    }
})