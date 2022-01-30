import React, { useState } from 'react';
import {   Text, View,  FlatList,  Button,  StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';
import {currencyFormat} from "./helper"
import ModalInput from "./components/ModalInput";
import Stock from "./stock/Stock"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ESPPExplanation = (props) => {
const {route,navigation,} = props 

const [isPrompt, setIsPrompt] = useState(false);
const [fileName, setFileName ] = useState("");
const history = route?.params?.history
const displayOnly = route?.params?.displayOnly
const _eSPPExplanation = history?.eSPPExplanation
const latestValues = history?.latestValues
const ticker = history?.ticker


const saveData = async()=>{
    if(fileName == ""){
      alert("Please enter file Name first");
      return
    }
    const oldesppCalcs = await AsyncStorage.getItem('esppCalcs');
    try {
      if(oldesppCalcs){
        await AsyncStorage.setItem('esppCalcs', JSON.stringify([...JSON.parse(oldesppCalcs),{history,fileName}]))
      }else{
        await AsyncStorage.setItem('esppCalcs', JSON.stringify([{history, fileName}]))
      }
      alert("Data Saved. Check User Profile")
      setIsPrompt(false);
    }catch (e) {
      setIsPrompt(false);
      // saving error
      alert("Couldn't Save Your Data")
    }
  }
  

  return (
    <View style={styles.container}>
    
      <View style = {{flex: 1}}>
        <ScrollView>
          <Text style={styles.header}>Your Employee Stock Purchase Plan:</Text>
          <Text style={styles.result}>Discounted Share Price: {_eSPPExplanation?.discountedPurchasePrice1?currencyFormat(_eSPPExplanation.discountedPurchasePrice1): "0"}</Text>
          <Text style={styles.result}>Number of Shares Purchased: {_eSPPExplanation?.numberSharesPurchased1?_eSPPExplanation.numberSharesPurchased1: "0"}</Text>
          <Text style={styles.result}>Gain in Value at Current Market Price: {_eSPPExplanation?.gainValueatCurrentMarketPrice1?_eSPPExplanation.gainValueatCurrentMarketPrice1: "0"}</Text>
          <Text style={styles.result1}>Discounted Share Price {_eSPPExplanation?.discountedPurchasePrice1?currencyFormat(_eSPPExplanation.discountedPurchasePrice1): "0"} is the price you can buy your company's shares at using the ESPP Plan.</Text>
          <Text style={styles.result1}>With your investment you can buy {_eSPPExplanation?.numberSharesPurchased1?_eSPPExplanation.numberSharesPurchased1: "0"} shares </Text>
          <Text style={styles.result1}>Considering Current Market Price, you would gain {_eSPPExplanation?.gainValueatCurrentMarketPrice1?currencyFormat(_eSPPExplanation.gainValueatCurrentMarketPrice1): "0"} </Text>
          <Text style={styles.result1}>Now let's see if you should sell the stock for an immidiate gain or hold it for 1 year. Assuming {_eSPPExplanation?.assumedGrowthRate?currencyFormat(_eSPPExplanation.assumedGrowthRate): "0"} growth rate, the share price would increase to {_eSPPExplanation?.stockPriceIn1year1?currencyFormat(_eSPPExplanation.stockPriceIn1year1): "0"} in 1 year. Considering you bought {_eSPPExplanation?.numberSharesPurchased1?_eSPPExplanation.numberSharesPurchased1: "0"} shares, your Pre Tax Gain in 1 Year would be {_eSPPExplanation?.preTaxGain1Year1?currencyFormat(_eSPPExplanation.preTaxGain1Year1): "0"}</Text>
          <Text style={styles.result}>Should you sell your stock right after purchasing at a discount for an immidiate pre-tax gain or hold for 1+ years? Take a look at the chart below and compare your company's stock price appreaciation to the market index. If your company has a good track record of outperformning the stock market, there is a good chance for your stock to outperform.</Text>
        </ScrollView>
      </View>
      <View style={{flex: 2}}>
        <Stock 
        showHeader = {false} 
        stockName  = {ticker}//YOU CAN PASS ANY STOCK NAME HERE BY DEFAULT THIS WILL APEARS ON NEXT SCREEN           {...props} 
        />
      </View>
      
      {
        !displayOnly?
          <TouchableOpacity onPress={()=>setIsPrompt(true)} style={[styles.Button1,{marginHorizontal: 10}]}>
            <Text style={[styles.historyBtnText]}>Save Data</Text>
          </TouchableOpacity>:<></>
      }


      <ModalInput
        onSubmit = {saveData}
        onTextChange = {(text)=>{setFileName(text)}}
        visible = {isPrompt}
        toggle = {()=> setIsPrompt(!isPrompt)}
      />


    </View>
  );
}

export default ESPPExplanation;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0288D1',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  result: {
    //marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 14,
    color: '#154360',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft:20,
    marginRight:20,
        },
  result1: {
    //marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 14,
    color: '#154360',
    textAlign: 'left',
    //fontWeight: 'bold',
    marginLeft:20,
    marginRight:20,
        },
    Button1: {
     marginVertical: 5,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#15317E',
     shadowColor:'black',
     padding: 10,
     borderRadius: 10
     
   },
   historyBtnText: {
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
      },
});