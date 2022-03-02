import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, NavigatorIOS, KeyboardAvoidingView, Image, Dimensions, Touchable } from 'react-native';

import InputWrapper from "../components/InputWrapper"
import NewOfferModal from "../components/ESPPModal"
import MyCheckbox from '../components/MyCheckBox';

import PlanA from './PlanA'
import PlanB from './PlanB'

import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle'





const samples = [
  
  { title: 'You', routeName: 'CompensatonView', image: require("../Images/you.png"), des: "See Your Saved Data" },
  { title: 'You & Your Spouse', routeName: 'PurchasePlan', image: require("../Images/spouse.png") },
  { title: 'You & Your Children', routeName: 'OptionsVestingSchedule', image: require("../Images/children.png")  },
  { title: 'Family', routeName: 'OptionCalculator', image: require("../Images/family.png") },
  
];


const anticipatedMedicalExpense = [
  {title: "Negligible",desc: "You don’t expect to seek any medical services this year",},
  {title: "Low",desc: "You only visit the doctor for check ups.",},
  {title: "Average",desc: "You visit the doctor a few times a year and have a few prescriptions.",},
  {title: "High",desc: "You have an ongoing condition or anticipate a major surgery this year.",},
  {title: "Custom",desc: "You can input your own healthcare costs and how many times you expect to incur.",},
]

 const Index = ({route,navigation}) => {

    const [companyTicker,setCompanyTicker] = useState("0");
    const [activeSection,setActiveSection] = useState(0);
    const [getHistory, setHistory] = useState([]);
    
    
    
    const [state, setState] = React.useState ({
      coverage: "",
      isroutineCare: true,
      is55old: "",
      //   isplanType: true,
    });
    
    const [planA, setPlanA] = useState({
        name: "0",
        planType: 0,
        outOfPocketMax: 0,
        annualDeductible: 0,
        monthlyPremium: 0,
        routinePreventing: {
            isPercentage: false,
            value: "",
            deductible: false  
        },
        specialistOfficeVisit: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        diagnosticCoverage: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        imagingTests: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        inpatientVisits: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        outpatientVisits: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        emergencyRoomCare: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        generic: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        brand: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        otherCosts: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        employerhsa: "",
        individualhsa: "",
        anticipatedMedicalExpense: "",
        anticipatedMedicalExpense: "",
    });
    const [planB, setPlanB] = useState({
        name: "0",
        planType: 0,
        outOfPocketMax: 0,
        annualDeductible: 0,
        monthlyPremium: 0,
        routinePreventing: {
            isPercentage: false,
            value: "",
            deductible: false  
        },
        specialistOfficeVisit: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        diagnosticCoverage: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        imagingTests: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        inpatientVisits: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        outpatientVisits: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        emergencyRoomCare: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        generic: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        brand: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        otherCosts: {
            isPercentage: false,
            value: "",
            deductible: false
        },
        employerhsa: "",
        individualhsa: "",
        anticipatedMedicalExpense: "",
        anticipatedMedicalExpense: "",
    });
    

    const { monthlyPremium, annualDeductible, outOfPocketMax} = state
    const [ ModalOpen, setModalOpen ] = useState(false);

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

    
    const calculation = ()=>{
      console.log(officeVisitCoverage)
      console.log(specialistOfficeVisit)
      //navigation.navgate("pieChar",{data: {}}) 
    }


  const isDisable = (!monthlyPremium )



  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
    <NewOfferModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
    <ScrollView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
       <View style={styles.container1}>
        
        {activeSection == 0?
            <View>
              <View style={styles.topBg1}>
                <Image style={{width: 300, height: 300,  left: 1, borderRadius: 100, alignItems: 'center',                 justifyContent: 'center'}} source={require('../Images/Sally1.png')} />
              </View>
              <View style={{flex: 1, marginHorizontal: 15, marginTop: 20}}>
                <Text style={styles.header}>Health Insurance Comparison</Text>
                <Text style={styles.description}>This health plan comparison calculator lets you project your estimated healthcare costs for two different plans. We will help you pick the plan that is most economical for you and works better with your expected health usage. </Text>
                <Text style={styles.description}>How it works:</Text>
                <Text style={styles.description}>To use this calculator, you’ll enter the plan expenses, medical service copays and coinsurance of two different plans.</Text>
                <Text style={[styles.description,{marginTop: 0}]}>You should have your plan details available for both plans, and you’ll need to know the following:</Text>
                <Text style={[styles.description,{marginVertical: 5}]}>1: Monthly premium</Text>
                <Text style={[styles.description,{marginVertical: 0}]}>2: Annual deductible</Text>
                <Text style={[styles.description,{marginVertical: 5}]}>3: Out-of-pocket maximum. </Text>
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
              style={[styles.box,{backgroundColor: state.coverage.title == sample.title?"rgba(25,166,157,.2)" :"white", borderColor: state.coverage.title == sample.title?"rgba(25,166,157,1)" :"transparent"}]} 
              onPress={() => {setState({...state,coverage:sample})}}
            >
              <Image source={sample.image} style={{height: 40, width: 40, marginBottom: 5, borderRadius: 5}} resizeMode = {"contain"} />
              <View style={{marginHorizontal: 10}} >
                <Text style={styles.list}>{sample.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
        
        <Text style={styles.description}>Estimated Tax Bracket</Text>
          
        <Text style={styles.description}>Are you 55 or older?</Text>
        <View style ={styles.boxContainer}>
          <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.is55old === true?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,is55old: true})}>    
              <View style={{marginHorizontal: 10}}>
                {/* <Text style={[styles.list3,{color: state.is55old?"#fff":"#737574"}]}>Yes</Text>   */}
                <Text style={[styles.list3,]}>Yes</Text>  
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = {.9} style={[styles.box3,{backgroundColor: state.is55old === false?"#E6FEF6": "#fff"}]} onPress = {()=>setState({...state,is55old: false})}>
              <View style={{marginHorizontal: 10}}>
                <Text style={[styles.list3,]}>No</Text>  
              </View>
            </TouchableOpacity>
      </View>
              
          </>:<></>
        }
        {activeSection == 2?
        <PlanA planA = {planA} setPlanA = {setPlanA} />
        :
        <></>
        
        }
        {
            activeSection == 3?
            <PlanB planB ={planB} setPlanB = {setPlanB} />
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
        onPress={()=>{}} 
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
    {/* <TouchableOpacity style={styles.btn} onPress = {calculation}>
      <Text style={[styles.btnText]}>Calculate</Text>
    </TouchableOpacity> */}
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
  sections: {
    marginTop: 15
  },
  section: {
    marginBottom: 10
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#fafaf9",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#efefeb",
    
  },
  dot:{
    height: 12,
    width:  12,
    top: 2,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgb(15,188,139)",
    
  },

  cardHeading:{
    fontSize: 12,
    color: "#333",
    fontWeight: '700'
    
  },
  cardTitle: {
    fontSize: 15,
    color: "#333",
    fontWeight: '700'

  },
  cardInput: {
    borderRadius: 10,
    color: '#333',
    // flexDirection: 'row',
    elevation: 5,
    minHeight: 40,
    // marginBottom: 12,
    paddingVertical: 5,
    paddingLeft: 10,
    backgroundColor: '#ECECEC',
  },
  cardText: {
    fontSize: 12,
    color: "#333"
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
    borderWidth: 2,
    
  },
  box1: {
    width: 100,
    padding: 10,
    borderWidth: 2,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#008484",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "rgba(25,166,157,1)",
    alignItems: 'center',
    justifyContent: 'center'
    // paddingHorizontal: 20,
    // // flexDirection: 'row',
    // alignItems: 'center',
    // marginVertical: 10,
    // marginHorizontal: "2%",
    // width: "45%",
    // height: 100, 
    // justifyContent: 'center',
    
    
  },
  list: {
    //  color: '#15317E',
     color: '#737574',
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 12,
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
    // marginTop: 30,
    // marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008425',
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    
  },
  label: {
    
      // marginTop: 35,
      // marginBottom: 10,
      // marginTop: 30,
      // marginBottom: 10,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#008425',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // textAlign: 'left',

  },  
  
  answer1: {
    borderRadius: 10,
    color: 'transparent',
    flexDirection: 'row',
    elevation: 5,
    minHeight: 40,
    marginBottom: 12,
    paddingVertical: 5,
    paddingLeft: 10,
    backgroundColor: '#ECECEC',
    
  },
  
description: {
  // color: "rgb(0, 81, 3)",
  color: '#595333',
  borderRadius: 20,
  fontWeight: "500",
  fontFamily: "Poppins",
  letterSpacing: 0,
  textAlign: "left",
  fontSize: 13,
  // marginTop: 20,
  marginVertical: 10,
  // marginHorizontal: 10
  // marginBottom: 20,
  },

  });
  
  

export default Index;
