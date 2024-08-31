import { StyleSheet, Text, View, Dimensions, Pressable, TextInput, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FormattedRate } from '../reusable';

//   const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
//   ];

const {width} = Dimensions.get("screen")

type InputFieldProps={
    reverse?:boolean,
    value?: string | undefined,
    onChangeText?: ((text: string) => void) | undefined,
    currencyAb:string,
    data:FormattedRate[]|[]
    setCurrency:React.Dispatch<React.SetStateAction<FormattedRate>>
}

const InputField = ({reverse=false, data, currencyAb,setCurrency, value, onChangeText}:InputFieldProps) => {

    const [showCurrency, setShowCurrency] = useState(false)

    const toggleCurrency=()=>{setShowCurrency((state)=>!state)}

  return (
    <View style={{height:134}}>
    <View style={[styles.container,{flexDirection: reverse? "row-reverse":"row"}]}>
      <Pressable style={styles.dropBtn} onPress={()=>toggleCurrency()}>
        <Ionicons name="chevron-down" size={18} color={"#000"}/>
        <Text>{currencyAb}</Text>
      </Pressable>
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
      />
    </View>
    { showCurrency &&
        
        <View style={[styles.scrlContainer,{alignSelf:reverse?"flex-end":"flex-start"}]}>
            <ScrollView>
            {data?.map((item, index)=>(
                <Pressable 
                    key={index} style={styles.scrlData}
                    onPress={()=>{
                            setCurrency(item)
                            toggleCurrency()
                        }}
                >
                    <Text>{item.currency}</Text>
                </Pressable>
            ))}
            </ScrollView>
        </View>
        
      }
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
    container:{
        width:(width-50)/2,
        borderWidth:1,
        height:50,
        borderRadius:5,
        flexDirection:"row"
    },
    dropBtn:{
        flexDirection:"row",
        borderWidth:1,
        borderRightWidth:1,
        height:"100%",
        alignItems:"center",
        paddingRight:2
    },
    inputStyle:{
        borderWidth:1,
        flex:1,
        paddingHorizontal:5
    },
    scrlContainer:{
        marginTop:2,
        height:80,
        width:50,
        borderWidth:1,
        borderRadius:5
    },
    scrlData:{
        borderWidth:1,
        height:34,
        alignItems:"center",
        justifyContent:"center"
    }
})