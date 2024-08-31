import { GestureResponderEvent, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type MenuOptionsProps={
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    containerPress?:((event: GestureResponderEvent) => void) | null | undefined,
    visible?: boolean | undefined
}

const MenuOptions = ({visible,onPress, containerPress}:MenuOptionsProps) => {
  return (
    <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            >
            <Pressable 
                style={styles.container}
                onPress={containerPress}
            >
                
                <View style={styles.menuWrapper}>
                    {/* Can be coverted into a reusable component if required */}
                    <TouchableOpacity style={{paddingVertical:8,paddingLeft:8}} onPress={onPress}>
                        <Text style={{fontSize:18}}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                
            </Pressable>
      </Modal>
  )
}

export default MenuOptions

const styles = StyleSheet.create({
    container:{
        flex:1, 
        // backgroundColor:"#c0c0c0", 
        // opacity:0.6,
    },
    menuWrapper:{
        backgroundColor:"#fff",
        width:100, 
        borderRadius:5, 
        alignSelf:"flex-end", 
        margin:14
    }
})