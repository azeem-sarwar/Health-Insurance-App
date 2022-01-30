import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image} from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {currencyFormat} from "./helper"
import InputWrapper from "./components/InputWrapper"
import { StackParamList } from '../App';

import OptionModal from "./components/OptionModal"
import {fetchStockApi} from "./apis"
import { createRow } from './Row';

//original navigator code
type ScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
};






const OptionVestingSchedule = ({route,navigation}) => {
   
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

        <Image style={{ width: 200, height: 200,  borderRadius: 50, alignSelf: 'center'}}
    source={require('./Images/StockOption2.png')} />


        <Text style={styles.header}>  What could my options be worth in the future?</Text>
        <Text style={styles.description}>If you are offered stock options, you might be wondering what might they be worth and what the tax implications might be. </Text>
        
        
        <Text style={styles.header2}> Select Your Company Type</Text>
        
        
          <TouchableOpacity style={styles.Button1} onPress = {()=>{navigation.navigate("PriveteVestingSchedule")}}>
            <Text style = {styles.historyBtnText}>PRIVATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button1} onPress = {()=>{navigation.navigate("PublicVestingSchedule")}}>
            <Text style = {styles.historyBtnText}>PUBLIC</Text>
          </TouchableOpacity>
      
      <Text style={styles.description}>Stock options give you the right to buy a set number of shares of your company's stock at a pre-set price (Grant Price). You have a set amount of time to exercise your options before they expire. Grant date is the day your options begin to vest. When a stock option vests it is available for you to exercise or buy. The options usually vest gradually, over vesting period. If your options have a 4 year vesting period, with a 1 year cliff, it means it will take 4 years before you have the right to exercise all 20,000 options. 1 year cliff means that some portion of these options will become avaiable to excersize after 1 year. </Text>
     
  </KeyboardAvoidingView>
</ScrollView>
)
}

const styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor:'black',
    padding: 15,
    paddingTop: 20,
    // paddingBottom: 70,
    flex: 1
  },
  Button1: {
     marginVertical: 10,
     backgroundColor: '#15317E',
     shadowColor:'black',
     padding: 15,
     borderRadius: 10
     
   },
   historyBtnText: {
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
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
  
  
 description: {
     textAlign: 'left',
     color: '#15317E',
     fontSize: 14,
     marginTop: 10,
     marginBottom: 10,
     padding: 10,
     borderRadius: 5,
    },


  
 });


export default OptionVestingSchedule;