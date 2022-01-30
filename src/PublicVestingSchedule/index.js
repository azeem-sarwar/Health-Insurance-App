import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image} from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {currencyFormat} from "../helper"
import InputWrapper from "../components/InputWrapper"
import { StackParamList } from '../../App';

import OptionModal from "../components/OptionModal"
import {fetchStockApi} from "../apis"
import { createRow } from '../Row';

//original navigator code
type ScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
};






const index = ({route,navigation}) => {
   
    const [state, setState] = React.useState ({
      stockChartXValues: [],
      stockChartYValues: [],
      latestValues: {},
      value: "",
      stockPriceNow: 0,
      numOfOptionsVesting: 0,
      isVestingOption: true,
      optionsVesting: 0,
      cliff: 0,
      vestingPeriod: 0,
      priceToExcersize: 0,
      stockOptionsGrantDate: 0,
      evaluateDate: 0,
      numOfStockGrandted: 0

    });


const [ModalOpen, setModalOpen] = useState(false);
React.useEffect(()=>{
      navigation.setOptions({ headerRight: ()=>{
          return (
            <Ionicons  
            name="help-circle-outline" 
            size={32} 
            color="#FFFFFF"
            style={{marginRight: 10 }}
            onPress={() => setModalOpen(true)}
          />
          )
        }
      })
    },[])
        

const fetchStock = async () => {
    const stockName = state.value
    if(!stockName){
        alert("Nothing...")
        return
    }    
    
    
    fetchStockApi(stockName,(res)=>{
        if(res.error){
          console.log(res.error)
        }
        else{
            const metaData   = res["Meta Data"]?res["Meta Data"]:[]
            const timeSeries = res["Time Series (Daily)"]?res["Time Series (Daily)"]: []
            const key = metaData["3. Last Refreshed"]
            const latest = timeSeries[key.split(" ")[0]]
            
            setState({
                ...state,
                latestValues: {
                  key: key,
                  value:latest
                }
            });

        }
    })

}  



  const showOptionGrantWorth = () => {
    const {stockPriceNow,isVestingOption,optionsVesting,cliff,vestingPeriod,     stockOptionsGrantDate,evaluateDate, numOfOptionsGrandted, strikePrice} = state
     
    const currentMarketPrice = latestValues?.value?latestValues.value["1. open"]: 0

console.log(state)
    let optionsVestingPerMonth = 0
    
    if(isVestingOption){
      optionsVestingPerMonth = ( 1 / (12*(parseFloat(vestingPeriod) - parseFloat(cliff))))  * 
      (parseFloat(numOfOptionsGrandted) - parseFloat(optionsVesting /100)*parseFloat(numOfOptionsGrandted))
    }
    else{
      optionsVestingPerMonth = (1 - (parseFloat(optionsVesting)/100))/ ( parseFloat(vestingPeriod)- parseFloat(cliff))
    }
    


    let numberOfMonths0 = 0
   
    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (parseFloat(cliff)*365.25)){
      numberOfMonths0 = parseFloat((evaluateDate) - 365.25*parseFloat(cliff) - parseFloat(stockOptionsGrantDate))/30.437
    }
    else{
      '0'
    }

    let numberOfMonths1 = 0
   
    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (parseFloat(cliff)*2*365.25)){
      numberOfMonths1 = (parseFloat(evaluateDate) - 2*365.25*parseFloat(cliff) - parseFloat(stockOptionsGrantDate))/30.437
    }
    else{
      '0'
    }
    
    let numberOfMonths2 = 0

    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (cliff*365*3)){
      numberOfMonths2 = (evaluateDate - 3*365.25*parseFloat(cliff) - stockOptionsGrantDate)/30.437
    }
    else{
      '0'
    }
    
    let numberOfMonths3 = 0

    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (cliff*365*4)){
      numberOfMonths2 = (evaluateDate - 4*365.25*parseFloat(cliff) - stockOptionsGrantDate)/30.437
    }
    else{
      '0'
    }

    //options calculation based on number of months since the cliff date (what if at the ciff??)
    let optionsVested0 = 0

    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (parseFloat(cliff)*365)){
      optionsVested0 = parseFloat(numOfOptionsGrandted)*(parseFloat(optionsVesting)/100) + (parseFloat(numberOfMonths0))*parseFloat(optionsVestingPerMonth)
    }
    else{
      '0'
    }

    let fundsToExcOptionsVested0 = 0

    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (parseFloat(cliff)*365)){
      fundsToExcOptionsVested0 = parseFloat(optionsVested0)*(parseFloat(strikePrice))
    }
    else{
      '0'
    }

    let immidiateGain0 = 0

    if((parseFloat(evaluateDate) - parseFloat(stockOptionsGrantDate)) > (parseFloat(cliff)*365)){
    
      immidiateGain0 = parseFloat(optionsVested0)*(parseFloat(currentMarketPrice) - (parseFloat(strikePrice)))
    }
    else{
      '0'
    }
    
    
    

  navigation.navigate("OptionGrantWorth",{
    optionsVestingPerMonth: optionsVestingPerMonth,
    numberOfMonths0: numberOfMonths0,
    numberOfMonths1: numberOfMonths1,
    numberOfMonths2: numberOfMonths2,
    numberOfMonths3: numberOfMonths3,
    optionsVested0: optionsVested0,
    fundsToExcOptionsVested0: fundsToExcOptionsVested0,
    immidiateGain0: immidiateGain0,
    

  })


  }


  

/**
 * papulate ticker Value
 */

const {value, latestValues} = state
return (
<ScrollView style={styles.scrollView}>
  <OptionModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>

        <Image
    style={{ width: 200, height: 200, opacity:0.5, 
    borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}
    source={require('../Images/PublicStockOptions.png')} />


        <Text style={styles.header}>Public Company Options</Text>
        <Text style={styles.description}>If you are offered stock options, you might be wondering what might they be worth and what the tax implications might be. </Text>
        
        <Text style={styles.header2}>Enter data below to evaluate what your grant might be worth </Text>
        
        


        <View>
        
        <Text style={styles.question1}>Enter Ticker of Your Company's Stock </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style = {[styles.answer1,{flex: 1}]}
              underlineColorAndroid = "transparent"
              placeholder = "  Please enter ..."
              //autoCapitalize = "none"
              value={state.value}
              onChangeText = {value => {setState({...state, value}) }}
              
            />
            <Button 
            style={{color:"#15317E"}}
            title={"Fetch Stock"} onPress = {fetchStock} />
        </View>
        <Text style={styles.question1}>Current Stock Price - Yesterday's Close</Text>
        <TextInput style = {[styles.answer1]}
            underlineColorAndroid = "transparent"
            placeholder = "This will calculated automatically"
            //autoCapitalize = "none"
            //  value={CurrentMarketPrice}
            value={latestValues?.value?latestValues.value["1. open"]: ""}
            editable = {false}
            // onChangeText = {CurrentMarketPrice => setCurrentMarketPrice(CurrentMarketPrice)}
            //keyboardType={'numeric'}
          />

          <Text style={styles.question1}>Number of Stock Options granted</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, numOfOptionsGrandted: value})}
        />

        <Text style={styles.question1}>Stock Options Grant Date</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, stockOptionsGrantDate: value})}
        />
        

        
        <Text style={styles.question1}>Strike Price</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, strikePrice: value})}
        />
        
        

        <Text style={styles.question1}>Evaluation Date</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, evaluateDate: value})}
        />
        
        
              
        <Text style={styles.question1}>Lenght of Vesting Period (in Years)</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, vestingPeriod: value})}
        />
        
        <Text style={styles.question1}> Vesting Cliff in Years (When do Options Start Vesting) </Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, cliff: value})}
        />
        
        <Text style={styles.question1}>% of Options Vesting in Cliff Year</Text>
        <TextInput style = {styles.answer1}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, optionsVesting: value})}
        />
        
        <Text style={styles.question1}>Are Options Vesting Monthly or Annually After the Cliff Year?</Text>
        <View style={{flexDirection: 'row',}}>
          
          <TouchableOpacity onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
            <Text>Monthly</Text>
            <View style={[styles.dot,{backgroundColor: state.isVestingOption?"blue": "transparent"}]} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
            <Text>Annually</Text>
            <View style={[styles.dot,{backgroundColor: !state.isVestingOption?"blue": "transparent"}]} />
          </TouchableOpacity>
        </View>
        
        
              
    
    <TouchableOpacity onPress={showOptionGrantWorth} style={styles.Button1}>
      <Text style={{ fontSize: 20, color: '#fff' }}>CALCULATE</Text>
    </TouchableOpacity>

  </View>
  </KeyboardAvoidingView>
</ScrollView>
)
}

const styles = StyleSheet.create({
  container1: {
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#FFFFFF',
     shadowColor:'black',
     padding: 10,
     //paddingBottom: 70,
     flex: 1
     
   },
  

  Button1: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15317E',
    shadowColor:'black',
    padding: 24,
    borderRadius: 10,
    
  },
  dot: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'darkblue',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  
  question1: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
   },
  header: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#15317E',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  header2: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15317E',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  answer1: {
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    //color: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    minHeight: 40,
    marginVertical: 10,
    alignItems: 'center',//
    textAlign: 'center',//
    // backgroundColor: 'red',
  },
 description: {
     textAlign: 'left',
     color: '#15317E',
     fontSize: 16,
     marginTop: 10,
     marginBottom: 10,
     padding: 10,
     borderRadius: 5,
    },


  
 });


export default index;