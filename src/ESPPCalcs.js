import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image, Dimensions, Vibration, Alert } from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {currencyFormat} from "./helper"
import InputWrapper from "./components/InputWrapper"
import { StackParamList } from '../App';
import {fetchStockApi} from "./apis"

import ESPPModal from "./components/ESPPModal"

import { createRow } from './Row';
import Swiper from 'react-native-swiper'
import Swipper from "./components/Swipper"

//original navigator code
type ScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
};

//AllCalcs code
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);



const ESPPBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.Button1}>
      <Text style={{ fontSize: 20, color: '#fff' }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const CalcBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.Button1}>
      <Text style={styles.historyBtnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const Separator = () => (
  <View style={styles.separator} />
);




const AllCalcs = ({route,navigation}) => {
   
    const [state, setState] = React.useState ({
      stockChartXValues: [],
      stockChartYValues: [],
      latestValues: {},
      value: ""
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

   const [StockDiscount, setStockDiscount] = React.useState (0);
   const [EmployeeContribution, setEmployeeContribution] = React.useState (0);
   const [PurchaseDayMarketPrice, setPurchaseDayMarketPrice] = React.useState (0);
   const [SubscriptionDayPrice, setSubscriptionDayPrice] = React.useState (0);
   const [LowerPrice, setLowerPrice] = React.useState (0);
   const [activeSection,setActiveSection] = useState(0);
   
   const [assumedGrowthRate,setassumedGrowthRate] = React.useState (0);

   const [discountedPurchasePrice,setDiscountedPurchasePrice] = React.useState (0);
   
   const [gainValueatCurrentMarketPrice,setGainValueatCurrentMarketPrice] = React.useState (0);
   const [stockPriceIn1year,setStockPriceIn1year] = React.useState (0);
   const [preTaxGain1Year,setPreTaxGain1Year] = React.useState (0);
    
    const [getError, setError] = useState("");
    const [getShowButton, setShowButton] = useState(false);
    const [getESPPExplanation, setESPPExplanation] = useState([]);

function calcAllCalcs (){
    const CurrentMarketPrice = latestValues?.value?latestValues.value["1. open"]: 0
     let discountedPurchasePrice1=( parseInt(LowerPrice) * (1 - parseInt(StockDiscount)/100));
   

     let numberSharesPurchased1=(parseInt(EmployeeContribution)/(discountedPurchasePrice1));
    
     
     let gainValueatCurrentMarketPrice1=(numberSharesPurchased1*parseInt(CurrentMarketPrice));
    

     let stockPriceIn1year1=(parseInt(CurrentMarketPrice)*(1+(parseInt(assumedGrowthRate)/100)));
   
     
     let preTaxGain1Year1=(numberSharesPurchased1*(stockPriceIn1year1-discountedPurchasePrice1));
   
    return {
        discountedPurchasePrice1: discountedPurchasePrice1?discountedPurchasePrice1:0 ,
        numberSharesPurchased1: numberSharesPurchased1?numberSharesPurchased1.toFixed(0): 0,
        gainValueatCurrentMarketPrice1: gainValueatCurrentMarketPrice1?gainValueatCurrentMarketPrice1.toFixed(0): 0,
        stockPriceIn1year1: stockPriceIn1year1?stockPriceIn1year1.toFixed(0):0,
        preTaxGain1Year1: preTaxGain1Year1?preTaxGain1Year1.toFixed(0):0,
        assumedGrowthRate: assumedGrowthRate?assumedGrowthRate.toFixed:0
        
      }
}


const isDisable = (!PurchaseDayMarketPrice )


const saveESPPExplanation = () => {
    setESPPExplanation([...getESPPExplanation, {
      discountedPurchase: discountedPurchasePrice,
      numberShares: numberSharesPurchased,
      gainValue: gainValueatCurrentMarketPrice,
      stockPriceIn1: stockPriceIn1year,
      preTaxGain1: preTaxGain1Year,
      assumedGrowthRate: assumedGrowthRate,

      
    }]);
    setShowButton(false);
  }

  const showESPPExplanation = () => {
    const calculations = calcAllCalcs();
    console.log(calculations);
    
    navigation.navigate('ESPPExplanation',{
      history: {
      eSPPExplanation:calculations,
      latestValues: state.latestValues,
      ticker: state.value
    }});
  }










const calculations = calcAllCalcs() 


/**
 * papulate ticker Value
 */

const fetchStock = async () => {
    const stockName = state.value
    if(!stockName){
        alert("Nothing...")
        return
    }    
    
    
    let stockChartXValuesFunction =[];
    let stockChartYValuesFunction =[];
    fetchStockApi(stockName,(res)=>{
        console.log(res , "<----")
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



const {stockChartXValues,stockChartYValues,value, latestValues} = state
// const latestXvalue =  stockChartXValues.length > 0?stockChartXValues[stockChartXValues.length-1]: 0
// const latestYvalue =  stockChartYValues.length > 0?stockChartYValues[stockChartYValues.length-1]: 0



return (
<SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
 <ESPPModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
  

  {activeSection == "done"?
    <View style={{flex: 1}}>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator = {false}>
          <View>
              <Text style={styles.question1}>Enter Ticker of Your Company's Stock </Text>
              <View>
                  <TextInput 
                    style = {[styles.answer1,{marginBottom: 0}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Please enter ..."
                    //autoCapitalize = "none"
                    value={state.value}
                    onChangeText = {value => {setState({...state, value}) }}
                    
                  />
                <View style={{alignSelf: 'flex-end', marginTop: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'rgb(12,121,42)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}}>
                    <Text style={{color:"white", fontWeight: "700", fontSize: 12}}>Fetch Stock</Text>
                  </TouchableOpacity>
                  <Button style={{color:"#15317E"}} title={""} onPress = {fetchStock} />
                </View>
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

              <Text style={styles.question1}>Company's Offered Discount on Stock (%)</Text>
          
              <TextInput style = {styles.answer1}
                value={StockDiscount} 
                onChangeText={StockDiscount => setStockDiscount(StockDiscount)}
                underlineColorAndroid = "transparent"
                placeholder = "Please enter ..."
                autoCapitalize = "none"
                maxLength={2}
                
                input type="number" step="any"
                keyboardType={'numeric'}    
              />
        
        
          
          <Text style={styles.question1}>ESPP Employee Contribution ($)
              </Text>
              <InputWrapper value = {EmployeeContribution}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter ..."
                  autoCapitalize = "none"
                  value={EmployeeContribution}
                  onChangeText={EmployeeContribution => setEmployeeContribution(EmployeeContribution)}
                  numeric
                keyboardType={'numeric'}

              />
              </InputWrapper>

              <Text style={styles.question1}>Market Price on 1st Day of Subscription Period
              </Text>
              <InputWrapper value = {SubscriptionDayPrice}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter ..."
                  autoCapitalize = "none"
                  value={SubscriptionDayPrice}
                  onChangeText = {SubscriptionDayPrice => setSubscriptionDayPrice(SubscriptionDayPrice)}
                  numeric
                  keyboardType={'numeric'}
              />
              </InputWrapper>

              <Text style={styles.question1}>Market Price on Purchase Date
              </Text>
              <InputWrapper value = {PurchaseDayMarketPrice}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter ..."
                  autoCapitalize = "none"
                  value={PurchaseDayMarketPrice}
                  onChangeText = {PurchaseDayMarketPrice => setPurchaseDayMarketPrice(PurchaseDayMarketPrice)}
                  numeric
                  keyboardType={'numeric'}
              />
              </InputWrapper>

              <Text style={styles.question1}>Stock Price - Lower Of The Two 
              </Text>
              
              <InputWrapper value = {LowerPrice}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  
                  onChangeText = {LowerPrice => setLowerPrice(LowerPrice)}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter ..."
                  autoCapitalize = "none"
                  value={LowerPrice}
                  numeric
                  keyboardType={'numeric'}
                />
              </InputWrapper>
              <Text style={styles.question1}>Assumed Annual Growth Rate (%)</Text>
              <TextInput style = {styles.answer1}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter ..."
                  autoCapitalize = "none"
                  value={assumedGrowthRate}
                  onChangeText = {assumedGrowthRate => setassumedGrowthRate(assumedGrowthRate)}
                  numeric
                  maxLength={2}
                  keyboardType={'numeric'}
            />

        <Separator/>

                
        </View>
       </ScrollView>
      <TouchableOpacity onPress={showESPPExplanation} style={[styles.Button1,{backgroundColor: isDisable?"lightgray": "#15317E"}]} disabled = {isDisable}>
          <Text style={[styles.historyBtnText]}>Calculate</Text>
      </TouchableOpacity>
      </View>
      :
      <Swipper setActiveSection ={(index)=>setActiveSection(index)} activeSection = {activeSection} />
  }
  

 </KeyboardAvoidingView>
 </SafeAreaView>
  );
}

// {
  //   (activeSection < 3)?
  //     <View style = {styles.dots}>
  //       <View style= {[styles.dot,{backgroundColor: activeSection == 0? "green" :'lightgray'}]} />
  //       <View style= {[styles.dot,{backgroundColor: activeSection == 1? "green" :'lightgray'}]} />
  //       <View style= {[styles.dot,{backgroundColor: activeSection == 2? "green" :'lightgray'}]} />
  //     </View>:<></>
  // }

const styles = StyleSheet.create({
container1: {
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor:'black',
    // paddingTop: 20,
    padding: 15,
    // paddingBottom: 70,
    flex: 1
  },

  Button1: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#15C951",
    shadowColor:'black',
    padding: 15,
    borderRadius: 10,
  },

  question1: {
    // marginTop: 4,
    // marginBottom: 4,
    color: '#5C5C5C',
    marginHorizontal: 4,
    //justifyContent: 'center',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    //textAlign: 'center',
    // textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
   },

answer1: {
    // padding: 4,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    // color: 'transparent',
    color: "#747474",
    fontSize: 14,
    shadowColor: "#000",
    //fontSize: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    minHeight: 40,
    marginVertical: 5,
    marginBottom: 20,
    paddingHorizontal: 10
    
    // alignItems: 'center',//
    // textAlign: 'center',//
    // backgroundColor: 'red',
  },
  
  
answer2: {
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#154360',
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
    
},

historyBtnText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
      },

 });


export default AllCalcs;