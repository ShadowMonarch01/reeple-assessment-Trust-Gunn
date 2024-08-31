import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from './components/InputField'
import { Entypo, Fontisto } from '@expo/vector-icons'
import { allRates, APIKEY } from './api'
import { formatRates, FormattedRate, formatWithCommas } from './reusable'
import ErrorDialogue from './components/ErrorDialogue'
import ErrorModal1 from './components/ErrorModal1'
import ErrorModal2 from './components/ErrorModal2'
import Loader from './components/Loader'
import MenuOptions from './components/MenuOptions'

const {width}=Dimensions.get("screen")

const Exchange = () => {
    const [base,setBase]=useState<FormattedRate>({currency:'USD', rate:1})
    const [main,setMain]=useState<FormattedRate>({currency:'USD', rate:1})

    const [rates, setRates]=useState<FormattedRate[]|[]>([])

    const [baseInput, setBaseInput]=useState('')
    const [mainInput, setMainInput]=useState('')

    const [showLoader, setShowLoader]=useState(false)

    const [showMenu, setShowMenu]=useState(false)    

    const [showNetorkErr, setShowNetorkErr]=useState(false)
    const [showError, setShowError]=useState(false)
    const [errorMsg, setErrorMsg]=useState('')

    // Fetch data
    const getRates = async () => {
        setShowNetorkErr(false)
        setShowLoader(true)
        setShowMenu(false)
        try {
          const response = await fetch(`https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${base.currency}`);
    
          const data = await response.json();
    
          if (data?.result === 'success') {
            const reformat = await formatRates(data?.conversion_rates);
            setRates(reformat);
    
            // Update the main currency's rate based on the new base currency
            const updatedMainRate = reformat.find(rate => rate.currency === main.currency);
            if (updatedMainRate) {
              setMain(updatedMainRate);
            }
            setShowLoader(false)
          }else{
            setShowLoader(false)
            setShowError(true)
            setErrorMsg(`${data["error-type"]}`)
          }
    
        //   console.log('GET request data:', data);
        }catch (error: any) {
            setShowLoader(false)
            // Check if the error message contains the word "network"
            if (error.message && error.message.toLowerCase().includes('network')) {
                setShowNetorkErr(true)
                console.error('Network error occurred:', error);
            } else {
                // setShowLoader(false)
                setShowError(true)
                setErrorMsg(`${error.message}`)

            }
        }
      };

    const getRates1= async()=>{
      
                    const reformat = await formatRates(allRates.conversion_rates)
                    setRates(reformat)            
    }

    useEffect(()=>{
        getRates()
    },[base.currency])



    useEffect(() => {
        // Update mainInput when main rate changes
        if (baseInput !== '') {
            const converted = (parseFloat(baseInput) * main.rate).toFixed(2);
            setMainInput(converted);
        }
    }, [main.rate]);

    useEffect(() => {
        // Update baseInput when base rate changes
        if (mainInput !== '') {
            const converted = (parseFloat(mainInput) / main.rate).toFixed(2);
            setBaseInput(converted);
        }
    }, [base.rate]);


    // Function to clean input (remove non-numeric characters except for one decimal point)
    const cleanInput = (value: string) => {
        // Remove all characters except digits and the first decimal point
        return value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    };

    // Handle base currency input change
    const handleBaseInputChange = (value: string) => {
        const cleanedValue = cleanInput(value);
        setBaseInput(cleanedValue);

        // Convert base currency value to main currency
        if (!isNaN(parseFloat(cleanedValue)) && cleanedValue !== '') {
            const converted = (parseFloat(cleanedValue) * main.rate).toFixed(2);
            setMainInput(converted);
        } else {
            setMainInput('');
        }
    };

    // Handle main currency input change
    const handleMainInputChange = (value: string) => {
        const cleanedValue = cleanInput(value);
        setMainInput(cleanedValue);

        // Convert main currency value to base currency
        if (!isNaN(parseFloat(cleanedValue)) && cleanedValue !== '') {
            const converted = (parseFloat(cleanedValue) / main.rate).toFixed(2);
            setBaseInput(converted);
        } else {
            setBaseInput('');
        }
    };

   



  return (
    <View style={styles.container}>

        {/* Header component */}
        <View style={{height:50,justifyContent:"center"}}>
            <Text style={{textAlign:"center", fontSize:20}}>Reeple-Exchange</Text>

            <TouchableOpacity 
                style={{position:"absolute", right:0}} 
                onPress={()=>setShowMenu(true)}
            >
                 <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View style={styles.textWrappers}>
            <Text style={styles.bgtxt}>{`1${base.currency}`}</Text>
            <Text style={styles.bgtxt}>=</Text>
            <Text style={styles.bgtxt}>{`${main.rate}${main.currency}`}</Text>
        </View>

        <View style={styles.textWrappers}>
            <Text style={styles.smtxt}>{`${formatWithCommas(baseInput)} ${base.currency}`}</Text>
            <Text style={styles.smtxt}>=</Text>
            <Text style={styles.smtxt}>{`${formatWithCommas(mainInput)} ${main.currency}`}</Text>
        </View>

        {/* Exchange inputs and swap button */}
        <View>
                <View style={styles.inputWrapper}>
                    <InputField
                        currencyAb={base.currency}
                        data={rates}
                        value={baseInput}
                        onChangeText={handleBaseInputChange}
                        setCurrency={setBase}
                    />
                    <InputField
                        currencyAb={main.currency}
                        data={rates}
                        value={mainInput}
                        onChangeText={handleMainInputChange}
                        reverse
                        setCurrency={setMain}
                    />
                </View>

                {/* Swap button */}
                <TouchableOpacity 
                    style={styles.swapBtn}
                    onPress={() => {
                        // Swap base and main currencies
                        const temp = base;
                        setBase(main);
                        setMain(temp);
                      }}
                >
                    <Fontisto name="arrow-swap" size={24} color="black" />
                </TouchableOpacity>
        </View>

        <View style={{marginBottom:20}}>
            <Text style={[styles.bgtxt,{textAlign:"center", marginBottom:10}]}>Exchange Rate ({`${base.currency}`})</Text>

            <View>
                <ScrollView contentContainerStyle={{height:(rates.length * 67)}}>
                    <View style={{alignItems:"center",}}>
                    {rates?.map((item,index)=>(
                        <Pressable key={index} style={styles.exeCard} onPress={()=>setMain(item)}>
                            <Text style={{fontSize:18}}>{`1${base.currency} = ${item.rate} ${item.currency}`}</Text>
                        </Pressable>
                    ))}
                    </View>
                </ScrollView>
            </View>

        </View>

    {/* Top Menu */}
    <MenuOptions 
        visible={showMenu} 
        containerPress={()=>setShowMenu(false)}
        onPress={()=>getRates()}
    />

    {/* Loader Component that displays when data is being fetched */}
    <Loader visible={showLoader}/> 

    {/* Error Message modal specifically for For network */}
    <ErrorModal1
        notNetwork={false}
        visible={showNetorkErr}
        onPressOk={()=>setShowNetorkErr(false)}
        onPressRetry={()=>getRates()}
    />

    {/* Error modal for all other errors */}
    <ErrorModal2
        notNetwork={showError}
        visible={showError}
        errorTxt={errorMsg}
        onPressOk={()=>setShowError(false)}
        onPressRetry={()=>getRates()}
    />

      

    </View>
  )
}

export default Exchange

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding:20,
        paddingTop:20,
        paddingHorizontal:20,
        // marginBottom:20
    },
    bgtxt:{
        fontSize:20
    },
    smtxt:{
        fontSize:18
    },
    inputWrapper:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    swapBtn:{
        width:50,
        height:50,
        borderRadius:30,
        backgroundColor:"#c0c0c0",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        position:"absolute",
        marginTop:60
    },
    exeCard:{
        borderWidth:1,
        paddingVertical:16,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:6,
        borderRadius:5
    },
    textWrappers:{
        flexDirection:'row',
        flexWrap:"wrap",
        justifyContent:"center",
        gap:6, marginVertical:10
    }
})