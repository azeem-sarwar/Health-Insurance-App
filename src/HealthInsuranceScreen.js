import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, NavigatorIOS, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import YesNoPicker from './Pickers/YesNoPicker.js';
import IndustryPicker from './Pickers/IndustryPicker.js';
import PrivatePublicPicker from './Pickers/PrivatePublicPicker.js';
import StatePicker from './Pickers/StatePicker.js';
import {currencyFormat} from "./helper"
import InputWrapper from "./components/InputWrapper"
import { StackParamList } from '../App';
import { createRow } from './Row';
import { Ionicons } from '@expo/vector-icons';
import NewOfferModal from "./components/ESPPModal"
import ProgressCircle from 'react-native-progress-circle'

 const HealthInsurance = ({route,navigation}) => {


   
    const [Salary, setSalary] = useState(0);
    const [CashBonus, setCashBonus] = useState(0);
    const [AdditionalComp, setAdditionalComp] = useState(0);
    const [HealthInsCost, setHealthInsCost] = useState(0);
    const [ESPP, setESPP] = useState(0);
    const [StockOptions,setStockOptions] = useState(0);
    const [DentalVisionCost,setDentalVisionCost] = useState(0);
    const [VacationDays,setVacationDays] = useState(0);
    const [SickDays,setSickDays] = useState(0);
    const [FloatDays,setFloatDays] = useState(0);
    const [CommuteCash,setCommuteCash] = useState(0);
    const [DBInflow,setDBInflow] = useState(0);
    const [DCInflow,setDCInflow] = useState(0);
    const [IRA,setIRA] = useState(0);
    const [ChildCare,setChildCare] = useState(0);
    const [Tuition,setTuition] = useState(0);
    const [Gym,setGym] = useState(0);
    const [companyTicker,setCompanyTicker] = useState("0");
    
    
    const [activeSection,setActiveSection] = useState(0);
        
    const [getError, setError] = useState("");
    const [getShowButton, setShowButton] = useState(false);
    const [getHistory, setHistory] = useState([]);
    const [compensation,setCompensation] = useState (0);
    
    
    
    const [state, setState] = React.useState ({

      isroutineCare: true,
      is55old: true,
      planA: 0,
      planType: 0,
      monthlyPremium: 0,
      annualDeductible: 0,
      outOfPocketMax: 0,
      isplanType: true,
    });

    const {isroutineCare, is55old, planA, planType, monthlyPremium, annualDeductible, outOfPocketMax, isplanType} = state
    

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

    
    function calcNewOfferQs (){
      let totalHealthInsuranceCost=(parseInt(annualDeductible) + parseInt(monthlyPremium)*12);
      
      return {
        totalHealthInsuranceCost,
        annualDeductible: annualDeductible,
        
      }

 }

    



const saveHistory = () => {
    setHistory([...getHistory, {
      annualDeductible: annualDeductible,
      
    }]);
    setShowButton(false);
  }

  const showHistory = () => {
    const calculations = calcNewOfferQs() 
    navigation.replace('History',{
      history: {
        companyTicker,
        annualDeductible: annualDeductible,
        
      }
    });
  }

  const calculations = calcNewOfferQs();
 //const isDisable = (!Salary || !CashBonus || !AdditionalComp || !CommuteCash )

  const isDisable = (!monthlyPremium )

  const samples: { title: string; routeName: any, image: any, des: any }[] = [
  
  { title: 'You', routeName: 'CompensatonView', image: require("./Images/JobOffer1.png"), des: "See Your Saved Data" },
  { title: 'You & Your Spouse', routeName: 'PurchasePlan', image: require("./Images/EmployeeStock2.png") },
  { title: 'You & Your Children', routeName: 'OptionsVestingSchedule', image: require("./Images/StockOption2.png")  },
  { title: 'Family', routeName: 'OptionCalculator', image: require("./Images/Aim1.png") },
  
];

 const samples2: { title: string; }[] = [
  
  { title: 'No',  },
  { title: 'Yes',  },
  
];

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
    <NewOfferModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
    <ScrollView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
       <View style={styles.container1}>
        
        {activeSection == 0?
            <View>
              <View style={styles.topBg1}>
                <Image style={{width: 300, height: 300,  left: 1, borderRadius: 100, alignItems: 'center',                 justifyContent: 'center'}} source={require('./Images/Sally1.png')} />
              </View>
              <View style={{flex: 1, marginHorizontal: 10}}>
                <Text style={styles.header}>Health Insurance Comparison</Text>
                <Text style={styles.description}>This health plan comparison calculator lets you project your estimated healthcare costs for two different plans. We will help you pick the plan that is most economical for you and works better with your expected health usage. </Text>
                <Text style={styles.description}>How it works:</Text>
                <Text style={styles.description}>To use this calculator, you’ll enter the plan expenses, medical service copays and coinsurance of two different plans.</Text>
                <Text style={[styles.description,{paddingTop: 0}]}>You should have your plan details available for both plans, and you’ll need to know the following:</Text>
                <Text style={[styles.description,{paddingVertical: 5}]}>1: Monthly premium</Text>
                <Text style={[styles.description,{paddingVertical: 0}]}>2: Annual deductible</Text>
                <Text style={[styles.description,{paddingVertical: 5}]}>3: Out-of-pocket maximum. </Text>
              </View>
            </View>
          :<></>
        }




        {activeSection > 0?
        
          <View style={{flex: 1}}>
            <View style={styles.topBg}>
              <ProgressCircle
                percent = {parseInt(activeSection/5 * 100)}
                radius={70}
                borderWidth={12}
                color="#A259FF"
                shadowColor="#DDDDDD"
                bgColor="rgb(15,188,139)"
              >
              <Text style={{ fontSize: 18, color: "#fff",fontWeight: "bold", marginBottom: 5 }}>
                {`${parseInt(activeSection/5 * 100)}%`}
              </Text>
              <Text style={{ fontSize: 12, color: "#fff",fontWeight: "bold"  }}>{`${activeSection} of 5 complete`}</Text>
              </ProgressCircle>
                <View style={{marginTop: 15}}>
                <Text style={{color: "#555F5C"}}>{`You're ${( 5 - activeSection)} step away from completion`}</Text>
                </View>
            </View>
          <View style={{flex: 1, borderWidth: 2, borderColor: "#008425", margin: 20, 
            borderRadius: 5,justifyContent: 'center',marginTop: 30,paddingHorizontal: 20, paddingBottom: 20}}>
            <View style={{position: 'absoulte',top: -15, borderWidth: 1, borderRadius: 100,height: 30, width: 30, alignItems: 'center', justifyContent: "center", alignSelf: "center", backgroundColor: '#fff', borderColor: "#008425",}}>
              <Text>{activeSection}</Text>
            </View>


        {activeSection == 1?
              <>
      
        <Text style={styles.header}>Your Details</Text>
        <Text style={styles.description}>Select the options below that best represent you. We’ll use your selections to determine how much you can expect to spend for each health plan.</Text>

        <Text style={styles.header}>Who is this coverage for?</Text>
        <Text style={styles.description}>Choose the option that most closely represents who your plan will cover.</Text>
        
        <View style ={styles.boxContainer}>
          {samples.map((sample,key) => (
            <TouchableOpacity  
              key = {key} 
              style={styles.box} 
              onPress={() => { navigation.navigate(sample.routeName)}}
            >
              <Image source={sample.image} style={{height: 50, width: 50, marginBottom: 5, borderRadius: 5}} resizeMode = {"contain"} />
              <View style={{marginHorizontal: 10}} >
                <Text style={styles.list}>{sample.title}</Text>
                
              </View>
            </TouchableOpacity>
          ))}
      </View>
        
        <Text style={styles.description}>Estimated Tax Bracket</Text>
          
        <Text style={styles.description}>Are you 55 or older?</Text>
        <View style ={styles.boxContainer}>
          <TouchableOpacity style={[styles.box3,{backgroundColor: state.is55old?"#A259FF": "#fff"}]} onPress = {()=>setState({...state,is55old: true})}>    
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,{color: state.is55old?"#fff":"#737574"}]}>Yes</Text>  
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.box3,{backgroundColor: !state.is55old?"#A259FF": "#fff"}]} onPress = {()=>setState({...state,is55old: false})}>
              <View style={{marginHorizontal: 10}}>
              <Text style={[styles.list3,{color: !state.is55old?"#fff":"#737574"}]}>No</Text>  
              </View>
            </TouchableOpacity>
      </View>
              
          </>:<></>
        }
        {
          activeSection == 2?
          <>

        
        <Text style={styles.header}>Plan A</Text>
        <Text style={styles.description}>Enter the details for the first plan that you want to compare. You’ll need to know the plan’s monthly premium, annual deductible, and out-of-pocket maximum. You’ll also enter the plan’s copay or coinsurance amounts for the most commonly incurred medical expenses.</Text>
            <Text style={styles.header}>Plan Name</Text>
            <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Name This Plan"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, planA: value})}
                    keyboardType={'numeric'}
                  />

            <Text style={styles.header}>Plan Type</Text>
            <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Plan Type"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, planType: value})}
                    keyboardType={'numeric'}
                  />
               
            <Text style={styles.header}>Monthly Health Plan Premium</Text>
                <InputWrapper value = {monthlyPremium}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, monthlyPremium: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>

                <Text style={styles.header}>Annual Deductible</Text>
                <InputWrapper value = {annualDeductible}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, annualDeductible: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>

              <Text style={styles.header}>Annual Out-of-Pocket Maximum</Text>
                <InputWrapper value = {outOfPocketMax}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, outOfPocketMax: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>

             <Text style={styles.header}>Anticipated Medical Expense this Year</Text>
             <Text style={styles.header}>Choose the option that most closely represents the level of medical costs that you expect.</Text>
            <TouchableOpacity onPress = {()=>setState({...state,isplanType: !state.isplanType})}>
            <Text>Negligible</Text>
            <View style={[styles.box,{backgroundColor: state.isplanType?"#A259FF": "transparent"}]} />
          </TouchableOpacity>
            
            

         
          <Text style={styles.questions}>Office Visit Coverage</Text>
          <Text style={styles.questions}>Routine Preventative Care</Text>
          <TouchableOpacity onPress = {()=>setState({...state,isroutineCare: !state.isroutineCare})}>
            <Text>Coinsurance (%)</Text>
            <View style={[styles.dot,{backgroundColor: state.isroutineCare?"#A259FF": "transparent"}]} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress = {()=>setState({...state,isroutineCare: !state.isroutineCare})}>
            <Text>Copay ($)</Text>
            <View style={[styles.dot,{backgroundColor: !state.isroutineCare?"#A259FF": "transparent"}]} />
          </TouchableOpacity>
          
          <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setState({...state, outOfPocketMax: value})}
                    keyboardType={'numeric'}
                  />
                  
           </>
          :<></>
        }
        {
            activeSection == 3?
            <>

          
          <Text style={styles.header}>Plan B</Text>
            
              
            </>
            :<></>
          }
          {
            activeSection == 4?
            <>
            
            <Text style={styles.header}>.....</Text>
                
                
            </>
            :<></>
          }
          
          {
            activeSection == 5?
            <>
            
            <Text style={styles.header}>....</Text>
                
            </>
            :
            <></>
          }
          

          
            </View>
          </View>
          :<></>
        }
     </View>
 </KeyboardAvoidingView>  
 </ScrollView>
  <View style = {{justifyContent: 'space-space-between', margin: 15}}>
    {
      activeSection < 5?
      <TouchableOpacity  
        style={[styles.btn,{backgroundColor: "#E6FEF6"}]} 
        onPress = {()=>{setActiveSection(activeSection+ 1)}}>
          <Text style={[styles.btnText]}>Next</Text>
      </TouchableOpacity>:
      <TouchableOpacity 
        onPress={showHistory} 
        style={[styles.btn,{backgroundColor:   isDisable?"#F7F7F7":"#fff"}]} 
        disabled = {isDisable}>
          <Text style={[styles.btnText,{color: isDisable?"darkgray":"#008425" }]}>Full Offer Explanation</Text>
        </TouchableOpacity>
    }
      {
      activeSection > 0?
      <TouchableOpacity style={styles.btn} onPress = {()=>{setActiveSection(activeSection- 1)}}>
        <Text style={[styles.btnText]}>Back</Text>
      </TouchableOpacity>
      :<></>
    }
    </View>
  </View>
 );
 
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
topBg1: {
  backgroundColor: "#fff", 
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
   
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    height: 100, 
    justifyContent: 'center',
    

  },
  list: {
    //  color: '#15317E',
     color: '#737574',
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 14,
     marginBottom: 5,
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

  questions: {
     marginTop: 10,
     marginBottom: 5,
     color: '#15317E',
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     
     fontSize: 18,
    },
   
   
  header: {
    // marginTop: 35,
    // marginBottom: 10,
    marginTop: 30,
    // marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008425',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    
  },
  
  answer1: {
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    color: 'transparent',
    elevation: 5,
    flexDirection: 'row',
    minHeight: 40,
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: '#ECECEC',
    
  },
  
description: {
  color: "rgb(0, 81, 3)",
  borderRadius: 20,
  fontWeight: "500",
  fontFamily: "Poppins",
  letterSpacing: 0,
  textAlign: "left",
  fontSize: 13,
  // marginTop: 20,
  padding: 10,
  // marginBottom: 20,
  },

  });
  
  

export default HealthInsurance;
