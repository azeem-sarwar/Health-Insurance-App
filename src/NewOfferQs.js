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





 const NewOfferQs = ({route,navigation}) => {


   
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
    const [totalVacaValue,setTotalVacaValue] = useState (0);
    const [totalPensionBenefit,setTotalPensionBenefit] = useState (0);
    const [totalPensionBenefit10,setTotalPensionBenefit10] = useState (0);
      
    
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
      let compensation=(parseInt(Salary) + parseInt(CashBonus)+parseInt(AdditionalComp)-parseInt(HealthInsCost)-parseInt(DentalVisionCost)+parseInt(CommuteCash)+parseInt(DBInflow)+parseInt(DCInflow)+parseInt(IRA)+parseInt(ChildCare)+parseInt(Tuition)+parseInt(Gym));
      // setCompensation(compensation);

      let totalVacaValue=((parseInt(Salary)+parseInt(CashBonus)+parseInt(AdditionalComp))/261)*((parseInt(VacationDays)+parseInt(SickDays)+parseInt(FloatDays)));
      // setTotalVacaValue(totalVacaValue);

      let totalPensionBenefit=(((parseInt(DBInflow)+parseInt(DCInflow)+parseInt(IRA))));

      let totalPensionBenefit10=(((parseInt(DBInflow)+parseInt(DCInflow)+parseInt(IRA))*(1+0.05))*10);
      // setTotalPensionBenefit(totalPensionBenefit);
      return {
        compensation,
        totalVacaValue: totalVacaValue.toFixed(0),
        totalPensionBenefit,
        totalPensionBenefit10,
      }

 }

    



const saveHistory = () => {
    setHistory([...getHistory, {
      salary: Salary,
      cashBonus: CashBonus,
      additionalComp: AdditionalComp,
      totalcompensation: compensation,
      totalpension: totalPensionBenefit,
      totalpension10: totalPensionBenefit10,
      totalvacation: totalVacaValue
    }]);
    setShowButton(false);
  }

  const showHistory = () => {
    const calculations = calcNewOfferQs() 
    navigation.replace('History',{
      history: {
        companyTicker,
        salary: Salary,
        cashBonus: CashBonus,
        additionalComp: AdditionalComp,
        commuteCash: CommuteCash,
        totalcompensation: calculations.compensation,
        totalvacation:     calculations.totalVacaValue,
        totalpension:      calculations.totalPensionBenefit,
        totalpension10:    calculations.totalPensionBenefit10
      }
    });
  }

  const calculations = calcNewOfferQs();
 //const isDisable = (!Salary || !CashBonus || !AdditionalComp || !CommuteCash )

  const isDisable = (!Salary )
  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
    <NewOfferModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
    <ScrollView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
       <View style={styles.container1}>
        
        {activeSection == 0?
            <View style={{flex: 1}}>
              <View style={styles.topBg1}>
                <Image style={{width: 300, height: 300,  left: 1, borderRadius: 100, alignItems: 'center',                 justifyContent: 'center'}} source={require('./Images/Sally1.png')} />
              </View>
              <View style={{flex: 1, marginHorizontal: 10}}>
                <Text style={styles.header1}>Compensation Evaluation</Text>
                <Text style={styles.description1}>Having multiple job offers on the table provides the relief of job security and validation of your qualifications, while also requiring you to make a big life decision. </Text>
                <Text style={styles.description1}>If one job is more appealing to you than the other, but the other has a better benefits package, consider negotiating your salary. </Text>
              </View>
            </View>
          :<></>
        }

        {activeSection > 0?
        
          <View style={{flex: 1}}>
            <View style={styles.topBg}>
            <ProgressCircle
                percent = {parseInt(activeSection/7 * 100)}
                radius={70}
                borderWidth={12}
                color="#A259FF"
                shadowColor="#DDDDDD"
                bgColor="rgb(15,188,139)"
              >
              <Text style={{ fontSize: 18, color: "#fff",fontWeight: "bold", marginBottom: 5 }}>
                {`${parseInt(activeSection/7 * 100)}%`}
              </Text>
              <Text style={{ fontSize: 12, color: "#fff",fontWeight: "bold"  }}>{`${activeSection} of 7 complete`}</Text>
              </ProgressCircle>

            
                <View style={{marginTop: 15}}>
                <Text style={{color: "#555F5C"}}>{`You're ${( 7 - activeSection)} step away from completion`}</Text>
                </View>
            </View>
            <View style={{flex: 1, borderWidth: 2, borderColor: "#008425", margin: 20, 
            borderRadius: 5,justifyContent: 'center',marginTop: 30,paddingHorizontal: 20, paddingBottom: 20}}>
            <View style={{position: 'absoulte',top: -15, borderWidth: 1, borderRadius: 100,height: 30, width: 30, alignItems: 'center', justifyContent: "center", alignSelf: "center", backgroundColor: '#fff', borderColor: "#008425",}}>
            <Text>{activeSection}</Text>
            </View>
            {activeSection == 1?
              <>
                <Text style={styles.header}>Annual Salary</Text>
                <InputWrapper value = {Salary}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Please enter annual salary"
                    autoCapitalize = "none"
                    onChangeText={Salary => setSalary(Salary)}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>
                
                <InputWrapper value = {CashBonus}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Please Enter Annual Cash Bounse"
                    autoCapitalize = "none"
                    onChangeText={CashBonus => {setCashBonus(CashBonus)}}
                    numeric
                    keyboardType={'numeric'}
                    value = {CashBonus}
                    maxLength = {9}
                  />
                </InputWrapper>
                
                <InputWrapper value = {AdditionalComp}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  underlineColorAndroid = "transparent"
                  placeholder = "Please enter any additional annual cash compensation"
                  autoCapitalize = "none"
                  onChangeText = {AdditionalComp => setAdditionalComp(AdditionalComp)}
                  numeric
                  keyboardType={'numeric'}
                />
              </InputWrapper>
              </>:<></>
            }

            {activeSection == 2?
            <>
              <Text style={styles.header}>Your Job Details </Text>
              <StatePicker placeholder={"Where Do You Live?"} />
              <IndustryPicker placeholder={"What Industry Do you Work In?"}/>
              <PrivatePublicPicker placeholder = {"Is Your Company Public or Private?"}/>
              <TextInput style = {styles.answer1}
                underlineColorAndroid = "transparent"
                placeholder = "If a Public Company Enter Your Company Ticker?"
                autoCapitalize = "characters"
                keyboardType={''}
                onChangeText = {text=>setCompanyTicker(text)}
              />
            </>
            :<></>
          }
          {
            activeSection == 3?
            <>

          
          <Text style={styles.header}>Benefits</Text>
            
              <InputWrapper value = {HealthInsCost}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={HealthInsCost}
                    onChangeText = {HealthInsCost => setHealthInsCost(HealthInsCost)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Health Insurance: Your Out of Pocket Cost Per Year"
                    autoCapitalize = "none"
                    
                    numeric
                    keyboardType={'numeric'}
                />
              </InputWrapper>
              <InputWrapper value = {DentalVisionCost}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={DentalVisionCost}
                    onChangeText = {DentalVisionCost => setDentalVisionCost(DentalVisionCost)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Dental and Vision: Your Out of Pocket Cost Per Year"
                    autoCapitalize = "none"
                    
                    numeric
                    keyboardType={'numeric'}
                />
              </InputWrapper>
            
            <YesNoPicker placeholder = {"Free Life Insurance Provided (Yes/ No)"}/>
            </>
            :<></>
          }
          {
            activeSection == 4?
            <>
            
            <Text style={styles.header}>Vacation Package</Text>
                <TextInput style = {styles.answer1}
                    value={VacationDays}
                    onChangeText = {VacationDays => setVacationDays(VacationDays)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Number of Vacation Days Per Year"
                    autoCapitalize = "none"
                    keyboardType={'numeric'}
                />
                <TextInput style = {styles.answer1}
                    value={SickDays}
                    onChangeText = {SickDays => setSickDays(SickDays)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Number of Sick Days Per Year"
                    autoCapitalize = "none"
                    keyboardType={'numeric'}
                />
                <TextInput style = {styles.answer1}
                    value={FloatDays}
                    onChangeText = {FloatDays => setFloatDays(FloatDays)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Number of Floating Holidays Per Year"
                    autoCapitalize = "none"
                    numeric
                    keyboardType={'numeric'}
                />
            </>
            :<></>
          }
          
          {
            activeSection == 5?
            <>
            
            <Text style={styles.header}>Commuter Benefits</Text>
                <InputWrapper value = {CommuteCash}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  value={CommuteCash}
                  onChangeText = {CommuteCash => setCommuteCash(CommuteCash)}
                  underlineColorAndroid = "transparent"
                  placeholder = "Commute and Parking Costs Covered by Firm Per Year"
                  autoCapitalize = "none"
                  keyboardType={'numeric'}
                />
                </InputWrapper>
            </>
            :
            <></>
          }
          {
            activeSection == 6?
            <>
          <Text style={styles.header}>Retirement Package</Text>
              <InputWrapper value = {DBInflow}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={DBInflow}
                    onChangeText = {DBInflow => setDBInflow(DBInflow)}
                    underlineColorAndroid = "transparent"
                    placeholder = "DB Plan (Pension) Contributions by Firm Per Year"
                    autoCapitalize = "none"
                    numeric
                    maxLength={6}
                keyboardType={'numeric'}
                />
                </InputWrapper>

                <InputWrapper value = {DCInflow}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={DCInflow}
                    onChangeText = {DCInflow => setDCInflow(DCInflow)}
                    underlineColorAndroid = "transparent"
                    placeholder = "DC (401k) Match by Firm Per Year"
                    autoCapitalize = "none"
                    maxLength={6}
                keyboardType={'numeric'}
                />
                </InputWrapper>
                <InputWrapper value = {IRA}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={IRA}
                    onChangeText = {IRA => setIRA(IRA)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Matching Contribution into Simple IRA Per Year"
                    autoCapitalize = "none"
                    maxLength={6}
                    keyboardType={'numeric'}
                />
              </InputWrapper>
            </>
            :<></>
          }

          {
            activeSection == 7?
            <>
            
              <Text style={styles.header}>Flexible Benefits Plan</Text>
              
              <InputWrapper value = {ChildCare}>
              <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  value={ChildCare}
                  onChangeText = {ChildCare => setChildCare(ChildCare)}
                  underlineColorAndroid = "transparent"
                  placeholder = "Childcare Expenses (if applicable) Covered Per Year"
                  autoCapitalize = "none"
                  maxLength={6}
                  keyboardType={'numeric'}
                />
              </InputWrapper>
                
              <InputWrapper value = {Tuition}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={Tuition}
                    onChangeText = {Tuition => setTuition(Tuition)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Tuition Reimbursement Per Year (if applicable)"
                    autoCapitalize = "none"
                    maxLength={6}
                keyboardType={'numeric'}
                />
                </InputWrapper>
              <InputWrapper value = {Gym}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    value={Gym}
                    onChangeText = {Gym => setGym(Gym)}
                    underlineColorAndroid = "transparent"
                    placeholder = "Gym Reimbursement (if applicable) per Year "
                    autoCapitalize = "none"
                    maxLength={6}
                    keyboardType={'numeric'}
                />
              </InputWrapper>
            </>
            :<></>
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
      activeSection < 7?
      <TouchableOpacity  
        style={[styles.btn,{backgroundColor: "#fff"}]} 
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
  
  header: {
    //marginTop: 20,
    //marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008425',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  header1: {
    marginTop: 35,
    marginBottom: 10,
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
  
  
  description1: {
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
  

export default NewOfferQs;
