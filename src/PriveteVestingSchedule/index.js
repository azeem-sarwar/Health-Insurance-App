// import React, {useState} from 'react';
// import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image} from 'react-native';
// import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
// import { useCollapsibleHeader } from 'react-navigation-collapsible';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Ionicons } from '@expo/vector-icons';
// import {currencyFormat} from "../helper"
// import InputWrapper from "../components/InputWrapper"
// import { StackParamList } from '../../App';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from "moment"

// import OptionModal from "../components/OptionModal"
// import VestingExplanationModal from "../components/VestingExplanationModal"
// import {fetchStockApi} from "../apis"
// import { createRow } from '../Row';
// import { useNavigation } from '@react-navigation/core';

// ///original navigator code
// type ScreenProps = {
//   navigation: StackNavigationProp<StackParamList>;
// };






// const index = ({onCalculate}) => {
//     const navigation = useNavigation()
//     const [state, setState] = React.useState ({

//       stockChartXValues: [],
//       stockChartYValues: [],
//       latestValues: {},
//       value: "",
//       stockPriceNow: 0,
//       numOfOptionsVesting: 0,
//       isVestingOption: true,
//       optionsVesting: 0,
//       cliff: 0,
//       vestingPeriod: 0,
//       numOfOptionsGrandted: 0,
//       priceToExcersize: 0,
//       toEvaluateDate: new Date(),
//       fromEvaluateDate: new Date(),
//       currentMarketPrice: 0,
//       stockOptionsGrantDate: new Date(),
//       evaluateDate: new Date(),
//       numOfStockGrandted: 0,
//       typeOption: "",

//     });


// const [ModalOpen, setModalOpen] = useState(false);
// React.useEffect(()=>{
//       navigation.setOptions({ headerRight: ()=>{
//           return (
//             <Ionicons  
//             name="help-circle-outline" 
//             size={32} 
//             color="#FFFFFF"
//             style={{marginRight: 10 }}
//             onPress={() => setModalOpen(true)}
//           />
//           )
//         }
//       })
//     },[])

// const [ModalOpen1, setModalOpen1] = useState(false);
// React.useEffect(()=>{
//       navigation.setOptions({ headerCenter:()=>{
//           return (
//             <Ionicons  
//             name="help-circle-outline" 
//             size={32} 
//             color="#FFFFFF"
//             style={{marginRight: 10 }}
//             onPress={() => setModalOpen1(true)}
//           />
//           )
//         }
//       })
//     },[])
        

// const showOptionGrantWorth = () => {

//   const _evaluateDate = moment.duration(moment(state.toEvaluateDate).diff(moment(state.fromEvaluateDate))).asDays();

// console.log(_evaluateDate, "<evaluate Date")
  
//   const {stockPriceNow,isVestingOption,optionsVesting,cliff,vestingPeriod, stockOptionsGrantDate,evaluateDate, numOfOptionsGrandted, strikePrice, currentMarketPrice} = state
     
   

//     let optionsVestingPerMonth = 0
    

    


//     if(isVestingOption){
//       optionsVestingPerMonth = ( 1 / (12*(parseFloat(vestingPeriod) - parseFloat(cliff))))  * 
//       (parseFloat(numOfOptionsGrandted) - (parseFloat(optionsVesting) /100) * parseFloat(numOfOptionsGrandted))
//     }
//     else{
//       optionsVestingPerMonth = (1 - (parseFloat(optionsVesting)/100))/ ( parseFloat(vestingPeriod)- parseFloat(cliff))
//     }

//     console.log(optionsVestingPerMonth , "PER MONTH")
  


//     let numberOfMonths0 = 0
   
//     if (_evaluateDate > (parseFloat(cliff)*365.25)){

//     numberOfMonths0 = parseFloat((_evaluateDate) - 365.25*parseFloat(cliff))/30.437
//     }

//     console.log(optionsVestingPerMonth , "Number of MONTH")



    

//     let numberOfMonths1 = 0
   
//     if(_evaluateDate > (parseFloat(cliff)*2*365.25)){
//       numberOfMonths1 = (parseFloat(_evaluateDate) - 2*365.25*parseFloat(cliff))/30.437
//     }
    
    
//     let numberOfMonths2 = 0

//     if(_evaluateDate > (cliff*365*3)){
//       numberOfMonths2 = (_evaluateDate - 3*365.25*parseFloat(cliff))/30.437
//     }
    
    
//     let numberOfMonths3 = 0

//     if(_evaluateDate > (cliff*365*4)){
//       numberOfMonths2 = (_evaluateDate - 4*365.25*parseFloat(cliff))/30.437
//     }
    

//     //options calculation based on number of months since the cliff date (what if at the ciff??)
//     let optionsVested0 = 0

//     if(_evaluateDate > (parseFloat(cliff)*365)){
//       optionsVested0 = parseFloat(numOfOptionsGrandted)*(parseFloat(optionsVesting)/100) + (parseFloat(numberOfMonths0))*parseFloat(optionsVestingPerMonth)
//     }
    

//     let fundsToExcOptionsVested0 = 0

//     if(_evaluateDate > (parseFloat(cliff)*365)){
//       fundsToExcOptionsVested0 = parseFloat(optionsVested0)*(parseFloat(strikePrice))
//     }
    

//     let immidiateGain0 = 0

//     if(_evaluateDate > (parseFloat(cliff)*365)){
    
//       immidiateGain0 = parseFloat(optionsVested0)*(parseFloat(currentMarketPrice) - (parseFloat(strikePrice)))
//     }
    
//     const data = {
//       _evaluateDate: _evaluateDate,
//       optionsVestingPerMonth: optionsVestingPerMonth,
//       numberOfMonths0: numberOfMonths0,
//       numberOfMonths1: numberOfMonths1,
//       numberOfMonths2: numberOfMonths2,
//       numberOfMonths3: numberOfMonths3,
//       optionsVested0: optionsVested0,
//       fundsToExcOptionsVested0: fundsToExcOptionsVested0,
//       immidiateGain0: immidiateGain0,
//       typeOption: state.typeOption,
      
  
//     }
    
//     if(onCalculate){
//       onCalculate(data)
//     }else{
//       navigation.navigate("OptionGrantWorth",data)

//     }
    



//   }



// const {value, latestValues} = state
// return (
// <ScrollView style={styles.scrollView}>
//   <OptionModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
//   <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>

//         <Image
//     style={{ width: 200, height: 200,  
//     opacity: 0.5, 
//     borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}
//     source={require('../Images/PrivateStockOptions.png')} />


//         <Text style={styles.header}>Private Company Options</Text>
        
//       <VestingExplanationModal ModalOpen1 = {ModalOpen1} setModalOpen1 = {()=>setModalOpen1(!ModalOpen1)} /> 
        
               
//         <Text style={styles.header2}>
//           Enter data below to evaluate what your grant might be worth 
//           <TouchableWithoutFeedback style={{marginLeft: 10 }}
//               onPress={() => setModalOpen1(true)}>
//             <Ionicons  
//               name="information-circle" 
//               size={22} 
//               color="blue"
//             />
//           </TouchableWithoutFeedback>
//         </Text>
        
//         <View>
        
//         <Text style={styles.question1}>Enter Your Company's Name </Text>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <TextInput style = {[styles.answer1,{flex: 1}]}
//               underlineColorAndroid = "transparent"
//               placeholder = "  Please enter ..."
//               //autoCapitalize = "none"
//               value={state.value}
//               onChangeText = {value => {setState({...state, value}) }}
              
//             />
            
//         </View>
//         <Text style={styles.question1}>Your Company's Market Value</Text>
//         <Text style={styles.question1}>What is your Company Valued at Based on the recent Capital Raise (or calculate Market Value based on annual Sales)</Text>
        
//         <TextInput style = {[styles.answer1]}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             //autoCapitalize = "none"
//             value={state.currentMarketPrice}
           
//             onChangeText = {(value)=>setState({...state, currentMarketPrice: value})}
//             keyboardType={'numeric'}
//           />
     
         
//          <Text style={styles.question1}>Type of Options Granted (RSUs, NSOs, ISOs) </Text>
//           <TextInput style = {[styles.answer1]}
//               underlineColorAndroid = "transparent"
//               placeholder = "  Please enter ..."
//               //autoCapitalize = "none"
//               value={state.typeOption}
//               onChangeText = {(value)=>setState({...state, typeOption: value})}
//               keyboardType={''}
//             />

//         <Text style={styles.question1}>Number of Stock Options granted</Text>
//         <TextInput style = {[styles.answer1]}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             autoCapitalize = "none"
            
//             onChangeText = {(value)=>setState({...state, numOfOptionsGrandted: value})}
//         />


//         <Text style={styles.question1}>Strike Price</Text>
//         <TextInput style = {[styles.answer1]}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             autoCapitalize = "none"
            
//             onChangeText = {(value)=>setState({...state, strikePrice: value})}
//         />

//         <Text style={styles.question1}>Stock Options Grant Date</Text>
        
//         <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
//            <View style ={{flex: 1}}>
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={state.fromEvaluateDate}
//               mode={"date"}
//               is24Hour={true}
//               display="default"
//               onChange={(event, date) => { setState({...state, fromEvaluateDate: date})}}
//             />
//           </View>
//          </View>
        

//         <Text style={styles.question1}>Evaluation Date</Text>
        
//         <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <View style ={{flex: 1}}>
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={state.toEvaluateDate}
//               mode={"date"}
//               is24Hour={true}
//               display="default"
//               onChange={(event, date) => { setState({...state, toEvaluateDate: date})}}
//             />
//           </View>
//         </View>
        

//         <Text style={styles.question1}>Lenght of Vesting Period (in Years)</Text>
//        <TextInput style = {[styles.answer1]}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             autoCapitalize = "none"
            
//             onChangeText = {(value)=>setState({...state, vestingPeriod: value})}
//         />
        
//         <Text style={styles.question1}> Vesting Cliff in Years (When do Options Start Vesting) </Text>
//         <TextInput style = {styles.answer1}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             autoCapitalize = "none"
            
//             onChangeText = {(value)=>setState({...state, cliff: value})}
//         />
        
//         <Text style={styles.question1}>% of Options Vesting in Cliff Year</Text>
//         <TextInput style = {[styles.answer1]}
//             underlineColorAndroid = "transparent"
//             placeholder = "  Please enter ..."
//             autoCapitalize = "none"
            
//             onChangeText = {(value)=>setState({...state, optionsVesting: value})}
//         />
        
//         <Text style={styles.question1}>Are Options Vesting Monthly or Annually After the Cliff Year?</Text>
//         <View style={{flexDirection: 'row',}}>
          
//           <TouchableOpacity onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
//             <Text>Monthly</Text>
//             <View style={[styles.dot,{backgroundColor: state.isVestingOption?"blue": "transparent"}]} />
//           </TouchableOpacity>
          
//           <TouchableOpacity onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
//             <Text>Annually</Text>
//             <View style={[styles.dot,{backgroundColor: !state.isVestingOption?"blue": "transparent"}]} />
//           </TouchableOpacity>
//         </View>
        
        
              
    
//     <TouchableOpacity onPress={showOptionGrantWorth} style={styles.Button1}>
//       <Text style={{ fontSize: 20, color: '#fff' }}>CALCULATE</Text>
//     </TouchableOpacity>

//   </View>
// </KeyboardAvoidingView>
// </ScrollView>
// )
// }




// const styles = StyleSheet.create({
//   container1: {
//      alignItems: 'center',
//      justifyContent: 'center',
//      backgroundColor: '#FFFFFF',
//      shadowColor:'black',
//      padding: 10,
//      //paddingBottom: 70,
//      flex: 1
     
//    },

  

//   Button1: {
//     marginTop: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#15317E',
//     shadowColor:'black',
//     padding: 24,
//     borderRadius: 10,
    
//   },
//   dot: {
//     height: 20,
//     width: 20,
//     borderWidth: 1,
//     borderRadius: 100,
//     borderColor: 'darkblue',
//     //alignItems: 'center',
//     //justifyContent: 'center',
//   },
  
//   question1: {
//     marginTop: 4,
//     marginBottom: 4,
//     color: '#15317E',
//     //justifyContent: 'center',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     //textAlign: 'center',
//     textAlign: 'left',
//     fontWeight: 'bold',
//     fontSize: 16,
//    },
//   header: {
//     marginTop: 5,
//     marginBottom: 10,
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#15317E',
//     padding: 5,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
     
//   },
//   header2: {
//     marginTop: 5,
//     marginBottom: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#15317E',
//     padding: 5,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
     
//   },
//   answer1: {
//     padding: 5,
//     marginHorizontal: 3,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     //color: 'transparent',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     flexDirection: 'row',
//     minHeight: 40,
//     marginVertical: 10,
//     alignItems: 'center',//
//     textAlign: 'center',//
//     // backgroundColor: 'red',
//   },
//  description: {
//      textAlign: 'left',
//      color: '#15317E',
//      fontSize: 16,
//      marginTop: 10,
//      marginBottom: 10,
//      padding: 10,
//      borderRadius: 5,
//     },

//     datePickerStyle: {
//     width: 200,
//     marginVertical: 15,
//   },


  
//  });


// export default index;


import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image} from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {currencyFormat} from "../helper"
import InputWrapper from "../components/InputWrapper"
import { StackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"

import OptionModal from "../components/OptionModal"
import VestingExplanationModal from "../components/VestingExplanationModal"
import {fetchStockApi} from "../apis"
import { createRow } from '../Row';
import { useNavigation } from '@react-navigation/core';
import Tooltip from 'react-native-walkthrough-tooltip';



const index = ({onCalculate = false}) => {
    const navigation = useNavigation();
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
      numOfOptionsGrandted: 0,
      priceToExcersize: 0,
      toEvaluateDate: new Date(),
      fromEvaluateDate: new Date(),
      currentMarketPrice: 0,
      stockOptionsGrantDate: new Date(),
      evaluateDate: new Date(),
      numOfStockGrandted: 0,
      typeOption: "",

    });


const [ModalOpen, setModalOpen] = useState(false);

const [tooltips, setTooltips] = useState(false)


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

const [ModalOpen1, setModalOpen1] = useState(false);
React.useEffect(()=>{
      navigation.setOptions({ headerCenter:()=>{
          return (
            <Ionicons  
            name="help-circle-outline" 
            size={32} 
            color="#FFFFFF"
            style={{marginRight: 10 }}
            onPress={() => setModalOpen1(true)}
          />
          )
        }
      })
    },[])
        

const showOptionGrantWorth = () => {

  const _evaluateDate = moment.duration(moment(state.toEvaluateDate).diff(moment(state.fromEvaluateDate))).asDays();

  console.log(_evaluateDate, "<evaluate Date")
  
  const {stockPriceNow,isVestingOption,optionsVesting,cliff,vestingPeriod, stockOptionsGrantDate,evaluateDate, numOfOptionsGrandted,  currentMarketPrice, typeOption } = state
     
   const strikePrice = typeOption == "RSU"? 0: state.strikePrice

    alert(strikePrice)

    let optionsVestingPerMonth = 0
    

    


    if(isVestingOption){
      optionsVestingPerMonth = ( 1 / (12*(parseFloat(vestingPeriod) - parseFloat(cliff))))  * 
      (parseFloat(numOfOptionsGrandted) - (parseFloat(optionsVesting) /100) * parseFloat(numOfOptionsGrandted))
    }
    else{
      optionsVestingPerMonth = (1 - (parseFloat(optionsVesting)/100))/ ( parseFloat(vestingPeriod)- parseFloat(cliff))
    }

    console.log(optionsVestingPerMonth , "PER MONTH")
  


    let numberOfMonths0 = 0
   
    if (_evaluateDate > (parseFloat(cliff)*365.25)){

    numberOfMonths0 = parseFloat((_evaluateDate) - 365.25*parseFloat(cliff))/30.437
    }

    console.log(optionsVestingPerMonth , "Number of MONTH")



    

    let numberOfMonths1 = 0
   
    if(_evaluateDate > (parseFloat(cliff)*2*365.25)){
      numberOfMonths1 = (parseFloat(_evaluateDate) - 2*365.25*parseFloat(cliff))/30.437
    }
    
    
    let numberOfMonths2 = 0

    if(_evaluateDate > (cliff*365*3)){
      numberOfMonths2 = (_evaluateDate - 3*365.25*parseFloat(cliff))/30.437
    }
    
    
    let numberOfMonths3 = 0

    if(_evaluateDate > (cliff*365*4)){
      numberOfMonths2 = (_evaluateDate - 4*365.25*parseFloat(cliff))/30.437
    }
    

    //options calculation based on number of months since the cliff date (what if at the ciff??)
    let optionsVested0 = 0

    if(_evaluateDate > (parseFloat(cliff)*365)){
      optionsVested0 = parseFloat(numOfOptionsGrandted)*(parseFloat(optionsVesting)/100) + (parseFloat(numberOfMonths0))*parseFloat(optionsVestingPerMonth)
    }
    

    let fundsToExcOptionsVested0 = 0

    if(_evaluateDate > (parseFloat(cliff)*365)){
      fundsToExcOptionsVested0 = parseFloat(optionsVested0)*(parseFloat(strikePrice))
    }
    

    let immidiateGain0 = 0

    if(_evaluateDate > (parseFloat(cliff)*365)){
    
      immidiateGain0 = parseFloat(optionsVested0)*(parseFloat(currentMarketPrice) - (parseFloat(strikePrice)))
    }
    
    
    
  const data = {
    _evaluateDate: _evaluateDate,
    optionsVestingPerMonth: optionsVestingPerMonth,
    numberOfMonths0: numberOfMonths0,
    numberOfMonths1: numberOfMonths1,
    numberOfMonths2: numberOfMonths2,
    numberOfMonths3: numberOfMonths3,
    optionsVested0: optionsVested0,
    fundsToExcOptionsVested0: fundsToExcOptionsVested0,
    immidiateGain0: immidiateGain0,
    typeOption: state.typeOption,
  }
    
    if(onCalculate){
      onCalculate(data)
    }else{
      navigation.navigate("OptionGrantWorth",data)

    }
    


  }



const {value, latestValues} = state
return (
<ScrollView style={styles.scrollView}>
  <OptionModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>

        <View style={{flex: 1}}>
            {
              onCalculate ==false?
              <View style={styles.topBg}>
                
                  <View style={{marginTop: 15}}>
                    <Text style={styles.header}>Private Company Options</Text>
                  </View>
              </View>
              :<></>
            }

            <View style={[{flex: 1,borderRadius: 5,justifyContent: 'center',marginTop: 30,paddingHorizontal: 20, paddingBottom: 20},onCalculate == false?{borderWidth: 2, borderColor: "#008425", margin: 20,}:{}]}>
              {/* {
                onCalculate == false?
                <View style={{position: 'absoulte',top: -15, borderWidth: 1, borderRadius: 100,height: 30, width: 30, alignItems: 'center', justifyContent: "center", alignSelf: "center", backgroundColor: '#fff', borderColor: "#008425"}}/>
                :<></>
              } */}
              <VestingExplanationModal ModalOpen1 = {ModalOpen1} setModalOpen1 = {()=>setModalOpen1(!ModalOpen1)} /> 
              <Text style={styles.header2}>
                {`Enter data below to evaluate what your grant might be worth  `} 
                <TouchableWithoutFeedback style={{}} onPress={() => setModalOpen1(true)}>
                    <Ionicons  
                      name="information-circle" 
                      size={18} 
                      color="rgb(15,188,139)"
                    />
                </TouchableWithoutFeedback>
              </Text>
        
        <View>
        
        <Text style={styles.question1}>Enter Your Company's Name </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style = {[styles.answer1,{flex: 1}]}
              underlineColorAndroid = "transparent"
              placeholder = "  Please enter ..."
              //autoCapitalize = "none"
              value={state.value}
              onChangeText = {value => {setState({...state, value}) }}
              
            />
            
        </View>
        <View style ={{flexDirection: 'row', alignItems: 'center'}}>
              
            <Text style={styles.question1}>Your Company's Market Value</Text>
            <Tooltip
              isVisible={tooltips=="marketValue"}
              content={<Text style={styles.question1}>What is your Company Valued at Based on the recent Capital Raise (or calculate Market Value based on annual Sales)</Text>}
              placement="top"
              onClose={() => setTooltips("")}
            >
              <TouchableOpacity style={{}} onPress={() => {setTooltips("marketValue")}}>
                  <Ionicons  
                    name="information-circle" 
                    size={18} 
                    color="rgb(15,188,139)" //PUT ANY COLOR HERE
                    />
                </TouchableOpacity>
            </Tooltip>
            

        </View>
        
        <InputWrapper value = {state.currentMarketPrice}>
        <TextInput 
            style = {[styles.answer1,{color: "transparent"}]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            //autoCapitalize = "none"
            value={state.currentMarketPrice}
            onChangeText = {(value)=>setState({...state, currentMarketPrice: value})}
            keyboardType={'numeric'}
          />
         </InputWrapper>
         
         <Text style={styles.question1}>Type of Options Granted (RSUs, NSOs, ISOs) </Text>
          <View style ={styles.boxContainer}>
          <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.typeOption === "RSU"?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,typeOption: "RSU"})}>    
              <View style={{marginHorizontal: 10}}>
               
                <Text style={[styles.list3,]}>RSU</Text>  
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.typeOption === "NSO"?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,typeOption: "NSO"})}>
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,]}>NSO</Text>  
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.typeOption === "ISO"?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,typeOption: "ISO"})}>
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,]}>ISO</Text>  
              </View>
            </TouchableOpacity>
      </View>

      {
        state.typeOption == "RSU"?
          <View>
            {/* <Text>dsadsa</Text> */}
          </View>
        :<></>
      }

        <Text style={styles.question1}>Number of Stock Options granted</Text>
        <TextInput style = {[styles.answer1]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, numOfOptionsGrandted: value})}
        />


        <Text style={styles.question1}>Strike Price</Text>
        <TextInput style = {[styles.answer1]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            keyboardType = {"numbers-and-punctuation"}
            editable = {state.typeOption !== "RSU"}
            value = {state.typeOption == "RSU"? "0" :state.strikePrice}
            onChangeText = {(value)=>setState({...state, strikePrice: value})}
        />

        <Text style={styles.question1}>Stock Options Grant Date</Text>
        
        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
           <View style ={{flex: 1}}>
            <DateTimePicker
              testID="dateTimePicker"
              value={state.fromEvaluateDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, date) => { setState({...state, fromEvaluateDate: date})}}
            />
          </View>
         </View>
        

        <Text style={styles.question1}>Evaluation Date</Text>
        
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style ={{flex: 1}}>
            <DateTimePicker
              testID="dateTimePicker"
              value={state.toEvaluateDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, date) => { setState({...state, toEvaluateDate: date})}}
            />
          </View>
        </View>
        

        <Text style={styles.question1}>Lenght of Vesting Period (in Years)</Text>
       <TextInput style = {[styles.answer1]}
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
        <TextInput style = {[styles.answer1]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            autoCapitalize = "none"
            
            onChangeText = {(value)=>setState({...state, optionsVesting: value})}
        />
        
        <Text style={styles.question1}>Are Options Vesting Monthly or Annually After the Cliff Year?</Text>

        <View style ={styles.boxContainer}> 
          <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.isVestingOption?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,]}>Monthly</Text>  
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: !state.isVestingOption?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,isVestingOption: !state.isVestingOption})}>
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,]}>Annually</Text>  
              </View>
            </TouchableOpacity>
      </View>


        
    
    <TouchableOpacity onPress={showOptionGrantWorth} style={styles.btn}>
      <Text style={[styles.btnText]}>Calculate</Text>
    </TouchableOpacity>

  
  </View>
  </View>
  </View>
</KeyboardAvoidingView>
</ScrollView>
)
}




const styles = StyleSheet.create({
  container1: {
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor:'black',
    // padding: 10,
    //paddingBottom: 70,
    flex: 1
    
  },

  topBg: {
  backgroundColor: 'rgb(15,188,139)', 
  paddingVertical: 20,
  borderBottomRightRadius: 50,
  borderBottomLeftRadius:  50,
  alignItems: 'center',
  justifyContent: 'center'
      },

  btn: {
  // flex: 1,
  alignItems: 'center', 
  justifyContent: 'center', 
  height: 50, 
  // backgroundColor: '#15C951', 
  backgroundColor: '#D3D3D3',
  borderWidth: 1,
  borderColor: '#D3D3D3',
  padding: 15,
  borderRadius: 10, 
  shadowColor:'black', 
  marginVertical: 10,
},
  btnText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: "#008425",
  alignSelf: "center",
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
  
  header: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // formattedValue: 2
  },
  header2: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008425',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'left',
    // formattedValue: 2
  },

  
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
 
  

  box3: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#008484",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: "2%",
    width: "45%",
    height: 50, 
    justifyContent: 'center',
    

  },
  list3: {
    //  color: '#15317E',
     color: '#737574',
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 14,
     marginBottom: 5,
    },

  


  
 });


export default index;