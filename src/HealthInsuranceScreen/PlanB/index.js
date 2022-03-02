import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, NavigatorIOS, KeyboardAvoidingView, Image, Dimensions, Touchable } from 'react-native';

import InputWrapper from "../../components/InputWrapper"
import MyCheckbox from '../../components/MyCheckBox';


const anticipatedMedicalExpense = [
  {title: "Negligible",desc: "You don’t expect to seek any medical services this year",},
  {title: "Low",desc: "You only visit the doctor for check ups.",},
  {title: "Average",desc: "You visit the doctor a few times a year and have a few prescriptions.",},
  {title: "High",desc: "You have an ongoing condition or anticipate a major surgery this year.",},
  {title: "Custom",desc: "You can input your own healthcare costs and how many times you expect to incur.",},
]

 const Index = ({planB, setplanB}) => {
    
    return (
        <View style={{flex: 1}}>
        <Text style={styles.header}>Plan B</Text>
        <Text style={styles.description}>Enter the details for the second plan that you want to compare. You’ll need to know the plan’s monthly premium, annual deductible, and out-of-pocket maximum. You’ll also enter the plan’s copay or coinsurance amounts for the most commonly incurred medical expenses.</Text>
            <Text style={styles.label}>Plan Name</Text>
            <TextInput style = {[styles.answer1,{marginTop: 5}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "Name This Plan"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setplanB({...planB, planB: value})}
                    keyboardType={'numeric'}
                  />

            <Text style={styles.label}>Plan Type</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
              <TouchableOpacity 
                style={[styles.box3,{flex: 2.7, marginLeft: 0,backgroundColor: planB.planType == "hdhp"?"#E6FEF6": "#fff" }]}
                
                onPress = {()=>{setplanB({...planB, planType: 'hdhp'})}}
              >
                <Text style={styles.cardText}>HDHP with HSA</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.box3,{flex: 1, backgroundColor: planB.planType == "ppo"?"#E6FEF6": "#fff" }]}
                onPress = {()=>{setplanB({...planB, planType: 'ppo'})}}>
                <Text style={styles.cardText}>PPO</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.box3,{flex: 1,backgroundColor: planB.planType == "hmo"?"#E6FEF6": "#fff" }]}
                onPress = {()=>{setplanB({...planB, planType: 'hmo'})}}
              >
                <Text style={styles.cardText}>HMO</Text>
              </TouchableOpacity>
            </View>
            {/* <TextInput style = {[styles.answer1,{marginTop: 5}]}
              underlineColorAndroid = "transparent"
              placeholder = "Plan Type"
              autoCapitalize = "none"
              onChangeText = {(value)=>setplanB({...planB, planType: value})}
              keyboardType={'numeric'}
            /> */}
            {
              planB.planType == "hdhp"?
              <>
              <Text style={styles.label}>Employer Annual HSA Contributions</Text>
                <InputWrapper value = {planB.employerhsa}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    value = {planB.employerhsa}
                    onChangeText = {(value)=>setplanB({...planB, employerhsa: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>
                <Text style={styles.label}>Individual Annual HSA Contributions</Text>
                <InputWrapper value = {planB.individualhsa}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    value = {planB.individualhsa}
                    onChangeText = {(value)=>setplanB({...planB, individualhsa: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>
              </>
              :
              <></>
            }
               
                <Text style={styles.label}>Monthly Health Plan Premium</Text>
                <InputWrapper value = {planB.monthlyPremium}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setplanB({...planB, monthlyPremium: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>

                <Text style={styles.label}>Annual Deductible</Text>
                <InputWrapper value = {planB.annualDeductible}>
                  <TextInput style = {[styles.answer1,{color: "transparent"}]}
                    underlineColorAndroid = "transparent"
                    placeholder = "$0"
                    autoCapitalize = "none"
                    onChangeText = {(value)=>setplanB({...planB, annualDeductible: value})}
                    keyboardType={'numeric'}
                  />
                </InputWrapper>

              <Text style={styles.label}>Annual Out-of-Pocket Maximum</Text>
              <InputWrapper value = {planB.outOfPocketMax}>
                <TextInput style = {[styles.answer1,{color: "transparent"}]}
                  underlineColorAndroid = "transparent"
                  placeholder = "$0"
                  autoCapitalize = "none"
                  onChangeText = {(value)=>setplanB({...planB, outOfPocketMax: value})}
                  keyboardType={'numeric'}
                />
              </InputWrapper>

            {/* <Text style={styles.label}>Anticipated Medical Expense this Year</Text>
            <Text style={styles.description}>Choose the option that most closely represents the level of medical costs that you expect.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator ={false} style={{marginVertical: 10}}>
                {
                  anticipatedMedicalExpense.map(a=>(
                    <TouchableOpacity style={[styles.box1,{backgroundColor: planB.anticipatedMedicalExpense.title == a.title?"rgba(25,166,157,.2)":"white"}]} onPress = {()=>setplanB({...planB,anticipatedMedicalExpense: a})}>
                      <Text style={styles.label}>{a.title}</Text>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={[styles.description,{textAlign: 'center', fontSize: 9}]}>{a.desc}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
            </ScrollView> */}

            
            {/*
             * Start Working From Here
             */}

            <View style={styles.sections}>

              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Office Visit Coverage</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Routine Preventative Care</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB, routinePreventing:{...planB.routinePreventing,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.routinePreventing.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB, routinePreventing:{...planB.routinePreventing,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.routinePreventing.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB, routinePreventing: {...planB.routinePreventing,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.routinePreventing.deductible} 
                          onChange={()=>setplanB({...planB, routinePreventing: {...planB.routinePreventing,deductible: !planB.routinePreventing.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Specialist Office Visit</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,specialistOfficeVisit: {...planB.specialistOfficeVisit,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.specialistOfficeVisit.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,specialistOfficeVisit: {...planB.specialistOfficeVisit,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.specialistOfficeVisit.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,specialistOfficeVisit: {...planB.specialistOfficeVisit,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.specialistOfficeVisit.deductible} 
                          onChange={()=>setplanB({...planB,specialistOfficeVisit: {...planB.specialistOfficeVisit,deductible: !planB.specialistOfficeVisit.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>

              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Diagnostic Coverage</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Diagnostic Coverage</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,diagnosticCoverage: {...planB.diagnosticCoverage,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.diagnosticCoverage.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,diagnosticCoverage: {...planB.diagnosticCoverage,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.diagnosticCoverage.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,diagnosticCoverage: {...planB.diagnosticCoverage,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.diagnosticCoverage.deductible} 
                          onChange={()=>setplanB({...planB,diagnosticCoverage: {...planB.diagnosticCoverage,deductible: !planB.diagnosticCoverage.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>
              
              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Lab & Radiology</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Imaging tests</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,imagingTests: {...planB.imagingTests,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.imagingTests.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,imagingTests: {...planB.imagingTests,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.imagingTests.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,imagingTests: {...planB.imagingTests,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.imagingTests.deductible} 
                          onChange={()=>setplanB({...planB,imagingTests: {...planB.imagingTests,deductible: !planB.imagingTests.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>
              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Hospital Coverage</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Inpatient Visits</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,inpatientVisits: {...planB.inpatientVisits,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.inpatientVisits.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,inpatientVisits: {...planB.inpatientVisits,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.inpatientVisits.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,inpatientVisits: {...planB.inpatientVisits,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.inpatientVisits.deductible} 
                          onChange={()=>setplanB({...planB,inpatientVisits: {...planB.inpatientVisits,deductible: !planB.inpatientVisits.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Inpatient Visits</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,outpatientVisits: {...planB.outpatientVisits,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.outpatientVisits.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,outpatientVisits: {...planB.outpatientVisits,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.outpatientVisits.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,outpatientVisits: {...planB.outpatientVisits,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.outpatientVisits.deductible} 
                          onChange={()=>setplanB({...planB,outpatientVisits: {...planB.outpatientVisits,deductible: !planB.outpatientVisits.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Emergency Room Care</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,emergencyRoomCare: {...planB.emergencyRoomCare,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.emergencyRoomCare.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,emergencyRoomCare: {...planB.emergencyRoomCare,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.emergencyRoomCare.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,emergencyRoomCare: {...planB.emergencyRoomCare,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.emergencyRoomCare.deductible} 
                          onChange={()=>setplanB({...planB,emergencyRoomCare: {...planB.emergencyRoomCare,deductible: !planB.emergencyRoomCare.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>
              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Prescription Drug Coverage</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Generic</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,generic: {...planB.generic,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.generic.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,generic: {...planB.generic,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.generic.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,generic: {...planB.generic,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.generic.deductible} 
                          onChange={()=>setplanB({...planB,generic: {...planB.generic,deductible: !planB.generic.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Brand</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,brand: {...planB.brand,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.brand.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,brand: {...planB.brand,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.brand.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,brand: {...planB.brand,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.brand.deductible} 
                          onChange={()=>setplanB({...planB,brand: {...planB.brand,deductible: !planB.brand.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>
              <View style ={styles.section}>
                  <Text style={styles.cardTitle}>Other Costs</Text>
                  <View style ={styles.card}>
                    <Text style={styles.cardHeading}>Other</Text>
                    <View style={{marginVertical: 15}}>
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,otherCosts: {...planB.otherCosts,isPercentage: true}})}} style={{flexDirection: 'row', marginBottom: 8}}>
                        <View style={[styles.dot,{backgroundColor: planB.otherCosts.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Coinsurance (%)</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress = {()=>{setplanB({...planB,otherCosts: {...planB.otherCosts,isPercentage: false}})}} style={{flexDirection: 'row'}}>
                        <View style={[styles.dot,{backgroundColor: !planB.otherCosts.isPercentage?"rgb(15,188,139)": "transparent"}]} />
                        <Text style={styles.cardText}>Copay ($)</Text>
                      </TouchableOpacity>
                    </View>
                      <TextInput style = {[styles.cardInput]}
                        underlineColorAndroid = "transparent"
                        placeholder = "0"
                        autoCapitalize = "none"
                        onChangeText = {(value)=>setplanB({...planB,otherCosts: {...planB.otherCosts,value}})}
                        keyboardType={'numeric'}
                      />
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                        <MyCheckbox
                          checked={planB.otherCosts.deductible} 
                          onChange={()=>setplanB({...planB,otherCosts: {...planB.otherCosts,deductible: !planB.otherCosts.deductible}})}
                          
                        />
                        <Text style={styles.cardText}>Counts towards deductible</Text>
                      </View>
                  </View>
              </View>


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
  color: "rgb(0, 81, 3)",
  borderRadius: 20,
  fontWeight: "500",
  fontFamily: "Poppins",
  letterSpacing: 0,
  textAlign: "left",
  fontSize: 13,
  // marginTop: 20,
  marginVertical: 10,
  // marginBottom: 20,
  },

  });
  
  

export default Index;
